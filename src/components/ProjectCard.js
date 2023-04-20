import { Link } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useEffect } from "react";


import { Fragment, useState } from "react";
import Modal from "./DetailsModal";

// We are deconstructing props object directly in the parentheses of the function
function ProjectCard({ title, description, _id, owner, imageUrl, languages }) {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");




  const handleSubmit = (e) => {
    e.preventDefault();
  
    const requestBody = { message, owner, projectInInterest: _id };
  
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
  
    // Send the token through the request "Authorization" Headers
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/requests`,
        requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        // Clear the message field
        setMessage("");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    
}, [message]);
    
  
  return (
    
    <Fragment>
    <div>
      <div className="w-64 h-96 backdrop-blur-xl overflow-hidden rounded-2xl border shadow-xl shadow-cyan-300/80 hover:shadow-slate-50 hover:rounded-full transition-all duration-300 ease-in-out transition duration-1000 ease-in-out relative">
        <Link 
        to={`/project/${_id}`}
        onClick={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
        >
        <div className="flex flex-col items-center justify-center">
          <img src={imageUrl} alt=""   className=" mb-4 drop-shadow-2xl shadow-black h-42 w-96 rounded-2xl" />
          
          <div className="flex flex-col items-center  mr-16 ml-16 mb-2 ">
          <h2 className="text-white font-mono  antialiased italic font-black text-2xl  line-clamp-2 ">
            {title}
          </h2>
          <div className="p-2">
            
             
            <div className="max-h-36 max-w-36 w-auto h-auto  overflow-auto hover:overscroll-contain line-clamp-6">
            <p className="text-slate-200 font-semibold mt-2 ">Code languages used:</p>
            {languages.map((lang)=>{
              return<ul className="text-slate-200 my-1 ">
              <li>{lang}</li>  
              </ul> 
            })}
            </div>
            
            <div className="flex justify-between items-center"></div>
            </div>
            </div>
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


