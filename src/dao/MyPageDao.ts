import {
    ApiMypageBalance,
    ApiMypageCreditCard,
    ApiOrdererProjectCancel,
    ApiOrdererProjectChangePrice,
    ApiOrdererProjectToAdd,
    ApiUserFavoriteProjectToAdd,
    ApiUserProfileToAdd,
    AreasApi,
    GenresApi,
    MypageBalancesApi,
    MypageCreditCardApi,
    MypageFavoritesApi,
    MypageProjectsApi,
    MypageRecommendationsApi,
    MypagesApi,
    OrdererProjectsApi,
    ProjectsApi,
    UsersApi
} from "../openapi";
import {CONFIGURATION} from "../components/util/api";
import CONFIG from "../const/DaoConfig";

const MyPageDao = () => {
    const client = new MypagesApi(CONFIGURATION);
    const clientArea = new AreasApi(CONFIGURATION);
    const clientGenres = new GenresApi(CONFIGURATION);
    const clientTopNotLogin = new ProjectsApi(CONFIGURATION);
    const clientTopLogin = new MypageProjectsApi(CONFIGURATION);
    const clientFavorites = new MypageFavoritesApi(CONFIGURATION);
    const clientRecommendations = new MypageRecommendationsApi(CONFIGURATION);
    const clientPayment = new MypageBalancesApi(CONFIGURATION);
    const clientOrdererProjects = new OrdererProjectsApi(CONFIGURATION);
    const clientCreditCard = new MypageCreditCardApi(CONFIGURATION);
    const clientUsers = new UsersApi(CONFIGURATION);


    const getUserData = async () => {
        return await client.getUserProfileById();
    }

    const getUsers = async () => {
        return await clientUsers.getAllUser();
    }

    const getArea = async () => {
        const data = await clientArea.getAllAreas(CONFIG().CONFIG_DATA.sortByPosition, CONFIG().CONFIG_DATA.order, CONFIG().CONFIG_DATA.start, CONFIG().CONFIG_DATA.end);
        return data.data.data
    }

    const getGenres = async () => {
        return await clientGenres.getAllGenres();
    }

    const profileEdit = async (data: ApiUserProfileToAdd) => {
        return await client.updateUserProfileById(data);
    }

    const uploadImage = async (profileImageUrl: { profileImageUrl: string, profilePublicImageUrl: string }) => {
        return await client.updateUserProfileImageById(profileImageUrl);
    }

    const getAllMyPageFavorites = async (end: undefined | number) => {
        const result = await clientFavorites.getAllMypageFavorites(undefined, undefined, CONFIG().CONFIG_DATA.start, end);
        return result.data
    }

    const getAllMyPageRecommendations = async (end: undefined | number) => {
        const result = await clientRecommendations.getAllMypageRecommendations(undefined, undefined, undefined, CONFIG().CONFIG_DATA.start, end);
        return result.data
    }

    const getAllMyPageTopNotLogin = async (sort: undefined | string, order: undefined | string, end: undefined | number) => {
        const result = await clientTopNotLogin.getAllProjectsSearch(sort, order, CONFIG().CONFIG_DATA.start, end);
        return result.data
    }

    const getAllMyPageTopLogin = async (sort: undefined | string, order: undefined | string, end: undefined | number) => {
        const result = await clientTopLogin.getAllMypageProjectsSearch(sort, order, CONFIG().CONFIG_DATA.start, end);
        return result.data
    }

    const deleteMypageFavorite = async (data: ApiUserFavoriteProjectToAdd) => {
        const result = await clientFavorites.deleteMypageFavorite(data)
        return result.data
    }

    const addMypageFavorite = async (data: ApiUserFavoriteProjectToAdd) => {
        const result = await clientFavorites.addMypageFavorite(data)
        return result.data
    }

    const getAllMyPageBalanceBankTransfers = async (data: ApiMypageBalance) => {
        return await clientPayment.getAllMypageBalanceBankTransferApplications('createdAt', 'DESC', 0, CONFIG().CONFIG_DATA.end, data);
    }

    const getAllMyPageBalancePayments = async (data: ApiMypageBalance) => {
        return await clientPayment.getAllMypageBalancePayments('createdAt', 'DESC', 0, CONFIG().CONFIG_DATA.end, data);
    }

    const printMyPageBalancePayments = async (data: ApiMypageBalance) => {
        return await clientPayment.printMypageBalancePayments(data);
    }
    const getOrdererProjects = async () => {
        return await clientOrdererProjects.getAllOrdererProjects();
    }

    const getCheckOrdererProjectToAddCheck = async () => {
        return await clientOrdererProjects.checkOrdererProjectToAddCheck();
    }

    const getOrdererProjectsShowProjectId = async (projectId: number) => {
        return await clientOrdererProjects.getOrdererProjectByProjectId(projectId);
    }

    const getOrdererProjectsEdit = async (projectId: number) => {
        return await clientOrdererProjects.getOrdererProjectToAddByProjectId(projectId);
    }

    const getOrdererProjectByProjectApplicationId = async (projectId: number) => {
        return await clientOrdererProjects.getOrdererProjectByProjectApplicationId(projectId);
    }

    const addOrdererProjects = async (data: ApiOrdererProjectToAdd) => {
        return await clientOrdererProjects.addOrdererProjects(data);
    }

    const deleteOrdererProjects = async (projectId: number) => {
        return await clientOrdererProjects.deleteOrdererProject(projectId);
    }

    const changePrice = async (data: ApiOrdererProjectChangePrice) => {
        return await clientOrdererProjects.changePriceOrderProjectApplication(data);
    }

    const cancelOrder = async (data: ApiOrdererProjectCancel) => {
        return await clientOrdererProjects.cancelOrderProjectApplication(data);
    }

    const updateOrdererProjects = async (projectId: number, data: ApiOrdererProjectToAdd) => {
        return await clientOrdererProjects.updateOrdererProjects(projectId, data);
    }

    const addOrUpdateCreditCard = async (data: ApiMypageCreditCard) => {
        return await clientCreditCard.addMypageCreditCard(data);
    }

    const getUserCreditCardDetails = async () => {
        return await clientCreditCard.getMypageCreditCard();
    }

    return {
        getUserData,
        getArea,
        profileEdit,
        uploadImage,
        getGenres,
        getAllMyPageTopLogin,
        getAllMyPageTopNotLogin,
        addMypageFavorite,
        deleteMypageFavorite,
        getAllMyPageRecommendations,
        getAllMyPageFavorites,
        getAllMyPageBalancePayments,
        getOrdererProjects,
        getOrdererProjectsEdit,
        getOrdererProjectsShowProjectId,
        getOrdererProjectByProjectApplicationId,
        addOrdererProjects,
        deleteOrdererProjects,
        changePrice,
        cancelOrder,
        updateOrdererProjects,
        getCheckOrdererProjectToAddCheck,
        getAllMyPageBalanceBankTransfers,
        printMyPageBalancePayments,
        addOrUpdateCreditCard,
        getUserCreditCardDetails,
        getUsers
    }
}

export default MyPageDao;