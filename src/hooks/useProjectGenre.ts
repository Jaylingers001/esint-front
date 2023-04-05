import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {ApiGenre} from "../openapi";
import ProjectGenreDao from "../dao/ProjectGenreDao";


const useProjectGenre = () => {
    const router = useRouter()
    const {id} = router.query;
    const trueId = Number(id);

    const [genre, setGenre] = useState<ApiGenre>();

    const checkProjectGenre = () => {
        (async () => {
            if (router.isReady) {
                ProjectGenreDao().getProjectGenreById(trueId)
                    .then((data) => {
                        if (data) {
                            setGenre(data[0])
                        }
                    })
            }
        })();
    }

    useEffect(checkProjectGenre, [id, router.isReady]);

    return {
        genre
    }

}

export default useProjectGenre;