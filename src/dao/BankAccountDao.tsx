import React from "react";
import {CONFIGURATION} from "../util/api";
import {ApiBankToSearch, ApiMypageBankAccountToAdd, MypageBankAccountApi} from "../openapi";
import CONFIG from "../const/DaoConfig";
import {BanksApi} from "../openapi/api/banks-api";

const BankAccountDao = () => {
    const client = new MypageBankAccountApi(CONFIGURATION);
    const clientBanks = new BanksApi(CONFIGURATION);
    const option = CONFIG().CONFIG_HEADER();


    const updateBankAccount = async (bankAccount: ApiMypageBankAccountToAdd) => {
        return await client.updateMypageBankAccount(bankAccount, option)
    };

    const getAllBanks = async (level: number) => {
        const value: ApiBankToSearch = {
            level: level
        }
        const data = await clientBanks.getAllBanks(value, CONFIG().CONFIG_DATA.sort, CONFIG().CONFIG_DATA.order, 0, 99999999);
        return data.data.data
    }


    return {
        updateBankAccount,
        getAllBanks
    }
}
export default BankAccountDao
