import React, {useEffect} from "react";
import CommonMeta from "../../CommonMeta";
import moment from "moment";
import useMyPage from "../../../hooks/useMyPage";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import FirebaseImage from "../parts/FirebaseImage";
import useLocalStorageLogin from "../../../hooks/useLocalStorageLogin";

const TopContainer = () => {
    let today = new Date()
    today.setDate(today.getDate() - 1);
    const {top, checkTop, addFavorites, showMore, hideTutorialModal} = useMyPage();

    useEffect(checkTop, []);

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
            <div id="modal1" className="modal_box">
                <div id="wlcm-box">
                    <h1 id="firstlogo"><img src="assets/image/logo.jpg" alt="Just me Orders" width="250" height="auto"/>
                    </h1>
                    <p id="wlcm-txt1">Just me Ordersへようこそ！</p>
                    <p id="wlcm-txt2">Just me Ordersは、個人・法人問わず、<br/>イベント関連のお仕事を内容問わず、<br/>アプリ上で発注・受注することができる<br/>お仕事マッチングアプリです。
                    </p>
                </div>

                <div className="link_area">
                    <p className="modal_link"><a data-target="modal2" className="modal_switch"><span>次へ</span></a></p>
                </div>

                <p><a className="modal_close"><i className="zmdi zmdi-close"/></a></p>
            </div>

            <div id="modal2" className="modal_box">
                <h2 className="first-logos"><img src="/assets/image/logo.jpg" alt="Just me Orders" width="150"
                                                 height="auto"/></h2>
                <div className="first-ttl">働きたい方</div>
                <p className="first-detailtxt">Just me Orders上に掲載されている募集中の<br/>お仕事から自分のスキル、<br/>希望にあったお仕事を探して応募できます。
                </p>
                <div className="first-img"><img src="/assets/image/img1.jpg" alt="働きたい方" width="1250" height="770"/>
                </div>

                <div className="link_area">
                    <ul>
                        <li className="modal_link"><a data-target="modal3" className="modal_switch"><span>次へ</span></a>
                        </li>
                    </ul>
                </div>

                <p><a className="modal_close"><i className="zmdi zmdi-close"/></a></p>
            </div>

            <div id="modal3" className="modal_box">
                <h2 className="first-logos"><img src="assets/image/logo.jpg" alt="Just me Orders" width="150"
                                                 height="auto"/></h2>
                <div className="first-ttl">仕事を依頼したい方</div>
                <p className="first-detailtxt">Just me Orders上にお仕事の募集を掲載し、<br/>依頼相手を探すことができます。</p>
                <div className="first-img"><img src="assets/image/img2.jpg" alt="仕事を依頼したい方" width="1250" height="770"/>
                </div>

                <div className="link_area">
                    <p className="modal_link"><a data-target="modal4" className="modal_switch"><span>次へ</span></a>
                    </p>
                </div>

                <p><a className="modal_close"><i className="zmdi zmdi-close"/></a></p>
            </div>

            <div id="modal4" className="modal_box">
                <h2 className="first-logos"><img src="assets/image/logo.jpg" alt="Just me Orders" width="150"
                                                 height="auto"/></h2>
                <div className="first-ttl">口座登録</div>
                <p className="first-detailtxt">受発注の際に必要な登録となります<br/>マイページからご入力いただけます</p>
                <div className="first-img"><img src="assets/image/img3.jpg" alt="口座登録" width="1250" height="770"/></div>

                <div className="link_area">
                    <p className="modal_link" onClick={() => {
                        hideTutorialModal()
                    }}><a className="modal_close modal_switch" data-target="modal5"
                    ><span>はじめよう！</span></a></p>
                </div>

                <p><a className="modal_close"><i className="zmdi zmdi-close"/></a></p>
            </div>
            <Header showNotificationBell={true} headerSelectionTab={'/'} showHeaderSelection={true}
                    showRightButton={true}
                    showCenterImg={true}/>

            <div id="maincont" className="gray">
                <main role="main" id="main" className="tb15">
                    <ul id="top-list">
                        {top?.map((data, index) => {
                            return (
                                <li key={index}>
                                    <a className="boxs"
                                       href={'/projects/show/' + data.id}>{moment(moment(data.createdAt).format('MM/DD/yyyy')).isSameOrAfter(moment(today).format('MM/DD/yyyy')) ?
                                        <p className="new">NEW</p> : <></>}<p className="day">募集期間
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
                                                <img src="/assets/image/search-icon6.jpg" width="15" height={'13.5'}/>
                                                <span>{data.areaName}</span></p><p>
                                                <img src="/assets/image/search-icon7.jpg" width="15" height={'13.5'}/>
                                                <span>{(data.minPrice).toLocaleString('en-US')}円〜{(data.maxPrice).toLocaleString('en-US')}円</span>
                                            </p>
                                            </div>
                                        </div>
                                    </a>
                                    <div className="match-bx"><p className="match"><span>マッチ度</span>{data.matchingPoint}<small>%</small>
                                    </p>
                                        <div style={{cursor: "pointer"}}
                                             className={data.activeHeart ? "heart button one" : "heart button"}
                                             onClick={() => {
                                                 addFavorites('top', data.id, data.activeHeart).then(() => '')
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
                        showMore('top').then(r => console.log(r))
                    }}>Show More Data!
                    </button>
                </div>
            </div>
            <Footer/>
            {
                !useLocalStorageLogin().getLocalStorageDisplayTutorialForIndexPage() &&
                <a data-target="modal1" className="modal_open"/>
            }
        </>
    )
}

export default TopContainer;