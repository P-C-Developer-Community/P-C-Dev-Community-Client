import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

function ProjectsPage() {
    const [projects, setProjects] = useState([]);

    const getAllProjects = () => {
        
        const storedToken = localStorage.getItem("authToken");
       
        // Send the token through the request "Authorization" Headers
        axios
          .get(
          `${API_URL}/api/projects`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        )
          .then((response) => setProjects(response.data))
          .catch((error) => console.log(error));
      };

      useEffect(() => {
        getAllProjects();
      }, [] );

    return ( 
        <div>
            <h1>Projects Page</h1>
        </div>
    );
}

export default ProjectsPage;