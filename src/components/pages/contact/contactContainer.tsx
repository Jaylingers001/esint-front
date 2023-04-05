import React from "react";
import CommonMeta from "../../CommonMeta";
import Footer from "../parts/Footer";
import Image from 'next/image';
import {Field, Form} from "react-final-form";
import TextFields from "../../util/TextField"
import useContact from "../../../hooks/useContact";
import {INPUT_TEXT_MAX_LENGTH} from "../../../const/constants";

export interface ContactProps {

}

const ContactContainer: React.FC<ContactProps> = (props) => {

    const {proceedConfirm, router, clear, contact} = useContact();

    return (
        <>
            <CommonMeta/>
            <Form initialValues={contact} onSubmit={proceedConfirm} render={({values, handleSubmit}) => (
                <>
                    <div className="mypage-box">
                        <h1 className="innerttl">お問い合わせ</h1>
                        <div id="back-white">
                            <a href="#" onClick={() => router.back()}><i
                                className="fas fa-angle-left"/>
                            </a>
                        </div>
                    </div>
                    <div id="maincont">
                        <div id="inner-icon">
                            <Image src="/assets/image/icon-no.28.jpg" alt="" width="50" height="50"/>
                        </div>
                        <ul id="contact-flow">
                            <li id="line">入力画面</li>
                            <li><i className="fas fa-chevron-right"/></li>
                            <li>確認画面</li>
                            <li><i className="fas fa-chevron-right"/></li>
                            <li>完了画面</li>
                        </ul>
                        <h2 className="subttl">お問い合わせ</h2>
                        <form onSubmit={handleSubmit}>
                            <table width="94%" id="forms">
                                <tbody>
                                <tr>
                                    <th>お問い合わせ種別<span>必 須</span></th>
                                    <td>
                                        <Field name="contactType"
                                               render={
                                                   ({input, meta}) =>
                                                       <select className={'-table02'} {...input} required={true}
                                                               data-cy={'contactType'}>
                                                           <option value="">選択してください</option>
                                                           <option value="使い方について">使い方について</option>
                                                           <option value="不具合について">不具合について</option>
                                                       </select>
                                               }>
                                        </Field>
                                    </td>
                                </tr>
                                <tr>
                                    <th>お名前<span>必 須</span></th>
                                    <td>
                                        <Field name={'name'}
                                               render={({input, meta}) =>
                                                   <TextFields
                                                       dataCy={'name'}
                                                       input={input}
                                                       meta={meta}
                                                       placeholder={''}
                                                       required={true}
                                                       maxLength={INPUT_TEXT_MAX_LENGTH}
                                                       className={"login-input135"}
                                                   />
                                               }/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>メールアドレス<span>必 須</span></th>
                                    <td>
                                        <Field name={'email'}
                                               render={({input, meta}) =>
                                                   <TextFields
                                                       dataCy={'email'}
                                                       input={input}
                                                       meta={meta}
                                                       placeholder={'example@example.com'}
                                                       required={true}
                                                       maxLength={320}
                                                       className={"login-input135"}
                                                       pattern={'[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'}
                                                   />
                                               }/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>電話番号</th>
                                    <td>
                                        <Field name={'tel'}
                                               render={({input, meta}) =>
                                                   <TextFields
                                                       dataCy={'tel'}
                                                       input={input}
                                                       meta={meta}
                                                       placeholder={'090-0000-0000'}
                                                       required={true}
                                                       maxLength={INPUT_TEXT_MAX_LENGTH}
                                                       className={"login-input135"}
                                                       pattern={'\\d{2,4}-\\d{2,4}-\\d{3,4}'}
                                                   />
                                               }/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>お問い合わせ内容<span>必 須</span></th>
                                    <td>
                                        <Field name="body"
                                               render={
                                                   ({input, meta}) => (
                                                       <textarea
                                                           data-cy={'body'}
                                                           className="login-textarea"
                                                           placeholder="自由記入欄です。"
                                                           cols={50}
                                                           rows={5}
                                                           required={true}
                                                           {...input}
                                                       />
                                                   )
                                               }>
                                        </Field>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div id="submit">
                                <input data-cy={'clear'} type="button" name="" onClick={clear} id="co-btn1"
                                       value="リセット"/>
                                <input data-cy={'submit'} type="submit" name="" id="co-btn2" value="送信内容を確認"/>
                            </div>
                        </form>
                    </div>
                </>)}
            />
            <Footer/>
        </>
    )
}

export default ContactContainer;
