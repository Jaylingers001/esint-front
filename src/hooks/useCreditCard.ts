import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import MyPageDao from "../dao/MyPageDao";
import {useCallback, useState} from "react";
import {ApiMypageCreditCard, ApiUserSingle} from "../openapi";
import UserDao from "../dao/UserDao";
import moment from "moment";
import useLocalStorageLogin from "./useLocalStorageLogin";


const useCreditCard = () => {
    const router = useRouter();
    const [user, setUser] = useState<ApiUserSingle>();
    const [credit, setCreditDetails] = useState<ApiMypageCreditCard>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    const currentYear = Number(moment(new Date()).format('YY'));
    const currentMonth = new Date().getMonth();

    const getLoggedInUser = () => {
        UserDao().getUser().then((result) => {
            if (result)
                setUser(result.data)
        }).catch((errors) => {
            alert(errors)
        });
    };

    const getUserCreditCardDetails = () => {
        MyPageDao().getUserCreditCardDetails().then((result) => {
            if (result)
                setCreditDetails({
                    cardNumber: result.data.cardNumber && result.data.cardNumber !== "null" ? result.data.cardNumber : '',
                    expiration: '',
                    securityCode: '',
                    tokenJsUrl: result.data.tokenJsUrl && result.data.tokenJsUrl !== "null" ? result.data.tokenJsUrl : '',
                    shopId: result.data.shopId && result.data.shopId !== "null" ? result.data.shopId : '',
                });
            reset(
                {
                    cardNumber: result.data.cardNumber && result.data.cardNumber !== "null" ? result.data.cardNumber : '',
                    expiration: '',
                    securityCode: '',
                    tokenJsUrl: result.data.tokenJsUrl && result.data.tokenJsUrl !== "null" ? result.data.tokenJsUrl : '',
                    shopId: result.data.shopId && result.data.shopId !== "null" ? result.data.shopId : '',
                }
            );
        }).catch((errors) => {
            alert(errors)
        });
    };

    const onSubmit = useCallback(async (data) => {
        const year = data.expiration1;
        const month = (Number(data.expiration2)) < 10 ? `0${Number(data.expiration2)}` : Number(data.expiration2)
        data.expiration = `${year}${month}`;

        // @ts-ignore
        Multipayment.init('tshop00056800'); // @ts-ignore
        await Multipayment.getToken({
            cardno: data.cardNumber,
            expire: data.expiration,
            securitycode: data.securitycode,
            holdername: data.holdername,
            tokennumber: 1
        }, function (err: { tokenObject: { token: any; }; }, token: any) {
            setErrorMessage(undefined);
            console.log('token: ' + err.tokenObject.token.toString())
            let newToken = {token: err.tokenObject.token.toString()}
            Number(year) === currentYear ?
                Number(month) > currentMonth + 1 ?
                    handleSave(newToken)
                    : setErrorMessage('クレジットカード情報の編集に失敗しました。')
                : handleSave(newToken);
        });

    }, []);

    const handleSave = (data: ApiMypageCreditCard) => {
        MyPageDao().addOrUpdateCreditCard(data).then((cCData) => {
            alert("登録しました。")
            let isCreatingPage = useLocalStorageLogin().getLocalStorageCreatingProject();
            if (isCreatingPage) {
                router.push({pathname: '/mypage/ordererProjects/create'}).then()
            } else {
                router.push({pathname: '/mypage'}).then()
            }
        }).catch((error) => {
            alert('クレジットカード情報の編集に失敗しました。');
        });
    }

    return {
        getLoggedInUser,
        getUserCreditCardDetails,
        register,
        handleSubmit,
        onSubmit,
        router,
        user,
        credit,
        currentYear,
        currentMonth,
        errorMessage,
        errors
    }
}
export default useCreditCard;