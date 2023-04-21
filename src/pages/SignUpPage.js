import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import service from "../api/service";
import backgroundImage from "../assets/signUp-bg.jpeg";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoadingImg, setIsLoadingImg] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        setIsLoadingImg(false);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (imageUrl) {
      // Create an object representing the request body
      const requestBody = { email, password, name, imageUrl };

      // Make an axios request to the API
      // If the POST request is a successful redirect to the login page
      // If the request resolves with an error, set the error message in the state
      axios
        .post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
        .then((response) => {
          navigate("/login");
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        });
    } else setIsLoadingImg(true);
  };

  return (
    <div
      className=" grid grid-cols-1 jusitfy-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col md:flex-row w-full md:w-4/5 xl:w-3/5 bg-transparent  shadow-lg overflow-hidden">
          <div className="bg-transparent  rounded-full  text-gray-100 flex items-center justify-center md:w-1/2 p-6">
            <div className="max-w-md">
              <h2 className="text-3xl backdrop-blur-sm font-bold pt-12 mt-16 ">
                Welcome to Dev Community!
              </h2>
              <p className="font-bold backdrop-blur-sm rounded-md text-slate-200 pt-6">
                Join our developer community today and connect with other web
                developers to share your projects, collaborate on ideas, and
                advance your skills in a supportive and engaging community!
              </p>
            </div>
          </div>
          <div className="bg-transparent backdrop-blur-sm md:w-1/2 p-6">
            <form onSubmit={handleSignupSubmit}>
              <h2 className="text-2xl text-slate-300 font-bold mb-4">
                Sign Up
              </h2>
              <div className="my-4">
                <label className="block text-slate-300 font-bold mb-2">
                  Email:
                </label>
                <input
                  className="appearance-none border-2 bg-transparent border-cyan-400 rounded-2xl w-full py-2 px-3 text-white placeholder:text-slate-300 leading-tight focus:outline-none focus:ring-white"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmail}
                  placeholder="type your Email...."
                />
              </div>
              <div className="my-4">
                <label className="block text-slate-300 font-bold mb-2">
                  Password:
                </label>
                <input
                  className="appearance-none border-2 bg-transparent border-cyan-400 rounded-2xl w-full py-2 px-3 text-white placeholder:text-slate-300 leading-tight focus:outline-none focus:ring-white"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePassword}
                  placeholder="type your password...."
                />
              </div>
              <div className="my-4">
                <label className="block text-slate-300 font-bold mb-2">
                  Name:
                </label>
                <input
                  className="appearance-none border-2 bg-transparent border-cyan-400 rounded-2xl w-full py-2 px-3 text-white placeholder:text-slate-300 leading-tight focus:outline-none focus:ring-white"
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleName}
                  placeholder="type your Name...."
                />
              </div>

              <input
                className="mt-2 appearance-none border-2 bg-transparent border-cyan-400 rounded-xl w-full py-2 px-3 text-white placeholder:text-slate-300 leading-tight focus:outline-none focus:ring-white"
                type="file"
                onChange={(e) => handleFileUpload(e)}
                id="upload-button"
                style={{ display: "none" }}
              />
              <label
                htmlFor="upload-button"
                className="mt-4 mr-6 p-3 bg-transparent border-2 border-cyan-400 hover:text-cyan-400 hover:shadow-lg rounded-2xl hover:shadow-cyan-400 text-slate-300">
                Upload Profile Picture
              </label>

              {isLoadingImg && (
                <p className="text-cyan-500 font-black my-6">
                  Loading image please wait
                </p>
              )}

              <button
                className="mt-4 p-2 bg-slate-800 border hover:text-green-400 hover:shadow-lg rounded-2xl hover:shadow-green-400 text-green-500"
                type="submit">
                Sign Up
              </button>
              <div className="mt-4">
                {errorMessage && (
                  <p className="text-red-500 error-message">{errorMessage}</p>
                )}
                <p className="mt-5 text-red-500">
                  Already have account?
                  <Link to={"/login"} className="text-cyan-500">
                    {" "}
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
