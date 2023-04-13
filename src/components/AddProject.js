import { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
const API_URL = "http://localhost:5005";

function AddProject(props) {




  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const {  user } = useContext(AuthContext);  
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, description, owner: user._id };
  
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');
  
    // Send the token through the request "Authorization" Headers
    axios
      .post(
      `${API_URL}/api/contributions`,
      requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
      .then((response) => {
      // Reset the state
      setTitle("");
      setDescription("");
      props.refreshProjects();
    })
      .catch((error) => console.log(error));
  };


  return (
    <div className="AddProject">
      <h3>Add Project</h3>
    
        <label>Owner:</label>
          <span>{user && user.name}</span>
          

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          title="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}


  export default AddProject;
  