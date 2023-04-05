import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {ApiMypageThread, ApiMypageThreadShow} from "../openapi";
import ThreadDao from "../dao/ThreadDao";
import {messageProps} from "../components/pages/mypage/threads/showContainer";


const useThreads = () => {
    const router = useRouter()
    const {id} = router.query;
    const trueId = Number(id);

    const [messages, setMessages] = useState<ApiMypageThreadShow[]>()
    const [projectName, setProjectName] = useState('')
    const [refresh, setRefresh] = useState<boolean>(false)
    const [clear, setClear] = useState<boolean>(false)
    const [typeMessage, setTypeMessage] = useState<messageProps>();
    const [threads, setThreads] = useState<ApiMypageThread[]>()
    const cardRef = useRef<HTMLDivElement>(null);

    const back = () => {
        router.back()
    }

    const reload = () => {
        router.reload()
    }

    const checkThreads = () => {
        (async () => {
            if (router.isReady && trueId) {
                const result = await ThreadDao().show(trueId).catch((error) => {
                    console.log(error.message)
                    router.push({
                        pathname: '/error'
                    }).then()
                });
                if(result) {
                    result!.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt))
                    setMessages(result)
                    setProjectName(result![0].projectName)
                    setTypeMessage({
                        body: '',
                        projectId: Number(router.query['id'])
                    })
                }
            }
        })();
    }

    useEffect(checkThreads, [router.isReady, refresh]);

    const proceedConfirm = async (values: messageProps) => {
        const data = await ThreadDao().addMessage(values);
        setClear(true)
        setRefresh(true)
        checkThreads();
    }

    const loadData = () => {
        (async () => {
            const result = await ThreadDao().getAll().catch((error) => {
                console.log(error.message)
            });
            if(result) {
                result!.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt))
                setThreads(result)
            }
        })();
    }

    useEffect(() => {
        const fn = async () => {
            cardRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        fn().then();
    }, [messages]);

    useEffect(loadData, []);


    return {
        projectName,
        router,
        messages,
        typeMessage,
        proceedConfirm,
        clear,
        setClear,
        threads,
        back,
        reload,
        cardRef,
    }

}

export default useThreads;