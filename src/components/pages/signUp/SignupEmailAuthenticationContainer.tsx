import React, {useEffect, useState} from "react";
import CommonMeta from "../../CommonMeta";
import MyPageBox from "./presentations/MyPageBox";
import SignUpDao from "../../../dao/SignUpDao";
import {STATUS_CODE} from "../../../const/constants";

const SignupEmailAuthenticationContainer = () => {
    const [occurredError, setOccurredError] = useState(false);

    const SignupEmailAuthentication = () => {
        const signupEmail = async () => {
            const str = window.location.href;
            const getId = str.slice(
                str.indexOf('id='),
                str.lastIndexOf('&'),
            );

            const getEmailAuthenticationCode = str.slice(
                str.indexOf('emailAuthenticationCode'),
            );
            try {
                let resultSignUpEmailAuthentication = await SignUpDao().addSignupEmailAuthentication(JSON.parse(getId.replace('id=', '')),
                    getEmailAuthenticationCode.replace('emailAuthenticationCode=', ''))
                if (resultSignUpEmailAuthentication.status !== STATUS_CODE) {
                    setOccurredError(true)
                }
            } catch (e) {
                setOccurredError(true)
            }
        }
        signupEmail().then()
    }

    useEffect(SignupEmailAuthentication, [])

    return (
        <>
            <CommonMeta/>
            <MyPageBox/>
            <div id="login-box" className="nmr-top">
                {occurredError
                    ?
                    <>
                        <p id="auth-txt">不正なアクセスです</p>
                    </>
                    :
                    <>
                        <p id="auth-txt">メールアドレス認証が完了しました。<br/>ログインしてください。</p>
                        <a href="/login" className="login-btns login-nmr login-auth" id="login-btn1">ログインする</a>
                    </>
                }
            </div>
        </>
    )
}
export default SignupEmailAuthenticationContainer
