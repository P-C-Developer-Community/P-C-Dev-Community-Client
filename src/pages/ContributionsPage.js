import { useState, useEffect } from "react";
import axios from "axios";
import AddContribution from "../components/AddContribution";
const API_URL = "http://localhost:5005";

function ContributionsPage() {
    const [contributions, setContributions] = useState([]);

    const getAllContributions = () => {
        
        const storedToken = localStorage.getItem("authToken");
       
        // Send the token through the request "Authorization" Headers
        axios
          .get(
          `${API_URL}/api/contributions`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        )
          .then((response) => setContributions(response.data))
          .catch((error) => console.log(error));
      };

      useEffect(() => {
        getAllContributions();
      }, [] );

      return (
        <div className="ContributionsPage">

        <AddContribution refreshContribution={getAllContributions} />

          <h1>Contributions Page</h1>
          
          {contributions.length > 0 ? (
            contributions.map((contribution) => (
              <div key={contribution._id}>
                <h2>{contribution.title}</h2>
                <p>{contribution.description}</p>
              </div>
            ))
          ) : (
            <p>No contributions available at the moment</p>
          )}
        </div>
      );
}
export default ContributionsPage;