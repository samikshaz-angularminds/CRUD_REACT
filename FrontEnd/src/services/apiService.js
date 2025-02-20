import axios from "axios";

export const getRequest = (url,id) => {

    if(id) return axios.get(url+id)

    return axios.get(url);
}