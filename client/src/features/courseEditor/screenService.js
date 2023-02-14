import axios from "axios";

const API_URL = `api/screen`

const getScreen = async (screenId, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(API_URL + `/${screenId}` , config);
    return response.data;
};

const courseEditorService = {
};


export default courseEditorService;

