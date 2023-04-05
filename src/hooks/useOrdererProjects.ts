import MyPageDao from "../dao/MyPageDao";
import React, {useCallback, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {
    ApiAreaTree,
    ApiGenre,
    ApiOrdererProject,
    ApiOrdererProjectApplication,
    ApiOrdererProjectCancel,
    ApiOrdererProjectChangePrice,
    ApiProjectFile,
} from "../openapi";
import {useRouter} from "next/router";
import moment from "moment";
import {usePostCode} from "./usePostCode";
import InputChangeUtil from "../components/util/InputChangeUtil";
import {deleteObject, getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {firebaseStorage} from "../config/firebaseInitializer";
import {useRecoilState} from "recoil";
import {isPreviousPageIsCreatingProject} from "../recoilStates/projectSearchRecoil";
import {NEGATIVE_NUMBER_ONE, ORDERER_PRICE_STATUS} from "../const/constants";
import useLocalStorageLogin from "./useLocalStorageLogin";

const useOrdererProjects = () => {
    const router = useRouter()
    const [ordererProjectList, setOrdererProjectList] = useState<ApiOrdererProject[]>();
    const [projectIdList, setProjectIdList] = useState<ApiOrdererProject[]>();
    const [projectApplicationIdList, setProjectApplicationIdList] = useState<ApiOrdererProjectApplication[]>();
    const {register, handleSubmit, reset, watch, formState: {errors}} = useForm();
    const [areaList, setAreaList] = useState<ApiAreaTree[]>();
    const [genresList, setGenresList] = useState<ApiGenre[]>();
    const [originalFilenameList, setOriginalFilenameList] = useState<[]>();
    const currentDate = new Date().toLocaleDateString()
    const [showCreditCardDialog, setShowCreditCardDialog] = useState(false)
    const [showDownload, setShowDownload] = useState(false)
    const [hashtags, setHashtags] = useState([''])
    const [comment, setComment] = useState('')
    const [inputPrice, getInputPrice] = useState(null)
    const [isPreviousPageIsCreatingProjects, setIsPreviousPageIsCreatingProject] = useRecoilState(isPreviousPageIsCreatingProject)
    const [upLoadFileNumber, setUpLoadFileNumber] = useState([{
        id: 1, noData: 'false', name: '', fileSize: '', htmlFile: ''
    },
        {id: 2, noData: 'false', name: '', fileSize: '', htmlFile: ''},
        {id: 3, noData: 'false', name: '', fileSize: '', htmlFile: ''}])
    const [projectFiles, setProjectFiles] = useState<ApiProjectFile[]>([{
        projectId: undefined,
        originalFilename: undefined,
        fileIndex: undefined,
        fileSize: undefined,
    }]);
    const {getAddressValues, loadAddress} = usePostCode();

    const address1 = useRef({});
    address1.current = watch("address1", "");

    const areaId = useRef({});
    areaId.current = watch("areaId", "");

    const recruitingStartDate = useRef({});
    recruitingStartDate.current = watch("recruitingStartDate", "");
    const recruitingEndDate = useRef({});
    recruitingEndDate.current = watch("recruitingEndDate", "");

    const workStartDate = useRef({});
    workStartDate.current = watch("workStartDate", "");
    const workEndDate = useRef({});
    workEndDate.current = watch("workEndDate", "");

    const restraintStartDate = useRef({});
    restraintStartDate.current = watch("restraintStartDate", "");
    const restraintEndDate = useRef({});
    restraintEndDate.current = watch("restraintEndDate", "");

    const minPrice = useRef({});
    minPrice.current = watch("minPrice", "");
    const maxPrice = useRef({});
    maxPrice.current = watch("maxPrice", "");


    const [updateFile, setUpdateFile] = useState([{
        id: 1, delete: 'false', name: '',
    },
        {id: 2, delete: 'false', name: '',},
        {id: 3, delete: 'false', name: '',}])

    const filterHashTags = () => {
        projectIdList?.map((res) => {
            let comment
            if (res?.description !== undefined) {
                comment = res.description;
            }
            if (!comment) {
                return '';
            }

            const space = comment.split(' ');
            const data = new Array<string>();
            let sentence = '';

            space.map((item) => {
                if (item[0] === '#') {
                    data.push(item)
                } else {
                    sentence += item + ' '
                }
            })
            setComment(sentence)
            setHashtags(data)
        })
    }

    const handleShowOrdererProjects = () => {
        (async () => {
            await MyPageDao().getOrdererProjects().then((result) => {
                setOrdererProjectList(result.data.data);
            }).catch((error) => {
                console.log(JSON.stringify(error))
            });
        })();
    }

    const handleShowProjectId = () => {
        (async () => {
            let id = window.location.pathname.split("/").pop();
            await MyPageDao().getOrdererProjectsShowProjectId(Number(id)).then((result) => {
                setProjectIdList(result.data.data);
            }).catch((error) => {
                console.log(JSON.stringify(error))
            });
        })();
    }

    const handleShowProjectApplicationId = () => {
        (async () => {
            let id = window.location.pathname.split("/").pop();
            await MyPageDao().getOrdererProjectByProjectApplicationId(Number(id)).then((result) => {
                setProjectApplicationIdList([result.data]);
            }).catch((error) => {
                console.log(JSON.stringify(error))
            });
        })();
    }

    const handleShowEdit = () => {
        (async () => {
            let id = window.location.pathname.split("/").pop();
            await MyPageDao().getOrdererProjectsEdit(Number(id)).then(async (result) => {
                let arrGenresIds: ApiGenre[] = []
                result.data.genres?.map((data: any) => {
                    if (result) {
                        // @ts-ignore
                        arrGenresIds.push(JSON.stringify(data.id))
                    }
                })
                // @ts-ignore
                setProjectFiles(result.data.projectFiles)
                let arrOriginalFilename: ApiGenre[] = []
                result.data.projectFiles?.map(async (data) => {
                    // @ts-ignore
                    arrOriginalFilename.push(data.originalFilename + 'num' + data.fileIndex)

                    // @ts-ignore
                    const path = '/myPage/ordererProjects/' + data.projectId + '_' + data.fileIndex + '.' + data.originalFilename.split('.').pop();
                    getDownloadURL(ref(firebaseStorage, path))
                        .then(async (url) => {
                                upLoadFileNumber[(Number(data.fileIndex) - 1)].htmlFile = url;
                            }
                        )
                        .catch((e: any) => alert(e));

                    if (data.originalFilename != null) {
                        upLoadFileNumber[(Number(data.fileIndex) - 1)].noData = 'true';
                        if (data.fileSize != null) {
                            upLoadFileNumber[(Number(data.fileIndex) - 1)].fileSize = String(data.fileSize);
                        }
                        upLoadFileNumber[(Number(data.fileIndex) - 1)].name = data.originalFilename;
                        await setUpLoadFileNumber(upLoadFileNumber);
                    }
                })
                setShowDownload(true);
                // @ts-ignore
                setOriginalFilenameList(arrOriginalFilename)
                reset({
                    recruitingStartDate: moment(result.data.recruitingStartDate).format('yyyy-MM-DDTHH:mm:ss'),
                    recruitingEndDate: moment(result.data.recruitingEndDate).format('yyyy-MM-DDTHH:mm:ss'),
                    genres: arrGenresIds,
                    stock: result.data.stock,
                    workStartDate: moment(result.data.workStartDate).format('yyyy-MM-DDTHH:mm:ss'),
                    workEndDate: moment(result.data.workEndDate).format('yyyy-MM-DDTHH:mm:ss'),
                    restraintStartDate: moment(result.data.restraintStartDate).format('yyyy-MM-DDTHH:mm:ss'),
                    restraintEndDate: moment(result.data.restraintEndDate).format('yyyy-MM-DDTHH:mm:ss'),
                    postalCode1: result.data.postalCode1,
                    postalCode2: result.data.postalCode2,
                    areaId: result.data.areaId,
                    address1: result.data.address1,
                    address2: result.data.address2,
                    minPrice: result.data.minPrice,
                    maxPrice: result.data.maxPrice,
                    description: result.data.description,
                    projectName: result.data.projectName,
                    minimumExperienceYears: result.data.minimumExperienceYears
                })
            }).catch((error) => {
                console.log(JSON.stringify(error))
            });
        })();
    }

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, fileName?: string, index?: number) => {
        let file = {
            projectId: null,
            originalFilename: e.target.value.replace('C:\\fakepath\\', ''),
            fileIndex: index,
            // @ts-ignore
            htmlFile: e.target.files[0],
            // @ts-ignore
            fileSize: e.target.files[0].size
        }
        upLoadFileNumber[(Number(index) - 1)].noData = 'true';
        // @ts-ignore
        upLoadFileNumber[(Number(index) - 1)].fileSize = e.target.files[0].size;
        // @ts-ignore
        upLoadFileNumber[(Number(index) - 1)].htmlFile = e.target.files[0];
        upLoadFileNumber[(Number(index) - 1)].name = e.target.value.replace('C:\\fakepath\\', '');
        setUpLoadFileNumber(upLoadFileNumber);

        let objIndex = projectFiles.findIndex((obj => obj.fileIndex == index));

        if (objIndex === NEGATIVE_NUMBER_ONE) {
            // @ts-ignore
            projectFiles.push(file)
            setProjectFiles(projectFiles)
        } else {
            if (projectFiles) {
                projectFiles[objIndex].originalFilename = e.target.value.replace('C:\\fakepath\\', '');
                // @ts-ignore
                projectFiles[objIndex].htmlFile = e.target.files[0];
                setProjectFiles(projectFiles)
            }
        }
    }

    const handleReset = () => {
        setShowDownload(false);
        setUpLoadFileNumber([{
            id: 1, noData: 'false', name: '', fileSize: '', htmlFile: ''
        },
            {id: 2, noData: 'false', name: '', fileSize: '', htmlFile: ''},
            {id: 3, noData: 'false', name: '', fileSize: '', htmlFile: ''}])
        setProjectFiles([{
            projectId: undefined,
            originalFilename: undefined,
            fileIndex: undefined,
            fileSize: undefined,
        }]);
        reset({
            recruitingStartDate: '',
            recruitingEndDate: '',
            genres: false,
            stock: '',
            workStartDate: '',
            workEndDate: '',
            restraintStartDate: '',
            restraintEndDate: '',
            postalCode1: '',
            postalCode2: '',
            areaId: '',
            address1: '',
            address2: '',
            minPrice: '',
            maxPrice: '',
            description: '',
            projectFiles: '',
            projectName: '',
        })
    }

    const handleArea = () => {
        MyPageDao().getArea().then((data) => {
            setAreaList(data);
        }).catch((error) => {
            console.log(JSON.stringify(error))
        });
    }

    const handleCheckUserGmoId = () => {
        (async () => {
            await MyPageDao().getCheckOrdererProjectToAddCheck().then(() => {
                setShowCreditCardDialog(false);
            }).catch(() => {
                if(!useLocalStorageLogin().getLocalStorageDisplayTutorialForCreatePage()) {
                    setShowCreditCardDialog(false);
                } else {
                    setShowCreditCardDialog(true);
                }
            });
        })();
    }

    const handleGenres = () => {
        MyPageDao().getGenres().then((data) => {
            setGenresList(data.data.data);
        }).catch((error) => {
            console.log(JSON.stringify(error))
        });
    }

    const handleGotoPreviousPage = () => {
        // @ts-ignore
        window.history.back(NEGATIVE_NUMBER_ONE);
        return false;
    }

    const handleGotoCreditCardPage = () => {
        setIsPreviousPageIsCreatingProject(true);
        router.push({pathname: '/mypage/creditCard'})
    }

    const handleDelete = (projectId: number) => {
        if (confirm("削除してもよろしいでしょうか？")) {
            MyPageDao().deleteOrdererProjects(projectId).then((data) => {
                window.location.reload()
            }).catch((error) => {
                alert(error)
            });
        }

    }

    const handleGoToProjectIdPage = (projectId: number) => {
        router.push({pathname: '/mypage/ordererProjects/show/' + projectId})
    }

    const handleGoToProjectApplicationId = (projectApplicationId: number | undefined) => {
        router.push({pathname: '/mypage/ordererProjects/applications/show/' + projectApplicationId})
    }

    const handleCancel = (projectId: number, ordererPrice: number | undefined) => {
        const data: ApiOrdererProjectCancel = {projectApplicationId: projectId, cancelPrice: ordererPrice}
        MyPageDao().cancelOrder(data).then(async (data) => {
            window.location.reload()
        }).catch((error) => {
            alert(error)
        })
    }

    const handleCancelPrice = (projectId: number, cancelPrice: number) => {
        // @ts-ignore
        const cancelInput = document.getElementById("myInput").value;
        const data: ApiOrdererProjectCancel = {projectApplicationId: projectId, cancelPrice: cancelInput}
        MyPageDao().cancelOrder(data).then(async (data) => {
            window.location.reload()
        }).catch((error) => {
            alert(error)
        })
    }

    const handleGoToEditProjectIdPage = (projectId: number) => {
        router.push({pathname: '/mypage/ordererProjects/edit/' + projectId})
    }

    const handleGoToThreadPage = (projectId: number | undefined) => {
        router.push({pathname: '/mypage/threads/show/' + projectId})
    }

    const handleChangePrice = (status: number | undefined, projectId: number, ordererPrice: number) => {
        // @ts-ignore
        const inputForm = document.getElementById("inputForm").value;
        const data: ApiOrdererProjectChangePrice = {
            projectApplicationId: projectId,
            ordererPrice: status === ORDERER_PRICE_STATUS ? inputForm.replace(',', '').replace(/[^0-9\.]+/g, "") : ordererPrice
        }
        MyPageDao().changePrice(data).then(async (data) => {
            window.location.reload();
        }).catch((error) => {
            alert(error)
        })
    }

    const handleCancelDialog1 = () => {
        // @ts-ignore
        $('.js-modal1').fadeIn();
    }

    const handleCancelDialog2 = () => {
        // @ts-ignore
        $('.js-modal1').fadeOut();
        // @ts-ignore
        $('.js-modal2').fadeIn();
    }

    const handleCancelDialog3 = () => {
        // @ts-ignore
        $('.js-modal1').fadeOut();
        // @ts-ignore
        $('.js-modal3').fadeIn();
    }

    const handleBackDialog1 = () => {
        // @ts-ignore
        $('.js-modal1').fadeIn();
        // @ts-ignore
        $('.js-modal3').fadeOut();
        // @ts-ignore
        $('.js-modal2').fadeOut();
    }

    const downloadFile = (isEdiPage: boolean, htmlFile: any, name: string, id: number) => {
        if (isEdiPage) {
            if (originalFilenameList) {
                let objIndex = originalFilenameList.findIndex((obj => obj == name + 'num' + id));
                if (objIndex === NEGATIVE_NUMBER_ONE) {
                    // @ts-ignore
                    $('a').attr("href", window.URL.createObjectURL(htmlFile));
                } else {
                    // @ts-ignore
                    $('a').attr("href", htmlFile);
                }
            }
        } else {
            // @ts-ignore
            $('a').attr("href", window.URL.createObjectURL(htmlFile));
        }
        // @ts-ignore
        $('a').attr("download", name);
    }

    const onSubmit = useCallback(async (inputData) => {
        let arrGenres: ApiGenre[] = []
        inputData.genres.map((data: any) => {
            const result = genresList?.filter(word => word.id === JSON.parse(data));
            arrGenres.push({
                // @ts-ignore
                "name": result[0].name,
                // @ts-ignore
                "position": result[0].id,
                // @ts-ignore
                "id": result[0].id,
                // @ts-ignore
                "parentId": result[0].id,
                // @ts-ignore
                "childrenIds": result[0].childrenIds
            })
        })
        inputData.genres = arrGenres;
        inputData.projectFiles = projectFiles;
        if (JSON.stringify(inputData.projectFiles[0]) === '{}') {
            inputData.projectFiles.splice(0, 1);
        }
        inputData.recruitingStartDate = inputData.recruitingStartDate + 'Z';
        inputData.recruitingEndDate = inputData.recruitingEndDate + 'Z';
        inputData.workStartDate = inputData.workStartDate + 'Z';
        inputData.workEndDate = inputData.workEndDate + 'Z';
        inputData.restraintStartDate = inputData.restraintStartDate + 'Z';
        inputData.restraintEndDate = inputData.restraintEndDate + 'Z';
        if (minPrice.current < -0 || maxPrice.current < -0 || minPrice.current > maxPrice.current || moment(recruitingStartDate.current).format('yyyy-MM-DDTHH:mm:ss') >= moment(recruitingEndDate.current).format('yyyy-MM-DDTHH:mm:ss') ||
            moment(workStartDate.current).format('yyyy-MM-DDTHH:mm:ss') >= moment(workEndDate.current).format('yyyy-MM-DDTHH:mm:ss') ||
            moment(restraintStartDate.current).format('yyyy-MM-DDTHH:mm:ss') >= moment(restraintEndDate.current).format('yyyy-MM-DDTHH:mm:ss')) {
        } else {
            MyPageDao().addOrdererProjects(inputData).then(async (data) => {
                setShowDownload(true);
                let projectsData: [{ fileIndex: number; originalFilename: string; htmlFile: string; }];
                projectsData = inputData.projectFiles
                projectsData.map(async (projectData: { fileIndex: number; originalFilename: string; htmlFile: string; }) => {
                    const storageRef = ref(firebaseStorage, '/myPage/ordererProjects/'
                        + data.data.data.projectId + '_' + projectData.fileIndex + '.' + projectData.originalFilename.split('.').pop());
                    // @ts-ignore
                    await uploadBytes(storageRef, projectData.htmlFile);
                })
                router.push({pathname: '/mypage/ordererProjects/show/' + data.data.data.projectId})
            }).catch((error) => {
                alert(error);
            })
        }
    }, [genresList, projectFiles, originalFilenameList]);

    const onSubmitEdit = useCallback(async (inputData) => {
        let arrGenres: ApiGenre[] = []
        inputData.genres.map((data: any) => {
            const result = genresList?.filter(word => word.id === JSON.parse(data));
            arrGenres.push({
                // @ts-ignore
                "name": result[0].name,
                // @ts-ignore
                "position": result[0].id,
                // @ts-ignore
                "id": result[0].id,
                // @ts-ignore
                "parentId": result[0].id,
                // @ts-ignore
                "childrenIds": result[0].childrenIds
            })
        })
        inputData.genres = arrGenres;
        inputData.projectFiles = projectFiles;
        inputData.recruitingStartDate = inputData.recruitingStartDate + 'Z';
        inputData.recruitingEndDate = inputData.recruitingEndDate + 'Z';
        inputData.workStartDate = inputData.workStartDate + 'Z';
        inputData.workEndDate = inputData.workEndDate + 'Z';
        inputData.restraintStartDate = inputData.restraintStartDate + 'Z';
        inputData.restraintEndDate = inputData.restraintEndDate + 'Z';
        let id = window.location.pathname.split("/").pop();
        if (minPrice.current < -0 || maxPrice.current < -0 || minPrice.current > maxPrice.current || moment(recruitingStartDate.current).format('yyyy-MM-DDTHH:mm:ss') >= moment(recruitingEndDate.current).format('yyyy-MM-DDTHH:mm:ss') ||
            moment(workStartDate.current).format('yyyy-MM-DDTHH:mm:ss') >= moment(workEndDate.current).format('yyyy-MM-DDTHH:mm:ss') ||
            moment(restraintStartDate.current).format('yyyy-MM-DDTHH:mm:ss') >= moment(restraintEndDate.current).format('yyyy-MM-DDTHH:mm:ss')) {
        } else {
            MyPageDao().updateOrdererProjects(Number(id), inputData).then(async (data) => {
                await Promise.all(
                    upLoadFileNumber.map(async (uploadData, index) => {

                        if (uploadData.noData === 'false') {
                            const desertRef = ref(firebaseStorage, '/myPage/ordererProjects/' + data.data.data.projectId + '_' + uploadData.id + '.' + uploadData.name.split('.').pop());
                            await deleteObject(desertRef).then(() => {
                                console.log('save successfully')
                            }).catch((error) => {
                                console.log(error)
                            });
                        } else {

                            if (updateFile[(uploadData.id - 1)].delete === 'true') {
                                const desertRef = ref(firebaseStorage, '/myPage/ordererProjects/' + data.data.data.projectId + '_' + uploadData.id + '.' + updateFile[(uploadData.id - 1)].name);
                                await deleteObject(desertRef).then(() => {
                                    console.log('save successfully')
                                }).catch((error) => {
                                    console.log(error)
                                });
                            }

                            // @ts-ignore
                            let objIndex = originalFilenameList.findIndex((obj => obj == uploadData.name + 'num' + uploadData.id));
                            if (objIndex === NEGATIVE_NUMBER_ONE) {
                                const storageRef = ref(firebaseStorage, '/myPage/ordererProjects/'
                                    + data.data.data.projectId + '_' + uploadData.id + '.' + uploadData.name.split('.').pop());
                                // @ts-ignore
                                await uploadBytes(storageRef, uploadData.htmlFile);
                            }
                        }
                    })
                )
                await router.push({pathname: '/mypage/ordererProjects/show/' + id})
            }).catch((error) => {
                alert(error)
            })
        }
    }, [genresList, projectFiles, originalFilenameList, updateFile]);

    const setAddressValues = (() => {
        let postalCode1 = document.getElementById('postalCode1');
        let postalCode2 = document.getElementById('postalCode2');

        loadAddress();
        let arr: string | string[] = []
        genresList?.map((data) => {
            const js = document.getElementById('cb' + data.id);
            // @ts-ignore
            if (js.checked) {
                // @ts-ignore
                arr.push(data.id.toString())
            }
        })
        // @ts-ignore
        if (postalCode1.value !== undefined && postalCode2.value !== undefined) {
            let area = areaList?.find(item => item.name === InputChangeUtil().changeKanaAndHalfWidth(getAddressValues().address1))
            reset({
                "areaId": area?.id,
                "address1": InputChangeUtil().changeKanaAndHalfWidth(getAddressValues().address2),
                "genres": arr
            }, {
                keepErrors: true
            })
        }
    });

    const deleteHashTags = (comment: string) => {
        if (!comment) {
            return '';
        }

        const space = comment.split(' ');
        const data = new Array<string>();
        let sentence = ''

        space.map((item) => {
            if (item[0] === '#') {
                data.push(item)
            } else {
                sentence += item + ' '
            }
        })

        return sentence
    }

    function Comma(Num: string) { //function to add commas to textboxes
        Num += '';
        Num = Num.replace(',', '');
        Num = Num.replace(',', '');
        Num = Num.replace(',', '');
        Num = Num.replace(',', '');
        Num = Num.replace(',', '');
        Num = Num.replace(',', '');
        let x = Num.split('.');
        let x1 = x[0];
        const x2 = x.length > 1 ? '.' + x[1] : '';
        const rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        return x1 + x2;
    }

    const changeOrdererPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = Comma(e.target.value)
        // @ts-ignore
        getInputPrice(val)
    }

    const deleteFile = async (index: number, name: string | undefined) => {

        const arr: React.SetStateAction<{ id: number; noData: string; name: string; fileSize: string; htmlFile: string; }[]> = []
        upLoadFileNumber.map((data) => {
            if (index === data.id) {
                arr.push({
                    "id": data.id,
                    "noData": "false",
                    "name": '.' + data.name.split('.').pop(),
                    "fileSize": "",
                    "htmlFile": ""
                })
            } else {
                arr.push(data)
            }
        })
        setUpLoadFileNumber(arr)

        const arrProj: React.SetStateAction<{ projectId: undefined; originalFilename: undefined; fileIndex: undefined; htmlFile: undefined; fileSize: undefined; }[]> = []
        projectFiles.map((data) => {
            if (index !== data.fileIndex) {
                // @ts-ignore
                arrProj.push(data)
            }
        })
        setProjectFiles(arrProj)
        const arrDelete: React.SetStateAction<{ id: number; delete: string; name: string; }[]> = []
        updateFile.map((data) => {
            if (index === data.id) {
                arrDelete.push({
                    "id": data.id,
                    "delete": "true",
                    // @ts-ignore
                    'name': name.split('.').pop()
                })
            } else {
                arrDelete.push(data)
            }
        })
        setUpdateFile(arrDelete)
    }

    const kbToMb = (kb: string | number) => {
        const mb = bytesToSize(kb)
        return mb;
    }

    function bytesToSize(bytes: string | number) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        if (typeof bytes === "number") {
            const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));
            // @ts-ignore
            return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
        }
    }

    const hideTutorialModal = () =>  {
        useLocalStorageLogin().setLocalStorageDisplayTutorialForCreatePage('false');
        (async () => {
            await MyPageDao().getCheckOrdererProjectToAddCheck().then(() => {
                setShowCreditCardDialog(false);
            }).catch(() => {
                setShowCreditCardDialog(true);
            });
        })();
    }

    return {
        downloadFile,
        handleGotoPreviousPage,
        handleArea,
        handleShowOrdererProjects,
        handleUpload,
        handleGenres,
        handleDelete,
        handleShowProjectId,
        handleGoToProjectIdPage,
        handleReset,
        handleGoToProjectApplicationId,
        handleShowProjectApplicationId,
        handleCancel,
        handleCancelPrice,
        handleGoToEditProjectIdPage,
        handleShowEdit,
        handleGoToThreadPage,
        handleChangePrice,
        handleCancelDialog1,
        handleCancelDialog2,
        handleCancelDialog3,
        handleBackDialog1,
        handleCheckUserGmoId,
        handleGotoCreditCardPage,
        setAddressValues,
        loadAddress,
        filterHashTags,
        deleteHashTags,
        changeOrdererPrice,
        deleteFile,
        kbToMb,
        hideTutorialModal,
        comment,
        hashtags,
        handleSubmit,
        register,
        reset,
        onSubmit,
        onSubmitEdit,
        genresList,
        areaList,
        ordererProjectList,
        projectIdList,
        projectApplicationIdList,
        currentDate,
        showCreditCardDialog,
        projectFiles,
        upLoadFileNumber,
        showDownload,
        errors,
        address1,
        areaId,
        recruitingStartDate,
        recruitingEndDate,
        workEndDate,
        workStartDate,
        restraintEndDate,
        restraintStartDate,
        maxPrice,
        minPrice,
        inputPrice,
    }
}

export default useOrdererProjects;