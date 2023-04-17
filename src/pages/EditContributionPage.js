import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
const API_URL = "http://localhost:5005";


function EditContributionPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const storedToken = localStorage.getItem("authToken");
  
  const { contributionId } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

  useEffect(() => {
    axios
      .get(`${API_URL}/api/contributions/${contributionId}`)
      .then((response) => {
        const oneContribution = response.data;
        setTitle(oneContribution.title);
        setDescription(oneContribution.description);
      })
      .catch((error) => console.log(error));
    
  }, [contributionId]);
  

  const handleFormSubmit = (e) => {

    const storedToken = localStorage.getItem("authToken");

    e.preventDefault();
    const requestBody = { title, description };

   

    axios
      .put(`${API_URL}/api/contributions/${contributionId}`, requestBody,
      {headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((response) => {
        navigate(`/contributions/${contributionId}`)
      });
  };
  
  
  const deleteContribution = () => {
    
    axios
      .delete(`${API_URL}/api/contributions/${contributionId}`, 
      {headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/contributions");
      })
      .catch((err) => console.log(err));
  };  

  
  return (
    <div className="EditContributionPage">
      <h3>Edit your Contribution</h3>

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

        <button className="p-4 drop bg-slate-800 hover:text-white hover:shadow-lg rounded-full hover:shadow-cyan-400 text-cyan-600" type="submit">
        Update
        </button>
      </form>

      <button className="mt-4 mr-8 p-4 drop bg-red-600 hover:text-black hover:shadow-lg rounded-full hover:shadow-red-500 text-white" onClick={deleteContribution}>
      Delete
      </button>

      <button className="p-4 drop bg-slate-800 hover:text-white hover:shadow-lg rounded-full hover:shadow-cyan-400 text-cyan-600" onClick={goBack}>
      Back
      </button>

    </div>
  );
}

export default EditContributionPage;