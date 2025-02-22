import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

function Register(params) {
  const [range, setRange] = useState(0);

  return (
    <div className="container mx-auto  mt-6   flex justify-center">
      <div className="border border-gray-500 mt-14 rounded-lg w-1/4 drop-shadow-lg bg-amber-200">
        <div className="p-4 mt-4 flex justify-center">
          <h2 className="text-2xl">Register</h2>
        </div>

        <div className="flex justify-center mt-4 mb-16">
          <form action="" className="mx-auto">
            {/* EMPLOYEE ID */}
            <div className="p-3.5">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  Employee ID
                </label>
              </div>
              <input
                type="text"
                className="bg-white p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
            </div>

            {/* NAME */}
            <div className="p-3.5">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  Name
                </label>
              </div>
              <input
                type="text"
                className="bg-white p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
            </div>

            {/* EMAIL */}
            <div className="p-3.5">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  Email
                </label>
              </div>
              <input
                type="email"
                className="bg-white p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
            </div>

            {/* LINKEDIN */}
            <div className="p-3.5">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  LinkedIn
                </label>
              </div>
              <input
                type="url"
                className="bg-white p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
            </div>

            {/* PHONE NO */}
            <div className="p-3.5">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  Phone No
                </label>
              </div>
              <input
                type="phone"
                className="bg-white p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
            </div>

            {/* AGE */}
            <div className="p-3.5">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  Age
                </label>
              </div>
              <input
                type="number"
                className="bg-white p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
            </div>

            {/* PASSWORD */}
            <div className="p-3.5">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  Password
                </label>
              </div>
              <input
                type="password"
                className="bg-white p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
            </div>

            {/* WORK SHIFT */}
            <div className="p-3.5">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  Work Shift
                </label>
              </div>
              <label className="pr-2">
                <input type="checkbox" name="shift" className="m-1" />
                Night
              </label>
              <label className="p-2">
                <input type="checkbox" name="shift" className="m-1" />
                Day
              </label>
              <label className="p-2">
                <input type="checkbox" name="shift" className="m-1" />
                Evening
              </label>
            </div>

            {/* GENDER */}
            <div className="p-3.5">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  Gender
                </label>
              </div>

              <label className="pr-2">
                {" "}
                <input type="radio" name="gender" className="m-1" />
                Male{" "}
              </label>
              <label className="p-2">
                {" "}
                <input type="radio" name="gender" className="m-1" />
                Female{" "}
              </label>
              <label className="p-2">
                {" "}
                <input type="radio" name="gender" className="m-1" />
                Other{" "}
              </label>
            </div>

            {/* EXPERIENCE */}
            <div className="p-3.5 relative">
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
                defaultValue={0}
                onInput={(e) =>
                  (document.getElementById("expValue").textContent =
                    e.target.value)
                }
                className=" bg-white p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
              <output id="expValue" />
            </div>

            {/* DEPARTMENT */}
            <div className="p-3.5">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  Department
                </label>
              </div>
              <select className="bg-white p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400">
                <option value="it">IT</option>
                <option value="it">IT</option>
                <option value="it">IT</option>
                <option value="it">IT</option>
                <option value="it">IT</option>
                <option value="it">IT</option>
              </select>
            </div>

            {/* DATE OF JOINING */}
            <div className="p-3.5">
              <div>
                <label htmlFor="" className="dark:text-cyan-50 font-semibold">
                  Date Of Joining
                </label>
              </div>
              <input
                type="date"
                className="bg-white p-1 rounded-sm border focus:border-l-0 border-l-0 focus:outline-0 focus:border-t-0 border-t-0 focus:border-r-0 border-r-0 focus:border-b-gray-400 border-b-gray-400"
              />
            </div>

            {/* RESUME */}
            <div className="p-3.5">
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
              <input type="file" id="fileUpload" className="hidden" />
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
