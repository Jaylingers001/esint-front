import CommonMeta from "../../CommonMeta";
import React from "react";
import Footer from "../parts/Footer";
import useEmptyPages from "../../../hooks/useEmptyPages";


const PrivacyContainer = () => {
    const {backToPrevPage} = useEmptyPages();

    return (
        <>
            <CommonMeta/>
            <div className="mypage-box">
                <h1 className="innerttl">プライバシーポリシー</h1>

                <div id="back-white"><a style={{cursor: "pointer"}} onClick={backToPrevPage}><i
                    className="fas fa-angle-left"/></a></div>
            </div>

            <div id="login-box" className="nmr-top privacys">


                <h2 className="subttl">個人情報に対する考え方</h2>
                <p className="left-txt">株式会社E-レクト（以下「当社」といいます）は、当社業務の遂行に伴い<br/>個人情報を収集、管理、利用する際には、本ポリシーに従って取扱いいたします。</p>

                <div className="prm-bx">

                    <p className="prm-ttl">1.法令等の遵守</p>
                    <p className="prm-txt">当社は個人情報保護法その他関係法令およびガイドライン等を遵守いたします。</p>

                    <p className="prm-ttl">2.社内体制</p>
                    <p className="prm-txt">当社は個人情報の取扱いおよびシステムに関して、規律および組織体制を整備し適切な管理を行います。</p>

                    <p className="prm-ttl">3.個人情報の取得</p>
                    <p className="prm-txt">当社が個人情報を取得する場合は、利用目的を通知、公表または明示したうえで、その目的の達成に必要な範囲で取得させていただきます。</p>

                    <p className="prm-ttl">4.個人情報の利用</p>
                    <p className="prm-txt">当社が個人情報を利用するにあたっては、利用目的の範囲内でのみ利用することとし、目的の範囲を超えての利用はいたしません。</p>

                    <p className="prm-ttl">5.正当性の確保</p>
                    <p className="prm-txt">当社は、利用目的の達成に必要な範囲で個人情報を正確かつ最新の情報に保つよう、適切な措置を講じます。また、利用する必要がなくなった際は該当する個人情報を遅滞なく削除するよう努めます。</p>

                    <p className="prm-ttl">6.安全措置管理</p>
                    <p className="prm-txt">当社は個人情報を厳重に管理し、不正アクセス・漏洩・破壊・改竄・紛失等に対する予防措置、安全対策を講じます。<br/><br/>人的安全管理措置<br/>・従業者に個人情報の取扱いに関する研修を実施しています。<br/>・従業者と入社時に機密保持に関する誓約書を締結しています。<br/><br/>物理的安全管理措置<br/>・個人情報を取り扱う区域において、入退室管理を行うとともに、権限を有しない者による個人情報の閲覧を防止する措置を実施しています。<br/>・個人情報を取り扱う機器、電子媒体及び書類等の盗難又は紛失等を防止するための措置を講じるとともに、機器の暗号化又はパスワード制御を実施しています。<br/><br/>技術的安全管理措置<br/>・利用するシステム・サービスでは、必要最小限の担当者のみが個人情報を閲覧、利用できるようアクセス制御を実施しています。<br/>・個人情報を取り扱う情報システムを外部からの不正アクセス又は不正ソフトウェアから保護する仕組みを導入しています。
                    </p>

                    <p className="prm-ttl">7.社内教育</p>
                    <p className="prm-txt">当社は、従業員に対する個人情報についての教育訓練を行い、その内容を社内に周知徹底させます。</p>

                    <p className="prm-ttl">8.委託先の監督</p>
                    <p className="prm-txt">当社が個人情報を利用するにあたって、個人情報の取扱いの全部または一部を第三者に委託することがございます。この場合、委託先を適正に選任し、適切に監督いたします。</p>

                    <p className="prm-ttl">9.第三者提供の制限</p>
                    <p className="prm-txt">当社は、法令に基づく場合を除き、本人の同意なく個人情報を第三者に提供および開示をいたしません。</p>

                    <p className="prm-ttl">10.社内体制の継続的見直し</p>
                    <p className="prm-txt">当社は、個人情報の取扱いに関する規律および組織体制について、有効かつ適正な運用がなされるように継続的な見直しと改善を図ります。</p>

                </div>

                <h2 className="subttl">個人情報の利用目的</h2>
                <p className="left-txt">当社において、当社は以下の目的のため、個人情報を適法かつ公正な手段で取得・利用させていただきます。当社は、お客様本人の同意がある場合を除き、以下の目的達成に必要な範囲を超えて、取得した個人情報を利用しません。</p>

                <div className="prm-bx">

                    <p className="prm-ttl">1.当社サービス利用者の個人情報および当社事業に係る取引先の個人情報</p>
                    <p className="prm-txt">・当社サービスを提供するため<br/>・当社サービスを安心・安全にご利用いただける環境整備のため<br/>・当社サービスの運営・管理のため<br/>・当社サービスに関するご案内、お問い合せ等への対応のため<br/>・当社、その他当社サービスについての調査・データ集積、改善、研究開発のため<br/>・当社が行うサービスなどのご案内を送信・送付するため<br/>・当社とお客様の間での必要な連絡を行うため<br/>・当社サービスに関する当社の規約、ポリシー等（以下「規約等」といいます。）に違反する行為に対する対応のため<br/>・当社サービスに関する規約等の変更などを通知するため<br/>・その他当社とお客様との間で同意した目的のため<br/>・当社グループ会社（当社並びにその子会社及び関連会社をいいます。）が取り扱う商品・サービスに関するご案内のため
                        ・上記の項目に附随する目的のため</p>

                    <p className="prm-ttl">2.採用応募者の個人情報</p>
                    <p className="prm-txt">採用選考・入社手続のため。なお、提出いただきました各種書類は、採用・不採用にかかわらず返却いたしかねます。あらかじめ、ご了承ください。</p>

                    <p className="prm-ttl">3.従業員等の個人情報</p>
                    <p className="prm-txt">人事労務管理、入退管理、その他業務上必要な連絡等のため。</p>

                </div>

                <h2 className="subttl">個人情報取扱いの委託</h2>
                <p className="left-txt">当社では、取得した個人情報について、その利用目的の達成のため、取扱いを第三者に委託する場合があります。その際は、個人情報を適正に取り扱っていると認められる者を選定し、契約等を締結することにより個人情報保護に必要な事項を義務付けるとともに、適切な監督を行います。</p>

                <h2 className="subttl">個人情報に関するお問い合わせ</h2>
                <p className="left-txt">当社の保有個人データに関し、開示、訂正等、利用停止等および利用目的の通知をご希望される場合には、下記「個人情報相談窓口」宛に住民票・免許証などの公的な証明の写しを添付し郵送にてお申し出ください。法令に基づき必要かつ合理的な範囲で対応いたします。</p>

                <div className="prm-bx">

                    <p className="prm-ttl">個人情報相談窓口</p>
                    <p className="prm-txt">株式会社E-レクト<br/>〒460-0007<br/>愛知県名古屋市中区新栄1-32-31<br/>TEL：052-252-0371<br/>E-mail：info@e-rect.jp
                    </p>

                </div>

                <h2 className="subttl">特定個人情報の適正な取扱いに関する基本方針</h2>
                <p className="left-txt">株式会社E-レクト(以下「当社」）は、「行政手続における特定の個人を識別するための番号の利用等に関する法律」（以下「マイナンバー法」）にもとづく個人番号および特定個人情報（以下「特定個人情報等」）の適切な取扱いの確保について、組織として以下の取り組みを推進いたします。</p>

                <div className="prm-bx">

                    <p className="prm-ttl">1.事業者の名称</p>
                    <p className="prm-txt">株式会社E-レクト</p>

                    <p className="prm-ttl">2.関係法令、ガイドライン等の遵守</p>
                    <p className="prm-txt">当社は、特定個人情報等の取扱いに関し、マイナンバー法その他関係法令および個人情報保護委員会規則、その他のガイドライン等を遵守いたします。</p>

                    <p className="prm-ttl">3.安全管理措置に関する事項</p>
                    <p className="prm-txt">当社は、特定個人情報等の漏洩、滅失または毀損の防止等、適切な管理のため、別途「特定個人情報取扱規程」等を定め、これを遵守いたします。</p>

                    <p className="prm-ttl">4.継続的改善</p>
                    <p className="prm-txt">当社は、特定個人情報取扱規程およびそれを実行するための社内体制について、有効かつ適正な運用が持続的になされるよう継続的な見直しと改善を図ってまいります。</p>

                    <p className="prm-ttl">5.質問、苦情の受付窓口</p>
                    <p className="prm-txt">当社の特定個人情報等の取扱いに関する質問、苦情については下記までお申し出ください。</p>

                    <p className="prm-ttl"></p>
                    <p className="prm-txt">株式会社E-レクト<br/>〒460-0007<br/>愛知県名古屋市中区新栄1-32-31<br/>TEL：052-252-0371<br/>E-mail：info@e-rect.jp<br/><br/>代表取締役
                        田中 勇貴</p>
                </div>

            </div>
            <Footer/>
        </>
    )
}

export default PrivacyContainer;