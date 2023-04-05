import React from "react";
import CommonMeta from "../../CommonMeta";
import Footer from "../parts/Footer";
import Image from 'next/image';
import Link from "next/link";
import useContact from "../../../hooks/useContact";
import {useRecoilValue} from "recoil";
import {contactStatsState} from "../../../recoilStates/contactRecoil";

interface ConfirmProps {

}

const ConfirmContainer: React.FC<ConfirmProps> = (props) => {
    const contact = useRecoilValue(contactStatsState);
    const {sendMessage, router} = useContact();

    return (
        <>
            <CommonMeta/>
            <div className="mypage-box">
                <h1 className="innerttl">お問い合わせ</h1>
                <div id="back-white">
                    <a href="#" onClick={() => router.back()}><i
                        className="fas fa-angle-left"/>
                    </a>
                </div>
            </div>
            <div id="maincont">
                <div id="inner-icon"><Image src="/assets/image/icon-no.28.jpg" alt="" width="50" height="50"/></div>
                <ul id="contact-flow">
                    <li>入力画面</li>
                    <li><i className="fas fa-chevron-right"/></li>
                    <li id="line">確認画面</li>
                    <li><i className="fas fa-chevron-right"/></li>
                    <li>完了画面</li>
                </ul>
                <h2 className="subttl">お問い合わせ</h2>
                <table width="94%" id="forms">
                    <tbody>
                    <tr>
                        <th>お問い合わせ種別<span>必 須</span></th>
                        <td data-cy={'contactType'}>
                            {contact.contactType}
                        </td>
                    </tr>
                    <tr>
                        <th>お名前<span>必 須</span></th>
                        <td data-cy={'name'}>
                            {contact.name}
                        </td>
                    </tr>
                    <tr>
                        <th>メールアドレス<span>必 須</span></th>
                        <td data-cy={'email'}>
                            {contact.email}
                        </td>
                    </tr>
                    <tr>
                        <th>電話番号</th>
                        <td data-cy={'tel'}>
                            {contact.tel}
                        </td>
                    </tr>
                    <tr>
                        <th>お問い合わせ内容<span>必 須</span></th>
                        <td data-cy={'body'}>
                            {contact.body.split('\n').map(str => <p>{str}</p>)}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div id="submit">
                    <Link href={'/contact'}>
                        <input data-cy={'back'} type="submit" name="" id="co-btn1" value="戻る"/>
                    </Link>
                    <input data-cy={'send'} type="submit" name="" onClick={sendMessage} id="co-btn2" value="送信する"/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default ConfirmContainer;
