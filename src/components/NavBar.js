import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="pb-2 pt-6 pl-12 font-semibold bg-black flex text-white">
      <nav className="w-full ">
        <div className="flex items-center">
          <NavLink className="mx-12"
            to="/"
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "cyan" : "white",
              };
            }}>
            Home
          </NavLink>

          {isLoggedIn && (
            <>
              <NavLink className="mx-6"
                to="/projects"
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "cyan" : "white",
                    };
                }}>
                Projects
              </NavLink>

              <NavLink className="mx-6"
                to="/contributions"
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "cyan" : "white",
                  };
                }}>
                Collaborations
              </NavLink>

              <NavLink className="mx-6"
                to="/community"
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "cyan" : "white",
                  };
                }}>
                Community
              </NavLink>   

              <NavLink className="mx-6"
                to="/userprofilepage"
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "cyan" : "white",
                  };
                }}>
                User Profile
              </NavLink>

              <NavLink className="mx-6"
                to="/inbox"
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "cyan" : "white",
                  };
                }}>
                Messages
              </NavLink>

              <div className="ml-auto">
                <span className="text-cyan-500 font-bold mr-1 ">
                  {user && user.name}
                </span>
                <button className={`mx-8 font-bold ${isLoggedIn ? 'text-red-600' : "" }`}
                  onClick={logOutUser}
                  >
                  Logout
                </button>
              </div>
            </>
          )}

          {!isLoggedIn && (
            <>
              <NavLink className="mx-8"
                to="/signup"
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "cyan" : "white",
                  };
                }}>
                SignUp
              </NavLink>

              <NavLink className="mx-8"
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
      </nav>
    </div>
  );
}

export default Navbar;
