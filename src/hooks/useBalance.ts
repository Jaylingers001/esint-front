import {useCallback, useState} from "react";
import {ApiBankTransferApplication, ApiMypageBalance, ApiPayment, ApiUser, ApiUserProfile,} from "../openapi";
import MyPageDao from "../dao/MyPageDao";
import {useRouter} from "next/router";
import moment from "moment";
import {useForm} from "react-hook-form";
import FileSaver from "file-saver";


const useBalance = () => {
    const router = useRouter();
    const [bankTransferAppList, setBankTransferAppList] = useState<ApiBankTransferApplication[]>();
    const [depositList, setDepositList] = useState<ApiPayment[]>();
    const [withdrawList, setWithdrawList] = useState<ApiPayment[]>();

    const [totalBalance, setTotalBalance] = useState<number>(0);
    const [users, setUsers] = useState<ApiUser[]>();
    const [loggedInUser, setLoggedInUser] = useState<ApiUserProfile>();
    const [dateSelect, setDateSelection] = useState<Array<string>>();
    const {register, handleSubmit, reset} = useForm();

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const generateMonthsAndYears = (date: string) => {
        const result = [];

        const end_date = new Date(date.replace(" ", " ,1 "));
        const start_date = new Date(currentYear, currentMonth, 1);

        while (end_date <= start_date) {

            result.push(moment(start_date).format('YYYY-MM'));
            start_date.setMonth(start_date.getMonth() - 1);

        }
        setDateSelection(result);
    }

    const onFirstLoad = () => {
        const getPreviousYear = currentYear - 1;
        const correctMonth = new Date().toLocaleString('default', {month: "long"});
        generateMonthsAndYears(`${correctMonth} ${getPreviousYear}`);
        MyPageDao().getUserData().then((result) => setLoggedInUser(result.data)).catch((errors) => {
            alert(errors)
        });
        MyPageDao().getUsers().then((result) => setUsers(result.data.data)).catch((errors) => {
            alert(errors)
        });
    }

    const getPaymentList = (filter: ApiMypageBalance, type: string) => {
        MyPageDao().getAllMyPageBalancePayments(filter).then((data) => {
            console.log(data.data)
            if (data.data) {
                type === 'deposit' ? setDepositList(data.data.payments!!.data!!.filter((item) => item.status === 3)) :
                    type === 'withdraw' ? setWithdrawList(data.data.payments!!.data!!.filter((item) => item.status === 3)) : null;
                setTotalBalance(data.data.balance!!);
            }
        }).catch((errors) => {
            alert(errors)
        });
    }

    const getBankTransferList = (filter: ApiMypageBalance) => {
        MyPageDao().getAllMyPageBalanceBankTransfers(filter).then((data) => {
            console.log(data.data)
            if (data.data) {
                setBankTransferAppList(data.data.bankTransferApplications!!.data)
                setTotalBalance(data.data.balance!!);
            }
        }).catch((errors) => {
            alert(errors)
        });
    }

    const printBalance = (filter: ApiMypageBalance) => {
        console.log('printFilter', filter)
        MyPageDao().printMyPageBalancePayments(filter).then((blob) => {
            console.log('printData', blob.data)
            if (blob.data) {
                const bin = atob(blob.data.replace(/^.*,/, ''));
                const buffer = new Uint8Array(bin.length);
                for (let i = 0; i < bin.length; i++) {
                    buffer[i] = bin.charCodeAt(i);
                }
                try {
                    const blob2 = new Blob([buffer.buffer], {
                        type: 'application/pdf'
                    });
                    FileSaver.saveAs(blob2, 'お取引履歴.pdf')
                } catch (e) {
                    console.log("Error for Generating PDF")
                }
            }
        }).catch((errors) => {
            alert(errors)
        });
    }

    const filterList = (type: string, status: string, date?: string) => {
        const defaultMonth = (currentMonth + 1) < 10 ? `0${currentMonth + 1}` : currentMonth + 1;
        const searchMonth = date ? date?.split('-')[1] : defaultMonth;
        const searchYear = date ? date?.split('-')[0] : currentYear;

        const defaultFilter: ApiMypageBalance = {
            transactionMonth: `${currentYear}-${defaultMonth}-01T00:00:00.154Z`
        };

        const searchFilter: ApiMypageBalance = {
            transactionMonth: `${searchYear}-${searchMonth}-01T00:00:00.154Z`
        };

        const defaultBankFilter: ApiMypageBalance = {
            withDrawMonth: `${currentYear}-${defaultMonth}-01T00:00:00.154Z`
        };

        const searchBankFilter: ApiMypageBalance = {
            withDrawMonth: `${searchYear}-${searchMonth}-01T00:00:00.154Z`
        };

        if (type === 'firstLoad' && !date) {
            changeStatus('deposit');
            getPaymentList(defaultFilter, status);
            getBankTransferList(defaultBankFilter);
        } else {
            (status === 'deposit' || status === 'withdraw') && getPaymentList(searchFilter, status);
            status === 'bank' && getBankTransferList(searchBankFilter);
        }
    }

    const onSubmit = useCallback(async (data) => {
        console.log('submitted', data)
        if (data.depositDate && data.depositDate !== '' && data.status === 'deposit') {
            filterList('searchLoad', data.status, data.depositDate);
        }
        if (data.withdrawDate && data.withdrawDate !== '' && data.status === 'withdraw') {
            filterList('searchLoad', data.status, data.withdrawDate);
        }
        if (data.bankWithDrawDate && data.bankWithDrawDate !== '' && data.status === 'bank') {
            filterList('searchLoad', data.status, data.bankWithDrawDate);
        }
        if (data.status === 'print') {
            const defaultMonth = (currentMonth + 1) < 10 ? `0${currentMonth + 1}` : currentMonth + 1;
            let transactionMonth = "", transactionYear = "";
            let withDrawMonth = "", withDrawYear = "";
            let depositDateMonth = "", depositDateYear = ""
            if (data.bankWithDrawDate) {
                withDrawMonth = data.bankWithDrawDate !== '' ? data.bankWithDrawDate?.split('-')[1] : `${defaultMonth}`;
                withDrawYear = data.bankWithDrawDate !== '' ? data.bankWithDrawDate?.split('-')[0] : `${currentYear}`;
            } else {
                withDrawMonth = `${defaultMonth}`;
                withDrawYear = `${currentYear}`;
            }

            if (data.depositDate) {
                transactionMonth = data.depositDate !== '' ? data.depositDate?.split('-')[1] : defaultMonth;
                transactionYear = data.depositDate !== '' ? data.depositDate?.split('-')[0] : currentYear;
            } else if (data.withdrawDate) {
                transactionMonth = data.withdrawDate !== '' ? data.withdrawDate?.split('-')[1] : defaultMonth;
                transactionYear = data.withdrawDate !== '' ? data.withdrawDate?.split('-')[0] : currentYear;
            } else {
                transactionMonth = `${defaultMonth}`;
                transactionYear = `${currentYear}`;
            }

            if (data.withdrawDate) {
                depositDateMonth = data.withdrawDate !== '' ? data.withdrawDate?.split('-')[1] : defaultMonth;
                depositDateYear = data.withdrawDate !== '' ? data.withdrawDate?.split('-')[0] : currentYear;
            } else if (data.depositDate) {
                depositDateMonth = data.depositDate !== '' ? data.depositDate?.split('-')[1] : defaultMonth;
                depositDateYear = data.depositDate !== '' ? data.depositDate?.split('-')[0] : currentYear;
            } else {
                depositDateMonth = `${defaultMonth}`;
                depositDateYear = `${currentYear}`;
            }

            const filter: ApiMypageBalance = {
                withDrawMonth: `${withDrawYear}-${withDrawMonth}-01T00:00:00.154Z`,
                transactionMonth: `${transactionYear}-${transactionMonth}-01T00:00:00.154Z`,
                depositDate: `${depositDateYear}-${depositDateMonth}-01T00:00:00.154Z`,
            };

            printBalance(filter);
        }
    }, []);

    const changeStatus = (from: string) => {
        reset(
            {
                status: from
            }
        )
    }

    const handleStatusLabel = (label: number) => {
        switch (label) {
            case 0 || 1:
                return '振込中'
            case 2:
                return 'エラー'
            case 3:
                return '振込済'
            case 4:
                return '口座相違'
            default:
                return '振込中'
        }
    }

    return {
        onFirstLoad,
        getPaymentList,
        filterList,
        depositList,
        withdrawList,
        router,
        totalBalance,
        users,
        dateSelect,
        onSubmit,
        register,
        handleSubmit,
        changeStatus,
        bankTransferAppList,
        handleStatusLabel,
        loggedInUser
    }
}

export default useBalance;