import React, {useEffect, useState} from 'react';
import NotificationDao from '../../../dao/NotificationDao';
import {ApiMypageNotification, ApiMypageNotifications} from "../../../openapi";
import moment from "moment";
import Image from 'next/image';
import useLocalStorageLogin from "../../../hooks/useLocalStorageLogin";
import {useRouter} from "next/router";
import UserDao from "../../../dao/UserDao";
import LocalStoredNames from "../../../const/LocalStorage";
import {useRecoilState} from "recoil";
import {loggedInState} from "../../../recoilStates/isLoggedInRecoil";
import {notificationState, notificationBellState} from "../../../recoilStates/singleRecoil";

export interface notificationProps {
    showNotificationBell?: boolean;
    showCenterImg?: boolean,
    showRightButton?: boolean,
    showHeaderSelection?: boolean,
    headerSelectionTab?: string,
}

const Header: React.FC<notificationProps> = (props) => {
    const [notifications, setNotifications] = useState<ApiMypageNotification[]>();
    const [checkDate, setCheckDate] = useState<ApiMypageNotifications>()
    const [loggedIn] = useRecoilState(loggedInState)
    const [notification, setNotification] = useRecoilState(notificationState)
    const [bellState, setBellState] = useRecoilState(notificationBellState)


    const isNotificationNew = (dates: string) => {
        return moment(dates).isAfter(checkDate?.userNotificationCheckDate, 'day')
    }

    const clickBellIcon = async () => {
        setBellState({active: !bellState.active})
    }

    const clickHeader = async () => {
        setBellState({active: false})
    }

    const checkNotification = () => {
        (async () => {
            if (loggedIn.isLoggedIn) {
                const result = await NotificationDao().getAll().catch((error) => {
                    console.log(error.message)
                });

                if (result) {
                    setNotifications(result.data)
                    setCheckDate(result)
                }
            }
            if (!loggedIn.isLoggedIn) {
                const result = await NotificationDao().getAllNotLogin().catch((error) => {
                    console.log(error.message)
                });

                if (result) {
                    setNotifications(result.data)
                    setCheckDate(result)
                }
            }
        })();
    }

    const router = useRouter()
    const [username, setUsername] = useState('')
    const displayUser = () => {
        const tokens = localStorage.getItem(LocalStoredNames.LOGINACCESS);
        const fn = async () => {
            if (tokens !== null) {
                let userInfo = await UserDao().getUser()
                if (userInfo !== null) {
                    setUsername(userInfo.data.data.name)
                }
            }
        }
        fn().then();
    }
    useEffect(displayUser, [])

    const logout = () => {
        useLocalStorageLogin().clearLocalStorageLogin();
        router.push({pathname: '/login'})
    }

    const linkSinglePage = async (data: ApiMypageNotification) => {
        setNotification(data)
        setBellState({active: true})
        await router.push({pathname: '/single'})
    }

    useEffect(checkNotification, [bellState.active]);

    return (
        <>
            {props.showNotificationBell && <>
                <div id="bell" onClick={clickBellIcon}>
                    <Image className={`openbtn2 ${bellState.active ? 'active' : ''}`} src={"/assets/image/bell.jpg"}
                           alt="bell_toru" width="20" height="22"/>
                </div>
                <nav id="g-nav2" className={`${bellState.active ? 'panelactive' : ''}`}>
                    <div id="g-nav-list">
                        <h2 id="news">運営からお知らせ</h2>
                        <ul id="news-list">
                            {notifications?.map((data, count) => {
                                return (
                                    <li key={count} onClick={() => linkSinglePage(data)}>
                                        <p className="day">
                                            {isNotificationNew(data?.createdAt!) ? <span>NEW</span> : ''}
                                            {moment(data?.createdAt!).format('YYYY.MM.DD')}
                                        </p>
                                        <p className="txt">
                                            {data.title}
                                        </p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </nav>
            </>
            }
            {props.showCenterImg &&
            <header role="banner">
                <h1 id="logo"><img src="/assets/image/logo.jpg" alt="Just me Orders" width="70" height="200"/></h1>
            </header>
            }
            {props.showRightButton &&
            <div onClick={clickHeader} className="openbtn1"><span></span><span></span><span></span></div>}
            {props.showHeaderSelection && <ul id="nav-center">
                <li><a className={props.headerSelectionTab === '/' ? 'hover' : ''} href={'/'}>新着</a></li>
                <li><a className={props.headerSelectionTab === '/mypage/recommendation' ? 'hover' : ''}
                       href={'/mypage/recommendations'}>マッチ度</a></li>
                <li><a className={props.headerSelectionTab === '/mypage/favorite' ? 'hover' : ''}
                       href={'/mypage/favorites'}>お気に入り</a></li>
            </ul>}
            <nav id="g-nav1">
                <div id="g-nav-list">
                    <div className="conts">
                        <p className="t1">こんにちは</p>
                        <p className="t2">{username ? username : "ゲスト"} さん</p>
                        <div className="hum-btn"><a
                            href={username ? '/mypage/ordererProjects/create' : '/login'}>{username ? "お仕事発注はこちら" : "ログインはこちら"}</a>
                        </div>
                        {
                            username ? <>
                                <h2 className="subttl">マイページ</h2>
                                <ul className="detail-list hum-list">
                                    <li><a href="/mypage/profile"><h3>プロフィールを確認</h3><p><i
                                        className="fas fa-angle-right"/>
                                    </p></a></li>
                                    <li><a href="/mypage/contractorProjects"><h3>受注者案件管理</h3><p><i
                                        className="fas fa-angle-right"/></p>
                                    </a></li>
                                    <li><a href="/mypage/ordererProjects"><h3>発注者案件管理</h3><p><i
                                        className="fas fa-angle-right"/></p>
                                    </a></li>
                                    {/*<li><a href="/mypage/withdrawal"><h3>振込先設定</h3><p><i*/}
                                    {/*    className="fas fa-angle-right"/></p></a>*/}
                                    {/*</li>*/}
                                    <li><a href="/mypage/balance"><h3>残高照会</h3><p><i className="fas fa-angle-right"/>
                                    </p>
                                    </a></li>
                                </ul>
                            </> : ''
                        }
                        <h2 className="subttl">その他</h2>
                        <ul className="detail-list hum-list">
                            <li><a href="/guide"><h3>ご利用ガイド</h3><p><i className="fas fa-angle-right"/></p>
                            </a></li>
                            <li><a href="/faq"><h3>よくある質問</h3><p><i className="fas fa-angle-right"/></p></a>
                            </li>
                            <li><a href="/contact"><h3>お問い合わせ</h3><p><i className="fas fa-angle-right"/></p>
                            </a></li>
                            <li><a href="/privacy"><h3>プライバシーポリシー</h3><p><i className="fas fa-angle-right"/>
                            </p></a></li>
                            <li><a href="/law"><h3>特定商取引</h3><p><i className="fas fa-angle-right"/></p></a>
                            </li>
                        </ul>
                        <p className="logout"><a onClick={logout}>
                            {loggedIn.isLoggedIn ? <> <i className="fas fa-angle-right"/>ログアウトはこち'ら </> : ''}</a></p>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;