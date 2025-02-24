import { useState } from "react";
import ModalComponent from "../components/modal.component";

function EmployeeList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalId, setModalId] =useState("");

  const openAddEmployeeModal = () => {
    setModalOpen(true);
    setModalId("addEmployeeModal");
  };

  const openUpdateEmployeeModal = () => {
    setModalOpen(true);
    setModalId("updateEmployeeModal");
  };

  return (
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
              <th className="p-3">Designation</th>
              <th className="p-3">Date of Joining</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 text-center">ID 1</td>
              <td className="p-3 text-center">Sandy</td>
              <td className="p-3 text-center">Finance</td>
              <td className="p-3 text-center">Manager</td>
              <td className="p-3 text-center">11/10/2025</td>
              <td className="p-3 text-center">
                <button className="p-1 px-2 bg-amber-300 hover:bg-amber-500 rounded-lg m-1" onClick={openUpdateEmployeeModal}>
                  Update
                </button>
                <button className="p-1 px-2 bg-red-500 hover:bg-red-600 rounded-lg m-1">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td className="p-3 text-center">ID 2</td>
              <td className="p-3 text-center">John</td>
              <td className="p-3 text-center">IT</td>
              <td className="p-3 text-center">Developer</td>
              <td className="p-3 text-center">11/10/2025</td>
              <td className="p-3 text-center">
                <button className="p-1 px-2 bg-amber-300 hover:bg-amber-500 rounded-lg m-1">
                  Update
                </button>
                <button className="p-1 px-2 bg-red-500 hover:bg-red-600 rounded-lg m-1">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {modalOpen && <ModalComponent modal_id={modalId} />}
    </div>
  );
}

export default EmployeeList;
