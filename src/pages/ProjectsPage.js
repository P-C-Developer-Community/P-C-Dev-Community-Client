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
      .get(`${API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="bg-slate-800 bg-repeat flex flex-wrap justify-center items-center h-screen">
      <div className="flex flex-col  justify-center min-h-screen">
        <h1 className="text-3xl font-extrabold mb-4">Projects Page</h1>
        <AddProject refreshProjects={getAllProjects} />
        <div className="">
          <div className="w-full rounded-t-lg mb-4">
            <div className="p-4">
              <div className="grid grid-cols-3 lg:grid-cols-5 gap-x-16 gap-y-10">
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <ProjectCard key={project._id} {...project} />
                  ))
                ) : (
                  <p className="text-lg text-gray-500">
                    No projects available at the moment
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
