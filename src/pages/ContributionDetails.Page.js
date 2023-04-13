import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom'
import ContributionCard from "../components/ContributionCard";
import axios from "axios";
const API_URL = "http://localhost:5005";



function ContributionDetailsPage (props) {
  const [contribution, setContribution] = useState({});
  const { contributionId } = useParams();
  
  const getContribution = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
   
    // Send the token through the request "Authorization" Headers
    axios
      .get(
        `${API_URL}/api/contributions/${contributionId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const oneContribution = response.data;
        setContribution(oneContribution);
      })
      .catch((error) => console.log(error));
  };
  
  
  useEffect(()=> {
    getContribution(contributionId);
  }, [contributionId] );

  
  return (
    <div className="ContributionDetails">

        <h1>DETAILS</h1>
      {contribution && (
        <>
          <h1>{contribution.title}</h1>
          <p>{contribution.description}</p>
          {/* <ContributionCard key={contribution._id} {...contribution} /> */}
        </>
      )}

      
      <Link to="/contributions">
        <button>Back</button>
      </Link>
          
      <Link to={`/contributions/edit/${contributionId}`}>
        <button>Edit Contribution</button>
      </Link>
      
    </div>
  );
}

export default ContributionDetailsPage;