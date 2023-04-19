import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext, useState, useEffect } from "react";
import backgroundImage from "../assets/network.jpeg";
import GitHub from "../assets/Icons/gitHub.png";



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
        <div className="p-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-10">
          {users.map((user, index) => {
            return (
              <div
                key={index}
                className="backdrop-blur-sm border grid justify-items-center text-white rounded-xl shadow-md p-4">
                <img
                  className=" h-24 w-24  rounded-3xl"
                  src={user.imageUrl}
                  alt=""
                  srcset=""
                />
                <p className="text-2xl font-bold text-white">{user.name}</p>
                <p className="text-slate-300 -mt-1">@: {user.email}</p>
                <p className="text-slate-300 mt-1">
                  Member Since:{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <div className="mt-4">
                  {user.gitHub && (
                    <div className="flex items-center">   
                    <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16"> <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" fill="white"></path> </svg> 
                    
                    {user.gitHub}
                    
                    </div>
                    )}
                 
                 {user.linkedIn && (
                    <p className="">LinkedIn: {user.linkedIn}</p>
                  )}
                 
                  {user.twitter && <p className="">Twitter: {user.twitter}</p>}
                 
                  {user.instagram && (
                    <p className="">Instagram: {user.instagram}</p>
                  )}
                 
                  {counts[user._id] && (
                    <>
                      <p>
                        Active Projects: {counts[user._id].projects}
                      </p>
                      <p>
                        Active Collaborations:{" "}
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
    </div>
  );
}

export default CommunityPage;
