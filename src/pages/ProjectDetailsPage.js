import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import ContributionCard from "../components/ContributionCard";
import AddContribution from "../components/AddContribution";
const API_URL = "http://localhost:5005";



function ProjectDetailsPage (props) {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  
  const getProject = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
   
    // Send the token through the request "Authorization" Headers
    axios
      .get(
        `${API_URL}/api/projects/${projectId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const oneProject = response.data;
        setProject(oneProject);
      })
      .catch((error) => console.log(error));
  };
  
  
  useEffect(()=> {
    getProject(projectId);
  }, [projectId] );

  
  return (
    <div className="ProjectDetails">
    
      {project && (
        <>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </>
      )}

      <AddContribution refreshProject={getProject} projectId={projectId} /> 

      { project && project.contributions.map((contribution) => <ContributionCard key={contribution._id} {...contribution} /> )}

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>
          
      <Link to={`/projects/edit/${projectId}`}>
        <button>Edit Project</button>
      </Link>
      
    </div>
  );
}

export default ProjectDetailsPage;