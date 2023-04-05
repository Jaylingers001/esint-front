import React from "react";
import CommonMeta from "../../CommonMeta";
import Footer from "../parts/Footer";
import useNotification from '../../../hooks/useNotifcation'
import {useRecoilValue} from "recoil";
import {notificationStatsState} from "../../../recoilStates/singleRecoil";
import moment from "moment";
import {useRouter} from "next/router";

export interface SingleProps {

}

const SingleContainer: React.FC<SingleProps> = (props) => {
    const router = useRouter()
    const notification = useRecoilValue(notificationStatsState);

    return (
        <>
            <CommonMeta/>
            <div id="dheader">
                <div id="back-green">
                    <a href="#" onClick={() => router.back()}>
                        <i className="fas fa-angle-left"/>
                    </a>
                </div>
            </div>

            <div id="maincont">
                <div className="detail-box bottom20">
                    <p className="single-ttl" data-cy={'title'}>{notification.title}</p>
                    <p className="single-day" data-cy={'date'}>{moment(notification?.createdAt!).format('YYYY/MM/DD')}</p>
                    <p className="single-txt">{notification.body}</p>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default SingleContainer;