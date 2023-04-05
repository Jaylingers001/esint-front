import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {RecoilRoot} from "recoil";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import useLocalStorageLogin from "../src/hooks/useLocalStorageLogin";

function MyApp({Component, pageProps}: AppProps) {
    const [items, setItems] = useState(false);
    const router = useRouter()

    useEffect(() => {
        let access = useLocalStorageLogin().getLocalStorageLoginUser();
        if (typeof window !== "undefined") {
            const currentURL = window.location.pathname
            if (access === null && (currentURL.match(/mypage/))) {
                router.push({pathname: '/login'}).then()
                setTimeout(function () {
                    setItems(true)
                }, 500);
            } else {
                setItems(true)
            }
        }
    }, [items])

    return (
        <div style={{opacity: items ? '1' : '0'}}>
            <RecoilRoot>
                {/*// @ts-ignore*/}
                <Component {...pageProps} />
            </RecoilRoot>
        </div>
    )
}

export default MyApp
