import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import backgroundImage from "../assets/profile-bg.jpeg";


  const storedToken = localStorage.getItem("authToken");

function UserProfilePage() {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const { user } = useContext(AuthContext);

  const [gitHub, setGitHub] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    const requestBody = { gitHub, linkedIn, twitter, instagram }

     axios
      .put(`${process.env.REACT_APP_API_URL}/auth/user/update`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }

  const getCurrentUser = () => {

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/user`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUsers(response.data);
        
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-top  pt-4 min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}>
       {users && 
       <>
       <div className="grid grid-cols-1 sm:grid-cols-2  gap-x-16 gap-y-10">
      <div className="mt-8  justify-center items-center">
        <div className="backdrop-blur-sm grid justify-items-center text-slate-400 hover:shadow-xl hover:shadow-white box-border p-4 border-2 rounded-3xl shadow-lg shadow-cyan-400 ml-6 mr-6 mt-4">
            <label className="text-xl font-bold text-white mb-4">
              {users.name}'s Profile
            </label>
            <img
              className="mx-8 my-6 h-36 w-36 rounded-2xl"
              src={users.imageUrl}
              alt=""
            />
            <p className="">Email: {users.email}</p>
            {users.gitHub !== "" && <p className="">Github: {users.gitHub}</p>}
            {users.linkedIn !== "" && <p className="">LinkedIn: {users.linkedIn}</p>}
            {users.twitter !== "" && <p className="">Twitter: {users.twitter}</p>}
            {users.instagram !== "" && <p className="">Instagram: {users.instagram}</p>}
        </div>
      </div>

      <div className="flex-wrap backdrop-blur-sm mt-8 justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="hover:shadow-xl hover:shadow-white box-border p-4 border-2 rounded-3xl shadow-lg shadow-cyan-400 ml-6 mr-6 mt-4">
          <div className="my-6">
            <label className="text-slate-300 font-bold mr-2">GitHub:</label>
            <input
              className="appearance-none border bg-transparent border-cyan-400 rounded-xl w-full py-2 px-3 text-white placeholder:text-slate-300 leading-tight focus:outline-none focus:ring-white"
              placeholder="your GitHub link..."
              type="text"
              name="gitHub"
              value={gitHub}
              onChange={(e) => setGitHub(e.target.value)}
            />
          </div>
          <div className="my-6 ">
            <label className=" text-slate-300 font-bold mr-2">LinkedIn:</label>
            <input
              className="appearance-none border bg-transparent border-cyan-400 rounded-xl w-full py-2 px-3 text-white placeholder:text-slate-300 leading-tight focus:outline-none focus:ring-white"
              placeholder="your LinkedIn link..."
              type="text"
              name="linkedIn"
              value={linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
            />
          </div>
          <div className="my-6">
            <label className="text-slate-300 font-bold mr-2">Twitter:</label>
            <input
              className="appearance-none border bg-transparent border-cyan-400 rounded-xl w-full py-2 px-3 text-white placeholder:text-slate-300 leading-tight focus:outline-none focus:ring-white"
              placeholder="your Twitter link..."
              type="text"
              name="twitter"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </div>
          <div className="my-6">
            <label className="text-slate-300 font-bold mr-2">Instagram:</label>
            <input
              className="appearance-none border bg-transparent border-cyan-400 rounded-xl w-full py-2 px-3 text-white placeholder:text-slate-300 leading-tight focus:outline-none focus:ring-white"
              placeholder="your Instagram link..."
              type="text"
              name="instagram"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </div>

          <button className="mt-4 p-4 bg-slate-800 border hover:text-green-400 hover:shadow-lg rounded-2xl hover:shadow-green-400 text-green-500">
            Save
          </button>
        </div>
        </form>
      </div>
      </div>
      </>}
    </div>
  );
}

export default UserProfilePage;
