import React from "react";
import { Link } from "react-router-dom";


const DetailsModal = ({ isVisible, onClose, description, title, _id, itemType }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900 bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-50"
      id="wrapper"
      onClick={handleClose}
      style={{ zIndex: 9999 }}
      >
      <div className="w-full max-w-lg max-h-screen overflow-y-auto  rounded-lg  ">
        <button
          className="text-red-500 text-md place-self-end"
          onClick={() => onClose()}>close</button>
          
        <div className="p-4 text-slate-100 text-2xl uppercase font-bold ">{title} </div>
        <div className="bg-transparent text-white p-2 rounded whitespace-pre-line break-normal text-center">
          {description}
        </div>
        <Link to={`/${itemType}s/${_id}`}>
        <button className="p-4 mt-4 drop border hover:text-white hover:shadow-lg rounded-full hover:shadow-cyan-400 text-cyan-500">
        Details
        </button>
      </Link>
      </div>
    </div>
  );
};

export default DetailsModal;
