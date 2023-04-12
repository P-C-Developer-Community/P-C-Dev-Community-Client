import { useState } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

function AddProject(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
    
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, description };
  
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');
  
    // Send the token through the request "Authorization" Headers
    axios
      .post(
      `${API_URL}/api/projects`,
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
  <h1>Add Project Page</h1>
)

}


  export default AddProject;
  