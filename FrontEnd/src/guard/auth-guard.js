import { getToken } from "../services/token-decode-service";

function auth() {
    if(getToken()) return true;

    return false;
}