import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
const API_URL = "http://localhost:5005";


function EditProjectPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const storedToken = localStorage.getItem("authToken");
  
  const { projectId } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  
  useEffect(() => {
    axios
      .get(`${API_URL}/api/projects/${projectId}`)
      .then((response) => {
        const oneProject = response.data;
        setTitle(oneProject.title);
        setDescription(oneProject.description);
      })
      .catch((error) => console.log(error));
    
  }, [projectId]);
  

 
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, description };

    axios
      .put(`${API_URL}/api/projects/${projectId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate(`/projects/${projectId}`)
      });
  };
  
  
  const deleteProject = () => {

    
    
    axios
      .delete(`${API_URL}/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/projects");
      })
      .catch((err) => console.log(err));
  };  

  
  return (
    <div className="EditProjectPage">
      <h3>Edit your Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="p-4 drop bg-slate-800 hover:text-white hover:shadow-lg rounded-full hover:shadow-cyan-400 text-cyan-600" type="submit">Update</button>
      </form>

      <button className="mt-4 mr-8 p-4 drop bg-red-600 hover:text-black hover:shadow-lg rounded-full hover:shadow-red-500 text-white" onClick={deleteProject}>Delete</button>

      <button className="p-4 drop bg-slate-800 hover:text-white hover:shadow-lg rounded-full hover:shadow-cyan-400 text-cyan-600" onClick={goBack}> Back </button>
              
    </div>
  );
}

export default EditProjectPage;