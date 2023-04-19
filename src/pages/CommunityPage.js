import axios from "axios"
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useState, useEffect } from "react";

function CommunityPage() {
  const [users, setUsers] = useState([]);
  const [projectCounts, setProjectCounts] = useState({});
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  const getAllUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/community`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => console.log(error));
  }

  const countProjects = (userId) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/projects/`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const myProjects = response.data.filter(function(project){
          return project.owner._id === userId;
        })
        const numberOfProjects = myProjects.length
        setProjectCounts(prevState => ({
          ...prevState,
          [userId]: numberOfProjects
        }));
      })
      .catch((error) => console.log(error));
  } 
  
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <h1>Community page</h1>
      {users.map((user, index) => {
        return (
          <div key={index}>
            <img src={user.imageUrl} alt="" srcset="" />
            <h1>Name: {user.name}</h1>
            <p>Email: {user.email}</p>
            <p>Member Since: {new Date(user.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year:  'numeric' })}</p>
            <div>
              {user.gitHub !== "" && <p className="">Github: {user.gitHub}</p>}
              {user.linkedIn !== "" && <p className="">LinkedIn: {user.linkedIn}</p>}
              {user.twitter !== "" && <p className="">Twitter: {user.twitter}</p>}
              {user.instagram !== "" && <p className="">Instagram: {user.instagram}</p>}
              {projectCounts[user._id] && <p>Number of Active Projects: {projectCounts[user._id]}</p>}
              {!projectCounts[user._id] && countProjects(user._id)}
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default CommunityPage;