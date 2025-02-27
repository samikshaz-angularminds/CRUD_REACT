const { default: axios } = require("axios");
const { useEffect, useState } = require("react");
import * as constants from "../constants/apiConstant";
import { getToken } from "../services/token.service";

function AdminProfile() {

    const [admin,setAdmin] = useState();

    useEffect(()=>{},[]);

    const getAdmin = () => {
        axios.get(constants.API_URL+constants.GET_UPDATE_ADMIN_PROFILE,{headers:{Authorization: `Bearer ${getToken()}`}})
        .then((response) => {
            setAdmin(admin);
        })
        .catch((error) => {
            console.log("Error while getting profile of admin..",error);
            
        })
    }


    return(
        <div className="container">
            
        </div>
    );
}

export default AdminProfile;