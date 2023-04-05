import {ApiUserGenreToAdd, AreasApi, GenresApi, SignupApi, UserGenresApi} from "../openapi";
import {CONFIGURATION} from "../components/util/api";
import CONFIG from "../const/DaoConfig";


const SignUpDao = () => {
    const client = new SignupApi(CONFIGURATION);
    const clientArea = new AreasApi(CONFIGURATION);
    const clientGenres = new GenresApi(CONFIGURATION);
    const clientUserGenres = new UserGenresApi(CONFIGURATION);

    const getArea = async () => {
        const data = await clientArea.getAllAreas(CONFIG().CONFIG_DATA.sortByPosition, CONFIG().CONFIG_DATA.order, CONFIG().CONFIG_DATA.start, CONFIG().CONFIG_DATA.end);
        return data.data.data
    }

    const getGenres = async () => {
        const result = await clientGenres.getAllGenres(CONFIG().CONFIG_DATA.sortByPosition, CONFIG().CONFIG_DATA.order, CONFIG().CONFIG_DATA.start, CONFIG().CONFIG_DATA.end);
        return result.data.data
    }

    const addSignup = async (data: any) => {
        return await client.signupInputTest(data);
    }

    const addTel = async (data: any) => {
        return await client.signupTelTest(data);
    }

    const addTelAuth = async (data: any) => {
        return await client.signupAuthenticationCode(data);
    }

    const addSignUpComplete = async (data: any) => {
        return await client.signupComplete(data);
    }

    const addSignupEmailAuthentication = async (userId: number, key: string,) => {
        return await client.signupEmailAuthentication(userId, key);
    }

    const addSignupUserGenres = async (data: ApiUserGenreToAdd) => {
        return await clientUserGenres.addUserGenre(data);
    }

    return {
        getArea,
        addSignup,
        addTel,
        addTelAuth,
        addSignUpComplete,
        addSignupEmailAuthentication,
        getGenres,
        addSignupUserGenres
    }
}

export default SignUpDao;