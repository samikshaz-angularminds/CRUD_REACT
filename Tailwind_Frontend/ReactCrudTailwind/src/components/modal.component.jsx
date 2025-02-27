import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import * as constants from "../constants/apiConstant";
import { getToken } from "../services/token.service";

const employeeSchema = z.object({
  employee_id: z.string().min(1, "Employee ID is required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  linkedIn: z.string().url("Invalid LinkedIn URL"),
  phoneNo: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  age: z.preprocess(
    (val) => Number(val),
    z.number().min(18, "Minimum age is 18")
  ),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gender: z.enum(["Male", "Female", "Other"], "Gender is required"),
  experience: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Experience cannot be negative")
  ),
  department: z.string().min(1, "Department is required"),
  date_of_joining: z.string().min(1, "Date of joining is required"),
  resume: z.any().refine((file) => file?.length > 0, "Resume is required"),
  profile_picture: z
    .any()
    .refine((file) => file?.length > 0, "Profile picture is required"),
  workShift: z.array(z.string()).min(1, "Select at least one work shift"),
});

function ModalComponent({ modal_id, updateEmployee, onRefresh }) {
  const [employeeValues, setEmployeeValues] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      employee_id: "",
      name: "",
      email: "",
      linkedIn: "",
      phoneNo: "",
      age: "",
      password: "",
      gender: "",
      experience: "",
      department: "",
      date_of_joining: "",
      resume: null,
      profile_picture: null,
      workShift: [],
    },
  });

  const workShiftArray = ["Night", "Day", "Evening"];
  const genderArray = ["Male", "Female", "Other"];
  const departmentsArray = ["IT", "Finance", "HR", "Marketing", "Operations"];

  useEffect(() => {
    if (modal_id === "updateEmployeeModal" && updateEmployee) {
      setEmployeeValues(updateEmployee);
      Object.keys(updateEmployee).forEach((key) => {
        setValue(key, updateEmployee[key]);
      });

      console.log("id of modal---> ", modal_id);
      console.log("employee to be updated---> ", updateEmployee);
    }
  }, [modal_id, updateEmployee, setValue]);

  const onAddEmployee = (data) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    const formData = new FormData();

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
    formData.append("profile_picture", data.profile_picture[0]);
    data.workShift.forEach((shift) => {
      formData.append("workShift", shift);
    });

    // axios
    //   .post(constants.API_URL + constants.ADD_EMPLOYEE, formData, {
    //     headers: { Authorization: `Bearer ${getToken()}` },
    //   })
    //   .then((response) => {
    //     console.log("response after adding... ", response);
    //     closeModal();
    //   })
    //   .catch((error) => {
    //     console.log("ERROR WHILE ADDING AN EMPLOYEE: ", error);
    //   });
  };

  const onUpdateEmployee = (data) => {
    try {
      console.log(data);
      console.log("hiiiiiiiiiiiiiiii");
      setEmployeeValues(data);
      const formData = new FormData();

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
      formData.append("profile_picture", data.profile_picture[0]);
      data.workShift.forEach((shift) => {
        formData.append("workShift", shift);
      });

      axios
        .put(
          constants.API_URL +
            constants.GET_UPDATE_DELETE_EMPLOYEE +
            updateEmployee?._id,
          formData,
          { headers: { Authorization: `Bearer ${getToken()}` } }
        )
        .then((response) => {
          console.log("employee UPDATED SUCCESSFULLY: ", response);
          closeModal();
        })
        .catch((error) => {
          console.log(
            "ERROR OCCURRED WHILE UPDATING AN EMPLOYEE INFORMATION: ",
            error
          );
        });
    } catch (error) {
      console.log("errrrrrrrrrrrrrrrrrrrr: ", error);
    }
  };

  const closeModal = () => {
    document.getElementById(modal_id).classList.add("hidden");
    onRefresh();
  };

  return (
    <div id={modal_id} className=" absolute bg-amber-200">
      <div className="flex justify-end pt-3 pr-5 hover:cursor-pointer">
        <RxCross2 className="font-bold text-3xl" onClick={closeModal} />
      </div>

      <div className="py-6 px-12">
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
            {modal_id === "addEmployeeModal" && (
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
                  onChange={(e) => setValue("employee_id", e.target.value)}
                  // defaultValue={updateEmployee ? employeeValues?.employee_id : ""}
                  value={watch("employee_id") || ""}
                  name="employee_id"
                  className="bg-white w-full p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
                />
                {errors.employee_id && (
                  <p className="text-red-500">{errors.employee_id.message}</p>
                )}
              </div>
            )}

            {/* NAME */}
            <div className="p-3.5 w-full">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  Name
                </label>
              </div>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                // defaultValue={updateEmployee ? employeeValues?.name : ""}
                value={watch("name") || ""}
                onChange={(e) => setValue("name", e.target.value)}
                name="name"
                className="bg-white w-full  p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

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
                // defaultValue={updateEmployee ? employeeValues?.email : ""}
                value={watch("email") || ""}
                onChange={(e) => setValue("email", e.target.value)}
                name="email"
                className=" w-full bg-white p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="flex w-full">
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
                // defaultValue={updateEmployee ? employeeValues?.linkedIn : ""}
                value={watch("linkedIn") || ""}
                onChange={(e) => setValue("linkedIn", e.target.value)}
                name="linkedIn"
                className="bg-white w-full  p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
              {errors.linkedIn && (
                <p className="text-red-500">{errors.linkedIn.message}</p>
              )}
            </div>

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
                {...register("phoneNo", {
                  required: "Phone Number is required",
                })}
                // defaultValue={updateEmployee ? employeeValues?.phoneNo : ""}
                value={watch("phoneNo") || ""}
                onChange={(e) => setValue("phoneNo", e.target.value)}
                name="phoneNo"
                className="bg-white w-full  p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
              {errors.phoneNo && (
                <p className="text-red-500">{errors.phoneNo.message}</p>
              )}
            </div>

            {/* AGE */}
            {modal_id === "addEmployeeModal" && (
              <div className="p-3.5 w-full">
                <div>
                  <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                    Age
                  </label>
                </div>
                <input
                  type="number"
                  name="age"
                  // defaultValue={updateEmployee ? employeeValues?.age : ""}
                  value={watch("age") || ""}
                  onChange={(e) => setValue("age", e.target.value)}
                  {...register("age", { required: "Age is required" })}
                  className="bg-white w-full  p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
                />
                {errors.age && (
                  <p className="text-red-500">{errors.age.message}</p>
                )}
              </div>
            )}
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
                    // defaultChecked={
                    //   updateEmployee?.workShift?.includes(label) || false
                    // }
                    onChange={(e) => {
                      const selectedShifts = watch("workShift") || [];
                      setValue(
                        "workShift",
                        e.target.checked
                          ? [...selectedShifts, label] // add shift if checked
                          : selectedShifts.filter((s) => s !== label) // remove shift if unchecked
                      );
                    }}
                    defaultChecked={(watch("workShift") || [])?.includes(label)}
                    {...register("workShift", {
                      required: "Work shift is required",
                    })}
                  />
                  {label}
                </label>
              ))}
              {errors.workShift && (
                <p className="text-red-500">{errors.workShift.message}</p>
              )}
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
                    // defaultChecked={
                    //   updateEmployee?.gender
                    //     ? updateEmployee.gender === gender
                    //     : false
                    // }
                    onChange={(e) => setValue("gender", e.target.checked)}
                    checked={watch("gender") === gender}
                    {...register("gender", { required: "Gender is required" })}
                    className="m-1"
                  />
                  {gender}
                </label>
              ))}
              {errors.gender && (
                <p className="text-red-500">{errors.gender.message}</p>
              )}
            </div>

            {/* EXPERIENCE */}
            {modal_id === "addEmployeeModal" && (
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
                  // defaultValue={updateEmployee ? employeeValues?.experience : ""}
                  value={watch("experience") || ""}
                  onChange={(e) => setValue("experience", e.target.value)}
                  {...register("experience", {
                    required: "Experience is required",
                  })}
                  className=" bg-white w-full  p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
                />
                <output id="expValue" />
                {errors.experience && (
                  <p className="text-red-500">{errors.experience.message}</p>
                )}
              </div>
            )}
          </div>

          <div className="flex w-full">
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
                // defaultValue={updateEmployee ? employeeValues?.department : ""}
                value={watch("department") || ""}
                onChange={(e) => {
                  setValue("department", e.target.value);
                }}
                name="department"
                className="bg-white p-1 w-full  rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              >
                <option value="select">Select</option>
                {departmentsArray.map((dept, index) => (
                  <option value={dept} key={index}>
                    {dept}
                  </option>
                ))}
                {errors.department && (
                  <p className="text-red-500">{errors.department.message}</p>
                )}
              </select>
            </div>

            {/* DATE OF JOINING */}
            {modal_id === "addEmployeeModal" && (
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
                  // defaultValue={
                  //   updateEmployee ? employeeValues?.date_of_joining : ""
                  // }
                  value={watch("date_of_joining") || ""}
                  onChange={(e) => setValue("date_of_joining", e.target.value)}
                  name="date_of_joining"
                  className="bg-white w-full  p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
                />
                {errors.date_of_joining && (
                  <p className="text-red-500">
                    {errors.date_of_joining.message}
                  </p>
                )}
              </div>
            )}

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
                // defaultValue={
                //   updateEmployee ? employeeValues?.profile_picture : ""
                // }
                // onChange={(e) => setValue("profile_picture", e.target.files[0])}
                id="fileUpload2"
                className="hidden"
              />
            </div>
            {errors.profile_picture && (
              <p className="text-red-500">{errors.profile_picture.message}</p>
            )}
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
                    Select a resume
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
              // defaultValue={updateEmployee ? employeeValues?.resume : ""}
              // onChange={(e) => setValue("resume", e.target.files[0])}
              id="fileUpload"
              className="hidden"
            />
            {errors.resume && (
              <p className="text-red-500">{errors.resume.message}</p>
            )}
          </div>

          {/* SUBMIT  */}
          <div className="flex justify-center p-2 pt-4">
            <button className="  px-3 py-1 m-1 rounded-sm text-violet-950 bg-blue-300 hover:bg-blue-500 hover:cursor-pointer dark:text-amber-50">
              <span className="font-semibold">
                {modal_id === "addEmployeeModal"
                  ? "ADD EMPLOYEE"
                  : "UPDATE EMPLOYEE"}
              </span>
            </button>

            <button
              className="bg-cyan-500 text-amber-800 m-1 rounded-sm hover:cursor-pointer px-3 py-1"
              onClick={reset}
            >
              RESET
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalComponent;
