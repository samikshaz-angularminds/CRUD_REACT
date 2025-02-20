import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import { removeToken } from "../services/token-decode-service";

function Header() {

    const navigate = useNavigate();

    const onLogout = () => {
        console.log('====================================');
        console.log("in logout");
        console.log('====================================');
        localStorage.removeItem("token");
        navigate("/")
    }


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
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <div >
            <button className="btn btn-danger btn-sm" onClick={onLogout}>logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
