import {ApiBankToSearch, ApiMypageBankAccountToAdd, BanksApi, MypageBalancesApi} from "../openapi";
import {CONFIGURATION} from "../util/api";
import CONFIG from "../const/DaoConfig";

const BalanceDao = () => {
    const client = new MypageBalancesApi(CONFIGURATION)
    const clientBanks = new BanksApi(CONFIGURATION);
    const option = CONFIG().CONFIG_HEADER();

    const updateBankAccount = async (bankAccount: ApiMypageBankAccountToAdd) => {
        return await client.addMypageBankAccount(bankAccount, option)
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
export default BalanceDao