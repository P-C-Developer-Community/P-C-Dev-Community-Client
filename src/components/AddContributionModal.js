import React, { useState } from "react";
import AddContribution from "../components/AddContribution";

const AddContributionModal = ({
  isVisible,
  onClose,
  handleAddContributionSuccess,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  const handleAddContributionSuccessWrapper = () => {
    handleAddContributionSuccess();
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
          <p className="text-white">Contribution submitted successfully!</p>
        ) : (
          <AddContribution
            handleAddContributionSuccess={handleAddContributionSuccessWrapper}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default AddContributionModal;
