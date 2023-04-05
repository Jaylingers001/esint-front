import CommonMeta from "../../CommonMeta";
import Footer from "../parts/Footer";
import React from "react";
import {useRouter} from "next/router";
import useEmptyPages from "../../../hooks/useEmptyPages";


const GuideContainer = () => {
    const router = useRouter()
    const {backToPrevPage} = useEmptyPages();

    return (
        <>
            <CommonMeta/>
            <div className="mypage-box">
                <h1 className="innerttl">利用案内</h1>

                <div id="back-white"><a style={{cursor: "pointer"}} onClick={backToPrevPage}><i
                    className="fas fa-angle-left"/></a></div>
            </div>

            <div id="maincont">
                <div id="inner-icon"><img src={"assets/image/icon-no.30.jpg"} alt="" width="50" height="200"/></div>
                <p className="center-txt center-pb30">オーダーズで仕事を受発注するうえで<br/>知っておきたい、「基本的な流れ」「仕事の依頼形式」を<br/>ご紹介しています。</p>

                <h2 className="subttl">利用案内</h2>

                <dl className="guide-bx">
                    <dt>Just me Ordersとは</dt>
                    <dd>
                        <p className="guide-read">Just me
                            Ordersは、個人・法人問わず、イベント関連のお仕事を内容問わず、アプリ上で発注・受注することができるお仕事マッチングアプリです。<br/>報酬を事前にクライアントからお預かりし、業務完了後にお仕事受注者に支払う「仮払い」方式を採用しているので、安心してお仕事することができます。
                        </p>
                        <h3>仕事を依頼したい方</h3>
                        <div className="guide-dtl"><img src="assets/image/guide-illust1.jpg" alt="仕事を依頼したい方" width="1000"
                                                        height="auto"/><p>Just me Orders上にお仕事の募集を掲載し、依頼相手を探すことができます。<br/>お仕事内容を細かく設定掲載する事が出来、仕事を依頼したい方の条件を条件に合わせて発注が可能です。<br/>アプリ上で受発注、支払いと一連の流れが完結します。<br/>請求書の確認や金額等の事務やり取りを無くす事が出来、作業負担を軽減できます。
                        </p></div>

                        <h3>働きたい方</h3>
                        <div className="guide-dtl"><img src="assets/image/guide-illust2.jpg" alt="働きたい方" width="1000"
                                                        height="auto"/><p>Just me
                            Orders上に掲載されている募集中のお仕事から自分のスキル、希望にあったお仕事を探して応募できます。<br/>アプリ上で受発注、支払いまでが完結するようになっています。<br/>また仮払い方式によって請求書発行等の事務作業負担を削減する事が出来ます。<br/>また請求書の発行漏れや金額の貰い忘れ等のトラブルの可能性を軽減する事が可能です。
                        </p></div>
                    </dd>
                </dl>

                <dl className="fs-acd guide-bx">
                    <dt>仕事を依頼したい方</dt>
                    <dd>
                        <div className="steps">
                            <p className="ttl"><span>STEP.01</span>仕事を掲載する</p>
                            <p className="txt">依頼したい仕事内容を記載し、仕事を掲載します。仕事掲載は無料です。<br/>依頼掲載時に細かい条件を指定する事が出来ます。</p>
                        </div>
                        <div className="steps">
                            <p className="ttl"><span>STEP.02</span>応募を待つ</p>
                            <p className="txt">依頼した仕事に、応募が来るのを待ちます。<br/>仕事内容への質問や相談、条件交渉等が発生する場合があります。<br/>アプリ内のメッセージ機能で質問への返答や情報のやり取りが可能です。
                            </p>
                        </div>
                        <div className="steps">
                            <p className="ttl"><span>STEP.03</span>契約条件を相談する</p>
                            <p className="txt">応募者の中から依頼したい人が絞られてくれば、依頼する業務の内容・報酬についてお互いが納得する条件となるよう、応募者と相談をしましょう。</p>
                        </div>
                        <div className="steps">
                            <p className="ttl"><span>STEP.04</span>契約・仮払い</p>
                            <p className="txt">受注者との話し合いが終わり、契約に問題が無ければ受注者管理ページから【成約】ボタンを押すだけで、カンタンに契約を進めることができます。<br/>契約後は、自動的に「仮払い」が行われることで業務開始が可能になります。<br/><br/>Ordersでは安心して取引いただくために、業務開始前に「仮払い」として、支払い予定の報酬をお預かりしております。<br/>※業務が完了するまでは依頼相手に支払われません。
                            </p>
                        </div>
                        <a style={{cursor: "pointer"}} onClick={() => {
                            router.push({pathname: '/mypage/projects/create'})
                        }}>仕事を依頼する</a>
                    </dd>
                </dl>

                <dl className="fs-acd guide-bx">
                    <dt>仕事を受注したい方</dt>
                    <dd>
                        <div className="steps">
                            <p className="ttl"><span>STEP.01</span>仕事を探す</p>
                            <p className="txt">Ordesは事前にプロフィールへの詳細入力を完了して頂くと掲載されている仕事依頼と自分の条件がどれくらいマッチしているかを各案件に％表示されるようになっています。<br/>マッチ度を参考にして案件を探して見て下さい。<br/>また検索ページからで仕事カテゴリを選んだり、キーワードなどで絞り込み条件を設定したりすることで興味のある条件に絞っての検索が可能です。
                            </p>
                        </div>
                        <div className="steps">
                            <p className="ttl"><span>STEP.02</span>応募する</p>
                            <p className="txt">興味のある仕事が見つかったら、希望の契約条件、受注金額を設定しメッセージを添えて応募します。<br/>プロフィール欄は全て発注者様に確認頂けるようになるので、プロフィール内容を充実させて自己アピールをしましょう。
                            </p>
                        </div>
                        <div className="steps">
                            <p className="ttl"><span>STEP.03</span>契約条件を相談する</p>
                            <p className="txt">業務内容や報酬は、あらかじめ明示されていることもあれば提案や見積もりを希望されることもあります。<br/>発注者・受注者のお互いが納得した条件で契約できるようアプリ内のメッセージ上で相談しましょう。
                            </p>
                        </div>
                        <div className="steps">
                            <p className="ttl"><span>STEP.04</span>契約</p>
                            <p className="txt">お互いが条件や受発注金額に同意すると、契約締結です。<br/>発注者から契約確認のフォームが届くので契約金額を確認して承諾しましょう。<br/>契約完了後に仮払いが行われ依頼完了後に支払いが行われます。<br/><br/>仕事の詳細を受発注様双方でやり取りを行って頂き、仕事を行いましょう
                            </p>
                        </div>
                        <a style={{cursor: "pointer"}} onClick={() => {
                            router.push({pathname: '/'})
                        }}>仕事を探す</a>
                    </dd>
                </dl>

                <dl className="fs-acd guide-bx">
                    <dt>報酬の支払いに関して</dt>
                    <dd><p
                        className="guide-read">Ordesでは受発注者双方での金額の確認、契約締結後に登録頂いたクレジット会社様から【仮払い】として発注者様に自動的に請求が行われます。<br/>この時点で受注者様へのお支払いは行われておらず、仮払いとしてプールされている状態になります。<br/>仕事完了とみなされたタイミングでお支払いが実行され、発注者様はそのままお支払いが実行され、受注者様へアプリ上の残高に金額が追加されます。
                    </p></dd>
                </dl>

                <dl className="fs-acd guide-bx">
                    <dt>仕事完了の報告に関して</dt>
                    <dd>
                        <p className="guide-read guide-read-bottom">仕事を完了する事によって正式なお支払いという形になるので、双方の確認とOrdersへの通知が必要になります。</p>
                        <div className="steps">
                            <p className="ttl"><span>STEP.01</span>発注者様から受注者様へナンバー<br/>パスワードの記入をお願いする</p>
                            <p className="txt">発注者様が受注者管理ページ内から契約を結んだ受注者様の詳細ページを確認するページ内に発行ナンバーとして4桁のランダムなナンバーパスワードがOrdersより発行されています。<br/>こちらの4桁の数字を当日現地、もしくは連絡出来る媒体にて受注者様へお伝え願います。
                            </p>
                        </div>
                        <div className="steps">
                            <p className="ttl"><span>STEP.02</span>受注者様のパスワード入力</p>
                            <p className="txt">受注者様は4桁のナンバーパスワードを確認して頂きます。<br/>その後今度は受注者様の案件管理ページで、契約した仕事内容の詳細ページを確認します。<br/>ページ下部に発行コードの入力欄がありますので、伝えられた4桁のナンバーを記入して送信します。
                            </p>
                        </div>
                        <div className="steps">
                            <p className="ttl"><span>STEP.03</span>完了確認</p>
                            <p className="txt">受注者様からの発行パスワード送信が問題無く実行された段階で、仕事完了と見なし上記のお金の流れが発生します。<br/><br/>※ナンバーパスワードが入力送信された段階で本払いとなるので、ナンバーのやり取りをするタイミングにご注意下さい。<br/>基本的には実際の仕事完了後に双方確認の上でパスワード確認を行い、完了を報告して下さい。<br/>パスコードの送信タイミングは双方のご相談の上で確認をするようにお願い致します。<br/>依頼のキャンセルや依頼の未実行等のトラブルを防ぐ役割にもなっていますので、パスコードの取扱には十分ご注意の上で確認をよろしくお願い致します。
                            </p>
                        </div>

                    </dd>
                </dl>
            </div>
            <Footer/>
        </>
    )
}
export default GuideContainer;