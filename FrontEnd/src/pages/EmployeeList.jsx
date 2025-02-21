import axios from "axios";
import { useEffect, useState } from "react";
import * as constants from "../constants/constants";
import { getToken } from "../services/token-decode-service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactPaginate from "react-paginate";
import AddEmployeeModal from "../components/AddEmployeeModal";
import UpdateEmployeeModal from "../components/UpdateEmployeeModal";
import { FaSearch } from "react-icons/fa";

function EmployeeList() {
  let [empArray, setEmployeeArray] = useState([]); // setting up an array for the employee list
  let [inputValue, setInputValue] = useState(); // for sweetalert
  let [pageCount, setPageCount] = useState(1); // total pages
  let [currentPage, setCurrentPage] = useState(1);
  let [currentLimit, setCurrentLimit] = useState(10);
  let [filterValue, setFilterValue] = useState();
  let [searchValue, setSearchValue] = useState();
  let [sortValue, setSortValue] = useState();

  let [queryParams, setQueryParams] = useState({});
  const [selectedEmp, setSelectedEmp] = useState("");

  const departmentsArray = ["IT", "Finance", "HR", "Marketing", "Operations"];
  const limitArray = ["5", "10", "15", "20"];
  const axiosHeader = { headers: { Authorization: `Bearer ${getToken()}` } };

  useEffect(() => {
    // console.log("useeffect queryparams=== ", queryParams);
    getAllEmployees(queryParams);
  }, [queryParams]);

  // to get all employees for the table limit, search, page, filterDept
  const getAllEmployees = (queryParams) => {
    let axiosRequest;
    const primaryRequest = constants.API_URL + constants.GET_ALL_EMPLOYEES;

    axiosRequest = axios.get(`${primaryRequest}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: queryParams,
    });

    // console.log("query params in get all employees---> ", queryParams);

    axiosRequest
      .then((response) => {
        setEmployeeArray(response.data.employees); // changing employee array
        setPageCount(response.data.totalPages); // setting how many pages are there
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
    console.log("searching value is....... ", searchValue);
  };

  const sortById = (e) => {
    const sort = e.target.value;
    setQueryParams((prev) => ({ ...prev, sortById: sort }));
    getAllEmployees();
  };

  // on page change
  const handlePageChange = (event) => {
    console.log(event.selected);
    setCurrentPage(event.selected + 1);
    setQueryParams((prev) => ({ ...prev, page: event.selected + 1 }));
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
              getAllEmployees();
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
          {/* ADD NEW EMPLOYEE */}
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

          {/* SORTING */}
          <div>
            <select
              value={sortValue}
              onChange={(e) => sortById(e)}
              className="form-select"
            >
              <option value="">Sort</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
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
              <option value="Select">Filter</option>
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
              <span className="input-group-text">
                <FaSearch />
              </span>
              <input
                className="form-control"
                value={searchValue}
                onChange={(e) => handleSearch(e)}
                type="text"
              />
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
                  <td className="align-middle"> {employee.name} </td>
                  <td className="align-middle"> {employee.department} </td>
                  <td className="align-middle"> {employee.designation} </td>
                  <td className="align-middle">
                    <div>
                      <button
                        className="btn btn-sm btn-warning m-1"
                        type="button"
                        onClick={() => setSelectedEmp(employee)}
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
      <AddEmployeeModal onAddEmployee={getAllEmployees} id={"addEmployeeModal"} />

      {selectedEmp && (
        <UpdateEmployeeModal
          employeeFromList={selectedEmp}
          onEmployeeUpdate={getAllEmployees}
          modalId={"updateModal"}
        />
      )}
    </div>



  );
}

export default EmployeeList;
