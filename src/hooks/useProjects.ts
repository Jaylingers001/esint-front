import {useCallback, useState} from "react";
import {ApiAreaTree, ApiProjectSearch, ApiProjectToSearch} from "../openapi";
import ProjectsDao from "../dao/ProjectsDao";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {useRecoilState} from "recoil";
import {
    projectSearchState,
    projectToSearchState,
    reSearch,
    totalResult,
} from "../recoilStates/projectSearchRecoil";
import LocalStoredNames from "../const/LocalStorage";
import MyPageDao from "../dao/MyPageDao";
import {DEFAULT_NUMBER_DISPLAY, NEGATIVE_NUMBER_ONE} from "../const/constants";
import CONFIG from "../const/DaoConfig";
import useLocalStorageLogin from "./useLocalStorageLogin";

const useProjects = () => {
    const [projectsSearch, setProjectsSearch] = useState<ApiProjectSearch[]>();
    const router = useRouter();
    const [areaList, setAreaList] = useState<ApiAreaTree[]>();
    const {register, handleSubmit, reset} = useForm();
    const [keyword, setKeyword] = useState('')
    const [sorting, setSorting] = useState('>')
    const [activeSort, setActiveSort] = useState<boolean>(false)
    const [addMoreData, setAddMoreData] = useState(DEFAULT_NUMBER_DISPLAY);
    const [projectSearches, setProjectSearches] = useRecoilState(projectSearchState)
    const [projectToSearchStates, setProjectToSearchStates] = useRecoilState(projectToSearchState)
    const [reSearchs, setReSearchs] = useRecoilState(reSearch)
    const [totalResults, setTotalResult] = useRecoilState(totalResult)
    const [sortTypes, setSortTypes] = useState('')

    const onSubmit = useCallback(async (inputData: ApiProjectToSearch) => {
        inputData.status = undefined;
        inputData.ordererId = undefined;
        inputData.stockTo = undefined;
        inputData.workDateFrom = inputData.workDateFrom && inputData.workDateFrom.slice(NEGATIVE_NUMBER_ONE) !== 'Z' ? inputData.workDateFrom + 'Z' : "";
        inputData.workDateTo = inputData.workDateTo && inputData.workDateTo.slice(NEGATIVE_NUMBER_ONE) !== 'Z' ? inputData.workDateTo + 'Z' : "";
        inputData.restraintDateFrom = inputData.restraintDateFrom && inputData.restraintDateFrom.slice(NEGATIVE_NUMBER_ONE) !== 'Z' ? inputData.restraintDateFrom + 'Z' : "";
        inputData.restraintDateTo = inputData.restraintDateTo && inputData.restraintDateTo.slice(NEGATIVE_NUMBER_ONE) !== 'Z' ? inputData.restraintDateTo + 'Z' : "";
        if (inputData.genreIds?.length === 0 || inputData.genreIds?.length === undefined) {
            inputData.genreIds = undefined
        }

        let searchTotalResult = await ProjectsDao().projectSearch(inputData, undefined, undefined, CONFIG().CONFIG_DATA.end).catch(() => {
            setTotalResult(0)
        })
        if (searchTotalResult) {
            // @ts-ignore
            setTotalResult(searchTotalResult.data.total)
        }

        let resultData = await ProjectsDao().projectSearch(inputData, CONFIG().CONFIG_DATA.sort, CONFIG().CONFIG_DATA.orderByDesc, addMoreData).catch(async () => {
            setProjectSearches([])
            // @ts-ignore
        })
        if (resultData) {
            // @ts-ignore
            setProjectSearches(resultData.data.data)
        }

        // @ts-ignore
        setProjectToSearchStates(inputData)
        useLocalStorageLogin().setLocalStorageInputDataProjectSearch(JSON.stringify(inputData));
        await router.push({pathname: '/projects/result' + JSON.stringify(inputData)});
    }, []);

    const getAreaList = () => {
        ProjectsDao().getArea().then((data) => {
            setAreaList(data.data.data);
        }).catch((errors) => {
            alert(errors.status)
        });
    }

    const back = async (stat?: string) => {
        if (stat === 'search') {
            setReSearchs(true)
        } else {
            setReSearchs(false);
        }
        await router.push({pathname: 'search'})
    }

    const getProjectSearchList = () => {
        // @ts-ignore
        setProjectsSearch(Search)
    }

    const sort = () => {
        if (sorting === '>') {
            setSorting('<')
        } else {
            setSorting('>')
        }
    }

    const openSort = () => {
        setActiveSort(!activeSort)
    }

    const showMore = async (height: number) => {
        await (async () => {
            if (addMoreData === projectSearches.length) {
                if (sortTypes === '') {
                    await ProjectsDao().projectSearch(projectToSearchStates, undefined, undefined, addMoreData + DEFAULT_NUMBER_DISPLAY).then(async (data) => {
                        // @ts-ignore
                        await setProjectSearches(data.data.data);
                        await setAddMoreData((val) => addMoreData + DEFAULT_NUMBER_DISPLAY)
                    })
                } else {
                    await ProjectsDao().projectSearch(projectToSearchStates, sortTypes,
                        sortTypes === 'id' ? 'DESC' : sortTypes === 'maxPrice' ? 'DESC' :
                            sortTypes === 'minPrice' ? 'ASC' : sortTypes === 'recruitingEndDate' ? 'ASC' : '', addMoreData + DEFAULT_NUMBER_DISPLAY).then(async (data) => {
                        let sortData: string | any[] | ((currVal: ApiProjectSearch[]) => ApiProjectSearch[]) = [];
                        if (sortTypes === 'maxPrice') {
                            // @ts-ignore
                            sortData = data.data.data.sort((a, b) => (b.maxPrice - a.maxPrice || b.id - a.id));
                        } else if (sortTypes === 'minPrice') {
                            // @ts-ignore
                            sortData = data.data.data.sort((a, b) => (a.minPrice - b.minPrice || b.id - a.id));
                        } else if (sortTypes === 'recruitingEndDate') {
                            // @ts-ignore
                            sortData = data.data.data.sort((a, b) => (b.id - a.id));
                        } else {
                            // @ts-ignore
                            await setProjectSearches(data.data.data)

                            if (totalResults === data.data.data?.length) {
                                // @ts-ignore
                                await setAddMoreData(data.data.data?.length + DEFAULT_NUMBER_DISPLAY)
                            } else {
                                // @ts-ignore
                                await setAddMoreData(data.data.data?.length)
                            }
                        }
                        if (sortTypes !== 'id') {
                            // @ts-ignore
                            await setProjectSearches(sortData)
                            if (totalResults === data.data.data?.length) {
                                // @ts-ignore
                                await setAddMoreData(sortData.length + DEFAULT_NUMBER_DISPLAY)
                            } else {
                                // @ts-ignore
                                await setAddMoreData(sortData.length)
                            }
                        }
                        window.scrollTo(0, height);
                    })
                }
            }
        })();
    }

    const sortMe = async (what: string) => {
        window.scrollTo(0, 0);
        const types = {
            id: 'id',
            maxPrice: 'maxPrice',
            minPrice: 'minPrice',
            recruitingEndDate: 'recruitingEndDate',
        };

        // @ts-ignore
        const sortProperty = types[what];
        setSortTypes(sortProperty)

        ProjectsDao().projectSearch(projectToSearchStates, sortProperty,
            sortProperty === 'id' ? 'DESC' : sortProperty === 'maxPrice' ? 'DESC' :
                sortProperty === 'minPrice' ? 'ASC' : sortProperty === 'recruitingEndDate' ? 'ASC' : '', DEFAULT_NUMBER_DISPLAY).then(async (data) => {

            let sortData: string | any[] | ((currVal: ApiProjectSearch[]) => ApiProjectSearch[]) = [];
            if (sortProperty === 'maxPrice') {
                // @ts-ignore
                sortData = data.data.data.sort((a, b) => (b.maxPrice - a.maxPrice || b.id - a.id));
            } else if (sortProperty === 'minPrice') {
                // @ts-ignore
                sortData = data.data.data.sort((a, b) => (b.minPrice - a.minPrice || b.id - a.id));
            } else if (sortProperty === 'recruitingEndDate') {
                // @ts-ignore
                sortData = data.data.data.sort((a, b) => (a.recruitingEndDate - b.recruitingEndDate));

                let result = await ProjectsDao().projectSearch(projectToSearchStates, sortProperty, 'ASC', CONFIG().CONFIG_DATA.end)
                if (result) {
                    // @ts-ignore
                    setTotalResult(result.data.data?.length)
                }

            } else {
                // @ts-ignore
                await setProjectSearches(data.data.data)
                // @ts-ignore
                await setAddMoreData(data.data.data?.length)
            }
            if (sortProperty !== 'id') {
                // @ts-ignore
                await setProjectSearches(sortData)
                // @ts-ignore
                await setAddMoreData(sortData.length)
            }
            if (sortProperty !== 'recruitingEndDate') {
                let result = await ProjectsDao().projectSearch(projectToSearchStates, undefined, undefined, CONFIG().CONFIG_DATA.end)
                if (result) {
                    // @ts-ignore
                    setTotalResult(result.data.data?.length)
                }
            }
        })
    };

    const goToProjectsShow = (id: number) => {
        router.push({pathname: '/projects/show/' + id}).then(r => console.log(r))
    }

    const addFavorites = async (pageName: string, projectId: number, activeHeart: boolean) => {
        const tokens = localStorage.getItem(LocalStoredNames.LOGINACCESS);
        if (tokens !== null) {
            if (activeHeart) {
                const data = {userId: undefined, projectId: projectId}
                await MyPageDao().deleteMypageFavorite(data).catch((error) => {
                    console.log(error.status)
                });
            } else {
                const data = {projectId: projectId}
                await MyPageDao().addMypageFavorite(data).catch((error) => {
                    console.log(error.status)
                });
            }
            ProjectsDao().projectSearch(projectToSearchStates, undefined, undefined, addMoreData).then(async (data) => {
                // @ts-ignore
                setProjectSearches(data.data.data)
            })
        } else {
            await router.push({pathname: '/login'})
        }
    }

    const displayDataWhenRefresh = async () => {
        const myOldUrl = window.location.href;
        if (JSON.stringify(projectToSearchStates) === '[]') {
            const decodedData = decodeURIComponent(myOldUrl);
            let inputData = decodedData.split("result").splice(NEGATIVE_NUMBER_ONE);

            if (JSON.stringify(myOldUrl).includes('/result')) {
                // @ts-ignore
                inputData = inputData[0];
                let searchTotalResult = await ProjectsDao().projectSearch(inputData, undefined, undefined, CONFIG().CONFIG_DATA.end).catch(() => {
                    setTotalResult(0)
                })
                if (searchTotalResult) {
                    // @ts-ignore
                    setTotalResult(searchTotalResult.data.total)
                }
                let resultData = await ProjectsDao().projectSearch(inputData, CONFIG().CONFIG_DATA.sort, CONFIG().CONFIG_DATA.orderByDesc, addMoreData).catch(async (error) => {
                    setProjectSearches([])
                })
                if (resultData) {
                    // @ts-ignore
                    await setProjectSearches(resultData.data.data)
                }
                // @ts-ignore
                setProjectToSearchStates(inputData)

                const inputSearch = useLocalStorageLogin().getLocalStorageInputDataProjectSearch();
                if (inputSearch) {
                    const j = JSON.parse(inputSearch)
                    setKeyword(j.keyword)
                }
            }
        }
    }

    const hideTutorialModal = () =>  {
        useLocalStorageLogin().setLocalStorageDisplayTutorialForSearchPage('false')
    }

    return {
        areaList,
        handleSubmit,
        register,
        reset,
        onSubmit,
        projectsSearch,
        keyword,
        sorting,
        activeSort,
        projectToSearchStates,
        setKeyword,
        setActiveSort,
        setProjectsSearch,
        totalResult,
        getAreaList,
        getProjectSearchList,
        back,
        sort,
        openSort,
        sortMe,
        goToProjectsShow,
        showMore,
        addFavorites,
        displayDataWhenRefresh,
        hideTutorialModal
    }
}

export default useProjects;