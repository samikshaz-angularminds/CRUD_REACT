import { useEffect, useState } from "react";
import ModalComponent from "../components/modal.component";
import axios from "axios";
import * as constants from "../constants/apiConstant";
import { getToken } from "../services/token.service";

function EmployeeList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalId, setModalId] = useState("");
  const [employees, setEmployees] = useState();
  const [updatingEmployee, setUpdatingEmployee] = useState();

  useEffect(() => {
    getAllEmployees();
  }, []);

  const openAddEmployeeModal = () => {
    setModalOpen(true);
    setModalId("addEmployeeModal");
  };

  const openUpdateEmployeeModal = (employee) => {
    setModalOpen(true);
    setModalId("updateEmployeeModal");
    setUpdatingEmployee(employee);
  };

  const getAllEmployees = () => {
    axios
      .get(constants.API_URL + constants.GET_ALL_EMPLOYEES, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        setEmployees(response.data.employees);
      })
      .catch((error) => {
        console.log("error while getting all employees--> ", error);
      });
  };

  return (
    <>
      <div className="container mx-auto  mt-6   flex flex-col  items-center relative">
        {/* PAGE NAVBAR */}
        <div className="flex pb-6 justify-around w-full">
          <div>
            <button
              className="bg-blue-400 hover:bg-blue-700 rounded-lg p-1.5 px-3 hover:cursor-pointer"
              onClick={openAddEmployeeModal}
            >
              ADD EMPLOYEE
            </button>
          </div>
          <div>
            <select
              name=""
              id=""
              className="border rounded-lg border-gray-400 p-2 outline-0 "
            >
              <option value="select">Select</option>
              <option value="select">IT</option>
              <option value="select">Finance</option>
              <option value="select">Marketing</option>
              <option value="select">HR</option>
            </select>
          </div>
        </div>

        <div className="border border-amber-700 rounded-lg p-3 w-full">
          <table className="w-full">
            <thead>
              <tr className="border border-l-0 border-t-0 border-r-0 border-b-neutral-700">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Department</th>
                <th className="p-3">Date of Joining</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                employees?.map((employee,index) => (

              <tr key={index}>
                <td className="p-3 text-center">{employee.employee_id}</td>
                <td className="p-3 text-center">{employee.name}</td>
                <td className="p-3 text-center">{employee.department}</td>
                <td className="p-3 text-center">{employee.date_of_joining}</td>
                <td className="p-3 text-center">
                  <button
                    className="p-1 px-2 bg-amber-300 hover:bg-amber-500 rounded-lg m-1"
                    onClick={() => openUpdateEmployeeModal(employee)}
                  >
                    Update
                  </button>
                  <button className="p-1 px-2 bg-red-500 hover:bg-red-600 rounded-lg m-1">
                    Delete
                  </button>
                </td>
              </tr>
                ))
              }
              
            </tbody>
          </table>
        </div>

        {modalOpen && <ModalComponent modal_id={modalId} updateEmployee={updatingEmployee} />}
      </div>
    </>
  );
}

export default EmployeeList;
