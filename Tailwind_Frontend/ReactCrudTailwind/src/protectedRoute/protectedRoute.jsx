import { useNavigate } from "react-router-dom";
import { getToken } from "../services/token.service";
import { useEffect } from "react";
import Header from "../components/header.component";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return undefined;
    }
  }, [navigate]);

  return (
    <>
      {isLoggedIn && (
        <>
          <Header></Header> {children}
        </>
      )}
    </>
  );
}
