import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

const API_URL = "http://localhost:5005";




function UserProfilePage() {
    
    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);
    const {  user } = useContext(AuthContext); 

    const getCurrentUser = () => {
      const storedToken = localStorage.getItem("authToken");  
      // Send the token through the request "Authorization" Headers
      axios
        .get(`${API_URL}/auth/user`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
            setUsers(response.data);
        })
        .catch((error) => console.log(error));
    };

    const getAllRequests = () => {
        
        const storedToken = localStorage.getItem("authToken");
       
        // Send the token through the request "Authorization" Headers
        axios
          .get(
          `${API_URL}/api/requests`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        )
          .then((response) => {
            setRequests(response.data)} )
            .catch((error) => console.log(error));
      };

console.log("requests.........",requests)
  
    useEffect(() => {
        getCurrentUser();
        getAllRequests()
    }, []);
  
    return (
      <>
      <div>
      {requests.map((e)=>{
        //  console.log("this is element,,,",e.message)
         return (
            <>
            <h1>You have a new message from {e.sender}</h1>
            <h2>Re: Project - {e.projectInInterest}</h2>
         <h2>Message: {e.message}</h2>
         </>
         )
      })} 
    
      </div>
      <img src={users.imageUrl} alt="" />
      <p>Name {users.name}</p>
      <p>Email {users.email}</p>
      
      </>
    );
  }
  export default UserProfilePage;