import { useCallback, useEffect, useState } from "react";
import ModalComponent from "../components/modal.component";
import axios from "axios";
import * as constants from "../constants/apiConstant";
import { getToken } from "../services/token.service";
import { FaSearch } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function EmployeeList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalId, setModalId] = useState("");
  const [employees, setEmployees] = useState([]);
  const [updatingEmployee, setUpdatingEmployee] = useState();

  const [inputValue, setInputValue] = useState(""); //for sweetalert
  const [pageCount, setPageCount] = useState(1); // total pages
  const [currentPage, setCurrentPage] = useState(1); // pagination
  const [currentLimit, setCurrentLimit] = useState(10); //setting limit
  const [filterValue, setFilterValue] = useState(""); //filter by department
  const [searchValue, setSearchValue] = useState(""); // search by name
  const [sortValue, setSortValue] = useState(""); // sort by employee ID
  const [queryParams, setQueryParams] = useState({}); // queryparameters to send if there are any

  const departmentsArray = ["IT", "Finance", "HR", "Marketing", "Operations"];
  const limitArray = ["5", "10", "15", "20"];
  const sortArray = [
    { val: "asc", display: "Ascending" },
    { val: "desc", display: "Descending" },
  ];

  useEffect(() => {
    getAllEmployees(queryParams);
  }, [queryParams]);

  const getAllEmployees = useCallback((queryParams) => {
    console.log("queryparams----- ", queryParams);

    axios
      .get(constants.API_URL + constants.GET_ALL_EMPLOYEES, {
        headers: { Authorization: `Bearer ${getToken()}` },
        params:queryParams ,
      })
      .then((response) => {
        console.log("all employees------- ",response);
        
        setEmployees(response.data.employees);
        setPageCount(response.data.totalPages);
      })
      .catch((error) => {
        console.log("error while getting all employees--> ", error);
      });
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

  // on page change
  const handlePageChange = (event) => {
    console.log(event.selected);
    setCurrentPage(event.selected + 1);
    setQueryParams((prev) => ({ ...prev, page: event.selected + 1 }));
  };

  // filtering by department
  const handleFilter = (e) => {
    const department = e.target.value;
    setFilterValue(department);
    setQueryParams((prev) => ({ ...prev, filterDept: department })); // changing query params to call use effect
  };

  const handleLimit = (e) => {
    const limit = parseInt(e.target.value);
    console.log("limit is---> ",limit);
    
    setCurrentLimit(limit);
    setQueryParams((prev) => ({ ...prev, limit: limit })); // changing the query params to call use effect
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);
    setQueryParams((prev) => ({ ...prev, search: searchValue }));
    console.log("searching value is....... ", searchValue);
  };

  const sortById = (e) => {
    const sort = e.target.value;
    console.log("sort");
    setSortValue(sort);
    setQueryParams((prev) => ({ ...prev, sortById: sort }));
  };

  // deleting an employee {employee} has been passed
  const deleteEmployee = (employee) => {
    // sweetalert for confirmation
    console.log("employee in delete: ",employee);
    
    const confirm = withReactContent(Swal).fire({
      title: <i>Do you really want to delete this employee? {employee.name}</i>,
      type: "text",
      inputValue,
      preConfirm: () => {
        setInputValue(Swal.getInput()?.value || "");
      },
    });

    // if confirmed, then proceed
    confirm
      .then((res) => {
        if (res.isConfirmed) {
          axios
            .delete(
              constants.API_URL +
                constants.GET_UPDATE_DELETE_EMPLOYEE +
                employee._id,
              {headers:{Authorization:`Bearer ${getToken()}`}}
            )
            .then((response) => {
              getAllEmployees(queryParams);
            })
            .catch((error) => {
              console.log("ERROR WHILE DELETING AN EMPLOYEE: ", error);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container mx-auto  mt-6   flex flex-col  items-center relative">
        {/* PAGE NAVBAR */}
        <div className="flex pb-6 justify-around w-full">
          {/* ADD NEW EMPLOYEE */}
          <div>
            <button
              className="bg-blue-400 hover:bg-blue-700 rounded-lg p-1.5 px-3 hover:cursor-pointer"
              onClick={openAddEmployeeModal}
            >
              ADD EMPLOYEE
            </button>
          </div>

          {/* SORTING */}
          <div className="w-24">
            <select
              value={sortValue}
              onChange={(e) => sortById(e)}
              className="border rounded-lg border-gray-400 p-2 outline-0 w-full"
            >
              <option value="select">Sort</option>
              {sortArray.map((sort, index) => (
                <option key={index} value={sort.val}>
                  {sort.display}
                </option>
              ))}
            </select>
          </div>

          {/* FILTER BY DEPARTMENT */}
          <div className="w-24">
            <select
              className="border rounded-lg border-gray-400 p-2 outline-0 w-full "
              value={filterValue}
              onChange={(e) => handleFilter(e)}
            >
              <option value="select">Select</option>
              {departmentsArray.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* LIMIT PER PAGE */}
          <div className="w-24">
            <select
              className="border rounded-lg border-gray-400 p-2 outline-0 w-full"
              value={currentLimit}
              onChange={(e) => handleLimit(e)}
            >
              <option value="select">Select</option>
              {limitArray.map((limit, index) => (
                <option key={index} value={limit}>
                  {limit}
                </option>
              ))}
            </select>
          </div>

          {/* SEARCH BY NAME */}
          <div className="flex justify-center items-center ">
            <label htmlFor="" className="flex">
              <input
                type="search"
                className="border border-2 border-green-400 rounded-l-lg focus:outline-0 p-1.5"
                value={searchValue}
                onChange={(e) => handleSearch(e)}
              />
              <span className="border border-2 border-green-400 border-l-0 flex justify-center items-center p-2 rounded-r-lg hover:cursor-pointer">
                <FaSearch />
              </span>
            </label>
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
              {employees?.map((employee, index) => (
                <tr key={index}>
                  <td className="p-3 text-center">{employee.employee_id}</td>
                  <td className="p-3 text-center">{employee.name}</td>
                  <td className="p-3 text-center">{employee.department}</td>
                  <td className="p-3 text-center">
                    {employee.date_of_joining}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      className="p-1 px-2 bg-amber-300 hover:bg-amber-500 rounded-lg m-1"
                      onClick={() => openUpdateEmployeeModal(employee)}
                    >
                      Update
                    </button>
                    <button
                      className="p-1 px-2 bg-red-500 hover:bg-red-600 rounded-lg m-1"
                      onClick={() => deleteEmployee(employee)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* PAGINATION */}
        <div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            previousLabel="< prev"
            pageRangeDisplayed={2}
            onPageChange={handlePageChange}
            renderOnZeroPageCount={null}
            pageCount={pageCount}
            className="pagination-class"
            nextClassName={currentPage === pageCount ? "disabled" : "enabled"}
          />
        </div>

        {modalOpen && (
          <ModalComponent
            modal_id={modalId}
            updateEmployee={updatingEmployee}
            onRefresh={() => {
              setModalOpen(false);
              getAllEmployees(queryParams);
            }}
          />
        )}
      </div>
    </>
  );
}

export default EmployeeList;
