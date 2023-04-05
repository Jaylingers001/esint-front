import React from "react";
import CommonMeta from "../../CommonMeta";
import Footer from "../parts/Footer";
import Header from "../parts/Header";

const ThreadsContainer = () => {

    return (
        <>
            <CommonMeta/>
            <Header showNotificationBell={true} showRightButton={true} showCenterImg={true}/>
            <div id="maincont" className="gray">
                <main role="main" id="main" className="tb15">
                    <ul id="top-list">

                    </ul>
                </main>
            </div>
            <Footer/>
        </>
    )
}

export default ThreadsContainer
