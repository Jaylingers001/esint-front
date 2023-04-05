import React, {useEffect} from "react";
import CommonMeta from "../../../CommonMeta";
import Footer from "../../parts/Footer";
import useOrdererProjects from "../../../../hooks/useOrdererProjects";
import moment from "moment";
import {PROJECT_APPLICATION_STATUS, PROJECT_STATUS} from "../../../../const/constants";

const ShowOrdererProjectsContainer = () => {
    const {
        handleShowOrdererProjects,
        handleGotoPreviousPage,
        handleDelete,
        handleGoToProjectIdPage,
        ordererProjectList
    } = useOrdererProjects();

    useEffect(handleShowOrdererProjects, [])

    return (
        <>
            <CommonMeta/>
            <div className="mypage-box">
                <h1 className="innerttl">発注者案件管理</h1>
                <div id="back-white"><a href={'#'} onClick={handleGotoPreviousPage}><i
                    className="fas fa-angle-left"/></a></div>
            </div>

            <div id="maincont" className="gray">
                <div className="detail-box detail-ro">
                    {ordererProjectList?.map((data, index) => {
                        return (
                            <div className="contents-bx" key={index}>
                                <a style={{cursor: "pointer"}} onClick={() => {
                                    handleGoToProjectIdPage(data.projectId)
                                }}>
                                    {data.status === PROJECT_STATUS.PRIVATE ?
                                        <p className="announce an01">非公開</p>
                                        :
                                        data.status === PROJECT_STATUS.LOOKING ?
                                            <p className="announce an01">募集中</p>
                                            :
                                            data.status === PROJECT_STATUS.RECRUITMENT_COMPLETED ?
                                                <p className="announce an01">募集完了</p>
                                                :
                                                data.status === PROJECT_STATUS.AT_WORK ?
                                                    <p className="announce an02">仕事中</p>
                                                    :
                                                    data.status === PROJECT_STATUS.WORK_COMPLETED ?
                                                        <p className="announce an02">仕事完了</p>
                                                        :
                                                        data.status === PROJECT_STATUS.CANCELLED ?
                                                            <p className="announce an02">キャンセル済み</p>
                                                            :
                                                            data.status === PROJECT_STATUS.DELETED ?
                                                                <p className="announce an02">削除</p>
                                                                : ''}

                                    {data.contractors?.map((data) => (
                                        data.projectApplication.unreadFlag ?
                                            <>
                                                <p className="desc">
                                                    <img src="/assets/image/bkr.png" width="20" height="auto"/>
                                                    <span>新しく申し込みがありました。</span>
                                                </p>
                                            </>
                                            :
                                            <></>
                                    ))}

                                    <p className="t1">募集期間:{moment(data.recruitingStartDate).format('MM/DD')}〜{moment(data.recruitingEndDate).format('MM/DD')}</p>
                                    <p className="t2">{data.projectName}</p>
                                    <ul className="ht">
                                        <li><span>現場の日</span>
                                            <p>
                                                {moment(data.workStartDate).format('M')}月{moment(data.workStartDate).format('D')}日
                                            </p>
                                        </li>

                                        <li><span>拘束時間</span>
                                            <p>
                                                {moment(data.restraintStartDate).format('M')}月{moment(data.restraintStartDate).format('D')}日 &nbsp;
                                                {Number(moment(data.restraintStartDate).format('HH')) + ':' + moment(data.restraintStartDate).format('mm')}
                                                &nbsp;〜&nbsp;
                                                {moment(data.restraintEndDate).format('M')}月{moment(data.restraintEndDate).format('D')}日 &nbsp;
                                                {Number(moment(data.restraintEndDate).format('HH')) + ':' + moment(data.restraintEndDate).format('mm')}
                                            </p>
                                        </li>

                                        <li><span>募集人数</span><p>{data.remainingStock}人</p></li>

                                        <li><span>場所</span><p>{data.areaName}</p></li>

                                        <li><span>金額</span>
                                            <p>{data.minPrice?.toLocaleString()}円〜{data.maxPrice?.toLocaleString()}円</p>
                                        </li>

                                        <li><span>ジャンル</span><p>
                                            {data.genreNames?.map((data, index) => {
                                                return (<>{index === 0 ? '' : ','} {data}</>)
                                            })}

                                        </p></li>
                                    </ul>
                                </a>
                                {data.status <= PROJECT_APPLICATION_STATUS.RESTRICTED ?
                                    <p className="delete"><a style={{cursor: "pointer"}} onClick={() => {
                                        handleDelete(data.projectId)
                                    }}>この案件を削除</a></p> : null}
                            </div>
                        )
                    })}
                </div>
            </div>

            <Footer/>
        </>
    )
}

export default ShowOrdererProjectsContainer;