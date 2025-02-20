import { useState } from "react";
import * as constants from "../constants/constants";
import { getToken } from "../services/token-decode-service";
import axios from "axios";


function AddEmployeeModal({ id }) {
  const [employeeData, setEmployeeData] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: "",
    designation: "",
    phoneNo: "",
    gender: "",
    marital_status: "",
  });
  const maritalStatusOptions = ["Married", "Unmarried"];
  const genderArray = ["Male", "Female", "Other", "Prefer Not To Say"];
  const departmentsArray = ["IT", "Finance", "HR", "Marketing", "Operations"];

  

  const handleAddChange = (event) => {
    const eventValue = event.target.value;
    const eventName = event.target.name;

    setEmployeeData((prev) => ({ ...prev, [eventName]: eventValue }));
  };

  //to add an employee
  const submitForm = (event) => {
    event.preventDefault(); // so that it only works on submit form
    console.log(employeeData);

    axios
      .post(constants.API_URL + constants.ADD_EMPLOYEE, employeeData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        console.log("response after adding... ",response);
        
      })
      .catch((error) => {
        console.log("ERROR WHILE ADDING AN EMPLOYEE: ", error);
      });
  };

  return (
      <div
        className="modal fade"
        id={id}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-center align-items-center">
              <h1 className="modal-title fs-5 " >
                ADD EMPLOYEE
              </h1>
            </div>
            <div className="modal-body">
              <div>
                <form action="" onSubmit={submitForm}>
                  <div className="mt-2">
                    <div className="d-flex align-items-start ">
                      <label
                        htmlFor=""
                        className="form-label m-0 mt-1"
                        name="employeeId"
                      >
                        Employee ID
                      </label>
                    </div>
                    <input
                      type="text"
                      name="employee_id"
                      className="form-control"
                      value={employeeData.employee_id}
                      onChange={(e) => handleAddChange(e)}
                      required
                    />
                  </div>

                  <div className="mt-2">
                    <div className="d-flex align-items-start">
                      <label htmlFor="" className="form-label m-0 mt-1">
                        Name
                      </label>
                    </div>
                    <input
                      required
                      type="text"
                      name="name"
                      className="form-control"
                      value={employeeData.name}
                      onChange={(e) => handleAddChange(e)}
                    />
                  </div>

                  <div className="mt-2">
                    <div className="d-flex align-items-start">
                      <label htmlFor="" className="form-label m-0 mt-1 ">
                        Email
                      </label>
                    </div>
                    <input
                      required
                      type="text"
                      name="email"
                      className="form-control"
                      value={employeeData.email}
                      onChange={(e) => handleAddChange(e)}
                    />
                  </div>

                  <div className="mt-2">
                    <div className="d-flex align-items-start">
                      <label htmlFor="" className="form-label m-0">
                        Designation
                      </label>
                    </div>
                    <input
                      required
                      type="text"
                      name="designation"
                      className="form-control"
                      value={employeeData.designation}
                      onChange={(e) => handleAddChange(e)}
                    />
                  </div>

                  <div className="mt-2">
                    <div className="d-flex align-items-start">
                      <label htmlFor="" className="form-label m-0">
                        Department
                      </label>
                    </div>

                    <select
                      required
                      type="text"
                      name="department"
                      className="form-select"
                      value={employeeData.department}
                      onChange={(e) => handleAddChange(e)}
                    >
                      <option value="Select">Select</option>
                      {departmentsArray.map((department, index) => (
                        <option key={index} value={department}>
                          {department}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-2">
                    <div className="d-flex align-items-start">
                      <label htmlFor="" className="form-label m-0">
                        Phone No
                      </label>
                    </div>
                    <input
                      required
                      maxLength={10}
                      type="text"
                      name="phoneNo"
                      className="form-control"
                      value={employeeData.phoneNo}
                      onChange={(e) => handleAddChange(e)}
                    />
                  </div>

                  <div className="mt-2">
                    <div className="d-flex align-items-start">
                      <label htmlFor="" className="form-label m-0">
                        Gender
                      </label>
                    </div>
                    <select
                      required
                      className="form-select"
                      name="gender"
                      value={employeeData.gender}
                      onChange={(e) => handleAddChange(e)}
                    >
                      <option value="Select">Select</option>
                      {genderArray.map((gender, index) => (
                        <option value={gender} key={index}>
                          {gender}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-2">
                    <div className="d-flex align-items-start">
                      <label htmlFor="" className="form-label m-0">
                        Marital Status
                      </label>
                    </div>
                    <select
                      required
                      className="form-select"
                      value={employeeData.marital_status}
                      onChange={(e) => handleAddChange(e)}
                      name="marital_status"
                    >
                      {maritalStatusOptions.map((status, index) => (
                        <option
                          key={index}
                          value={status}
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-2">
                    <button type="submit" className="btn btn-sm btn-primary m-1" data-bs-dismiss="modal">
                      ADD
                    </button>
                    <button type="button" className="btn btn-sm btn-secondary m-1" data-bs-dismiss="modal">
                      CLOSE
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    
  );
}

export default AddEmployeeModal;
