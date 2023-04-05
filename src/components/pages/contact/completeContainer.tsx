import React from "react";
import CommonMeta from "../../CommonMeta";
import Footer from "../parts/Footer";
import Image from 'next/image';
import Link from "next/link";
import useContact from "../../../hooks/useContact";

export interface CompleteProps {

}

const CompleteContainer: React.FC<CompleteProps> = (props) => {

    const {afterComplete} = useContact();

    return (
        <>
            <CommonMeta/>
            <div className="mypage-box">
                <h1 className="innerttl">お問い合わせ</h1>
                <div id="back-white">
                    <a href="#" onClick={afterComplete}>
                        <i className="fas fa-angle-left"/>
                    </a>
                </div>
            </div>
            <div id="maincont">
                <div id="inner-icon"><Image src="/assets/image/icon-no.28.jpg" alt="" width="50" height="50"/></div>

                <ul id="contact-flow">
                    <li>
                        入力画面
                    </li>
                    <li>
                        <i className="fas fa-chevron-right"/>
                    </li>
                    <li>
                        確認画面
                    </li>
                    <li>
                        <i className="fas fa-chevron-right"/>
                    </li>
                    <li id="line">
                        完了画面
                    </li>
                </ul>
                <h2 className="subttl">お問い合わせ</h2>
                <p id="thnks-ttl">送信が完了しました。</p>
                <p id="thnks-txt"> お問い合わせいただき、誠にありがとうございます。<br/>お問い合わせメールは無事送信されました。<br/>担当者がご確認の上、ご連絡差し上げます。<br/>今しばらくお待ちください。
                </p>
                <div id="submit">
                    <Link href='/'>
                        <a data-cy={'home'} id="reg-btn" className="reg">
                            トップへ戻る
                        </a>
                    </Link>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default CompleteContainer;
