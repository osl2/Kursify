import axios from "axios";

const API_URL = `api/course`;
const SCREEN_URL = `api/screen`;

const getCourse = async (courseId, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(API_URL + `/${courseId}` , config);
    return response.data;
};

const createScreen = async (screenData, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(SCREEN_URL + `/${screenData.courseId}`, screenData, config);
    return response.data;
};

const courseEditorService = {
    getCourse,
    createScreen,
};


export default courseEditorService;

