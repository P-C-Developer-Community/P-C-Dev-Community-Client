import { Link } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";


import { Fragment, useState } from "react";
import Modal from "./DetailsModal";

// We are deconstructing props object directly in the parentheses of the function
function ProjectCard({ title, description, _id, owner, imageUrl }) {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = "http://localhost:5005";

  const handleSubmit = (e) => {
        e.preventDefault();
    
        const requestBody = {message, owner, projectInInterest: _id };
      
        // Get the token from the localStorage
        const storedToken = localStorage.getItem('authToken');
      
        // Send the token through the request "Authorization" Headers
        axios
          .post(
          `${API_URL}/api/requests`, requestBody,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        )
          .then((response) => {
          // Reset the state
          setMessage("");
        })
          .catch((error) => console.log(error));
      };
    
  
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
        <form onSubmit={handleSubmit}>
        <label>Message:</label>
        <input
          type="text"
          message="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
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


