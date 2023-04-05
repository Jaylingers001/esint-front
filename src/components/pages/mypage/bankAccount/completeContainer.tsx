import CommonMeta from "../../../CommonMeta";
import Footer from "../../parts/Footer";
import React from "react";
import {useRouter} from "next/router";

const CompleteContainer = () => {
    const router = useRouter();
    return (
        <>
            <CommonMeta/>
            <div className="mypage-box">
                <h1 className="innerttl">お振込先情報登録</h1>

                <div id="back-white">
                    <a href="#">
                        <i className="fas fa-angle-left" onClick={() => router.back()}/>
                    </a>
                </div>
            </div>

            <div id="maincont">

                <div id="inner-icon">
                    <img src="/assets/image/icon-no.25.jpg" alt="" width="50" height="200"/>
                </div>
                <p className="center-txt center-pb30">口座情報を登録しました。</p>
                <a id="reg-btn">
                    <input data-cy={'submit'}
                           style={{
                               color: '#fff', backgroundColor: '#2cab7c', borderWidth: 0, cursor: "pointer"
                           }}
                           type="submit" value={'マイページへ'} name="" id="p-send"
                           onClick={() => router.push({pathname: '/mypage'})}/>
                </a>
            </div>
            <Footer/>
        </>
    )
}


export default CompleteContainer;