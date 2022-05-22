import studizAPI from "./AxiosConfig";

const baseURL = process.env.baseURL;

export default {
    getStudents(){
        return studizAPI(baseURL).get('/students');
    }
}