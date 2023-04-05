import React from "react";
import CommonMeta from "../../CommonMeta";
import Footer from "../parts/Footer";
import Link from "next/link";
import Image from 'next/image';
import {useRouter} from "next/router";
import useLocalStorageLogin from "../../../hooks/useLocalStorageLogin";

export interface MyPageProps {

}

const MyPageContainer: React.FC<MyPageProps> = (props) => {
    const router = useRouter()

    const redirectToCreditCardPage = () => {
        useLocalStorageLogin().clearCreatingProject();
        router.push({pathname: '/mypage/creditCard'})
    }
    return (
        <>
            <CommonMeta/>
            <div className="mypage-box">
                <h1 className="innerttl">マイページ</h1>
            </div>
            <div id="maincont">
                <ul id="mrpage-nav">
                    <li id={'profile'}>
                        <Link href={"/mypage/profile"}>
                            <a>
                                <Image src={"/assets/image/mypage-icon1.jpg"} width="40" height="38" alt={'プロフィール'}/>
                                <p>プロフィール</p>
                            </a>
                        </Link>
                    </li>
                    <li id={'r-order'}>
                        <Link href={"/mypage/contractorProjects"}>
                            <a>
                                <Image src={"/assets/image/mypage-icon2.jpg"} width="40" height="38" alt={'案件管理【受注】'}/>
                                <p>案件管理【受注】</p>
                            </a>
                        </Link>
                    </li>
                    <li id={'order'}>
                        <Link href={"/mypage/ordererProjects"}>
                            <a>
                                <Image src={"/assets/image/mypage-icon3.jpg"} width="40" height="38" alt={'案件管理【発注】'}/>
                                <p>案件管理【発注】</p>
                            </a>
                        </Link>
                    </li>
                    <li id={'balance'}>
                        <Link href={"/mypage/balance"}>
                            <a>
                                <Image src={"/assets/image/mypage-icon4.jpg"} width="40" height="38" alt={'残高照会'}/>
                                <p>残高照会</p>
                            </a>
                        </Link>
                    </li>
                    <li id={'payee'}>
                        <Link href={"/mypage/bankAccount"}>
                            <a>
                                <Image src={"/assets/image/mypage-icon5.jpg"} width="40" height="38" alt={'お振込み設定'}/>
                                <p>お振込み設定</p>
                            </a>
                        </Link>
                    </li>
                    <li id={'credit'}>
                        <a onClick={redirectToCreditCardPage} className={'cursor-pointer'}>
                            <a><Image src={"/assets/image/mypage-icon6.jpg"} width="40" height="38" alt={'クレジット情報'}/>
                                <p>クレジット情報</p>
                            </a>
                        </a>
                    </li>
                </ul>

                <h2 className="subttl">その他</h2>
                <p className="links" id={'guide'}>
                    <Link href={"/guide"}><a>利用案内<i className="fas fa-angle-right"/></a></Link>
                </p>
                <p className="links" id={'faq'}>
                    <Link href={"/faq"}>
                        <a>よくある質問<i className="fas fa-angle-right"/></a>
                    </Link>
                </p>
                <p className="links" id={'contact'}>
                    <Link href={"/contact"}>
                        <a>お問い合わせ<i className="fas fa-angle-right"/></a>
                    </Link>
                </p>
                <p className="links" id={'privacy'}>
                    <Link href={"/privacy"}>
                        <a>プライバシーポリシー<i className="fas fa-angle-right"/></a>
                    </Link>
                </p>
                <p className="links" id={'law'}>
                    <Link href={"/law"}>
                        <a>特定商取引<i className="fas fa-angle-right"/></a>
                    </Link>
                </p>
            </div>
            <Footer/>
        </>
    )
}

export default MyPageContainer;