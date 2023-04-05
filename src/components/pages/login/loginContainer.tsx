import React, {useCallback, useEffect, useState} from "react";
import CommonMeta from "../../CommonMeta";
import {useRouter} from "next/router";
import LoginDao from "../../../dao/LoginDao";
import {useForm} from "react-hook-form";
import useLocalStorageLogin from '../../../hooks/useLocalStorageLogin'


export interface LoginProps {
    email: string;
    password: string;
}

const LoginContainer: React.FC = () => {
    const router = useRouter()
    const {register, handleSubmit, formState: {errors}} = useForm<LoginProps>();
    const [error, setError] = useState(false)

    const onSubmit = useCallback(async (data: LoginProps) => {

        const results = await LoginDao().login(data);
        console.log('results' + JSON.stringify(results))

        if (results.data['accessToken'] !== null) {
            window.postMessage(JSON.stringify({
                id: 'loginToken',
                message: results.data.accessToken,
                ip: process.env.NEXT_PUBLIC_API_BASE_PATH
            }), "*");

            useLocalStorageLogin().setLocalStorageLogin(results.data.accessToken, results?.data.refreshToken, data.email);
            await router.push({pathname: '/'})
        } else {
            setError(true);
        }
    }, []);

    return (
        <>
            <CommonMeta/>
            <h1 id="login-logo"><img src="/assets/image/logo.jpg" alt="Just me Orders" width="150" height="200"/></h1>
            <div id="login-box">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input placeholder="メールアドレス" className="login-input" type="text" {...register("email", {
                        required: true,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    })} />
                    {errors.email && <p style={{
                        textAlign: 'left',
                        color: 'red',
                        fontSize: '14px'
                    }}>メールアドレスは必須です。</p>}
                    <input placeholder="パスワード" className="login-input" type='password' {...register("password", {
                        required: true
                    })} />
                    {errors.password && <p style={{
                        textAlign: 'left',
                        color: 'red',
                        fontSize: '14px'
                    }}>パスワードは必須です。</p>}

                    {error && <p style={{
                        textAlign: 'left',
                        color: 'red',
                        fontSize: '14px'
                    }}>メールアドレスもしくはパスワードが異なります。</p>}

                    <a className="login-btns" id="login-btn1">
                        <input type="submit" title='home' className="login-btns" id="login-btn1" value='ログイン'
                               style={{
                                   marginTop: '0',
                                   width: '100%',
                                   borderRadius: '2em',
                                   cursor: "pointer",
                                   fontWeight: 'bold',
                                   fontSize: '17px',
                                   letterSpacing: '-2px'
                               }}/>
                    </a>
                    <p id="forget"><a href="/passwordReminder"><i className="fas fa-angle-right"/>パスワードを忘れた方はこちら</a></p>
                    <a href="/" className="login-btns" id="login-btn2"
                       onClick={useLocalStorageLogin().logout}>後で登録する</a>
                    <p className="login-btns" id="login-btn3">アカウントをお持ちでない場合<a href="signup">登録はこちら</a></p>

                </form>
            </div>
        </>
    )
}
export default LoginContainer
