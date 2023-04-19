import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import backgroundImage from "../assets/login-bg.jpeg";


 
 
function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
 
    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div
      className=" flex jusitfy-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col md:flex-row w-full md:w-4/5 xl:w-3/5 bg-transparent rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-transparent backdrop-blur-sm  text-gray-100 flex items-center justify-center md:w-1/2 p-6">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold mb-4">Welcome back!</h2>
              <p className="font-bold text-gray-200">
                Log in to your account to access your dashboard and projects.
              </p>
            </div>
          </div>
          <div className="bg-transparent backdrop-blur-sm md:w-1/2 p-6">
            <form onSubmit={handleLoginSubmit}>
              <h2 className="text-2xl text-gray-200 font-bold mb-4">Login</h2>
              <div className="my-4">
                <label className="block text-slate-300 font-semibold mb-2">
                  Email:
                </label>
                <input
                  className="appearance-none border-2 bg-transparent border-cyan-400 rounded-xl w-full py-2 px-3 text-white placeholder:text-slate-300 leading-tight focus:outline-none focus:ring-white"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmail}
                  placeholder="type your email...."
                />
              </div>
              <div className="my-4">
                <label className="block text-slate-300 font-semibold mb-2">
                  Password:
                </label>
                <input
                  className="appearance-none border-2 bg-transparent border-cyan-400 rounded-xl w-full py-2 px-3 text-white placeholder:text-slate-300 leading-tight focus:outline-none focus:ring-white"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePassword}
                  placeholder="type your password...."
                />
              </div>
              <button
                className="mt-4 p-3 bg-slate-800 border hover:text-green-400 hover:shadow-lg rounded-2xl hover:shadow-green-400 text-green-500"
                type="submit">
                Login
              </button>
            </form>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <p className="mt-5 text-slate-300">
              Don't have an account yet?{" "}
              <Link to={"/signup"} className="text-cyan-400">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
