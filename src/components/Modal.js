import React from "react";


const Modal = ({ isVisible, onClose, children, description, title }) => {
  if (!isVisible) return null;

    const handleClose = (e) => {
        if( e.target.id === 'wrapper' ) onClose();
    }
    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 background-blur-sm flex justify-center items-center z-50"
    id="wrapper" onClick={handleClose} style={{ zIndex: 9999 }}>
      <div className="w-[600px] flex flex-col">
    
        <button
          className="text-white text-xl place-self-end"
          onClick={() => onClose()}>
          X
        </button>
        <div className="p-4 text-slate-100 " >{title} </div>
        <div className="bg-transparent text-white p-2 rounded"> {description} </div>
      </div>
      <button></button>
    </div>
  );
};

export default Modal;