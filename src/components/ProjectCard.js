import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import Modal from "./DetailsModal";

// We are deconstructing props object directly in the parentheses of the function
function ProjectCard({ title, description, _id, owner, imageUrl }) {
  const [showModal, setShowModal] = useState(false);
  
  return (
    
    <Fragment>
    <div>
      <div className="bg-slate-400 rounded-xl shadow-xl shadow-cyan-300/80 hover:shadow-slate-50 hover:rounded-full transition-all duration-300 ease-in-out transition duration-1000 ease-in-out relative">
        <Link 
        to={`/project/${_id}`}
        onClick={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
        >
          <h3 className="text-gray-300 font-mono italic font-black text-2xl line-clamp-1">
            {title}
          </h3>
          <img src={imageUrl} alt="" />
          <div className="p-4">
            <p className="text-gray-500 font-mono italic font-medium text-sm">From:</p>
             <p className="text-gray-300 font-mono  font-black text-2xl" >{owner.name}</p> 
             
            <p className="text-gray-300 font-mono italic font-black line-clamp-2 ">
              {description}{" "}
            </p>
            <div className="flex justify-between items-center"></div>
          </div>
        </Link>
      </div>
    </div>
    <Modal isVisible={showModal}
     onClose={() => setShowModal(false)}
      description={description} 
      title={title} 
      itemType="project"
      _id={_id} />
    </Fragment>
  );
}

export default ProjectCard;
