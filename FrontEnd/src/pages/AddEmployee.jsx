import { useState } from "react";


function AddEmployee() {
    const [employeeData, setEmployeeData] = useState({
        employeeId: "",
        name: "",
        email: "",
        designation: "",
        department: "",
        phoneNo: "",
        gender: "",
        dateOfBirth: "",
        maritalStatus: "",
      });
    
      const maritalStatusOptions = [
        { id: 1, value: "married", name: "Married" },
        { id: 2, value: "single", name: "Single" },
      ];
    
      const handleChange = (event) => {
        const eventValue = event.target.value;
        const eventName = event.target.name;
    
        setEmployeeData((prev) => ({ ...prev, [eventName]: eventValue }));
      };
    
      const submitForm = (event) => {
        event.preventDefault();
        console.log("====================================");
        console.log(employeeData);
        console.log("====================================");
      };
    
      return (
        <>
          <div className="card">
            <form action="" onSubmit={submitForm}>
              <div>
                <label htmlFor="" className="form-label" name="employeeId">
                  Employee ID
                </label>
                <input
                  type="text"
                  name="employeeId"
                  className="form-control"
                  value={employeeData.employeeId}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label htmlFor="" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={employeeData.name}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label htmlFor="" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  value={employeeData.email}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label htmlFor="" className="form-label">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  className="form-control"
                  value={employeeData.designation}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label htmlFor="" className="form-label">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  className="form-control"
                  value={employeeData.department}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label htmlFor="" className="form-label">
                  Phone No
                </label>
                <input
                  type="text"
                  name="phoneNo"
                  className="form-control"
                  value={employeeData.phoneNo}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label htmlFor="" className="form-label">
                  Gender
                </label>
                <input
                  type="text"
                  name="gender"
                  className="form-control"
                  value={employeeData.gender}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label htmlFor="datepicker" className="form-label">
                  Date Of Birth
                </label>
                <input
                  type="date"
                  id="datepicker"
                  name="dateOfBirth"
                  className="form-control"
                  value={employeeData.dateOfBirth}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label htmlFor="" className="form-label">
                  Marital Status
                </label>
                <select className="form-select" name="" id="">
                  {maritalStatusOptions.map((status) => (
                    <option key={status.id} value={status.value}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
    
              <div>
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </form>
          </div>
        </>
      );
}

export default AddEmployee;