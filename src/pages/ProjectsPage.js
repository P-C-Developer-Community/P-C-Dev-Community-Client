import { useState, useEffect } from "react";
import axios from "axios";
import backgroundImage from "../assets/display-bg.jpeg";
import ProjectCard from "../components/ProjectCard";

import AddProjectModal from "../components/AddProjectModal";



function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);

  const getAllProjects = () => {
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/projects`, {
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

  const handleShowAddProjectForm = () => {
    setShowModal(true);
    setShowAddProjectForm(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setShowAddProjectForm(false);
  };

  const handleAddProjectSuccess = () => {
    getAllProjects();
    setShowModal(false);
  };

  const sortedProjects = [...projects].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <>
      <div
        className="flex flex-col items-center justify-top  pt-4 h-screen"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }}>
        <p className="text-3xl text-white font-extrabold mb-6">Projects</p>
        <button
          className="text-white rounded-full bg-cyan-500 border-double border-4 border-violet-600"
          onClick={handleShowAddProjectForm}>
          Add Project
        </button>
        {showAddProjectForm && (
          <AddProjectModal
            refreshProjects={getAllProjects}
            showModal={showModal}
            onClose={handleClose}
            handleAddProjectSuccess={handleAddProjectSuccess}
          />
        )}
        {/* Rendering and sorting projects */}
        <div className="">
          <div className="w-full rounded-t-lg mb-4">
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-10">
                {sortedProjects.length > 0 ? (
                  sortedProjects.map((project) => (
                    <ProjectCard key={project._id} {...project} />
                  ))
                ) : (
                  <div className="h-full flex justify-center items-center">
                    <p className="text-lg text-gray-400">
                      No projects available at the moment
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectsPage;
