import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as constants from "../constants/apiConstant";
import { saveToken } from "../services/token.service";
import * as Yup from "yup";

function Login() {
  const navigate = useNavigate();
  // const {register,handleSubmit,formState : {errors}} = useForm();
  const formik = useFormik({
    initialValues: {
      employee_id: "",
      password: "",
    },
    validationSchema: Yup.object({
      employee_id: Yup.string().required("Employee ID is required"),
      password: Yup.string().required("Password is required"),
    }),
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
        navigate("/employee-list");
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
                  Employee ID<span className="text-red-600">*</span>
                </label>
              </div>
              <input
                type="text"
                onChange={formik.handleChange}
                value={formik.values.employee_id}
                {...formik.getFieldProps("employee_id")}
                name="employee_id"
                className="bg-white p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
              {formik.touched.employee_id && formik.errors.employee_id && (
                <div className="text-red-600 text-xs">
                  {" "}
                  {formik.errors.employee_id}{" "}
                </div>
              )}
            </div>

            <div className="p-3.5">
              <div>
                <label htmlFor="" className="dark:text-cyan-50">
                  Password<span className="text-red-600">*</span>
                </label>
              </div>
              <input
                type="text"
                onChange={formik.handleChange}
                value={formik.values.password}
                {...formik.getFieldProps("password")}
                name="password"
                onCopy={(e) => e.preventDefault()}
                onKeyDown={(e) => {
                  if (
                    (e.ctrlKey && e.key === "c") ||
                    (e.ctrlKey && e.key === "C") ||
                    (e.ctrlKey && e.key === "x") ||
                    (e.ctrlKey && e.key === "X")
                  ) {
                    e.preventDefault();
                  }
                }}
                onPaste={(e) => e.preventDefault()}
                className="bg-white p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-600 text-xs"> {formik.errors.password} </div>
              )}
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
