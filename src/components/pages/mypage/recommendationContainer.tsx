import React, {useEffect} from "react";
import CommonMeta from "../../CommonMeta";
import moment from "moment";
import useMyPage from "../../../hooks/useMyPage";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import FirebaseImage from "../parts/FirebaseImage";

const RecommendationContainer = () => {
    let today = new Date()
    today.setDate(today.getDate() - 1);
    const {recommendations, checkRecommendation, addFavorites, showMore} = useMyPage();

    useEffect(checkRecommendation, []);

    useEffect(() => {
        $(window).scroll(async function (event) {
            if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
                try {
                    // @ts-ignore
                    document.getElementById("showMore").click();
                } catch (err) {
                    console.log(err)
                }
            }
        });
    }, [])

    return (
        <>
            <CommonMeta/>
            <Header showNotificationBell={true} headerSelectionTab={'/mypage/recommendation'} showHeaderSelection={true}
                    showRightButton={true}
                    showCenterImg={true}/>
            <div id="maincont" className="gray">
                <main role="main" id="main" className="tb15">
                    <ul id="top-list">
                        {recommendations?.map((data, index) => {
                            return (
                                <li key={index}>
                                    <a className="boxs"
                                       href={'/projects/show/' + data.id}>{moment(moment(data.createdAt).format('MM/DD/yyyy')).isSameOrAfter(moment(today).format('MM/DD/yyyy')) ?
                                        <p className="new">NEW</p> : <>  </>}<p className="day">募集期間
                                        :<span>{moment(data.recruitingStartDate).format('MM/DD')}〜{moment(data.recruitingEndDate).format('MM/DD')}</span>
                                    </p><h2 className={'projectName'}>{data.projectName}</h2>
                                        <div className="profile block">
                                            <div className="icon left">
                                                <FirebaseImage src={data.userProfilePublicImageUrl} alt={'icon'}
                                                               width={270} height={270}/>
                                            </div>
                                            <div className="detail left"><p>
                                                <img src="/assets/image/search-icon4.jpg" width="15" height={'13.5'}/>
                                                <span>{moment(data.workStartDate).format('MM月DD日')}</span>
                                            </p><p>
                                                <img src="/assets/image/search-icon6.jpg" width="15"
                                                     height={'13.5'}/>
                                                <span>{data.areaName}</span></p><p>
                                                <img src="/assets/image/search-icon7.jpg" width="15" height={'13.5'}/>
                                                <span>{data.minPrice}円〜{data.maxPrice}円</span></p>
                                            </div>
                                        </div>
                                    </a>
                                    <div className="match-bx"><p className="match"><span>マッチ度</span>{data.matchingPoint}<small>%</small>
                                    </p>
                                        <div style={{cursor: "pointer"}}
                                             className={data.activeHeart ? "heart button one" : "heart button"}
                                             onClick={() => {
                                                 addFavorites('', data.id, data.activeHeart).then(() => '')
                                             }}
                                        >
                                            <i
                                                className={'fas fa-heart'}/></div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </main>
                <div style={{display: 'none'}}>
                    <button id={'showMore'} onClick={() => {
                        showMore('recommendations').then(r => console.log(r))
                    }}>Show More Data!
                    </button>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default RecommendationContainer;