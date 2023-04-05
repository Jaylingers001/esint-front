import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {activeUrlState} from "../../../recoilStates/activeUrlRecoil";

interface FooterProps {

}

const Footer: React.FC<FooterProps> = (props: FooterProps) => {
    const router = useRouter()
    const [active, setActive] = useRecoilState(activeUrlState)

    const activeUrl = () => {
        (async () => {
            if (router.isReady) {

                const search = router.asPath.match(/projects|profile/g)
                const mypage = router.asPath.match(/mypage/g)
                const create = router.asPath.match(/mypage\/ordererProjects/g)
                const threads = router.asPath.match(/mypage\/threads|contact/g)
                const top = router.asPath.match(/faq|guide|law|privacy/g)

                if (top || router.asPath === '/' || router.asPath === '/contact') {
                    setActive({top: true})
                    return;
                }
                if (search) {
                    setActive({search: true})
                }
                if (mypage || router.asPath === '/faq' || router.asPath === '/guide') {
                    setActive({mypage: true})
                }
                if (create) {
                    setActive({create: true})
                }
                if (threads) {
                    setActive({threads: true})
                }
            }
        })();
    }

    useEffect(activeUrl, [router.isReady]);

    return (
        <>
            <footer role="contentinfo">
                <ul>
                    <li>
                        <a href={"/"}>
                            <img
                                src={active.top ? '/assets/image/nav1on.png' : '/assets/image/nav1.png'}
                                alt="ホーム" width="300" height="190"/>
                        </a>
                    </li>

                    <li>
                        <a href={"/mypage/ordererProjects/create"}>
                            <img
                                src={active.create ? '/assets/image/nav2on.png' : '/assets/image/nav2.png'}
                                alt="お仕事を発注" width="300" height="190"/>
                        </a>
                    </li>
                    <li>
                        <a href={"/projects/search"}>
                            <img
                                src={active.search ? '/assets/image/nav3on.png' : '/assets/image/nav3.png'}
                                alt="見つける" width="300" height="190"/>
                        </a>
                    </li>
                    <li>
                        <a href={"/mypage/threads"}>
                            <img
                                src={active.threads ? '/assets/image/nav4on.png' : '/assets/image/nav4.png'}
                                alt="スレッド" width="300"
                                height="190"/>
                        </a>
                    </li>
                    <li>
                        <a href={"/mypage"}>
                            <img
                                src={active.mypage ? '/assets/image/nav5on.png' : '/assets/image/nav5.png'}
                                alt="マイページ" width="300"
                                height="190"/>
                        </a>
                    </li>
                </ul>
            </footer>
        </>
    )
}
export default Footer;
