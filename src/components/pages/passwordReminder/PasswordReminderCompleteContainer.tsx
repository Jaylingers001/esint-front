import React from "react";
import CommonMeta from "../../CommonMeta";
import {useRouter} from "next/router";

export interface CompleteContainerProps {

}

const PasswordReminderCompleteContainer: React.FC<CompleteContainerProps> = (props) => {
    const router = useRouter();
    const back = () => {
        router.push({pathname: '/login'}).then();
        return false;
    }
    return (
        <>
            <CommonMeta/>
            <div className="mypage-box">
                <h1 className="innerttl">パスワードリマインダー</h1>

                <div id="back-white">
                    <a href="#" onClick={back}>
                        <i className="fas fa-angle-left"></i>
                    </a>
                </div>
            </div>

            <div id="login-box" className="nmr-top">

                <p id="auth-txt">パスワードリマインダーメールを送信しました。<br/>メールをご確認ください。</p>

                <a href="/login" className="login-btns login-nmr login-auth" id="login-btn1">ログインページへ</a>
            </div>
        </>
    )
}

export default PasswordReminderCompleteContainer;