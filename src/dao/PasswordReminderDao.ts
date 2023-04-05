import {CONFIGURATION} from "../util/api";
import {ApiPasswordReset, PasswordReminderApi} from "../openapi";

const PasswordReminderDao = () => {

    const passwordReminder = async (data: { email: string }) => {
        const client = new PasswordReminderApi(CONFIGURATION);
        return await client.addPasswordReminder(data);
    }

    const resetPasswordReminder = async (data: ApiPasswordReset) => {
        const client = new PasswordReminderApi(CONFIGURATION);
        return await client.addPasswordReset(data);
    }

    return {
        passwordReminder,
        resetPasswordReminder
    }
}
export default PasswordReminderDao;
