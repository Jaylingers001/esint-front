import React, {useEffect, useState} from "react";
import CommonMeta from "../../CommonMeta";
import Footer from "../parts/Footer";
import useProjects from "../../../hooks/useProjects";
import moment from "moment";
import Image from "next/image";
import {useRecoilState} from "recoil";
import {projectSearchState, projectToSearchState, totalResult,} from "../../../recoilStates/projectSearchRecoil";
import FirebaseImage from "../parts/FirebaseImage";

const SearchContainer = () => {
    let today = new Date()
    today.setDate(today.getDate() - 1);
    const {
        keyword,
        activeSort,
        setKeyword,
        back,
        openSort,
        sortMe,
        goToProjectsShow,
        showMore,
        addFavorites,
        displayDataWhenRefresh,
    } = useProjects();

    const [offsetHeight, setOffsetHeight] = useState(0)
    const [projectToSearchStates] = useRecoilState(projectToSearchState)
    const [projectSearches] = useRecoilState(projectSearchState)
    const [totalResults] = useRecoilState(totalResult)

    useEffect(() => {
        $(window).scroll(async function () {
            if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
                setOffsetHeight(document.body.offsetHeight)
                try {
                    // @ts-ignore
                    await document.getElementById("showMore").click();
                } catch (err) {
                    console.log(err)
                }
            }
        });
    }, [])

    useEffect(() => {
        if (keyword === '') {
            // @ts-ignore
            setKeyword(projectToSearchStates[('keyword')])
        }
    }, [])

    useEffect(() => {
        displayDataWhenRefresh().then();
    }, [])

    return (
        <>
            <CommonMeta/>
            <div id="result-top">
                <a href={'#'} onClick={() => {
                    back().then(() => '')
                }}><i
                    className="fas fa-angle-left"/></a>
                <input onClick={() => {
                    back('search').then(() => '')
                }} value={keyword} type="text" name="search"
                       className="result-input"
                       placeholder="検索内容が入ります。"/>
            </div>
            <div id="result-center">
                <p className="left txt">検索結果:<span id={'totalSearch'}>
                    {totalResults}
                </span>件</p>
                <div className="right btn">
                    <div style={{cursor: "pointer"}} className={activeSort ? 'openbtns active' : 'openbtns'}
                         onClick={openSort}
                    >
                        <img src="/assets/image/r-icon1.png" width="20" height="34"/>
                        並び替え
                    </div>
                    <a style={{cursor: "pointer"}} onClick={() => {
                        back('search').then(() => '')
                    }}><img src="/assets/image/r-icon2.png" width="20" height="34"/>再検索</a>
                </div>
            </div>

            <nav id="g-navr" className={activeSort ? 'panelactive' : ''}>
                <div id="g-navr-list">
                    <p id="sortby">並び替え</p>
                    <label style={{cursor: "pointer"}} htmlFor="sort1" className="sortradio">
                        <input type="radio" id="sort1" name="並び替え" value="新着順" onClick={() => sortMe('id')}/>
                        新着順
                    </label>
                    <label style={{cursor: "pointer"}} htmlFor="sort2" className="sortradio">
                        <input type="radio" id="sort2" name="並び替え" value="金額(高い順)" onClick={() => sortMe('maxPrice')}/>
                        金額(高い順)
                    </label>
                    <label style={{cursor: "pointer"}} htmlFor="sort3" className="sortradio">
                        <input type="radio" id="sort3" name="並び替え" value="新着順" onClick={() => sortMe('minPrice')}/>
                        金額(低い順)
                    </label>
                    <label style={{cursor: "pointer"}} htmlFor="sort4" className="sortradio">
                        <input type="radio" id="sort4" name="並び替え" value="締め切りが近い順"
                               onClick={() => sortMe('recruitingEndDate')}/>
                        締め切りが近い順
                    </label>
                    <div id="sort-b">
                        <img onClick={openSort} src="/assets/image/sort-b.png" width="15" height="60"/>
                    </div>
                </div>
            </nav>
            <div id="maincont" className="gray">
                <main role="main" id="main" className="tb15">
                    <ul id="top-list">
                        {projectSearches?.map((data, index) => (
                            <li key={data.id}>
                                <a className="boxs"
                                   onClick={() => goToProjectsShow(data.id)}>{moment(moment(data.createdAt).format('MM/DD/yyyy')).isSameOrAfter(moment(today).format('MM/DD/yyyy')) ?
                                    <p className="new">NEW</p> : <>  </>}<p className="day"> 募集期間
                                    :<span>{moment(data.recruitingStartDate).format('MM/DD')}〜{moment(data.recruitingEndDate).format('MM/DD')}</span>
                                </p><h2 className={'projectName'}>{data.projectName}</h2>
                                    <div className="profile block">
                                        <div className="icon left">
                                            <FirebaseImage src={data.userProfilePublicImageUrl} alt={'icon'}
                                                           width={270} height={270}/>
                                        </div>
                                        <div className="detail left"><p>
                                            <Image src="/assets/image/search-icon4.jpg" width="15" height={'13.5'}/>
                                            <span>{moment(data.workStartDate).format('MM月DD日')}</span>
                                        </p><p>
                                            <Image src="/assets/image/search-icon6.jpg" width="15" height={'13.5'}/>
                                            <span>{data.areaName}</span></p><p>
                                            <Image src="/assets/image/search-icon7.jpg" width="15" height={'13.5'}/>
                                            <span>{data.minPrice.toLocaleString()}円〜{data.maxPrice.toLocaleString()}円</span>
                                        </p>
                                        </div>
                                    </div>
                                </a>
                                <div className="match-bx"><p className="match">
                                    <span>マッチ度</span>{data.matchingPoint}<small>%</small>
                                </p>
                                    <div style={{cursor: "pointer"}}
                                         className={data.activeHeart ? "heart button one" : "heart button"}><i
                                        className={'fas fa-heart'}
                                        onClick={() => {
                                            addFavorites('', data.id, data.activeHeart).then(() => '')
                                        }}/></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </main>
                <div style={{display: 'none'}}>
                    <button id={'showMore'} onClick={() => {
                        showMore(offsetHeight).then(r => console.log(r))
                    }}>Show More Data!
                    </button>
                </div>
            </div>
            <div id=""/>
            <Footer/>
        </>
    )
}

export default SearchContainer;