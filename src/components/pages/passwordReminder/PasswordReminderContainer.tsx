import React, {useCallback, useState} from "react";
import CommonMeta from "../../CommonMeta";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import PasswordReminderDao from "../../../dao/PasswordReminderDao";
import {INPUT_TEXT_MAX_LENGTH, STATUS_CODE} from "../../../const/constants";

export interface PasswordReminderProps {
    email: string;
}

const PasswordReminderContainer: React.FC = () => {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm<PasswordReminderProps>();
    const [error, setError] = useState("")

    const back = () => {
        router.push({pathname: '/login'}).then();
        return false;
    }
    const onSubmit = useCallback(async (data: PasswordReminderProps) => {
        try {
            const results = await PasswordReminderDao().passwordReminder(data);
            console.log('results' + JSON.stringify(results))

            if (results.status === STATUS_CODE) {
                await router.push({pathname: '/passwordReminder/complete'})
            } else {
                setError("ユーザー認証に失敗しました");
            }
        } catch (e: any) {
            if (e?.message.toString().substr(-3) === "409") {
                setError("すでにパスワードをリセットしています")
            } else {
                setError("ユーザー認証に失敗しました");
            }
        }
    }, []);

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
                    <p id="auth-txt">メールアドレスを入力してください。</p>
                    <input type="email" className="login-input" placeholder="メールアドレス"
                           {...register("email", {
                               required: true,
                               maxLength: INPUT_TEXT_MAX_LENGTH,
                               pattern: {
                                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                   message: "invalid email address"
                               }
                           })}
                    />
                    {errors.email && <p style={{
                        textAlign: 'left',
                        color: 'red',
                        fontSize: '14px'
                    }}>メールアドレスは必須です。</p>}
                    <div style={{paddingTop: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {error ?
                            <label title='error' htmlFor="" style={{color: "red"}}>{error}</label> : ''}
                    </div>
                    <a className="login-btns login-nmr login-auth" id="login-btn1">
                        <input type="submit" title='home' className="login-btns" id="login-btn1" value='送信する'
                               style={{
                                   marginTop: '0',
                                   width: '100%',
                                   height: '4em',
                                   borderRadius: '2em',
                                   cursor: "pointer"
                               }}/>
                    </a>
                </form>
            </div>
        </>
    )
}

export default PasswordReminderContainer;