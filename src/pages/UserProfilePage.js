import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import backgroundImage from "../assets/profile-bg.jpeg";

const API_URL = "http://localhost:5005";

function UserProfilePage() {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const { user } = useContext(AuthContext);

  const handleInputChange = () => {

  };

  const handleSubmit = () => {
    
  };

  const getCurrentUser = () => {
    const storedToken = localStorage.getItem("authToken");
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

  console.log("requests.........", requests);

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="backdrop-filter backdrop-blur-md grid grid-cols-2 grid-rows-2 h-screen" style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
    }}>
       

        <div className=" flex justify-center px-6 py-10">
            <div className="bg-transparent backdrop-blur-md text-slate-400 hover:shadow-xl hover:shadow-white box-border p-4 border-2 bg-slate-200 rounded-3xl shadow-lg shadow-cyan-400 ml-6 mr-6 mt-4">
                <form onSubmit={handleSubmit}>
                    <label className="text-xl font-bold text-white mb-4">
                        {users.name}'s Profile
                    </label>
                    <img
                        className="my-4 mx-14 w-62 rounded-2xl"
                        src={users.imageUrl}
                        alt=""
                    />
                    <p className="">
                    Email {users.email}
                    </p>
                   
                   
                    <div className="my-4">
                        <label className="text-white font-bold mr-2">Twitter:</label>
                        <input
                            className="border-2 border-white rounded-md px-2 py-1"
                            type="text"
                            name="twitter"
                            // value={socialMedia.twitter}
                            // onChange={handleInputChange}
                        />
                    </div>
                    <div className="my-4">
                        <label className="text-white font-bold mr-2">Instagram:</label>
                        <input
                            className="border-2 border-white rounded-md px-2 py-1"
                            type="text"
                            name="instagram"
                            // value={socialMedia.instagram}
                            // onChange={handleInputChange}
                        />
                    </div>
                    <div className="my-4">
                        <label className="text-white font-bold mr-2">Facebook:</label>
                        <input
                            className="border-2 border-white rounded-md px-2 py-1"
                            type="text"
                            name="facebook"
                            // value={socialMedia.facebook}
                            // onChange={handleInputChange}
                        />
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                        Save
                    </button>
                </form>
            </div>
        </div>
    </div>
);


}

export default UserProfilePage;
