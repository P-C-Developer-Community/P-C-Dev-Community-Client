import { NavLink } from "react-router-dom";
import { Fragment, useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { Transition } from "@headlessui/react";
import logo from "../assets/WDC-logo-no-bg.png";

function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="">
      <nav className=" bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div
                className="flex-shrink-0"
                onClick={() => {
                  navigate("/");
                }}>
                <img className="h-24 w-20" src={logo} alt="Workflow" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {isLoggedIn && (
                    <>
                      <NavLink
                        className="px-2"
                        to="/projects"
                        style={({ isActive }) => {
                          return {
                            fontWeight: isActive ? "bold" : "",
                            color: isActive ? "cyan" : "white",
                          };
                        }}>
                        Projects
                      </NavLink>

                      <NavLink
                        className="px-2"
                        to="/contributions"
                        style={({ isActive }) => {
                          return {
                            fontWeight: isActive ? "bold" : "",
                            color: isActive ? "cyan" : "white",
                          };
                        }}>
                        Collaborations
                      </NavLink>

                      <NavLink
                        className="px-2"
                        to="/community"
                        style={({ isActive }) => {
                          return {
                            fontWeight: isActive ? "bold" : "",
                            color: isActive ? "cyan" : "white",
                          };
                        }}>
                        Community
                      </NavLink>

                      <NavLink
                        className="px-2"
                        to="/userprofilepage"
                        style={({ isActive }) => {
                          return {
                            fontWeight: isActive ? "bold" : "",
                            color: isActive ? "cyan" : "white",
                          };
                        }}>
                        User Profile
                      </NavLink>

                      <NavLink
                        className="px-2"
                        to="/inbox"
                        style={({ isActive }) => {
                          return {
                            fontWeight: isActive ? "bold" : "",
                            color: isActive ? "cyan" : "white",
                          };
                        }}>
                        Messages
                      </NavLink>

                      <div className="pl-24">
                        <div className=" flex items-center">
                          <span className=" text-cyan-500 font-bold ">
                            {user && user.name}
                          </span>
                          <button
                            className={`pl-2 font-bold ${
                              isLoggedIn ? "text-red-600" : ""
                            }`}
                            onClick={() => {
                              logOutUser();
                              navigate("/login");
                            }}>
                            Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {!isLoggedIn && (
                    <>
                      <NavLink
                        className="mx-8"
                        to="/signup"
                        style={({ isActive }) => {
                          return {
                            fontWeight: isActive ? "bold" : "",
                            color: isActive ? "cyan" : "white",
                          };
                        }}>
                        SignUp
                      </NavLink>

                      <NavLink
                        className="mx-8"
                        to="/login"
                        style={({ isActive }) => {
                          return {
                            fontWeight: isActive ? "bold" : "",
                            color: isActive ? "cyan" : "white",
                          };
                        }}>
                        Login
                      </NavLink>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-transparent inline-flex items-center text-white justify-center p-2 rounded-xl focus:outline-white focus:ring focus:ring-cyan-500 "
                aria-controls="mobile-menu"
                aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95">
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div
                className="px-2 pt-2 pb-3 space-y-1 sm:px-3 relative rounded-md backdrop-blur-sm  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                style={{ zIndex: 9999 }}>
                <ul>
                  <li>
                    <NavLink
                      className=""
                      to="/projects"
                      style={({ isActive }) => {
                        return {
                          fontWeight: isActive ? "bold" : "",
                          color: isActive ? "cyan" : "white",
                        };
                      }}>
                      Projects
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className=""
                      to="/contributions"
                      style={({ isActive }) => {
                        return {
                          fontWeight: isActive ? "bold" : "",
                          color: isActive ? "cyan" : "white",
                        };
                      }}>
                      Collaborations
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className="mx-8"
                      to="/login"
                      style={({ isActive }) => {
                        return {
                          fontWeight: isActive ? "bold" : "",
                          color: isActive ? "cyan" : "white",
                        };
                      }}>
                      Login
                    </NavLink>
                  </li>

                  {isLoggedIn && (
                    <>
                      <li>
                        <NavLink
                          className=""
                          to="/community"
                          style={({ isActive }) => {
                            return {
                              fontWeight: isActive ? "bold" : "",
                              color: isActive ? "cyan" : "white",
                            };
                          }}>
                          Community
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className=""
                          to="/userprofilepage"
                          style={({ isActive }) => {
                            return {
                              fontWeight: isActive ? "bold" : "",
                              color: isActive ? "cyan" : "white",
                            };
                          }}>
                          User Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className=""
                          to="/inbox"
                          style={({ isActive }) => {
                            return {
                              fontWeight: isActive ? "bold" : "",
                              color: isActive ? "cyan" : "white",
                            };
                          }}>
                          Messages
                        </NavLink>
                      </li>
                      <div className="">
                        <span className="text-cyan-500 font-bold mr-1 ">
                          {user && user.name}
                        </span>

                        <button
                          className={` font-bold ${
                            isLoggedIn ? "text-red-600" : ""
                          }`}
                          onClick={() => {
                            logOutUser();
                            navigate("/login");
                          }}>
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default NavBar;
