import React, {useCallback, useState} from "react";
import CommonMeta from "../../CommonMeta";
import MyPageBox from "./presentations/MyPageBox";
import {useRouter} from "next/router";
import * as Yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from "react-hook-form";
import SignUpDao from "../../../dao/SignUpDao";
import useLocalStorageLogin from "../../../hooks/useLocalStorageLogin";
import {INPUT_TEXT_MAX_LENGTH, STATUS_CODE} from "../../../const/constants";

const TelAuthenticationContainer = () => {
    const router = useRouter()
    const formSchema = Yup.object().shape({
        authenticationCode: Yup.string().required('※サンプルエラーメッセージです。')
    })
    const formOptions = {resolver: yupResolver(formSchema)}
    const {register, handleSubmit} = useForm(formOptions)
    const [errors, setErrors] = useState('')

    const onSubmit = useCallback(async (data) => {
        let signUp = useLocalStorageLogin().getLocalStorageSignUp();
        let tel = useLocalStorageLogin().getLocalStorageSignUpTel();
        let signupAuthenticationCode = {'tel': tel, 'authenticationCode': data.authenticationCode}
        await SignUpDao().addTelAuth(signupAuthenticationCode).then(async () => {
            // @ts-ignore
            const userDetails = JSON.parse(signUp);
            delete userDetails.passwordVerification;
            let userSignUpComplete = {
                "userData": userDetails,
                "tel": tel,
                "authenticationCode": data.authenticationCode
            }
            console.log('user: ' + JSON.stringify(userSignUpComplete))

            let resultSignUpComplete = await SignUpDao().addSignUpComplete(userSignUpComplete);
            if (resultSignUpComplete.status === STATUS_CODE) {
                await router.push({pathname: 'complete'})
            }
        }).catch((error) => {
            setErrors("認証に失敗しました");
        });
    }, []);
    return (
        <>
            <CommonMeta/>
            <MyPageBox/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div id="login-box" className="nmr-top">
                    <p id="auth-txt">ご登録いただいた電話番号に認証コードを送信いたしました。<br/>届いたコードをご入力ください。</p>
                    <input className="login-input" type="text" {...register("authenticationCode", {
                        required: true,
                        maxLength: INPUT_TEXT_MAX_LENGTH
                    })} placeholder="タップして入力"/>
                    <p className="hissu">{errors}</p>
                    <a className="login-btns login-nmr login-auth" id="login-btn1">
                        <input type="submit" title='home' className="login-btns login-nmr" id="login-btn1"
                               value='認証する'
                               style={{
                                   marginTop: '0',
                                   width: '100%',
                                   height: '3.7em',
                                   borderRadius: '2em',
                                   cursor: "pointer"
                               }}/></a>
                    <div id="resend"><a href="">認証コードを再送する</a></div>
                </div>
            </form>
        </>
    )
}
export default TelAuthenticationContainer
