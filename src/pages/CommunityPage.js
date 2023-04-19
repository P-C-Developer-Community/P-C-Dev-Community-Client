import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext, useState, useEffect } from "react";

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

          console.log("response,,,,,,,",contributionsResponse)
          const myContributions = contributionsResponse.data.filter(
            (contribution) => contribution.owner === user._id
           
          );
          const numberOfContributions = myContributions.length;

          console.log("my contr...", myContributions)

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
    <div>
      <h1>Community page</h1>
      {users.map((user) => (
        <div key={user._id}>
          <img src={user.imageUrl} alt="" />
          <h1>Name: {user.name}</h1>
          <p>Email: {user.email}</p>
          <p>
            Member Since:{" "}
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              weekday: "short",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <div>
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
      ))}
    </div>
  );
}

export default CommunityPage;