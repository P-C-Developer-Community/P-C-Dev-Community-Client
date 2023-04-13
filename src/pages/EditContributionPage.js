import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
const API_URL = "http://localhost:5005";


function EditContributionPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
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
    e.preventDefault();
    const requestBody = { title, description };

    axios
      .put(`${API_URL}/api/contributions/${contributionId}`, requestBody)
      .then((response) => {
        navigate(`/contributions/${contributionId}`)
      });
  };
  
  
  const deleteContribution = () => {
    
    axios
      .delete(`${API_URL}/api/contributions/${contributionId}`)
      .then(() => {
        navigate("/contributions");
      })
      .catch((err) => console.log(err));
  };  

  
  return (
    <div className="EditContributionPage">
      <h3>Edit the Contribution</h3>

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

        <button type="submit">Update Contribution</button>
      </form>

      <button onClick={deleteContribution}>Delete Contribution</button>

      <button onClick={goBack}> Back </button>
      
    </div>
  );
}

export default EditContributionPage;