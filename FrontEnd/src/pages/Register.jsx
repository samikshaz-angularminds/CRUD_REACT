import { useState } from "react";

function Register() {
    const [registerData,setRegisterData] = useState({
        name: "",
        email: "",
        organization: "",
        password: ""
    });

    const handleChange = (event) => {
        const eventValue = event.target.value;
        const eventName = event.target.name;

        setRegisterData((prev) => ({...prev, [eventName]: eventValue}));
    }

    const submitData = (event) => {
        event.preventDefault();
        console.log(registerData);
    };

  return(
    <div className="card">
        <form action="" onSubmit={submitData}>
            <div>
                <label htmlFor="">Name</label>
                <input type="text" className="form-control" name="name" value={registerData.name} onChange={(e)=> handleChange(e)} />
            </div>
            <div>
                <label htmlFor="">Email</label>
                <input type="text" className="form-control" name="email" value={registerData.email} onChange={(e)=> handleChange(e)} />
            </div>
            <div>
                <label htmlFor="">Organization</label>
                <input type="text" className="form-control" name="organization" value={registerData.organization} onChange={(e)=> handleChange(e)} />
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input type="text" className="form-control" name="password" value={registerData.password} onChange={(e)=> handleChange(e)} />
            </div>
            <div>
                <button className="btn btn-primary" type="submit"> Register</button>
            </div>
        </form>
    </div>
  );
}

export default Register;
