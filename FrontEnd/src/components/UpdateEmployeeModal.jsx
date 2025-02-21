import axios from "axios";
import { useEffect, useState } from "react";
import * as constants from "../constants/constants";
import { getToken } from "../services/token-decode-service";


function UpdateEmployeeModal({ modalId, empId, onEmployeeUpdate }) {
  let [employee, setEmployee] = useState(); // to get one employee data
  const maritalStatusOptions = ["Married", "Unmarried"];
  const genderArray = ["Male", "Female", "Other", "Prefer Not To Say"];
  const departmentsArray = ["IT", "Finance", "HR", "Marketing", "Operations"];

  console.log(empId, "-----------", modalId);

  useEffect(() => {
    console.log("employee id in update: ", empId);

    if (empId) {
      getEmployee(empId);
    }
  }, [empId]);

  // to display data in update modal
  const getEmployee = (employeeId) => {
    axios
      .get(
        constants.API_URL + constants.GET_UPDATE_DELETE_EMPLOYEE + employeeId,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      )
      .then((response) => {
        console.log("update employee Response: ", response);
        setEmployee(response.data);
        onEmployeeUpdate();
      })
      .catch((error) => {
        console.log("ERROR WHILE GETTING AN EMPLOYEE: ", error);
      });
  };

  // handling changes while updating an employee
  const handleChange = (e) => {
    const eventName = e.target.name;
    const eventValue = e.target.value;
    setEmployee((prev) => ({ ...prev, [eventName]: eventValue }));
  };

  // employee id is passed to update an employee
  const updateEmployee = (employeeId) => {
    axios
      .put(
        constants.API_URL + constants.GET_UPDATE_DELETE_EMPLOYEE + employeeId,
        employee,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      )
      .then((response) => {
        console.log("employee UPDATED SUCCESSFULLY: ", response);
      })
      .catch((error) => {
        console.log(
          "ERROR OCCURRED WHILE UPDATING AN EMPLOYEE INFORMATION: ",
          error
        );
      });
  };

  return (
    <>
      
        <div
          className="modal fade "
          id={modalId}
          tabIndex="-1"
          aria-labelledby="updateModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">UPDATE EMPLOYEE</h1>
              </div>
              <div className="modal-body">
                <form action="" onSubmit={() => updateEmployee(employee._id)}>
                  <div className="mt-2">
                    <div className="d-flex align-items-start">
                      <label>Name</label>
                    </div>
                    <input
                      required
                      type="text"
                      name="name"
                      className="form-control"
                      defaultValue={employee?.name}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mt-2">
                    <div className="d-flex align-items-start">
                      <label>Email</label>
                    </div>
                    <input
                      required
                      type="text"
                      name="email"
                      className="form-control"
                      defaultValue={employee?.email}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mt-2">
                    <div className="d-flex align-items-start">
                      <label>Designation</label>
                    </div>
                    <input
                      required
                      type="text"
                      name="designation"
                      className="form-control"
                      defaultValue={employee?.designation}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mt-2">  

                    <div className="d-flex align-items-start">
                      <label>Department</label>
                    </div>

                    <select
                      required
                      type="text"
                      name="department"
                      className="form-select"
                      defaultValue={employee?.department}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="Select">Select</option>
                      {departmentsArray.map((department, index) => (
                        <option key={index} value={department}>
                          {" "}
                          {department}{" "}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-2">
                    <div className="d-flex align-items-start">
                      <label>Phone No</label>
                    </div>
                    <input
                      required
                      type="text"
                      name="phoneNo"
                      className="form-control"
                      defaultValue={employee?.phoneNo}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mt-2">
                    <div className="d-flex align-items-start">
                      <label>Gender</label>
                    </div>
                    <select
                      required
                      className="form-select"
                      name="gender"
                      defaultValue={employee?.gender}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="Select">Select</option>
                      {genderArray.map((gender, index) => (
                        <option value={gender} key={index}>
                          {" "}
                          {gender}{" "}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-2">
                    <div className="d-flex align-items-start">
                      <label>Marital Status</label>
                    </div>
                    <select
                      required
                      className="form-select"
                      defaultValue={employee?.marital_status}
                      onChange={(e) => handleChange(e)}
                      name="marital_status"
                    >
                      {maritalStatusOptions.map((status, index) => (
                        <option key={index} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-2">
                    <button type="submit" className="btn btn-sm btn-primary m-1">
                      UPDATE
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary m-1"
                      data-bs-dismiss="modal"
                    >
                      CLOSE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
     
    </>
  );
}

export default UpdateEmployeeModal;
