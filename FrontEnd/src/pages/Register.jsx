import { useState } from "react";
import axios from "axios";
import * as constants from "../constants/constants";

function Register() {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    department: "",
    password: "",
    employee_id: "",
    gender: "",
    phoneNo: "",
    marital_status: "",
  });

  const genderArray = ["Male", "Female", "Other", "Prefer Not To Say"];
  const maritalStatusArray = ["Married", "Unmarried"];

  const handleChange = (event) => {
    const eventValue = event.target.value;
    const eventName = event.target.name;

    console.log("====================================");
    console.log("EVENT VALUE: ", eventValue);
    console.log("====================================");
    console.log("====================================");
    console.log("EVENT NAME: ", eventName);
    console.log("====================================");

    setRegisterData((prev) => ({ ...prev, [eventName]: eventValue }));
  };

  const submitData = (event) => {
    event.preventDefault();
    console.log(registerData);

    axios
      .post(constants.API_URL + constants.ADMIN_REGISTER, registerData)
      .then((response) => {
        console.log("====================================");
        console.log("RESPONSE OF REGISTER: ", response);
        console.log("====================================");
      })
      .catch((error) => {
        console.log("====================================");
        console.log("Error encountered while registering the user: ", error);
        console.log("====================================");
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card register-form-width">
        <form action="" onSubmit={submitData}>
          <div className="mt-2">
            <div className="d-flex justify-content-start">
              <label htmlFor="">Name</label>
            </div>
            <input
              type="text"
              className="form-control"
              name="name"
              value={registerData.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mt-2">
            <div className="d-flex justify-content-start">
              <label htmlFor="">Email</label>
            </div>
            <input
              type="email"
              className="form-control"
              name="email"
              value={registerData.email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mt-2">
            <div className="d-flex justify-content-start">
              <label htmlFor="">Department</label>
            </div>
            <input
              type="text"
              className="form-control"
              name="department"
              value={registerData.department}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mt-2">
            <div className="d-flex justify-content-start">
              <label htmlFor="">Password</label>
            </div>
            <input
              type="text"
              className="form-control"
              name="password"
              value={registerData.password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mt-2">
            <div className="d-flex justify-content-start">
              <label htmlFor="">Employee ID</label>
            </div>
            <input
              type="text"
              className="form-control"
              name="employee_id"
              value={registerData.employee_id}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="mt-2">
            <div className="d-flex justify-content-start">
              <label htmlFor="">Gender</label>
            </div>
            <select
              className="form-select"
              value={registerData.gender}
              name="gender"
              onChange={(e) => handleChange(e)}
            >
              <option value="Select">Select</option>
              {genderArray.map((gender, index) => (
                <option key={index} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2">
            <div className="d-flex justify-content-start">
              <label htmlFor="">Phone No</label>
            </div>
            <input
              maxLength={10}
              type="text"
              className="form-control"
              name="phoneNo"
              value={registerData.phoneNo}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mt-2">
            <div className="d-flex justify-content-start">
              <label htmlFor="">Marital Status</label>
            </div>

            <select
              name="marital_status"
              value={registerData.marital_status}
              onChange={(e) => handleChange(e)}
              className="form-select"
            >
              <option value="Select"> Select </option>
              {maritalStatusArray.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2">
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
