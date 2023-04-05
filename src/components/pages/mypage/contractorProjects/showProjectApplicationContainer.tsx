import React from "react";
import CommonMeta from "../../../CommonMeta";
import Footer from "../../parts/Footer"
import {useRouter} from "next/router";
import moment from "moment";
import useContractor from '../../../../hooks/useContractorProject'
import {PROJECT_APPLICATION_STATUS} from "../../../../const/constants";
import {Field, Form} from "react-final-form";
import TextFields from "../../../util/TextField"

export interface ShowProjectApplicationProps {

}

const ShowProjectApplicationContainer: React.FC<ShowProjectApplicationProps> = (props) => {
    const router = useRouter()
    const {id} = router.query;
    const {
        contractorProjectApplications,
        hashtags,
        complete,
        favorite,
        addToFavorite,
        comment,
        formatDate,
        checkDestiny,
        changeWord,
        formatDateRestraint,
        isContractor,
        setIsContractor,
        upLoadFileNumber,
        showDownload,
        downloadFile,
        kbToMb
    } = useContractor()

    const showTitle = () => {
        let displayTitle = false;
        upLoadFileNumber.map((data) => {
            if (data.noData === 'true') {
                displayTitle = true
            }
        })
        if (displayTitle) {
            return <h2 className="subttl">添付ファイル</h2>
        }
    }

    return <>
        <CommonMeta/>
        <Form initialValues={''} onSubmit={complete} render={({values, handleSubmit, form}) => <>
            <div id="dheader">
                <div id="back-green"><a href="#" onClick={() => router.back()}><i
                    className="fas fa-angle-left"/></a>
                </div>
            </div>

            <div id="maincont">
                <div className="detail-box">
                    <p className="time">募集期間:{moment(contractorProjectApplications?.project?.recruitingStartDate).format('MM/DD')}〜{moment(contractorProjectApplications?.project?.recruitingEndDate).format('MM/DD')}</p>
                    <p className="title">{contractorProjectApplications?.project?.name}</p>

                    <div className={'css-grid'}>
                        <div className={'left'}>
                            <a href={'/profile/show/' + contractorProjectApplications?.ordererId}
                               className="profilebtn">プロフィールを見る<i
                                className="fas fa-chevron-circle-right"/> </a>
                        </div>

                        <div className={'right'}>
                            <ul className="category" style={{float: 'right'}}>
                                {contractorProjectApplications?.projectApplication?.immediateReceivingFlag ?
                                    <li><i className="fas fa-tag"/> 即受け可</li> : null}
                                {contractorProjectApplications?.projectApplication?.negotiationFlag ?
                                    <li><i className="fas fa-tag"/> 金額交渉したい</li> : null}
                                {contractorProjectApplications?.projectApplication?.questionFlag ?
                                    <li><i className="fas fa-tag"/> 金額交渉したい</li> : null}
                            </ul>
                        </div>
                    </div>

                    <table className="dtable" width="100%" cellSpacing="0">
                        <tbody>
                        <tr>
                            <th><img src="/assets/image/search-icon2.jpg"/>ジャンル</th>
                            <td>{contractorProjectApplications?.genreNames}</td>
                        </tr>
                        <tr>
                            <th><img src="/assets/image/search-icon3.jpg"/>募集人数</th>
                            <td>{contractorProjectApplications?.projectStock}人</td>
                        </tr>
                        <tr>
                            <th><img src="/assets/image/search-icon4.jpg"/>現場の日</th>
                            <td>{formatDate(contractorProjectApplications?.project?.workStartDate!)}</td>
                        </tr>
                        <tr>
                            <th><img src="/assets/image/search-icon5.jpg"/>拘束時間</th>
                            <td>{formatDateRestraint(contractorProjectApplications?.project?.restraintStartDate)}〜{formatDateRestraint(contractorProjectApplications?.project?.restraintEndDate)}</td>
                        </tr>
                        <tr>
                            <th><img src="/assets/image/search-icon6.jpg"/>場所</th>
                            <td>{contractorProjectApplications?.areaName} {contractorProjectApplications?.project?.address1} {contractorProjectApplications?.project?.address2}</td>
                        </tr>
                        <tr>
                            <th><img src="/assets/image/search-icon7.jpg"/>金額</th>
                            <td>
                                {contractorProjectApplications?.displayPrice?.toLocaleString()}円
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <ul className="category">
                        {hashtags.map((item, count) => {
                            return <>{item ? <>
                                <li><i className="fas fa-tag"/>{item} </li>
                            </> : null}</>
                        })}
                    </ul>
                </div>

                <h2 className="subttl">コメント</h2>
                <p className="txtarea whiteSpace">{comment}</p>

                {contractorProjectApplications?.projectApplication?.status === PROJECT_APPLICATION_STATUS.RESTRICTED || contractorProjectApplications?.projectApplication?.status === PROJECT_APPLICATION_STATUS.WORK_COMPLETED ?
                    <>
                        {showTitle()}
                        {upLoadFileNumber.map((data) => {
                            return (
                                <>
                                    {showDownload && data.noData === 'true' ?
                                        <div className="fileicon"
                                             style={{marginBottom: '15px'}}>
                                            <a target="_blank" style={{cursor: "pointer"}} onClick={() => {
                                                downloadFile(true, data.htmlFile, data.name, data.id)
                                            }}>
                                                <img src="/assets/image/fileicon.png" width="40" height="100"/>
                                                <p>{data.name}<span>{kbToMb(data.fileSize)}</span></p>
                                            </a>
                                        </div> : ''}
                                </>
                            )
                        })}
                    </> : ''}

                {contractorProjectApplications?.projectApplication?.status === PROJECT_APPLICATION_STATUS.WORK_COMPLETED &&
                <>
                    <div className="code">
                        <p id="attn">
                            ※この仕事は完了しました。
                        </p>
                    </div>
                </>
                }
                <form onSubmit={handleSubmit}>
                    {contractorProjectApplications?.projectApplication?.status === PROJECT_APPLICATION_STATUS.CANCELLED &&
                    <div className="code">
                        <p id="attn">
                            ※この応募はキヤンセルされました。
                        </p>
                    </div>
                    }
                    {
                        contractorProjectApplications?.projectApplication?.status !== PROJECT_APPLICATION_STATUS.CANCELLED &&
                        <>
                            {/*<h2 className="subttl">添付ファイル</h2>*/}
                            {/*<div className="fileicon">*/}
                            {/*    <a href="">*/}
                            {/*        <img src="/assets/image/fileicon.png" width="40" height="100"/>*/}
                            {/*        <p>dneijfiwjfdpwkpd.pdf*/}
                            {/*            <span>105kb -Download</span>*/}
                            {/*        </p>*/}
                            {/*    </a>*/}
                            {/*</div>*/}
                            {/*<div className="fileicon">*/}
                            {/*    <a href="">*/}
                            {/*        <img src="/assets/image/fileicon.png" width="40" height="100"/>*/}
                            {/*        <p>dneijfiwjfdpwkpd.pdf*/}
                            {/*            <span>105kb -Download</span>*/}
                            {/*        </p>*/}
                            {/*    </a>*/}
                            {/*</div>*/}
                            <div className="code code-bottom" style={{margin: '0px 5% 0px'}}>
                                {checkDestiny(contractorProjectApplications!) &&
                                <>
                                    <div id="codeentry"><p>発行コード</p>
                                        <span>
                                            <Field name="input1" type={'input'}
                                                   render={
                                                       ({input, meta}) =>
                                                           <TextFields
                                                               input={input}
                                                               meta={meta}
                                                               placeholder={''}
                                                               required={true}
                                                               maxLength={1}
                                                           />
                                                   }>
                                            </Field>
                                        </span>
                                        <span>
                                           <Field name="input2" type={'input'}
                                                  render={
                                                      ({input, meta}) =>
                                                          <TextFields
                                                              input={input}
                                                              meta={meta}
                                                              placeholder={''}
                                                              required={true}
                                                              maxLength={1}
                                                          />
                                                  }>
                                            </Field>
                                        </span>
                                        <span>
                                           <Field name="input3" type={'input'}
                                                  render={
                                                      ({input, meta}) =>
                                                          <TextFields
                                                              input={input}
                                                              meta={meta}
                                                              placeholder={''}
                                                              maxLength={1}
                                                              required={true}
                                                          />
                                                  }>
                                            </Field>
                                        </span>
                                        <span>
                                           <Field name="input4" type={'input'}
                                                  render={
                                                      ({input, meta}) =>
                                                          <TextFields
                                                              input={input}
                                                              meta={meta}
                                                              placeholder={''}
                                                              maxLength={1}
                                                              required={true}
                                                          />
                                                  }>
                                            </Field>
                                        </span>
                                    </div>
                                    <p id="attn">※当日、発注者が発行したコードを入力し完了してください。</p>

                                </>
                                }

                                {contractorProjectApplications?.projectApplication?.status === PROJECT_APPLICATION_STATUS.PROPOSING_ORDERER &&
                                <>
                                    <p id="attn">※発注者が金額を提案中です。新しい金額を提案する場合は提案ボタンをクリックしてください。</p>
                                    <p className="input-txt">金額</p>
                                    <div id="post-input">
                                        <span>
                                           <Field name="contractorPrice" type={'input'}
                                                  render={
                                                      ({input, meta}) =>
                                                          <TextFields
                                                              input={input}
                                                              meta={meta}
                                                              placeholder={''}
                                                              maxLength={999}
                                                              required={isContractor}
                                                              className={'login-input135'}
                                                          />
                                                  }>
                                            </Field>
                                            円
                                                <input data-cy={'submit'} type="submit" name="" id="co-btn2" value="提案"
                                                       onClick={() => {
                                                           form.change('indicator', 'contractorPrice');
                                                       }}
                                                />
                                        </span>
                                    </div>
                                </>
                                }
                            </div>
                        </>}
                    <div id="in8-button">
                <span id="b1">
                    <a href={'/mypage/threads/show/' + contractorProjectApplications?.projectApplication?.id}>
                        <input type="button" value="会 話"/>
                    </a>
                </span>
                        {
                            contractorProjectApplications?.projectApplication?.status !== PROJECT_APPLICATION_STATUS.CANCELLED &&
                            <>
                                {checkDestiny(contractorProjectApplications!) &&
                                <span id="b2">
                                        <input type="submit" value={changeWord(contractorProjectApplications!)}
                                               onClick={() => {
                                                   form.change("indicator", 'confirmCode');
                                               }}
                                        />
                                    </span>

                                }
                                {contractorProjectApplications?.projectApplication?.status === PROJECT_APPLICATION_STATUS.PROPOSING_ORDERER &&
                                <>
                                        <span id="b2">
                                                <input type="submit" value='成約'
                                                       onClick={() => {
                                                           setIsContractor(false)
                                                           form.change("indicator", 'submitApi');
                                                       }}
                                                />
                                        </span>
                                </>
                                }
                                <span id="b3" className={favorite?.activeHeart ? 'button one' : 'button'}
                                      onClick={() => addToFavorite(favorite!)}>
                                    <i className="fas fa-heart"/></span>
                            </>
                        }
                    </div>
                </form>
            </div>
        </>
        }/>
        <Footer/>
    </>
}

export default ShowProjectApplicationContainer;