import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext, useState, useEffect } from "react";
import backgroundImage from "../assets/network.jpeg"

function CommunityPage() {
  const [users, setUsers] = useState([]);
  const [counts, setCounts] = useState({});

  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/community`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }, [storedToken]);

  useEffect(() => {
    const fetchData = async () => {
      for (const user of users) {
        try {
          const projectsResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/projects/`
          );
          const myProjects = projectsResponse.data.filter(
            (project) => project.owner._id === user._id
          );
          const numberOfProjects = myProjects.length;

          const contributionsResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/contributions/`
          );

          console.log("response,,,,,,,", contributionsResponse);
          const myContributions = contributionsResponse.data.filter(
            (contribution) => contribution.owner === user._id
          );
          const numberOfContributions = myContributions.length;

          console.log("my contr...", myContributions);

          setCounts((prevState) => ({
            ...prevState,
            [user._id]: {
              projects: numberOfProjects,
              contributions: numberOfContributions,
            },
          }));
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [users]);

  return (
    <div
      className="flex flex-col items-center justify-top  pt-4 min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}>
      <h1 className="text-3xl text-white font-extrabold mb-6">
        Community page
      </h1>

      <div className=" rounded-t-lg mb-4">
        <div className="p-4">
          <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-10"></div>
          {users.map((user, index) => {
            return (
              <div key={index} className="bg-transparent border rounded-xl shadow-md p-4">
                <img
                  className="mx-8 my-6 h-24 w-24 rounded-4xl"
                  src={user.imageUrl}
                  alt=""
                  srcset=""
                />
                <label className="text-2xl font-bold text-gray-800">{users.name}</label>
                <p className="text-gray-600" >Email: {user.email}</p>
                <p className="text-gray-600">
                  Member Since:{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <div className="mt-4">

                  {user.gitHub && <p className="">Github: {user.gitHub}</p>}
            {user.linkedIn && <p className="">LinkedIn: {user.linkedIn}</p>}
            {user.twitter && <p className="">Twitter: {user.twitter}</p>}
            {user.instagram && <p className="">Instagram: {user.instagram}</p>}
            {counts[user._id] && (
              <>
                <p>Number of Active Projects: {counts[user._id].projects}</p>
                <p>
                  Number of Active Contributions:{" "}
                  {counts[user._id].contributions}
                </p>
              </>
              )}
                </div>
              </div>
      
            );
          })}
          </div>
      </div>
    </div>
  
    
  );
}

export default CommunityPage;

