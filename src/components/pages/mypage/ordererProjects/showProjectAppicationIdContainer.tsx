import React, {useEffect} from "react";
import CommonMeta from "../../../CommonMeta";
import Footer from "../../parts/Footer";
import useOrdererProjects from "../../../../hooks/useOrdererProjects";
import moment from "moment";
import {PROJECT_APPLICATION_STATUS} from '../../../../const/constants'
import {ApiOrdererProjectApplication} from '../../../../openapi'
import FirebaseImage from "../../parts/FirebaseImage";

const ShowProjectAppicationIdContainer = () => {
    const {
        handleShowProjectApplicationId,
        handleGotoPreviousPage,
        handleCancel,
        handleCancelPrice,
        handleGoToThreadPage,
        handleChangePrice,
        handleCancelDialog1,
        handleCancelDialog2,
        handleCancelDialog3,
        handleBackDialog1,
        projectApplicationIdList,
        currentDate,
        deleteHashTags,
        changeOrdererPrice,
        inputPrice
    } = useOrdererProjects();
    useEffect(handleShowProjectApplicationId, [])

    const displayPriceText = (data: ApiOrdererProjectApplication, text: string) => {

        if (data.projectApplicationStatus === PROJECT_APPLICATION_STATUS.PROPOSING_CONTRACTOR) {

            if (text === 'number') {
                return (<input type="text" id={'inputForm'} onChange={(e) => {
                    changeOrdererPrice(e)
                }}
                               value={inputPrice ? (inputPrice) : inputPrice === '' ? inputPrice : data.contractor?.projectApplication.contractorPrice!.toLocaleString()}/>)
            } else {
                return "※受注者が提案中です。金額を変更してください。"
            }
        }
        if (data.projectApplicationStatus === PROJECT_APPLICATION_STATUS.PROPOSING_ORDERER) {
            if (text === 'number') {
                return data.contractor?.projectApplication.ordererPrice!.toLocaleString()
            } else {
                return "※受注者に金額を提案中です。受注者の確認をお待ちください。"
            }
        }
        if (data.projectApplicationStatus === PROJECT_APPLICATION_STATUS.RESTRICTED) {
            if (text === 'number') {
                return data.contractor?.projectApplication.definitePrice!.toLocaleString()
            } else {
                return "※案件が成約されました。"
            }
        }
        if (data.projectApplicationStatus === PROJECT_APPLICATION_STATUS.CANCELLED) {
            if (text === 'number') {
                return data.contractor?.projectApplication.cancelPrice!.toLocaleString()
            } else {
                return "※案件がキャンセルされました。"
            }
        }
    }


    return (
        <>
            <CommonMeta/>
            <div id="dheader">
                <div id="back-green"><a onClick={handleGotoPreviousPage} style={{cursor: "pointer"}}><i
                    className="fas fa-angle-left"/></a></div>
            </div>
            {projectApplicationIdList?.map((data, index) => {
                return (
                    <div id="maincont" key={index}>
                        <div className="detail-box bottom20">

                            <div className={'css-grid'}>
                                <div className={'left'}>
                                    <p className="time">募集期間:{moment(data.recruitingStartDate).format('MM/DD')}〜{moment(data.recruitingEndDate).format('MM/DD')}</p>
                                    <p className="title">{data.projectName}</p>

                                    <p className="b21-box"><span>希望金額</span>
                                        {displayPriceText(data, 'number')}
                                        円
                                    </p>
                                    <p className="b21-box"><span>コメント</span>
                                        {data.contractor?.projectApplication.contractorComment ? <>{data.contractor?.projectApplication.contractorComment}</> :
                                            <>&nbsp;</>}
                                    </p>
                                </div>

                                <div className={'right'}>
                                    <ul className="category">
                                        {data.contractor?.projectApplication.immediateReceivingFlag ?
                                            <li><i className="fas fa-tag"/> 即受け可</li> : null}
                                        {data.contractor?.projectApplication.negotiationFlag ?
                                            <li><i className="fas fa-tag"/> 金額交渉したい</li> : null}
                                        {data.contractor?.projectApplication.questionFlag ?
                                            <li><i className="fas fa-tag"/> 金額交渉したい</li> : null}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <h2 className="subttl">応募者プロフィール</h2>
                        <div className="block bprofile">
                            <div className="img">
                                <FirebaseImage src={data.contractor?.contractor.userPublicImageUrl} alt={'icon'}
                                               width={270} height={270}/>
                            </div>
                            <table className="dtable dtable-right" width="100%" cellSpacing="0">
                                <tr>
                                    <th><img src="/assets/image/search-icon3.jpg"/>お名前</th>
                                    <td>{data.contractor?.contractor.name}</td>
                                </tr>
                                <tr>
                                    <th><img src="/assets/image/search-icon2.jpg"/>ジャンル</th>
                                    <td>
                                        {data.project?.genreNames?.map((data, index) => {
                                            return (<>{index === 0 ? '' : ','} {data}</>)
                                        })}
                                    </td>
                                </tr>
                                <tr>
                                    <th><img src="/assets/image/search-icon6.jpg"/>場所</th>
                                    <td>{data.contractor?.contractor.areaName}</td>
                                </tr>
                                <tr>
                                    <th><img src="/assets/image/search-icon7.jpg"/>経験年数</th>
                                    <td>{data.contractor?.contractor.experienceYears}年</td>
                                </tr>
                            </table>
                        </div>

                        <h2 className="subttl">自己紹介</h2>
                        {
                            data.contractor?.contractor.selfIntroduction!.split('\n')
                                .map(str =>
                                    <p className="txtarea bottom0">{str}</p>)
                        }

                        {
                            data.projectApplicationStatus === PROJECT_APPLICATION_STATUS.RESTRICTED ?
                                ((data.projectApplicationStatus === PROJECT_APPLICATION_STATUS.RESTRICTED && moment(data.workEndDate).format('MM/DD/yyyy') > moment(currentDate).format('MM/DD/yyyy')) ?
                                    <div className="code">
                                        <div id="codeentry">
                                            <p>発行コード</p>
                                            <span>
                                                {data!.contractor?.projectApplication?.confirmationCode![0] ?
                                                    <input type="input"
                                                           value={data!.contractor?.projectApplication?.confirmationCode![0]}/> : null}

                                            </span>
                                            <span>
                                                 {data!.contractor?.projectApplication?.confirmationCode![1] ?
                                                     <input type="input"
                                                            value={data!.contractor?.projectApplication?.confirmationCode![1]}/> : null}
                                            </span>
                                            <span>
                                               {data!.contractor?.projectApplication?.confirmationCode![2] ?
                                                   <input type="input"
                                                          value={data!.contractor?.projectApplication?.confirmationCode![2]}/> : null}
                                            </span>
                                            <span>
                                               {data!.contractor?.projectApplication?.confirmationCode![3] ?
                                                   <input type="input"
                                                          value={data!.contractor?.projectApplication?.confirmationCode![3]}/> : null}
                                            </span>
                                        </div>
                                    </div>
                                    : '')
                                :
                                data.projectApplicationStatus >= PROJECT_APPLICATION_STATUS.WORK_COMPLETED ? '' : ''
                        }

                        <div className={'code'}>
                            <p id="attn">{displayPriceText(data, 'text')}</p>
                        </div>

                        <div id="in21-button">
                            <span id="b1"><input style={{cursor: "pointer"}} type="submit" value="会 話" onClick={() => {
                                handleGoToThreadPage(data.contractor?.projectApplication.id)
                            }}/></span>
                            {data.projectApplicationStatus !== PROJECT_APPLICATION_STATUS.PROPOSING_ORDERER
                            && data.projectApplicationStatus !== PROJECT_APPLICATION_STATUS.RESTRICTED && data.projectApplicationStatus !== PROJECT_APPLICATION_STATUS.CANCELLED ?
                                <>
                                    <span id="b2"><input style={{cursor: "pointer"}} type="submit" value="金額変更"
                                                         onClick={() => {
                                                             handleChangePrice(data.projectApplicationStatus, Number(data.contractor?.projectApplication.id), data.ordererPrice)
                                                         }}/>
                                    </span>
                                </>
                                : ''}

                        </div>
                        {data.projectApplicationStatus !== PROJECT_APPLICATION_STATUS.WORK_COMPLETED && data.projectApplicationStatus !== PROJECT_APPLICATION_STATUS.CANCELLED ?
                            <p className="cancel"><a className="js-modal-open1" style={{cursor: "pointer"}}
                                                     onClick={handleCancelDialog1}>キャンセルする</a></p> : ''}

                        <div className="modal js-modal1">
                            <div className="modal__bg js-modal-close1"/>
                            <div className="modal__content">
                                <div id="popup">
                                    <div id="cont">
                                        <p id="t1">キャンセルする</p>
                                        <p id="t2" className="nobdr">キャンセルいたします。
                                            <br/>下記のボタンから選択してください。</p>
                                        <a className="ft js-modal-open2" onClick={handleCancelDialog2}
                                           style={{cursor: "pointer"}}>金額設定をせずキャンセル</a>
                                        <a className="ft js-modal-open3" onClick={handleCancelDialog3}
                                           style={{cursor: "pointer"}}>金額設定を入力してキャンセル</a>
                                        <a href="" className="lt js-modal-close1">キャンセルを取り消す</a>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="modal js-modal2">
                            <div className="modal__bg js-modal-close2"/>
                            <div className="modal__content">
                                <div id="popup">
                                    <div id="cont">
                                        <p id="t1">金額設定をせずキャンセル</p>
                                        <p id="t2">金額設定をせずキャンセルします。<br/>よろしければ確定ボタンを押してください。</p>
                                        <a id="p-back" className="js-modal-close2" onClick={handleBackDialog1}
                                           style={{cursor: "pointer"}}>戻る</a>
                                        <a id="p-send" style={{cursor: "pointer"}} onClick={() => {
                                            handleCancel(Number(data.contractor?.projectApplication.id), data.ordererPrice);
                                        }}>確定する</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal js-modal3">
                            <div className="modal__bg js-modal-close3"/>
                            <div className="modal__content">
                                <div id="popup">
                                    <div id="cont">
                                        <p id="t1">金額設定を入力してキャンセル</p>
                                        <div id="t3"><input type="text" id={'myInput'}/> <span>円</span></div>
                                        <a id="p-back" className="js-modal-close3" onClick={handleBackDialog1}
                                           style={{cursor: "pointer"}}>戻る</a>
                                        <a id="p-send" style={{cursor: "pointer"}} onClick={() => {
                                            handleCancelPrice(Number(data.contractor?.projectApplication.id), data.ordererPrice);
                                        }}>確定する</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

            <Footer/>

        </>
    )
}

export default ShowProjectAppicationIdContainer;