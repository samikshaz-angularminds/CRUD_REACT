import { useEffect, useState } from "react";
import axios from "axios";
import * as constants from "../constants/constants";
import { getToken } from "../services/token-decode-service";
import UpdateAdminModal from "../components/UpdateAdminModal";

function AdminProfile() {
  const [admin, setAdmin] = useState();

  useEffect(() => {
    getAdmin();
  }, []);

  //   to get Primary Info
  const getAdmin = () => {
    axios
      .get(constants.API_URL + constants.GET_ADMIN_PROFILE, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        console.log(response);
        setAdmin(response.data);
      })
      .catch((error) => {
        console.log("Error while getting admin information");
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="card">
        <div className="card-title">
          <div className="card-body">
            <div className="d-flex p-2">
              <div className="fw-bold profile-name-width d-flex justify-content-start">
                Name:
              </div>
              <div>&nbsp;{admin?.name}</div>
            </div>
            <div className="d-flex p-2">
              <div className="fw-bold profile-name-width d-flex justify-content-start">
                Department:
              </div>
              <div>&nbsp;{admin?.department}</div>
            </div>
            <div className="d-flex p-2">
              <div className="fw-bold profile-name-width d-flex justify-content-start">
                Email:
              </div>
              <div>&nbsp;{admin?.email}</div>
            </div>
            <div className="d-flex p-2">
              <div className="fw-bold profile-name-width d-flex justify-content-start">
                Phone Number:
              </div>
              <div>&nbsp;{admin?.phoneNo}</div>
            </div>
            <div className="d-flex p-2">
              <div className="fw-bold profile-name-width d-flex justify-content-start">
                Marital Status:
              </div>
              <div>&nbsp;{admin?.marital_status}</div>
            </div>
          </div>
          <div>
            <button
              className="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#updateAdminModal"
            >
              UPDATE PROFILE
            </button>
            
            { admin !== undefined &&
              <UpdateAdminModal
                adminFromProfile={admin}
                modalId={"updateAdminModal"}
                onAdminUpdate={getAdmin}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
