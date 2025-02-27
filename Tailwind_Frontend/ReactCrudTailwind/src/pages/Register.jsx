import { MdKeyboardArrowDown } from "react-icons/md";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as constants from "../constants/apiConstant";

function Register(params) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm();

  const workShiftArray = ["Night", "Day", "Evening"];
  const genderArray = ["Male", "Female", "Other"];

  const onFormSubmit = (data) => {    
    const formData = new FormData();
    console.log("data: ", data);

    formData.append("employee_id", data.employee_id);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("linkedIn", data.linkedIn);
    formData.append("phoneNo", data.phoneNo);
    formData.append("age", data.age);
    formData.append("password", data.password);
    formData.append("gender", data.gender);
    formData.append("experience", data.experience);
    formData.append("department", data.department);
    formData.append("date_of_joining", data.date_of_joining);
    formData.append("resume", data.resume[0]);
    data.workShift.forEach((shift) => {
      formData.append("workShift", shift);
    });

    // axios
    //   .post(`${constants.API_URL}${constants.ADMIN_REGISTER}`, formData)
    //   .then((response) => {
    //     console.log("response: ", response);
    //   })
    //   .catch((error) => {
    //     console.log("error occurred during admin registration");
    //   });
  };

  return (
    <div className="container mx-auto  mt-6   flex justify-center">
      <div className="border border-gray-500 mt-14 rounded-lg w-1/3 drop-shadow-lg bg-amber-200">
        <div className="p-4 mt-4 flex justify-center">
          <h2 className="text-2xl">Register</h2>
        </div>

        <div className="flex w-full justify-center mt-4 mb-16">
          <form
            action=""
            className="w-1/2"
            onSubmit={handleSubmit(onFormSubmit)}
          >

            {/* EMPLOYEE ID */}
            <div className="py-3.5 w-full">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  Employee ID<span className="text-red-600">*</span>
                </label>
              </div>
              <input
                type="text"
                {...register("employee_id", {
                  required: "Employee Id is required",
                })}
                onBlur={() => trigger("employee_id")}
                className="bg-white w-full p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
              {errors.employee_id && <p className="text-red-700"> {errors.employee_id.message} </p>}
            </div>

            {/* NAME */}
            <div className="py-3.5 w-full">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  Full Name<span className="text-red-600">*</span>
                </label>
              </div>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="bg-white w-full  p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
            </div>

            {/* EMAIL */}
            <div className="py-3.5 w-full">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  Email<span className="text-red-600">*</span>
                </label>
              </div>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className=" w-full bg-white p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
            </div>

            {/* LINKEDIN */}
            <div className="py-3.5 w-full">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  LinkedIn<span className="text-red-600">*</span>
                </label>
              </div>
              <input
                type="url"
                {...register("linkedIn", {
                  required: "LinkedIn url is required",
                })}
                className="bg-white w-full  p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
            </div>

            {/* PHONE NO */}
            <div className="py-3.5 w-full">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  Phone No<span className="text-red-600">*</span>
                </label>
              </div>
              <input
                type="phone"
                maxLength={10}
                {...register("phoneNo", {
                  required: "Phone number is required",
                })}
                className="bg-white w-full  p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
            </div>

            {/* AGE */}
            <div className="py-3.5 w-full">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  Age<span className="text-red-600">*</span>
                </label>
              </div>
              <input
                type="number"
                {...register("age", { required: "Age is required" })}
                className="bg-white w-full  p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
            </div>

            {/* PASSWORD */}
            <div className="py-3.5 w-full">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  Password<span className="text-red-600">*</span>
                </label>
              </div>
              <input
                type="password"
                {...register("password", {
                  required: "password is required",
                })}
                className="bg-white w-full  p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
            </div>

            {/* WORK SHIFT */}
            <div className="py-3.5 w-full">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  Work Shift<span className="text-red-600">*</span>
                </label>
              </div>
              {workShiftArray.map((label, index) => (
                <label key={index} className="mr-3">
                  <input
                    value={label}
                    {...register("workShift", {
                      required: "At least one shift is required",
                    })}
                    type="checkbox"
                    className="mr-1"
                  />
                  {label}
                </label>
              ))}
            </div>

            {/* GENDER */}
            <div className="py-3.5 w-full">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  Gender<span className="text-red-600">*</span>
                </label>
              </div>

              {genderArray.map((gender, index) => (
                <label key={index} className="mr-3">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    {...register("gender", {
                      required: "Gender is required",
                    })}
                    className="m-1 "
                  />
                  {gender}
                </label>
              ))}
            </div>

            {/* EXPERIENCE */}
            <div className="py-3.5 w-full relative">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  Experience<span className="text-red-600">*</span>
                </label>
              </div>
              <input
                type="range"
                name="experience"
                min={0}
                max={10}
                defaultValue={0}
                onInput={(e) =>
                  (document.getElementById("expValue").textContent =
                    e.target.value)
                }
                {...register("experience", {
                  required: "Experience is required",
                })}
                className=" bg-white w-full  p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
              <output id="expValue" />
            </div>

            {/* DEPARTMENT */}
            <div className="py-3.5 w-full">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  Department<span className="text-red-600">*</span>
                </label>
              </div>
              <select
                className="bg-white p-1 w-full  rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
                {...register("department", { required: true })}
              >
                <option value="it">IT</option>
                <option value="it">IT2</option>
                <option value="it">IT3</option>
                <option value="it">IT4</option>
                <option value="it">IT5</option>
                <option value="it">IT6</option>
              </select>
            </div>

            {/* DATE OF JOINING */}
            <div className="py-3.5 w-full">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  Date Of Joining<span className="text-red-600">*</span>
                </label>
              </div>
              <input
                type="date"
                {...register("date_of_joining", {
                  required: "date of joining is required",
                })}
                className="bg-white w-full  p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
            </div>

            {/* RESUME */}
            <div className="py-3.5 w-full">
              <div>
                <div>
                  <label htmlFor="" className="font-semibold">
                    Resume<span className="text-red-600">*</span>
                  </label>
                </div>
                <div>
                  <label htmlFor="fileUpload">
                    <span className="flex justify-between bg-white p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400">
                      Select a resume{" "}
                      <div className="text-lg content-center">
                        <MdKeyboardArrowDown />
                      </div>
                    </span>
                  </label>
                </div>
              </div>
              <input
                {...register("resume", {
                  required: "resume file is required",
                })}
                type="file"
                id="fileUpload"
                className="hidden"
              />
            </div>

            {/* PROFILE_PICTURE */}
            <div className="py-3.5 w-full">
              <div>
                <div>
                  <label htmlFor="" className="font-semibold">
                    Profile Picture<span className="text-red-600">*</span>
                  </label>
                </div>
                <div>
                  <label htmlFor="fileUpload2">
                    <span className="flex justify-between bg-white p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400">
                      Select a picture{" "}
                      <div className="text-lg content-center">
                        <MdKeyboardArrowDown />
                      </div>
                    </span>
                  </label>
                </div>
              </div>
              <input
                {...register("profile_picture", {
                  required: "profile_picture is required",
                })}
                type="file"
                id="fileUpload2"
                className="hidden"
              />
            </div>

            {/* SUBMIT  */}
            <div className="flex justify-center p-2 pt-4">
              <button className="  px-3 py-1 rounded-sm text-violet-950 bg-blue-300 hover:bg-blue-500 hover:cursor-pointer dark:text-amber-50">
                <span className="font-semibold">Register</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
