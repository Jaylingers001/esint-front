import CommonMeta from "../../CommonMeta";
import React from "react";
import Footer from "../parts/Footer";
import useEmptyPages from "../../../hooks/useEmptyPages";

const FaqContainer = () => {
    const {backToPrevPage} = useEmptyPages();

    return (
        <>
            <CommonMeta/>
            <div className="mypage-box">
                <h1 className="innerttl">よくある質問</h1>

                <div id="back-white"><a style={{cursor: "pointer"}} onClick={backToPrevPage}><i
                    className="fas fa-angle-left"/></a></div>
            </div>

            <div id="maincont">
                <div id="inner-icon"><img src="assets/image/icon-no.31.jpg" alt="" width="50" height="200"/></div>
                <p className="center-txt center-pb30">よくお問い合わせいただく内容をまとめました。<br/>これら以外にもご不明点がございましたら、<br/>お気軽にお問い合わせください。
                </p>

                <h2 className="subttl">仕事の発注について</h2>
                <dl className="fs-acd">

                    <dt><span>Q.</span>案件掲載後に金額や日時の変更は可能ですか？</dt>
                    <dd><span>A.</span>一度掲載した案件は変更することができません。取り消しは可能ですので取り消した後新たに案件掲載をお願いします。</dd>

                    <dt><span>Q.</span>案件成立後キャンセルは可能ですか？</dt>
                    <dd><span>A.</span>可能です。キャンセル料に関してはJust me Ordersではキャンセルポリシーを設けておりませんので発注者、受注者双方で決定していただきます。</dd>

                    <dt><span>Q.</span>応募者を指名することはできますか？</dt>
                    <dd><span>A.</span>指名することはできません。スレッドにて受注者に応募を促していただく形になります。</dd>
                </dl>

                <h2 className="subttl">仕事の受注について</h2>
                <dl className="fs-acd">

                    <dt><span>Q.</span>案件応募後に金額や内容の交渉は可能でしょうか？</dt>
                    <dd><span>A.</span>可能です。応募後に双方納得していただいた内容で発注者から契約確認フォームが届きます。フォームへの承諾で案件成立となります。</dd>

                    <dt><span>Q.</span>案件成立後キャンセルは可能ですか？</dt>
                    <dd><span>A.</span>可能です。キャンセル料に関してはJust me Ordersではキャンセルポリシーを設けておりませんので発注者、受注者双方で決定していただきます。</dd>

                    <dt><span>Q.</span>交通費は金額に含まれていますか？</dt>
                    <dd><span>A.</span>案件の金額については全て発注者が決定しております。案件詳細に記載がない場合発注者にスレッドにてお問い合わせください</dd>
                </dl>

                <h2 className="subttl">支払方法、出金方法について</h2>
                <dl className="fs-acd">

                    <dt><span>Q.</span>案件成立後、現場の当日に受注者にお支払いすれば良いのでしょうか？</dt>
                    <dd><span>A.</span>登録されたクレジットカードから引き落としされますので現地で直接受注者に支払いは不要です。</dd>

                    <dt><span>Q.</span>報酬は案件成立後に支払われるのでしょうか？</dt>
                    <dd><span>A.</span>報酬は仕事完了後に双方がナンバーパスワードを入力後開始されます。入力方法については利用案内をご確認下さい。</dd>

                    <dt><span>Q.</span>領収書や請求書はアプリ内で発行できますか？</dt>
                    <dd><span>A.</span>Just me Ordersでは発行する事はできません。受注者、発注者に直接ご依頼下さい。マイページにて出金履歴や入金履歴の明細を発行する事は可能です</dd>
                </dl>
            </div>
            <Footer/>
        </>
    )
}

export default FaqContainer;