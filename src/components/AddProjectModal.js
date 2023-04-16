import React, { useState } from "react";
import AddProject from "../components/AddProject";

const AddProjectModal = ({ isVisible, onClose, handleAddProjectSuccess }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [projectsId, setProjectsId] = useState("");

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  const handleAddProjectSuccessWrapper = () => {
    handleAddProjectSuccess();
    setIsSubmitted(true);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 background-blur-sm flex justify-center items-center z-50"
      id="wrapper"
      onClick={handleClose}
      style={{ zIndex: 9999 }}>
      <div className="w-[600px] flex flex-col">
        <button
          className="text-red-500 text-lg place-self-end"
          onClick={() => onClose()}>
          close
        </button>

        {isSubmitted ? (
          <p className="text-white">Project submitted successfully!</p>
        ) : (
          <AddProject
            projectsId={projectsId}
            handleAddProjectSuccess={handleAddProjectSuccessWrapper}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default AddProjectModal;
