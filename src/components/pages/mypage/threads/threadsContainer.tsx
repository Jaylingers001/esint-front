import React from "react";
import CommonMeta from "../../../CommonMeta";
import Footer from "../../parts/Footer";
import Link from "next/link";
import moment from "moment";
import Header from "../../parts/Header";
import useThreads from "../../../../hooks/useThreads";

export interface ThreadProps {

}

const ThreadsContainer: React.FC<ThreadProps> = (props) => {

    const {threads} = useThreads()

    return (
        <>
            <CommonMeta/>
            <Header showNotificationBell={true} showRightButton={true} showCenterImg={true}/>
            <h1 className="innerttl" id="ttl">スレッド一覧</h1>
            <div id="maincont">
                <main role="main" id="main" className="tb15">
                    {threads?.map((data, index) => {
                        return (
                            <Link href={"/mypage/threads/show/" + data.projectApplicationId}>
                                <a className="thread-a" data-cy={'link-' + index}>
                                    <div className="thread">
                                        <div className="thread-img">
                                            <img src={data.senderProfilePublicImageUrl} alt="icon" width="270"
                                                 height="270"/>
                                        </div>
                                        <div className="thread-cont">
                                            <p className="thread-txt1">
                                                {data.unreadFlag && <span>未読</span>}
                                                {data.projectName}
                                            </p>
                                            <p className="thread-txt2">{data.senderName}</p>
                                            <p className="thread-txt3">{data.body}</p>
                                        </div>
                                        <p className="thread-day">{moment(data.createdAt).format('H:mm')}</p>
                                        <div className="thread-arrow"><i className="fas fa-angle-right"/></div>
                                    </div>
                                </a>
                            </Link>
                        )
                    })}
                </main>
            </div>
            <Footer/>
        </>
    )
}

export default ThreadsContainer;