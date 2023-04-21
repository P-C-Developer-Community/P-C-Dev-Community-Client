import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import backgroundImage from "../assets/globe-net.jpeg";
import { useContext, useState, useEffect } from "react";
import UserComponent from "../components/UserComponent";

function CommunityPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [counts, setCounts] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const run = async () => {
      const storedToken = await localStorage.getItem("authToken");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/community`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      const users = response.data;
      setUsers(users);
      fetchData(users, storedToken);
    };
    run();
  }, []);

  const fetchData = async (users, storedToken) => {
    try {
      for (const user of users) {
        const projectsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/projects/`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        const myProjects = projectsResponse.data.filter(
          (project) => project.owner._id === user._id
        );
        const numberOfProjects = myProjects.length;

        const contributionsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/contributions/`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        const myContributions = contributionsResponse.data.filter(
          (contribution) => contribution.owner === user._id
        );
        const numberOfContributions = myContributions.length;

        setCounts((prevState) => ({
          ...prevState,
          [user._id]: {
            projects: numberOfProjects,
            contributions: numberOfContributions,
          },
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-top  pt-4 min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}>
      <h1 className="text-3xl text-white font-extrabold mb-6">Dev Community</h1>

      <div className=" rounded-t-lg mb-4">
        <div className="p-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-10">
            {users.map((user, index) => {
              return (
                <UserComponent
                  key={index}
                  user={user}
                  counts={counts}></UserComponent>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
