import { useState, useEffect } from "react";
import axios from "axios";
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
        <div>
            <h1>Contributions Page</h1>
        </div>
    );
}

export default ContributionsPage;