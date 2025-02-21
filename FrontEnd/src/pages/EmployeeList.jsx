import axios from "axios";
import { useEffect, useState } from "react";
import * as constants from "../constants/constants";
import { getToken } from "../services/token-decode-service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Pagination from "../components/Pagination";
import ReactPaginate from "react-paginate";
import AddEmployeeModal from "../components/AddEmployeeModal";
import UpdateEmployeeModal from "../components/UpdateEmployeeModal";

function EmployeeList() {
  let [empArray, setEmployeeArray] = useState([]); // setting up an array for the employee list
  let [inputValue, setInputValue] = useState(); // for sweetalert
  let [load, setLoad] = useState(); // flag for delete
  let [pageCount, setPageCount] = useState(1); // total pages
  let [currentPage, setCurrentPage] = useState(1); // for tracking page number
  let [currentLimit, setCurrentLimit] = useState(10); // for limit per page
  let [filterValue, setFilterValue] = useState(); // for filtering by department
  let [searchValue, setSearchValue] = useState(); // for searching

  let [queryParams, setQueryParams] = useState({});
  const [selectedEmpId, setSelectedEmpId] = useState("");
  const [startIndex, setStartIndex] = useState(0);

  const departmentsArray = ["IT", "Finance", "HR", "Marketing", "Operations"];
  const limitArray = ["5", "10", "15", "20"];
  const axiosHeader = { headers: { Authorization: `Bearer ${getToken()}` } };

  useEffect(() => {
    // console.log("useeffect queryparams=== ", queryParams);

    getAllEmployees(queryParams);
  }, [load, queryParams]);

  // to get all employees for the table limit, search, page, filterDept
  const getAllEmployees = (queryParams) => {
    let axiosRequest;
    const primaryRequest = constants.API_URL + constants.GET_ALL_EMPLOYEES;

    axiosRequest = axios.get(`${primaryRequest}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: queryParams,
    });

    console.log("query params in get all employees---> ", queryParams);

    axiosRequest
      .then((response) => {
        console.log("Get All Employees Response--> ", response);
        console.log("Employees---> ", response.data.employees);
        setEmployeeArray(response.data.employees); // changing employee array
        setPageCount(response.data.totalPages); // setting how many pages are there
        // console.log("employee array: ", empArray); // will not print due to shallow comparison maybe
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      });
  };

  // filtering by department
  const handleFilter = (e) => {
    const department = e.target.value;
    setFilterValue(department);
    setQueryParams((prev) => ({ ...prev, filterDept: department })); // changing query params to call use effect
  };

  const handleLimit = (e) => {
    const limit = parseInt(e.target.value);
    setCurrentLimit(limit);
    setQueryParams((prev) => ({ ...prev, limit: limit })); // changing the query params to call use effect
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);
    setQueryParams((prev) => ({ ...prev, search: searchValue }));
  };

  const searchIt = () => {
  };

  // on page change
  const handlePageChange = (event) => {
    const newStartingIndex = (event.selected * currentLimit) % empArray.length;
    setStartIndex(newStartingIndex);
    console.log(event.selected);
    setCurrentPage(event.selected + 1);
    setQueryParams((prev) => ({ ...prev, page: event.selected + 1 }));
    // setEmployeeArray(empArray.slice())
  };

  // to display data in update modal
  const getEmployee = (employeeId) => {
    console.log("employee id in list: ", employeeId);

    setSelectedEmpId(employeeId);
  };

  // deleting an employee {employee} has been passed
  const deleteEmployee = (employee) => {
    // sweetalert for confirmation
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
              axiosHeader
            )
            .then((response) => {
              setLoad(true);
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
    <div className="container">
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-evenly">
          <div>
            <button
              className="btn btn-sm btn-light border-secondary-subtle"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#addEmployeeModal"
            >
              ADD EMPLOYEE
            </button>
          </div>

          {/* FILTERING */}
          <div>
            <select
              className="form-select"
              name=""
              id=""
              value={filterValue}
              onChange={(e) => handleFilter(e)}
            >
              <option value="Select">Select</option>
              {departmentsArray.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>

          {/* LIMITING */}
          <div>
            <select
              className="form-select"
              value={10}
              onChange={(e) => handleLimit(e)}
            >
              <option value="Select">Select</option>
              {limitArray.map((limit, index) => (
                <option key={index} value={limit}>
                  {limit}
                </option>
              ))}
            </select>
          </div>

          {/* SEARCHING */}
          <div>
            <div className="input-group">
              <input
                className="form-control"
                value={searchValue}
                onChange={(e) => handleSearch(e)}
                type="text"
              />
              <span
                className="input-group-text cursor-pointer"
                onClick={searchIt}
              >
                search
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* employee list */}
      <div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {empArray.map((employee, index) => (
                <tr key={index}>
                  <td className="align-middle"> {employee.employee_id} </td>
                  <td  className="align-middle"> {employee.name} </td>
                  <td  className="align-middle"> {employee.department} </td>
                  <td  className="align-middle"> {employee.designation} </td>
                  <td  className="align-middle">
                    <div>
                      <button
                        className="btn btn-sm btn-warning m-1"
                        type="button"
                        onClick={() => setSelectedEmpId(employee._id)}
                        data-bs-toggle="modal"
                        data-bs-target="#updateModal"
                        
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-sm btn-danger m-1"
                        type="button"
                        onClick={() => deleteEmployee(employee)}
                      >
                        Delete
                      </button>
                    </div>
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
      </div>
      <AddEmployeeModal id={"addEmployeeModal"} />

      {selectedEmpId && (
        <UpdateEmployeeModal modalId={"updateModal"} empId={selectedEmpId} />
      )}
    </div>
  );
}

export default EmployeeList;
