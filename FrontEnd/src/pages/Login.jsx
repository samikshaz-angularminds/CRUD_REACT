import { useState } from "react";
import * as constants from "../constants/constants";
import * as request from "../services/apiService";
import { Navigate, useNavigate } from "react-router-dom";

import axios from "axios";
import { getToken } from "../services/token-decode-service";

function Login() {
  const [formData, setFormData] = useState({
    employee_id: "",
    password: "",
  });
  const navigate = useNavigate();

  const onRegister = () => {
    navigate("/register");
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setFormData((prev) => ({ ...prev, [name]: value }));

    console.log(formData);
  };

  const submitForm = (event) => {
    event.preventDefault();

    axios
      .post(constants.API_URL + constants.ADMIN_LOGIN, formData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/employee-list");
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      })
      .finally(() => {
        console.log("====================================");
        console.log("TOKEN: ", getToken());
        console.log("====================================");
      });
  };

  return (
    <div className="container d-flex flex-column  align-items-center mt-5">
      <h1 className="mb-5 pb-4">Welcome to Employee Site</h1>
      <div className="card login-form-width login-form-height p-4">
        <h4>Login</h4>
        <form action="" onSubmit={submitForm}>
          <div className="mt-2">
            <div className="d-flex justify-content-start">
              <label htmlFor="" className="form-label m-0">
                {" "}
                Employee ID{" "}
              </label>
            </div>
            <input
              type="text"
              name="employee_id"
              className="form-control"
              value={formData?.employee_id}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mt-2">
            <div className="d-flex justify-content-start">
              <label htmlFor="" className="form-label m-0">
                {" "}
                Password{" "}
              </label>
            </div>
            <input
              type="text"
              name="password"
              className="form-control"
              value={formData?.password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mt-2">
            <div className="pb-2">
              New to the site? &nbsp;
              <a className="cursor-pointer" onClick={onRegister}>
                <i>Register</i>
              </a>
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
