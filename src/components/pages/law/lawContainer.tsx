import CommonMeta from "../../CommonMeta";
import Footer from "../parts/Footer";
import {useRouter} from "next/router";
import React from "react";
import useEmptyPages from "../../../hooks/useEmptyPages";


const LawContainer = () => {
    const router = useRouter()
    const {backToPrevPage} = useEmptyPages();

    return (
        <>
            <CommonMeta/>
            <div className="mypage-box">
                <h1 className="innerttl">特商法取引について</h1>

                <div id="back-white"><a style={{cursor: "pointer"}} onClick={backToPrevPage}><i
                    className="fas fa-angle-left"/></a></div>
            </div>

            <div id="login-box" className="nmr-top">

                <div className="prm-bx">
                    <p className="prm-ttl">サービス提供事業者</p>
                    <p className="prm-txt">株式会社E-レクト</p>

                    <p className="prm-ttl">代表取締役</p>
                    <p className="prm-txt">田中勇貴</p>

                    <p className="prm-ttl">本社所在地</p>
                    <p className="prm-txt">愛知県名古屋市中区新栄1-32-31</p>

                    <p className="prm-ttl">電話番号</p>
                    <p className="prm-txt">052-252-0371(代表)</p>

                    <p className="prm-ttl">お問い合わせ先</p>
                    <p className="prm-txt">reflect-rental@e-rect.jp/052-559-9832(10:00-18:00)</p>

                    <p className="prm-ttl">サービス利用料金</p>
                    <p className="prm-txt">
                        <a style={{cursor: "pointer"}} onClick={() => {
                            router.push({pathname: '/guide'})
                        }}>別途ページに記載</a>
                    </p>

                    <p className="prm-ttl">サービス利用料以外の必要料金</p>
                    <p className="prm-txt">インターネット接続には別途、ご契約の通信事業者への通信料が発生します。<br/>携帯電話からのご利用には、携帯通信料又はパケット通信料が発生します。
                    </p>

                    <p className="prm-ttl">支払方法と支払期限</p>
                    <p className="prm-txt">クレジットカード決済(VISA/MASTER/JCB)<br/>ご成約時にお支払いが確定いたします</p>

                    <p className="prm-ttl">引渡し時期</p>
                    <p className="prm-txt">ご指定いただいた日時</p>

                    <p className="prm-ttl">返品・交換について</p>
                    <p className="prm-txt">確定後の取引は原則として返品・交換は不可能です</p>

                </div>

            </div>
            <Footer/>
        </>
    )
}
export default LawContainer;