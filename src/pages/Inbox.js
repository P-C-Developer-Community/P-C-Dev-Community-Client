import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/msg-bg.jpeg";


function Inbox() {
    
    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [readStatus, setReadStatus] = useState(false);
    const {  user } = useContext(AuthContext); 
    const [deleteStatus, setDeleteStatus] = useState(false);

    // const getCurrentUser = () => {
    //   const storedToken = localStorage.getItem("authToken");  
    //   // Send the token through the request "Authorization" Headers
    //   axios
    //     .get(`${process.env.REACT_APP_API_URL}/auth/user`, {
    //       headers: { Authorization: `Bearer ${storedToken}` },
    //     })
    //     .then((response) => {
    //         setUsers(response.data);
    //     })
    //     .catch((error) => console.log(error));
    // };

    const getAllRequests = () => {
        
        const storedToken = localStorage.getItem("authToken");
       
        // Send the token through the request "Authorization" Headers
        axios
          .get(
          `${process.env.REACT_APP_API_URL}/api/requests`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        )
          .then((response) => {
            console.log("response.data......",response.data)
            setRequests(response.data)
          console.log("requests",requests)} )
            .catch((error) => console.log(error));
      };


      const changeToRead = (id) => {
        const storedToken = localStorage.getItem("authToken");
       
        // Send the token through the request "Authorization" Headers
        axios
          .get(
          `${process.env.REACT_APP_API_URL}/api/request/read`,
          { 
            headers: { Authorization: `Bearer ${storedToken}` },
            params: {id: id} 
        }
        )
          .then((response) => {
            if (readStatus === false){
                setReadStatus(true)
            }else{
                setReadStatus(false)
            }
        } )
            .catch((error) => console.log(error));


      }



      const deleteMessage = (id) => {
        const storedToken = localStorage.getItem("authToken");
       
        // Send the token through the request "Authorization" Headers
        axios
          .get(
          `${process.env.REACT_APP_API_URL}/api/request/delete`,
          { 
            headers: { Authorization: `Bearer ${storedToken}` },
            params: {id: id} 
        }
        )
        .then((response) => {
            setDeleteStatus(!deleteStatus); // update state variable after successful delete
        })
        .catch((error) => console.log(error));
      }

// console.log("requests.........",requests)
  
    useEffect(() => {
        getAllRequests()
    }, [readStatus, deleteStatus]);
  
    return (
      <>
      <div
        className="text-white flex flex-col items-center justify-top  pt-4 h-screen"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }}>
      ************************ This is your Unread Messages  ***********************
      <div>
      {requests.filter((e) => !e.isRead).map((e)=>{
        //  console.log("this is element,,,",e.message)

         return (
            <div key={e._id}>
            <h1 >You have a new message from {e.sender.email}</h1>
            {e.projectInInterest && <h2>Re: Project - {e.projectInInterest.title}</h2>}
            {e.contributionInInterest && <h2>Re: Your Contribution - {e.contributionInInterest.title}</h2>}
            <h2 >Message: {e.message}</h2>
            <button  onClick={()=>{changeToRead(e._id)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Mark As Read</button>
            </div>
         )
      })} 
<br />
      ************************ This is your Inbox For Read Messages ***********************

      {requests.filter((e) => e.isRead).map((e)=>{
        //  console.log("this is element,,,",e.message)

         return (
            <div key={e._id}>
            <h1>You have a new message from {e.sender.email}</h1>
            {e.projectInInterest && <h2>Re: Project - {e.projectInInterest.title}</h2>}
            {e.contributionInInterest && <h2>Re: Your Contribution - {e.contributionInInterest.title}</h2>}
         <h2>Message: {e.message}</h2>
         <button  onClick={()=>{deleteMessage(e._id)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Delete Message</button>
         </div>
         )
      })} 
    
      </div>     
      </div>     
      </>
    );
  }
  export default Inbox;