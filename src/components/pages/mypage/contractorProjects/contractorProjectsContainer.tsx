import React from "react";
import CommonMeta from "../../../CommonMeta";
import Footer from "../../parts/Footer"
import moment from "moment";
import useContractor from "../../../../hooks/useContractorProject";
import {PROJECT_APPLICATION_STATUS} from "../../../../const/constants";
import Image from 'next/image'
import FirebaseImage from "../../parts/FirebaseImage";

export interface ContractorProjectProps {

}

const ContractorProjectContainer: React.FC<ContractorProjectProps> = (props) => {
    const {projects, recruitingDays, formatDate, projectStatus, router} = useContractor();

    return (
        <>
            <CommonMeta/>
            <div className="mypage-box">
                <h1 className="innerttl">受注者案件管理</h1>
                <div id="back-white">
                    <a onClick={() => router.back()} href="#">
                        <i className="fas fa-angle-left"/>
                    </a>
                </div>
            </div>

            <div id="maincont" className="gray">
                <div className="detail-box detail-ro">
                    {projects?.map((data, index) => {
                        return (
                            <>
                                {data.status !== 5 ? <div className="contents-bx">
                                    <a href={'/mypage/contractorProjects/show/' + data.projectApplicationId}>
                                        <p className="announce an01">{projectStatus(data.status)}</p>
                                        <p className="desc">
                                            {data.status === PROJECT_APPLICATION_STATUS.RESTRICTED &&
                                            <>
                                                <Image src={"/assets/image/bkr.png"} width="20" height="20"/>
                                                <span>おめでとうございます！案件が成約されました！</span>
                                            </>
                                            }
                                        </p>
                                        <p className="t1">募集期間:
                                            {moment(data.recruitingStartDate).format('MM/DD')}〜{moment(data.recruitingEndDate).format('MM/DD')}
                                        </p>
                                        <p className="t2">{data.projectName}</p>
                                        <div className="dt">
                                            <span>掲載期間</span>
                                            <p>
                                                残り{recruitingDays(data.recruitingStartDate, data.recruitingEndDate)}日
                                            </p>
                                            <span>募集人数</span>
                                            <p>残り{data.remainingStock}枠</p>
                                        </div>
                                        <div className="block bprofile">
                                            <div className="img">
                                                <FirebaseImage src={data.orderPublicImageUrl} alt={'icon'}
                                                               width={270} height={270}/>
                                                <p>{data.ordererName}</p></div>
                                            <table className="dtable dtable-right" width="100%" cellSpacing="0">
                                                <tbody>
                                                <tr>
                                                    <th><img src={"/assets/image/search-icon4.jpg"}/>現場の日</th>
                                                    <td>{moment(data.workStartDate).format('M')}月{moment(data.workStartDate).format('D')}日</td>
                                                </tr>
                                                <tr>
                                                    <th><img src={"/assets/image/search-icon5.jpg"}/>拘束時間</th>
                                                    <td>
                                                        {moment(data.restraintStartDate).format('M')}月{moment(data.restraintStartDate).format('D')}日 &nbsp;
                                                        {Number(moment(data.restraintStartDate).format('HH')) + ':' + moment(data.restraintStartDate).format('mm')}
                                                        &nbsp;〜&nbsp;
                                                        {moment(data.restraintEndDate).format('M')}月{moment(data.restraintEndDate).format('D')}日 &nbsp;
                                                        {Number(moment(data.restraintEndDate).format('HH')) + ':' + moment(data.restraintEndDate).format('mm')}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th><img src={"/assets/image/search-icon6.jpg"}/>場所</th>
                                                    <td>{data.areaName}</td>
                                                </tr>
                                                <tr>
                                                    <th><img src={"/assets/image/search-icon7.jpg"}/>金額</th>
                                                    <td>{data.displayPrice?.toLocaleString()}円</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </a>
                                </div> : null}
                            </>
                        )
                    })}
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default ContractorProjectContainer;