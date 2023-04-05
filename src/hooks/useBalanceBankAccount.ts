import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {loggedInState} from "../recoilStates/isLoggedInRecoil";
import React, {useEffect, useState} from "react";
import {ApiBank, ApiMypageBankAccountToAdd} from "../openapi";
import UserDao from "../dao/UserDao";
import {GMO_BANKS} from "../const/constants";
import InputChangeUtil from "../components/util/InputChangeUtil";
import BalanceDao from "../dao/BalanceDao";

const useBalanceBankAccount = (useRef: React.MutableRefObject<any>) => {
    const router = useRouter();

    const [loggedIn] = useRecoilState(loggedInState)

    const [kanaOptions, setKanaOptions] = useState(['']);
    const [kanaBranchOption, setKanaBranchOption] = useState([''])

    const [banksOptions, setBanksOptions] = useState(['']);
    const [banks, setBanks] = useState<Array<ApiBank>>([]);
    const [branches, setBranches] = useState<Array<ApiBank>>([]);
    const [bankValue, setBankValue] = React.useState<string | null>(kanaOptions[0]);
    const [bankInputValue, setBankInputValue] = React.useState('');
    const [bank, setBank] = useState<ApiMypageBankAccountToAdd>()
    const [edit, setEdit] = useState(true)

    const [branchOptions, setBranchOptions] = useState(['']);
    const [branchValue, setBranchValue] = React.useState<string | null>(branchOptions[0]);
    const [branchInputValue, setBranchInputValue] = React.useState('');

    const [selectedBankCode, setSelectedBankCode] = React.useState("");

    const [errorBankName, setErrorBankName] = React.useState("");
    const [errorBranchName, setErrorBranchName] = React.useState("");
    const [errorGmoBankAccountNumber, setErrorGmoBankAccountNumber] = React.useState("");
    const [errorGmoBankAccountName, setErrorGmoBankAccountName] = React.useState("");

    const onChangeMe = (value: string, level: number) => {
        if (level === 1) {
            let index = banksOptions.indexOf(value)
            if (index === -1) {
                if (InputChangeUtil().isHiragana(value)) {
                    const valueKana = InputChangeUtil().fullWidthToHalf(InputChangeUtil().hiraToKana(value))
                    const newBank = banks.filter((bank) => {
                        return bank.nameKana.includes(valueKana)
                    })
                    const bankNames = Array<string>();

                    newBank.forEach((bank) => {
                        bankNames.push(bank.name)
                    })
                    setBanksOptions(bankNames)
                } else {
                    const newBank = banks.filter((bank) => {
                        return bank.name.includes(value)
                    })
                    const bankNames = Array<string>();

                    newBank.forEach((bank) => {
                        bankNames.push(bank.name)
                    })
                    setBanksOptions(bankNames)
                }
                setBankValue(value);
            } else if (index !== -1) {
                const bankName = banksOptions[index]
                let selectedBankCode = ""
                setBankValue(bankName);
                banks.forEach((bank) => {
                    if (bank.name === bankName) {
                        selectedBankCode = bank.bankCode
                    }
                })
                const newBranches = branches.filter((branch) => {
                    return branch.bankCode === selectedBankCode
                })
                setSelectedBankCode(selectedBankCode)
                const branchNames = Array<string>();
                newBranches.forEach((branch) => {
                    branchNames.push(branch.name)
                })
                setBranchOptions(branchNames)
            }
        } else if (level === 2) {
            let index = branchOptions.indexOf(value)
            if (index === -1) {
                if (InputChangeUtil().isHiragana(value)) {
                    const valueKana = InputChangeUtil().fullWidthToHalf(InputChangeUtil().hiraToKana(value))

                    const newBranches = branches.filter((branch) => {
                        return branch.bankCode === selectedBankCode && branch.nameKana.includes(valueKana)
                    })
                    const branchNames = Array<string>();

                    newBranches.forEach((branch) => {
                        branchNames.push(branch.name)
                    })
                    setBranchOptions(branchNames)
                } else {
                    const newBranches = branchOptions.filter((branch) => {
                        return branch.includes(value)
                    })
                    const branchNames = Array<string>();

                    newBranches.forEach((branch) => {
                        branchNames.push(branch)
                    })
                    setBranchOptions(branchNames)
                }
                setBranchValue(value)
            } else if (index !== -1) {
                const asd = branchOptions[index]
                setBranchValue(asd);
            }
        }
    }


    const loadBankDetails = () => {
        (async () => {
            if (loggedIn.isLoggedIn) {
                if (router.route === '/mypage/bankAccount') {
                    setEdit(false)
                }
                const users = await UserDao().getUser()
                setBank({
                    gmoBankName: users?.data.data.gmoBankName!,
                    gmoBankBranchName: users?.data.data.gmoBankBranchName!,
                    gmoBankAccountType: users?.data.data.gmoBankAccountType!,
                    gmoBankAccountNumber: users?.data.data.gmoBankAccountNumber!,
                    gmoBankAccountName: users?.data.data.gmoBankAccountName!
                })
                const dataBankLevel = await BalanceDao().getAllBanks(GMO_BANKS.BANK_LEVEL);

                const bankData = new Array<string>();
                const kanaData = new Array<string>();
                const banks = new Array<ApiBank>();
                dataBankLevel?.map(name => {
                    bankData.push(name.name)
                    kanaData.push(name.nameKana)
                    banks.push(name)
                })
                // @ts-ignore
                setBanksOptions(bankData)
                setKanaOptions(kanaData)
                setBanks(banks)
                const indexBank = bankData.indexOf(users?.data.data.gmoBankName!)
                setBankValue(bankData[indexBank])

                const dataBranchLevel = await BalanceDao().getAllBanks(GMO_BANKS.BRANCH_LEVEL);

                const branchData = new Array<string>();
                const branchKanaData = new Array<string>();
                const branches = new Array<ApiBank>();
                dataBranchLevel?.map(name => {
                    branches.push(name)
                    branchData.push(name.name)
                    branchKanaData.push(name.nameKana)
                })
                setBranches(branches)

                if (users?.data.data.gmoBankName != null) {
                    const bankName = users?.data.data.gmoBankName
                    let selectedBankCode = ""
                    setBankValue(bankName);
                    banks.forEach((bank) => {
                        if (bank.name === bankName) {
                            selectedBankCode = bank.bankCode
                        }
                    })
                    const newBranches = branches.filter((branch) => {
                        return branch.bankCode === selectedBankCode
                    })
                    setSelectedBankCode(selectedBankCode)
                    const branchNames = Array<string>();
                    newBranches.forEach((branch) => {
                        branchNames.push(branch.name)
                    })
                    setBranchOptions(branchNames)
                } else {
                    setBranchOptions(branchData)
                }

                setKanaBranchOption(branchKanaData)
                const indexBranch = branchData.indexOf(users?.data.data.gmoBankBranchName!)
                setBranchValue(branchData[indexBranch])
            }
        })();
    }

    useEffect(loadBankDetails, [loggedIn.isLoggedIn]);

    const onSubmit = async (values: ApiMypageBankAccountToAdd) => {
        values.gmoBankName = '';
        values.gmoBankBranchName = '';
        setErrorBankName("");
        setErrorBranchName("");
        setErrorGmoBankAccountNumber("");
        setErrorGmoBankAccountName("");
        if (isErrorOfBankName(bankValue)) {
            setErrorBankName("銀行名に誤りがあります。")
            return
        } else if (isErrorOfBranchName(branchValue)) {
            setErrorBranchName("支店名に誤りがあります。")
            return
        } else if (values.gmoBankAccountNumber === undefined) {
            setErrorGmoBankAccountNumber("口座番号は必須項目です。")
            return
        } else if (values.gmoBankAccountNumber.length !== 7) {
            setErrorGmoBankAccountNumber("口座番号は7桁で入力してください。")
            return
        } else if (Number(values.gmoBankAccountNumber) < 1) {
            setErrorGmoBankAccountNumber("口座番号は0より大きい数字になります。")
            return
        } else if (values.gmoBankAccountName === undefined) {
            setErrorGmoBankAccountName("口座名義は必須項目です。")
            return
        } else if (!!values.gmoBankAccountName.match(/^[ァ-ヶー　]*$/) == null) {
            setErrorGmoBankAccountName("カタカナのみ入力可能です。")
            return
        }
        if (bankValue) {
            values.gmoBankName = bankValue;
        }
        if (branchValue) {
            values.gmoBankBranchName = branchValue;
        }
        if (!values.gmoBankAccountType) {
            values.gmoBankAccountType = "1"
        }
        const update = await BalanceDao().updateBankAccount(values)
        if (update.status === 200) {
            await router.push({pathname: '/mypage/balance/bankAccountComplete'})
        }
    }

    const isErrorOfBankName = (value: string | null): boolean => {
        let index = -1
        if (value != null) {
            index = banksOptions.indexOf(value)
        }
        if (index === -1) {
            setErrorBankName("銀行名に誤りがあります。")
        }
        return index === -1
    }

    const isErrorOfBranchName = (value: string | null): boolean => {
        let index = -1
        if (value != null) {
            index = branchOptions.indexOf(value)
        }
        if (index === -1) {
            setErrorBranchName("支店名に誤りがあります。")
        }
        return index === -1
    }

    return {
        router,
        bank,
        onSubmit,
        bankValue,
        setBankValue,
        bankInputValue,
        setBankInputValue,
        edit,
        branchValue,
        setBranchValue,
        branchInputValue,
        setBranchInputValue,
        branchOptions,
        banksOptions,
        kanaOptions,
        onChangeMe,
        kanaBranchOption,
        isErrorOfBankName,
        isErrorOfBranchName,
        errorBankName,
        errorBranchName,
        errorGmoBankAccountNumber,
        errorGmoBankAccountName

    }
}

export default useBalanceBankAccount;



