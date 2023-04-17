import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom'
import backgroundImage from '../assets/com-bg.jpg'
import ContributionCard from "../components/ContributionCard";
import axios from "axios";
const API_URL = "http://localhost:5005";



function ContributionDetailsPage (props) {
  const [contribution, setContribution] = useState({});
  const { contributionId } = useParams();
  const [message, setMessage] = useState("");

  const getContribution = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
   
    // Send the token through the request "Authorization" Headers
    axios
      .get(
        `${API_URL}/api/contributions/${contributionId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const oneContribution = response.data;
        setContribution(oneContribution);
      })
      .catch((error) => console.log(error));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      message,
      owner: contribution.owner._id,
      contributionInInterest: contribution._id,
    };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .post(`${API_URL}/api/requests`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state
        setMessage("");
        console.log("posting message.........", response.data);
      })
      .catch((error) => console.log(error));
  };
  
  useEffect(()=> {
    getContribution(contributionId);
  }, [contributionId] );

  
  return (
     <div className="h-screen flex flex-wrap" 
     style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
      height: '100%',
      width: '100%',
    }}>
     <div className="w-full sm:w-1/2 lg:w-1/2 px-6 py-10">
    {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"> */}
      <div className="bg-transparent backdrop-blur-lg hover:shadow-xl hover:shadow-white box-border h-64 w-72 p-4 border-2 bg-slate-200 rounded-3xl shadow-lg shadow-cyan-400 ml-6 mr-6 mt-4 ">
          <form className="mb-4" onSubmit={handleSubmit}>
            <label className="text-xl font-bold text-white mb-4">Message</label>
            <input className="h-auto mt-12 rounded-2xl bg-transparent  appearance-none box-border  text-white placeholder-white border-cyan-400  w-full py-2 px-3  leading-tight  focus:ring-white"
              type="text"
              message="message"
              value={message}
              placeholder="Type your message here...."
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="mt-4 p-4 border bg-slate-800 hover:text-green-400 hover:shadow-lg rounded-2xl hover:shadow-green-400 text-green-500" type="submit">
            Submit
            </button>
          </form>
        </div>
        </div>
   
        <div className=" bg-transparent backdrop-blur-lg  text-white rounded-3xl border-2 shadow-lg shadow-cyan-400 hover:shadow-xl hover:shadow-white ml-6 mr-6 mt-4 p-8" >




      {contribution && (
        <>
          <h1 className="text-3xl uppercase font-bold  mb-4">
          {contribution.title}
          </h1>
          <span className="text-sm">
                {" "}
                {new Date(contribution.createdAt).toLocaleDateString()}
              </span>
              <p className="whitespace-pre-line break-normal text-center mt-6 mb-8">
              {contribution.description}
           </p>
              <div className="flex items-center justify-between"></div>
            </>
          )}

      
      <Link to="/contributions">
        <button className="mt-6 mr-8 p-4 border drop bg-slate-800 hover:text-white hover:shadow-lg rounded-2xl hover:shadow-cyan-400 text-cyan-600">
              Back
            </button>
      </Link>
          
      <Link to={`/contributions/edit/${contributionId}`}>
     <button className="p-4 drop border bg-slate-800 hover:text-red-500 hover:shadow-lg rounded-2xl hover:shadow-red-500 text-cyan-600">
              Edit
            </button>
          </Link>
        </div>
        </div>
  // </div>
  );
}

export default ContributionDetailsPage;