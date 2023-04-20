import { useState, useEffect, useContext } from "react";
import axios from "axios";
import backgroundImage from "../assets/display-bg.jpeg";
import ProjectCard from "../components/ProjectCard";
import { AuthContext } from "../context/auth.context";
import AddProjectModal from "../components/AddProjectModal";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

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
        className="flex flex-col items-center justify-top  pt-4 min-h-screen"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }}>
        <p className="text-3xl text-white font-extrabold mb-6">Projects</p>

        {isLoggedIn && (
          <button
            className="p-3 mb-8 w-80 drop bg-slate-800 border hover:text-white hover:border-cyan-400 hover:shadow-lg rounded-xl shadow-md shadow-white hover:shadow-cyan-400 text-cyan-600"
            onClick={handleShowAddProjectForm}>
            New Project
          </button>
        )}
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
          <div className="w-full rounded-lg mb-4">
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-x-16 gap-y-10">
                {sortedProjects.length > 0 ? (
                  sortedProjects.map((project) => (
                    <ProjectCard key={project._id} {...project} />
                  ))
                ) : (
                  <div className="h-full flex justify-center items-center">
                    <p className="text-2xl text-white font-black">
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
