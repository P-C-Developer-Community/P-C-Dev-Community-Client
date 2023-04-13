import { useState, useEffect } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";


import AddProject from "../components/AddProject";

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
          .then((response) => {
            setProjects(response.data)} )
          
            

          .catch((error) => console.log(error));
      };

      useEffect(() => {
        getAllProjects();
      }, [] );

    return ( 
      <div className="ProjectPage">
      
      <AddProject refreshProjects={getAllProjects} />
      
      {projects.length > 0 ? (
       projects.map((project) => <ProjectCard key={project._id} {...project} />  )
       ) : ( 
        <p> No available projects at the moment </p>
       )}   
       
    </div>
  );
}

export default ProjectsPage;