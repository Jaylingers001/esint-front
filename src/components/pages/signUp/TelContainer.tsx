import React, {useCallback} from "react";
import CommonMeta from "../../CommonMeta";
import MyPageBox from "./presentations/MyPageBox";
import SignUpDao from "../../../dao/SignUpDao";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import useLocalStorageLogin from "../../../hooks/useLocalStorageLogin";
import {ApiUserGenreToAdd} from "../../../openapi";
import {AUTHENTICATION_CODE, STATUS_CODE, TEL_MAX_LENGTH, TEL_MIN_LENGTH} from "../../../const/constants";

const TelContainer = () => {
    const router = useRouter()
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = useCallback(async (data) => {
        useLocalStorageLogin().setLocalStorageSignUpTel(data.tel);
        await SignUpDao().addTel(data).then(async (result) => {
            useLocalStorageLogin().setLocalStorageSignUpTel(data.tel);
            let signUp = useLocalStorageLogin().getLocalStorageSignUp();
            let tel = useLocalStorageLogin().getLocalStorageSignUpTel();
            if (result.data.registerdSid) {
                await router.push({pathname: 'telAuthentication'})
            } else {
                let signupAuthenticationCode = {'tel': tel, 'authenticationCode': AUTHENTICATION_CODE}
                await SignUpDao().addTelAuth(signupAuthenticationCode).then(async () => {
                    // @ts-ignore
                    const userDetails = JSON.parse(signUp);
                    delete userDetails.passwordVerification;
                    let userSignUpComplete = {
                        "userData": userDetails,
                        "tel": tel,
                        "authenticationCode": AUTHENTICATION_CODE
                    }
                    console.log('user: ' + JSON.stringify(userSignUpComplete))

                    let resultSignUpComplete = await SignUpDao().addSignUpComplete(userSignUpComplete);
                    if (resultSignUpComplete.status === STATUS_CODE) {
                        const genreData: ApiUserGenreToAdd = {userId: 0, genreId: 0}
                        userDetails.genreIds.map(async (id: string) => {
                            genreData.userId = resultSignUpComplete.data.userId;
                            genreData.genreId = Number(id);
                            await SignUpDao().addSignupUserGenres(genreData);
                        });
                        await router.push({pathname: 'complete'})
                    }
                }).catch(() => {
                });
            }
        }).catch(() => {
        });
    }, []);

    return (
        <>
            <CommonMeta/>
            <MyPageBox/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div id="login-box" className="nmr-top">
                    <p id="auth-txt">下記にご使用されている電話番号をご入力ください。</p>
                    <input type="text" className="login-input" placeholder={'08012341234'}
                           {...register("tel", {
                               required: {value: true, message: "電話番号は必須です。"},
                               minLength: {value: TEL_MIN_LENGTH, message: "正しい電話番号を入力してください。"},
                               maxLength: {value: TEL_MAX_LENGTH, message: "正しい電話番号を入力してください。"}
                           })}/>
                    {errors.tel && <p className="hissu"> {errors.tel.message}</p>}
                    <a className="login-btns login-nmr login-auth" id="login-btn1">
                        <input type="submit" title='home' className="login-btns login-nmr" id="login-btn1"
                               value='次へ'
                               style={{
                                   marginTop: '0',
                                   width: '100%',
                                   height: '3.7em',
                                   borderRadius: '2em',
                                   cursor: "pointer"
                               }}/>

                    </a>
                </div>
            </form>
        </>
    )
}
export default TelContainer
