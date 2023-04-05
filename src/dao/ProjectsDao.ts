import {AreasApi, MypageProjectsApi, ProjectsSearchApi} from "../openapi";
import {CONFIGURATION} from "../components/util/api";
import CONFIG from "../const/DaoConfig";
import useLocalStorageLogin from "../hooks/useLocalStorageLogin";

const ProjectsDao = () => {
    const clientArea = new AreasApi(CONFIGURATION);
    const client = new MypageProjectsApi(CONFIGURATION);
    const clientProject = new ProjectsSearchApi(CONFIGURATION);

    const getArea = async () => {
        return await clientArea.getAllAreas();
    }

    const projectSearch = async (data: any, sort: undefined | string, orderBy: undefined | string, end: undefined | number) => {
        let access = useLocalStorageLogin().getLocalStorageLoginUser();
        if (!access) {
            return await clientProject.getAllProjectsForFront(data, sort, orderBy, CONFIG().CONFIG_DATA.start, end);
        } else {
            return await client.getAllMypageProjectsSearch(sort, orderBy, CONFIG().CONFIG_DATA.start, end, data);
        }
    }

    return {
        getArea,
        projectSearch
    }
}

export default ProjectsDao;