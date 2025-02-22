import axios from "axios";
import * as constants from "../constants/constants";
import { useEffect, useState } from "react";
import { getToken } from "../services/token-decode-service";

function UpdateAdminModal({ adminFromProfile, modalId,onAdminUpdate }) {
  // console.log(admin);
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    if (adminFromProfile !== undefined) {
      setAdmin(adminFromProfile);
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const eventValue = e.target.value;
    const eventName = e.target.name;

    setAdmin((prev) => ({ ...prev, [eventName]: eventValue }));
  };

  const updateAdmin = () => {
    console.log("admin-----> ",admin);

    axios.put(constants.API_URL + constants.UPDATE_ADMIN,admin,{headers:{Authorization: `Bearer ${getToken()}`}})
    .then((response) =>{
        console.log(response);
        onAdminUpdate();
    })
    .catch((error) => {
        console.log("Error while updating an amin");
        
    })
  };

  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Update Admin
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form action="" onSubmit={updateAdmin}>
              <div>
                <div className="d-flex justify-content-start">
                  <label htmlFor="">Name</label>
                </div>
                <input
                  type="text"
                  name="name"
                  value={admin?.name}
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                />
              </div>

              <div>
                <div className="d-flex justify-content-start">
                  <label htmlFor="">Email</label>
                </div>
                <input
                  type="text"
                  value={admin?.email}
                  name="email"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                />
              </div>
              <div>
                <div className="d-flex justify-content-start">
                  <label htmlFor="">Phone No</label>
                </div>
                <input
                  type="text"
                  name="phoneNo"
                  value={admin?.phoneNo}
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  maxLength={10}
                />
              </div>
              <div>
                <div className="d-flex justify-content-start">
                  <label htmlFor="">Department</label>
                </div>
                <input
                  type="text"
                  name="department"
                  value={admin?.department}
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                />
              </div>
              <div className="mt-3">
                <button
                  type="button"
                  className="btn btn-secondary m-1"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary m-1">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateAdminModal;
