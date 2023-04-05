import React, {useState} from "react";
import CommonMeta from "../../../CommonMeta";
import Footer from '../../parts/Footer';
import {useRouter} from "next/router";
import useProjectApplications from "../../../../hooks/useProjectApplications";
import useProjected from "../../../../hooks/useProjected";
import {Field, Form} from "react-final-form";
import Header from "../../parts/Header";

export interface applicationProps {

}

const ProjectApplicationContainer: React.FC<applicationProps> = (props) => {
    const router = useRouter();

    const {

        handleSave,
        applicationSubmitEvent,
        errorContactorPrice
    } = useProjectApplications();

    const {applicationSubmit} = useProjected();


    return (
        <>
            <CommonMeta/>
            <Header showNotificationBell={true} headerSelectionTab={'/'} showHeaderSelection={false}
                    showRightButton={true}
                    showCenterImg={true}/>
            <h1 className="innerttl border-gray" id="ttl">案件応募<a href="#"><i className="fas fa-angle-left"/></a></h1>
            <Form initialValues={''} onSubmit={handleSave} render={({values, handleSubmit}) => (
                <>
                    <form onSubmit={handleSubmit}>
                        <div id="maincont">
                            <div id="contents" className="main-side">
                                <p className="input-txt">金額</p>

                                <div id="post-input">
                                    <Field name={'contractorPrice'} type={'number'}
                                           render={({input, meta}) =>
                                               <input id="contractorPrice"
                                                      className="login-input135"
                                                      required={true}
                                                      min={1}
                                                      {...input}
                                               />
                                           }/>&nbsp;円
                                </div>
                                {errorContactorPrice && <p style={{
                                    textAlign: 'left',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>金額は必須です。</p>}
                                <div id="price-input">
                                    <label>
                                        <Field name={'immediateReceivingFlag'} type={'checkbox'}
                                               render={({input, meta}) =>
                                                   <input id="immediateReceivingFlag"
                                                          {...input}
                                                   />
                                               }/>即受け可
                                    </label>
                                    <label>
                                        <Field name={'negotiationFlag'} type={'checkbox'}
                                               render={({input, meta}) =>
                                                   <input id="negotiationFlag"
                                                          {...input}
                                                   />
                                               }/>金額交渉したい
                                    </label>
                                    <label>
                                        <Field name={'questionFlag'} type={'checkbox'}
                                               render={({input, meta}) =>
                                                   <input id="questionFlag"
                                                          {...input}
                                                   />
                                               }/>質問したい
                                    </label>
                                </div>

                                <p className="input-txt">自己PR</p>
                                <Field name={'contractorComment'} type={'text'}
                                       render={({input, meta}) =>
                                           <textarea id="contractorComment"
                                                     className="login-textarea"
                                                     cols={50}
                                                     rows={5}
                                                     placeholder="自由記入欄です。"
                                                     {...input}
                                           />
                                       }/>
                                <div id="in9-button">
                                    <a id={'back'} data-cy={'backBottom'} className="back" href={'#'}
                                       onClick={() => router.back()}>
                                        詳細に戻る
                                    </a>
                                    {applicationSubmit &&
                                    <a id={'apply'} className="next" style={{cursor: "pointer"}}
                                       onClick={applicationSubmitEvent}>
                                        申し込む
                                    </a>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="modal js-modal">
                            <div className="modal__bg js-modal-close"/>
                            <div className="modal__content">
                                <div id="popup">
                                    <div id="cont">
                                        <p id="t1">案件応募</p>
                                        <p id="t2">この内容で応募いたします。<br/>よろしければ申し込むボタンを押してください。</p>
                                        <a id="p-back" className="js-modal-close" href="">戻る</a>
                                        <input data-cy={'submit'} style={{
                                            backgroundColor: 'white', borderWidth: 0, cursor: "pointer"
                                        }} type="submit" value={'申し込む'} name="" id="p-send"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </>)}
            />
            <Footer/>
        </>
    )
}

export default ProjectApplicationContainer;