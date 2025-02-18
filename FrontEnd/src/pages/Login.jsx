import { useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import * as constants from "../constants/constants";
import axios from "axios";


function Login() {
   const [formData, setFormData] = useState({
    employee_id: "",
    password: ""
   });

   console.log('====================================');
   console.log(constants.API_URL);
   console.log('====================================');

   const handleChange = (event) => {
    const value = event.target.value;
    const name=event.target.name
    setFormData((prev)=>({...prev,[name]:value}))
    
    console.log(formData);
    
   };

    const submitForm = (event) => {
        // console.log("email: ",email);
        // console.log("password: ",password);
        event.preventDefault();
        console.log('====================================');
        console.log("FORMDATA: ",formData);
        console.log('====================================');

        axios.post("http://localhost:8080/admin/login",formData)
        .then(response =>{
            console.log('====================================');
            console.log("RESPONSE: ", response);
            console.log('====================================');
        })
        .catch(error => {
            console.log("ERROR: ",error);
        });
    };

    return(
        <>
        <div className="card">
            <h1>Login</h1>
            <form action="" onSubmit={submitForm}>
                <div>
                    <label htmlFor=""  className="form-label"> Employee ID </label>
                    <input type="text" name="employee_id" className="form-control" value={formData?.email} onChange={(e)=>handleChange(e)} />
                </div>
                <div>
                    <label htmlFor="" className="form-label"> Password </label>
                    <input type="text" name="password" className="form-control" value={formData?.password} onChange={(e)=>handleChange(e)} />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary" >Login</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Login;