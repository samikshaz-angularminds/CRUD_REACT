import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowDown } from "react-icons/md";

function ModalComponent({ modal_id, updateEmployee }) {
  const [employeeValues, setEmployeeValues] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (modal_id === "updateEmployeeModal" && updateEmployee){
      setEmployeeValues(updateEmployee);
      console.log("id of modal---> ",modal_id);
      console.log("employee to be updated---> ",updateEmployee);
      
      
    }
  }, []);

  const onAddEmployee = (data) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  };
  const onUpdateEmployee = (data) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  };
  const workShiftArray = ["Night", "Day", "Evening"];
  const genderArray = ["Male", "Female", "Other"];

  const closeModal = () => {
    document.getElementById(modal_id).classList.add("hidden");
  };

  return (
    <div id={modal_id} className=" absolute bg-amber-200 mt-20 p-6 px-12">
      <form
        action=""
        className=""
        onSubmit={
          modal_id === "addEmployeeModal"
            ? handleSubmit(onAddEmployee)
            : handleSubmit(onUpdateEmployee)
        }
      >
        <div className="flex w-full">
          {/* EMPLOYEE ID */}
          <div className="p-3.5 w-full">
            <div>
              <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                Employee ID
              </label>
            </div>
            <input
              type="text"
              {...register("employee_id", {
                required: "Employee Id is required",
              })}
              defaultValue={updateEmployee ? employeeValues?.employee_id : ""}
              name="employee_id"
              className="bg-white w-full p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
            />
          </div>

          {/* NAME */}
          <div className="p-3.5 w-full">
            <div>
              <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                Nameemployee_id
              </label>
            </div>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              defaultValue={updateEmployee ? employeeValues?.name : ""}
              name="name"
              className="bg-white w-full  p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
            />
          </div>
        </div>

        <div className="flex w-full">
          {/* EMAIL */}
          <div className="p-3.5 w-full">
            <div>
              <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                Email
              </label>
            </div>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              defaultValue={updateEmployee ? employeeValues?.email : ""}
              name="email"
              className=" w-full bg-white p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
            />
          </div>

          {/* LINKEDIN */}
          <div className="p-3.5 w-full">
            <div>
              <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                LinkedIn
              </label>
            </div>
            <input
              type="url"
              {...register("linkedIn", {
                required: "LinkedIn url is required",
              })}
              defaultValue={updateEmployee ? employeeValues?.linkedIn : ""}
              name="linkedIn"
              className="bg-white w-full  p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
            />
          </div>
        </div>

        <div className="flex w-full">
          {/* PHONE NO */}
          <div className="p-3.5 w-full">
            <div>
              <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                Phone No
              </label>
            </div>
            <input
              type="phone"
              maxLength={10}
              {...register("phoneNo", { required: "Phone Number is required" })}
              defaultValue={updateEmployee ? employeeValues?.phoneNo : ""}
              name="phoneNo"
              className="bg-white w-full  p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
            />
          </div>

          {/* AGE */}
          <div className="p-3.5 w-full">
            <div>
              <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                Age
              </label>
            </div>
            <input
              type="number"
              name="age"
              defaultValue={updateEmployee ? employeeValues?.age : ""}
              {...register("age", { required: "Age is required" })}
              className="bg-white w-full  p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
            />
          </div>
        </div>

        <div className="flex w-full">
          {/* WORK SHIFT */}
          <div className="p-3.5 w-full">
            <div>
              <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                Work Shift
              </label>
            </div>
            {workShiftArray.map((label, index) => (
              <label key={index} className="mr-3">
                <input
                  type="checkbox"
                  name="workShift"
                  className="mr-1"
                  value={label}
                  checked = {updateEmployee?.workShift?.includes(label) || false}
                  {...register("workShift", {
                    required: "Work shift is required",
                  })}
                />
                {label}
              </label>
            ))}
          </div>

          {/* GENDER */}
          <div className="p-3.5 w-full">
            <div>
              <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                Gender
              </label>
            </div>

            {genderArray.map((gender, index) => (
              <label key={index} className="mr-3">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked = {updateEmployee?.gender === gender}
                  {...register("gender", { required: "Gender is required" })}
                  className="m-1"
                />
                {gender}
              </label>
            ))}
          </div>
        </div>

        <div className="flex w-full">
          {/* EXPERIENCE */}
          <div className="p-3.5 w-full relative">
            <div>
              <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                Experience
              </label>
            </div>
            <input
              type="range"
              name="experience"
              min={0}
              max={10}
              onInput={(e) =>
                (document.getElementById("expValue").textContent =
                  e.target.value)
              }
              defaultValue={updateEmployee ? employeeValues?.experience : ""}
              {...register("experience", {
                required: "Experience is required",
              })}
              className=" bg-white w-full  p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
            />
            <output id="expValue" />
          </div>

          {/* DEPARTMENT */}
          <div className="p-3.5 w-full">
            <div>
              <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                Department
              </label>
            </div>
            <select
              {...register("department", {
                required: "Department is required",
              })}
              defaultValue={updateEmployee ? employeeValues?.department : ""}
              name="department"
              className="bg-white p-1 w-full  rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
            >
              <option value="it">IT</option>
              <option value="it">IT2</option>
              <option value="it">IT3</option>
              <option value="it">IT4</option>
              <option value="it">IT5</option>
              <option value="it">IT6</option>
            </select>
          </div>
        </div>

        <div className="flex w-full">
          {/* DATE OF JOINING */}
          <div className="p-3.5 w-full">
            <div>
              <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                Date Of Joining
              </label>
            </div>
            <input
              type="date"
              {...register("date_of_joining", {
                required: "Date of joining is required",
              })}
              defaultValue={updateEmployee ? employeeValues?.date_of_joining : ""}
              name="date_of_joining"
              className="bg-white w-full  p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
            />
          </div>

          {/* RESUME */}
          <div className="p-3.5 w-full">
            <div>
              <div>
                <label htmlFor="" className="font-semibold">
                  Resume
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
              type="file"
              name="resume"
              {...register("resume", { required: "Resume is required" })}
              defaultValue={updateEmployee ? employeeValues?.resume : ""}
              id="fileUpload"
              className="hidden"
            />
          </div>
        </div>

        {/* PROFILE_PICTURE */}
        <div className="p-3.5 w-full">
          <div>
            <div>
              <label htmlFor="" className="font-semibold">
                Profile Picture
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
            type="file"
            name="profile_picture"
            {...register("profile_picture", {
              required: "Profile picture is required",
            })}
            defaultValue={updateEmployee ? employeeValues?.profile_picture : ""}
            id="fileUpload2"
            className="hidden"
          />
        </div>

        {/* SUBMIT  */}
        <div className="flex justify-center p-2 pt-4">
          <button className="  px-3 py-1 rounded-sm text-violet-950 bg-blue-300 hover:bg-blue-500 hover:cursor-pointer dark:text-amber-50">
            <span className="font-semibold">
              {modal_id === "addEmployeeModal"
                ? "ADD EMPLOYEE"
                : "UPDATE EMPLOYEE"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalComponent;
