import React, {useEffect} from "react"
import Head from "next/head";
import {loadScript} from "./util/javascriptUtil";
import {useRouter} from "next/router";
import UserDao from "../dao/UserDao";
import {useRecoilState} from "recoil";
import {loggedInState} from "../recoilStates/isLoggedInRecoil";

interface CommonMetaProps {
    title?: string;
    tokenJsUrl?: string;
}

const CommonMeta: React.FC<CommonMetaProps> = (props) => {
    const router = useRouter()
    const [loggedIn, setIsLoggedIn] = useRecoilState(loggedInState)

    const userLoggedIn = () => {
        (async () => {
            const user = await UserDao().getUser()
            if(user){
                setIsLoggedIn({isLoggedIn: true, id: user.data.data.id})
            }else{
                setIsLoggedIn({isLoggedIn: false, id: 0})
            }
        })();
    }

    useEffect(userLoggedIn, [router.isReady]);

    React.useEffect(() => {
        const fn = async () => {
            await loadScript("/assets/js/jquery.bgswitcher.js");
            await loadScript("/assets/js/common.js");
            await loadScript("/assets/js/custom.js");
        };
        fn().then();

    }, []);

    return (
        <>
            <html lang="ja"/>
            <Head>
                <meta charSet="UTF-8"/>
                <meta name="robots" content="noindex"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0"/>
                <link rel="stylesheet" href="/assets/css/style.css"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.3.1/css/swiper.min.css"/>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"/>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"/>
                <script src={props.tokenJsUrl}/>
                <link
                    href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700|Noto+Serif+JP:400,700&display=swap"
                    rel="stylesheet"/>
                <title>{props.title}</title>
            </Head>
        </>

    );
}
CommonMeta.defaultProps = {}
export default CommonMeta;
