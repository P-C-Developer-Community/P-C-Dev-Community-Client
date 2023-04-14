import { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import service from "../api/service";
const API_URL = "http://localhost:5005";

function AddProject(props) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const {  user } = useContext(AuthContext);  

  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
 
    const uploadData = new FormData();
 
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);
 
    service
      .uploadImage(uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.fileUrl);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    const { projectId } = props;
    const requestBody = { title, description, owner: user._id, imageUrl: imageUrl };
  
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');
  
    // Send the token through the request "Authorization" Headers
    axios
      .post(
      `${API_URL}/api/projects`, requestBody,
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

         <input
          type="hidden"
          title="owner"
          value={user._id}
        /> 
       
       <input type="file" onChange={(e) => handleFileUpload(e)} />


        <button type="submit">Submit</button>
      </form>
    </div>
  );
}


  export default AddProject;
  