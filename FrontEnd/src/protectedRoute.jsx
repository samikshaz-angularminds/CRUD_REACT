import { Navigate, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { getToken } from "./services/token-decode-service";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }

    return undefined;
  }, [navigate]);

  if(!isLoggedIn){
    return undefined;
  }

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
