import { useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";

function Login() {
   const [formData, setFormData] = useState({
    email: "",
    password: ""
   });

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
        console.log(formData);
        console.log('====================================');
    }

    return(
        <>
        <div className="card">
            <h1>Login</h1>
            <form action="" onSubmit={submitForm}>
                <div>
                    <label htmlFor=""  className="form-label"> Employee ID </label>
                    <input type="text" name="email" className="form-control" value={formData?.email} onChange={(e)=>handleChange(e)} />
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