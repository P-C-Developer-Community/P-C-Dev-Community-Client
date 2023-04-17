import { Link } from "react-router-dom";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context";  
 


function Navbar() {
    const { 
        isLoggedIn,
        user,                   
        logOutUser              
      } = useContext(AuthContext);
     
 
   



      return (
        <nav>
          <Link to="/">
            <button>Home</button>
          </Link>
    
          {isLoggedIn && (
            <>
              <Link to="/projects">
                <button>Projects</button>
              </Link>

              <Link to="/contributions">
                <button>Contributions</button>
              </Link>

              <Link to="/userprofilepage">
                <button>User Profile</button>
              </Link>

              <Link to="/inbox">
                <button>Inbox</button>
              </Link>
    
              <button onClick={logOutUser}>Logout</button>
              <span>{user && user.name}</span>
            </>
          )}
    
          {!isLoggedIn && (
            <>
              <Link to="/signup">
               
                <button>Sign Up</button>
              </Link>
    
              <Link to="/login">
               
                <button>Login</button>
              </Link>
            </>
          )}
        </nav>
      );
    }
 
export default Navbar;