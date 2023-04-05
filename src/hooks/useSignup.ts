import {ApiAreaTree, ApiGenre, ApiSignupInputToAdd} from "../openapi";
import {useRecoilState} from "recoil";
import {signupState} from "../recoilStates/signupRecoil";
import {useRouter} from "next/router";
import {useCallback, useRef, useState} from "react";
import SignUpDao from "../dao/SignUpDao";
import useLocalStorageLogin from "./useLocalStorageLogin";
import InputChangeUtil from "../components/util/InputChangeUtil";
import {useForm} from "react-hook-form";
import {usePostCode} from "./usePostCode";
import MyPageDao from "../dao/MyPageDao";
import {STATUS_CODE} from "../const/constants";

const useSignup = () => {
    const router = useRouter();
    const [signup, setSignup] = useRecoilState(signupState)
    const {register, handleSubmit, reset, watch, formState: {errors}} = useForm();
    const {getAddressValues, loadAddress} = usePostCode();
    const [genresList, setGenresList] = useState<ApiGenre[]>();
    const [areaList, setAreaList] = useState<ApiAreaTree[]>();
    const [errorMessage, setErrorMessage] = useState("");

    const password = useRef({});
    password.current = watch("password", "");
    const passwordVerification = useRef({});
    passwordVerification.current = watch("passwordVerification", "");

    const getGenres = () => {
        MyPageDao().getGenres().then((data) => {
            setGenresList(data.data.data);
        }).catch((errors) => {
            alert(errors.status)
        });
    }

    const getAreaList = () => {
        MyPageDao().getArea().then((data) => {
            setAreaList(data);
        }).catch((errors) => {
            alert(errors)
        });
    }

    const proceedConfirm = async (values: ApiSignupInputToAdd) => {
        setSignup(values)
        router.push({
            pathname: '/signup/tel'
        }).then()
    }

    const onSubmit = useCallback(async (data) => {
        let result = await SignUpDao().addSignup(data).catch(() => {
            setErrorMessage('このメールアドレスは使用されています。')
        });
        if (result) {
            if (result.status === STATUS_CODE) {
                useLocalStorageLogin().setLocalStorageSignUp(JSON.stringify(data));
                await router.push({pathname: 'signup/tel'})
            } else {
                console.log(JSON.stringify(result.status))
            }
        }
    }, []);

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

    return {
        signup,
        setSignup,
        genresList,
        areaList,
        onSubmit,
        handleSubmit,
        register,
        password,
        passwordVerification,
        errors,
        errorMessage,
        reset,
        proceedConfirm,
        getAreaList,
        getGenres,
        setAddressValues,
        loadAddress,
    }
}

export default useSignup;




