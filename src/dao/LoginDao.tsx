import React from "react";
import {CONFIGURATION} from "../util/api";
import {LoginApi} from "../openapi";

const LoginDao = () => {

    const login = async (data: { email: string, password: string }) => {
        const client = new LoginApi(CONFIGURATION);
        return await client.loginPost(data);
    }

    return {
        login
    }
}
export default LoginDao
