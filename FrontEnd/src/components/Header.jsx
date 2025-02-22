import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

function Header() {
  const navigate = useNavigate();


  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/",{replace:true});
  };


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
      <div className="container">
        <a className="navbar-brand" href="#">
          Employee Site
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <div className="d-flex">
            <div className="d-flex justify-content-center align-items-center m-1" onClick={() => navigate("/my-profile")}>
              <CgProfile className="font-size-25 cursor-pointer"  />
            </div>
            <div className="m-1">
              <button className="btn btn-danger btn-sm" onClick={onLogout}>
                logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
