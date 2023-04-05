import React, {useEffect} from "react";
import CommonMeta from "../../../CommonMeta";
import Footer from "../../parts/Footer";
import useOrdererProjects from "../../../../hooks/useOrdererProjects";
import moment from "moment";
import {ApiProjectApplication, ApiUser, ApiContractor} from "../../../../openapi";
import FirebaseImage from "../../parts/FirebaseImage";
import {PROJECT_APPLICATION_STATUS} from "../../../../const/constants";

const ShowProjectIdContainer = () => {
    const {
        handleShowProjectId,
        handleGotoPreviousPage,
        handleGoToProjectApplicationId,
        handleGoToEditProjectIdPage,
        filterHashTags,
        handleShowEdit,
        downloadFile,
        kbToMb,
        comment,
        hashtags,
        projectIdList,
        upLoadFileNumber,
        showDownload,
    } = useOrdererProjects();

    useEffect(handleShowProjectId, [])
    useEffect(handleShowEdit, [])
    useEffect(filterHashTags, [projectIdList])

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

    const showTitleApplicants = (data: { projectId: number; recruitingStartDate: string; recruitingEndDate: string; projectName: string; remainingStock: number; status: number; orderImageUrl: string; ordererName: string; workStartDate: string; restraintStartDate: string; restraintEndDate: string; areaName: string; minPrice?: number; maxPrice?: number; description: string; genreNames?: Array<string>; contractors?: Array<ApiContractor> }) => {
        let displayTitle = false;
        data?.contractors?.map((data) => {
            if (data.projectApplication.status !== 5) {
                displayTitle = true
            }
        })
        if (displayTitle) {
            return <h2 className="subttl" style={{marginTop: '13px'}}>応募者一覧</h2>
        }
    }

    return (
        <>
            <CommonMeta/>
            {projectIdList?.map((data: {
                projectId: number;
                recruitingStartDate: string;
                recruitingEndDate: string;
                projectName: string;
                remainingStock: number;
                status: number;
                orderImageUrl: string;
                ordererName: string;
                workStartDate: string;
                restraintStartDate: string;
                restraintEndDate: string;
                areaName: string;
                minPrice?: number;
                maxPrice?: number;
                description: string;
                genreNames?: Array<string>;
                contractors?: Array<ApiContractor>;
            }) => {
                return (
                    <>
                        <div className="mypage-box">
                            <h1 className="innerttl">発注者案件管理</h1>

                            <div id="back-white"><a onClick={handleGotoPreviousPage} style={{cursor: "pointer"}}><i
                                className="fas fa-angle-left"/></a></div>

                            <button style={{
                                cursor: "pointer", position: 'absolute',
                                top: '18px',
                                right: '15px',
                                color: '#2cab7c',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                padding: '6px 15.5px',
                                border: 0
                            }} id="edit" onClick={() => {
                                handleGoToEditProjectIdPage(data.projectId)
                            }}>編集
                            </button>
                        </div>
                        <div id="maincont">
                            <div className="detail-box">
                                <p className="time">募集期間:{moment(data.recruitingStartDate).format('MM/DD')}〜{moment(data.recruitingEndDate).format('MM/DD')}</p>
                                <p className="title">{data.projectName}</p>

                                <table className="dtable" width="100%" cellSpacing="0">
                                    <tr>
                                        <th><img src="/assets/image/search-icon2.jpg"/>ジャンル</th>
                                        <td>{data.genreNames?.map((data, index) => {
                                            return (<>{index === 0 ? '' : ','} {data}</>)
                                        })}</td>
                                    </tr>
                                    <tr>
                                        <th><img src="/assets/image/search-icon3.jpg"/>募集人数</th>
                                        <td>{data.remainingStock}人</td>
                                    </tr>
                                    <tr>
                                        <th><img src="/assets/image/search-icon4.jpg"/>現場の日</th>
                                        <td>{moment(data.workStartDate).format('M')}月{moment(data.workStartDate).format('D')}日</td>
                                    </tr>
                                    <tr>
                                        <th><img src="/assets/image/search-icon5.jpg"/>拘束時間</th>
                                        <td>{moment(data.restraintStartDate).format('M')}月{moment(data.restraintStartDate).format('D')}日 &nbsp;
                                            {Number(moment(data.restraintStartDate).format('HH')) + ':' + moment(data.restraintStartDate).format('mm')}
                                            &nbsp;〜&nbsp;
                                            {moment(data.restraintEndDate).format('M')}月{moment(data.restraintEndDate).format('D')}日 &nbsp;
                                            {Number(moment(data.restraintEndDate).format('HH')) + ':' + moment(data.restraintEndDate).format('mm')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th><img src="/assets/image/search-icon6.jpg"/>場所</th>
                                        <td>{data.areaName}</td>
                                    </tr>
                                    <tr>
                                        <th><img src="/assets/image/search-icon7.jpg"/>金額</th>
                                        <td>{data.minPrice?.toLocaleString()}~{data.maxPrice?.toLocaleString()}円</td>
                                    </tr>
                                </table>

                                <ul className="category">
                                    {hashtags.map((item, count) => {
                                        return <li key={count}><i className="fas fa-tag"/>{item}</li>
                                    })}
                                </ul>
                            </div>

                            <h2 className="subttl">コメント</h2>
                            <p className="txtarea">{comment}</p>
                            {showTitle()}
                            {upLoadFileNumber.map((data) => {
                                return (
                                    <>
                                        {showDownload && data.noData === 'true' ?
                                            <p className="txtarea" style={{paddingBottom: '0px'}}>
                                                <div className="fileicon"
                                                     style={{paddingLeft: '0px', marginTop: '0px'}}>
                                                    <a target="_blank" style={{cursor: "pointer"}} onClick={() => {
                                                        downloadFile(true, data.htmlFile, data.name, data.id)
                                                    }}><img src="/assets/image/fileicon.png" width="40" height="100"/>
                                                        <p>{data.name}<span>{kbToMb(data.fileSize)}</span></p>
                                                    </a>
                                                </div>
                                            </p> : null}</>
                                )
                            })}

                            {showTitleApplicants(data)}
                            {data?.contractors?.map((data: {
                                contractor: ApiUser;
                                projectApplication: ApiProjectApplication;
                            }) => {
                                return (
                                    <>
                                        {data.projectApplication.status !== 5 ? <div className="application">
                                            <div className="icon">
                                                <FirebaseImage src={data.contractor?.userPublicImageUrl} alt={'icon'}
                                                               width={270} height={270}/>
                                            </div>
                                            <div className="cont">
                                                <div className="situation">
                                                    {data.projectApplication.status === PROJECT_APPLICATION_STATUS.PROPOSING_CONTRACTOR ?
                                                        <p className="s2 sit">応募中</p>
                                                        : data.projectApplication.status === PROJECT_APPLICATION_STATUS.PROPOSING_ORDERER ?
                                                            <p className="s2 sit">提案中</p>
                                                            : data.projectApplication.status === PROJECT_APPLICATION_STATUS.RESTRICTED ?
                                                                <p className="s1 sit">成約済</p>
                                                                : data.projectApplication.status === PROJECT_APPLICATION_STATUS.WORK_COMPLETED ?
                                                                    <p className="s1 sit">仕事完了</p>
                                                                    : data.projectApplication.status === PROJECT_APPLICATION_STATUS.CANCELLED ?
                                                                        <p className="s2 sit">取消</p>
                                                                        : data.projectApplication.status === PROJECT_APPLICATION_STATUS.END ?
                                                                            <p className="s1 sit">終了</p> : null}
                                                    <p className="name">{data.contractor.name}</p></div>
                                                <p className="dtxt">ジャンル:
                                                    {data.contractor?.userGenres?.data?.map((data: { name: string }, index) => {
                                                        return (<>{index === 0 ? '' : ','} {data.name}</>)
                                                    })} / 経験年数: {data.contractor?.experienceYears}年</p>
                                                <a style={{cursor: "pointer"}} onClick={() => {
                                                    handleGoToProjectApplicationId(data.projectApplication.id)
                                                }}>情報を見る<i
                                                    className="fas fa-chevron-circle-right"/></a></div>
                                        </div> : null}
                                    </>
                                )
                            })}
                        </div>
                    </>
                )
            })}
            <Footer/>
        </>
    )
}

export default ShowProjectIdContainer;