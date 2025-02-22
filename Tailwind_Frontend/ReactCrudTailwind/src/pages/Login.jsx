import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const [theme, setTheme] = useState("");
  const navigate = useNavigate();

  const onRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container mx-auto  mt-6   flex justify-center">
      <div className="border border-gray-500 mt-14 rounded-lg w-1/4 drop-shadow-lg bg-amber-200">
        <div className="p-4 mt-4 flex justify-center">
          <h2 className="text-2xl">Login</h2>
        </div>

        <div className="flex justify-center mt-4 mb-16">
          <form action="" className="mx-auto">
            <div className="p-3.5">
              <div>
                <label htmlFor="" className="dark:text-cyan-50">
                  Employee ID
                </label>
              </div>
              <input
                type="text"
                className="bg-white p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
            </div>

            <div className="p-3.5">
              <div>
                <label htmlFor="" className="dark:text-cyan-50">
                  Password
                </label>
              </div>
              <input
                type="text"
                className="bg-white p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
            </div>

            <div className="flex justify-center p-2 pt-4">
              <div>
                <button className="  px-3 py-1 rounded-sm text-violet-950 bg-blue-300 hover:bg-blue-500 hover:cursor-pointer dark:text-amber-50">
                  Login
                </button>
              </div>
            </div>
              <div className="flex justify-center">
                New User?{" "}
                <a
                  className="decoration-0 italic text-blue-500 hover:cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  &nbsp;Register here
                </a>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
