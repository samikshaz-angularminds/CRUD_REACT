import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as constants from "../constants/apiConstant";
import { saveToken } from "../services/token.service";

function Login() {
  const navigate = useNavigate();
  // const {register,handleSubmit,formState : {errors}} = useForm();
  const formik = useFormik({
    initialValues: {
      employee_id: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("====================================");
      console.log("form values: ", values);
      console.log("====================================");
      onLogin(values);
    },
  });

  const onLogin = (loginObject) => {
    axios
      .post(constants.API_URL + constants.ADMIN_LOGIN, loginObject)
      .then((response) => {
        saveToken(response.data.token);
        navigate("/employee-list")
      })
      .catch((error) => {
        console.log("an error has occurred during login...", error);
      });
  };

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
          <form action="" className="mx-auto" onSubmit={formik.handleSubmit}>
            <div className="p-3.5">
              <div>
                <label htmlFor="" className="dark:text-cyan-50">
                  Employee ID
                </label>
              </div>
              <input
                type="text"
                onChange={formik.handleChange}
                value={formik.values.employee_id}
                name="employee_id"
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
                onChange={formik.handleChange}
                value={formik.values.password}
                name="password"
                className="bg-white p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
            </div>

            <div className="flex justify-center p-2 pt-4">
              <div>
                <button
                  type="submit"
                  className="  px-3 py-1 rounded-sm text-violet-950 bg-blue-300 hover:bg-blue-500 hover:cursor-pointer dark:text-amber-50"
                >
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
