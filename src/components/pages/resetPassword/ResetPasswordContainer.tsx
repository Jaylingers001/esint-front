import React, {useCallback, useEffect, useState} from "react";
import CommonMeta from "../../CommonMeta";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import PasswordReminderDao from "../../../dao/PasswordReminderDao";
import {STATUS_CODE} from "../../../const/constants";

export interface ResetPasswordContainerProps {
    userId: number;
    authenticationCode: string;
    password: string;
    confirmPassword: string;
}

const ResetPasswordContainer: React.FC = () => {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm<ResetPasswordContainerProps>();
    const [errorMsg, setErrorMsg] = useState<string>('');
    let urlProps = router.asPath.split('?');
    let id = 0, code = '';
    urlProps.map((item, index) => {
        if (index === 1) {
            let urlAttr = item.split('&');
            urlAttr.map((attr) => {
                if (attr.includes('id')) {
                    id = Number(attr.split('=')[index]);
                } else if (attr.includes('authenticationCode')) {
                    code = attr.split('=')[index];
                }
            });
        }
    });

    const back = () => {
        router.push({pathname: '/login'}).then();
        return false;
    }

    const onSubmit = useCallback(async (data: ResetPasswordContainerProps) => {
        try {
            if (data.password === data.confirmPassword && errorMsg === '') {
                data.userId = id;
                data.authenticationCode = code;
                const results = await PasswordReminderDao().resetPasswordReminder(data);
                console.log('results' + JSON.stringify(results))

                if (results.status === STATUS_CODE)
                    await router.push({pathname: '/passwordReminder/resetPassword/complete'});
            } else {
                errorMsg === '' ? setErrorMsg('パスワードと確認用パスワードが一致しません') : setErrorMsg(errorMsg);
            }
        } catch (e: any) {
            if (e?.message.toString().substr(-3) === "409") {
                setErrorMsg("すでにパスワードをリセットしています")
            } else {
                setErrorMsg("ユーザー認証に失敗しました");
            }
        }
    }, [])

    const validateErrors = () => {
        setErrorMsg('');
        if (errors.password?.type === 'pattern' || errors.confirmPassword?.type === 'pattern') {
            setErrorMsg("パスワードは半角英数字で入力してください");
        } else if (errors.password?.type === "maxLength" || errors.confirmPassword?.type === 'maxLength') {
            setErrorMsg("パスワードは1文字以上、20文字以内で入力してください");
        } else if (errors.password?.type === "required" || errors.confirmPassword?.type === 'required') {
            setErrorMsg("パスワードは1文字以上、20文字以内で入力してください");
        }
    }

    useEffect(validateErrors, [errors.password, errors.confirmPassword]);

    return (
        <>
            <CommonMeta/>
            <div className="mypage-box">
                <h1 className="innerttl">パスワードリマインダー</h1>

                <div id="back-white">
                    <a href="#" onClick={back}>
                        <i className="fas fa-angle-left"></i>
                    </a>
                </div>
            </div>

            <div id="login-box" className="nmr-top">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p id="auth-txt">新しいパスワードを入力してください。</p>

                    <input type="password" className="login-input" placeholder="パスワードを入力してください"
                           {...register("password", {
                               required: true,
                               maxLength: 20,
                               minLength: 1,
                               pattern: /^[ A-Za-z0-9]*$/
                           })}
                    />
                    <input type="password" className="login-input" placeholder="再度パスワードをご入力ください"
                           {...register("confirmPassword", {
                               required: true,
                               maxLength: 20,
                               minLength: 1,
                               pattern: /^[ A-Za-z0-9]*$/
                           })}
                    />
                    <div style={{paddingTop: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {errorMsg && errorMsg != '' ?
                            <label title='error' htmlFor="" style={{color: "red"}}>{errorMsg}</label> : ''}
                    </div>

                    <a className="login-btns login-nmr login-auth" id="login-btn1">
                        <input type="submit" title='home' className="login-btns" id="login-btn1" value='送信する'
                               style={{
                                   marginTop: '0',
                                   width: '100%',
                                   height: '4em',
                                   borderRadius: '2em',
                                   cursor: "pointer"
                               }}
                        />
                    </a>
                </form>
            </div>
        </>
    )
}
export default ResetPasswordContainer;