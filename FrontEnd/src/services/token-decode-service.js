import {jwtDecode} from "jwt-decode";
import { BehaviorSubject,ReplaySubject } from 'rxjs';
import { skip, take } from 'rxjs/operators';

let tokenValue = new BehaviorSubject("");
let decodedTokenValue = new BehaviorSubject("");

function TokenDecode(token) {
    tokenValue.next(token);
    const decodedToken = jwtDecode(token);
    

    // console.log('====================================');
    // console.log("DECODED: ",decodedToken);
    // console.log('====================================');

    return decodedToken;
}

function getToken(){
    if (localStorage.key("token")) {
        return localStorage.getItem("token")  
    }
    return false;
}

function removeToken() {
    if(localStorage.key("token")){
        localStorage.removeItem("token");
        return true;
    }

    return false;
}

function GetTokenValue() {
    tokenValue.subscribe(res => {
        console.log('====================================');
        console.log("TOKEN VALUE RESPONSE: ",res);
        console.log('====================================');
        return res;
    })
    return false;
}

function getDecodedToken() {
    tokenValue.subscribe(res=> {
        console.log('====================================');
        console.log("decoded token response: ",res);
        console.log('====================================');
    });
}

export  {getToken,removeToken};
