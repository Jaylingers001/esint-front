import MyPageDao from "../dao/MyPageDao";
import React, {useCallback, useRef, useState} from "react";
import {ApiAreaTree, ApiGenre, ApiUserProfile} from "../openapi";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {firebaseStorage} from "../config/firebaseInitializer";
import InputChangeUtil from "../components/util/InputChangeUtil";
import {usePostCode} from "./usePostCode";
import {NEGATIVE_NUMBER_ONE} from "../const/constants";

const myPage = () => {
    const [userData, setUserData] = useState<ApiUserProfile[]>();
    const [areaList, setAreaList] = useState<ApiAreaTree[]>();
    const [genresList, setGenresList] = useState<ApiGenre[]>();
    const [areaName, setAreaName] = useState(undefined)
    const router = useRouter();
    const {register, handleSubmit, reset, watch, formState: {errors}} = useForm();
    const {getAddressValues, loadAddress} = usePostCode();

    const password = useRef({});
    password.current = watch("password", "");
    const passwordVerification = useRef({});
    passwordVerification.current = watch("passwordVerification", "");

    const getUserDetails = (isEditPage?: boolean) => {
        (async () => {
            const result = await MyPageDao().getUserData();
            let areaName = areaList?.find(item => item.id === result.data.areaId);
            // @ts-ignore
            setAreaName(areaName?.name);
            let arrGenreIds: [] = []
            result.data.genres?.data?.map((data: ApiGenre) => {

                if (result) {
                    // @ts-ignore
                    arrGenreIds.push(data.id.toString())
                }
            })
            if (isEditPage) {
                reset({
                    email: result.data.email,
                    tel: result.data.tel,
                    name: result.data.name,
                    postalCode: '' + result.data.postalCode1 + result.data.postalCode2,
                    postalCode1: result.data.postalCode1,
                    postalCode2: result.data.postalCode2,
                    areaId: result.data.areaId,
                    address1: result.data.address1,
                    address2: result.data.address2,
                    genreIds: arrGenreIds,
                    experienceYears: result.data.experienceYears,
                    selfIntroduction: result.data.selfIntroduction
                })
            } else {
                setUserData([result.data]);
            }
        })();
    }

    const getAreaList = () => {
        MyPageDao().getArea().then((data) => {
            setAreaList(data);
        }).catch((errors) => {
            alert(errors)
        });
    }

    const getGenres = () => {
        MyPageDao().getGenres().then((data) => {
            setGenresList(data.data.data);
        }).catch((errors) => {
            alert(errors.status)
        });
    }

    const handleBack = () => {
        // @ts-ignore
        window.history.back(NEGATIVE_NUMBER_ONE);
        return false;
    }

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, fileName: string) => {
        // @ts-ignore
        document.getElementById('output').src =  URL.createObjectURL(e.target.files[0]);
        const storageRef = ref(firebaseStorage, '/users/' + fileName + '.jpg');
        // @ts-ignore
        await uploadBytes(storageRef, e.target.files[0], {contentType: 'image/jpg'});

        const path = '/users/' + fileName + '.jpg';
        getDownloadURL(ref(firebaseStorage, path))
            .then(async (url) => {
                    const img = {profileImageUrl: fileName + '.jpg', profilePublicImageUrl: url}
                    await MyPageDao().uploadImage(img).then(() => {
                        console.log('Image saved!')
                    }).catch((error) => {
                        alert(JSON.stringify(error))
                    });
                }
            )
            .catch((e: any) => alert(e));

        // @ts-ignore
        document.getElementById("output").style.opacity = "1";
    }

    const setAddressValues = (() => {

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
        let area = areaList?.find(item => item.name === InputChangeUtil().changeKanaAndHalfWidth(getAddressValues().address1))
        reset({
            "areaId": area?.id,
            "address1": InputChangeUtil().changeKanaAndHalfWidth(getAddressValues().address2),
            "genreIds": arr,
        })
    });

    const onSubmit = useCallback(async (data) => {
        data.postalCode1 = data.postalCode1
        data.postalCode2 = data.postalCode2
        delete data.password;
        delete data.passwordVerification;
        await MyPageDao().profileEdit(data).then(() => {
            router.push({pathname: '/mypage/profile'})
        }).catch((error) => {
            alert(JSON.stringify(error))
        });
    }, []);

    return {
        handleBack,
        handleUpload,
        getUserDetails,
        getAreaList,
        getGenres,
        setAddressValues,
        loadAddress,
        genresList,
        userData,
        areaList,
        onSubmit,
        handleSubmit,
        register,
        password,
        passwordVerification,
        errors,
        areaName,
    }
}

export default myPage;

