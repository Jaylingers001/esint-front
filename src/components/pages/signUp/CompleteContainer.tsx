import React from "react";
import CommonMeta from "../../CommonMeta";
import MyPageBox from "./presentations/MyPageBox";

const CompleteContainer = () => {

    return (
        <>
            <CommonMeta/>
            <MyPageBox/>
            <div id="login-box" className="nmr-top">
                <p id="auth-txt">ご登録いただいたメールアドレスにメールアドレス認証URLを送信いたしました。<br/>届いたメールに記載されているURLをクリックしてください。</p>
            </div>
        </>
    )
}
export default CompleteContainer
