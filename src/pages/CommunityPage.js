import axios from "axios"

import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:5005";


function CommunityPage(){

    const [users, setUsers] = useState([])

    const { user } = useContext(AuthContext);
    const storedToken = localStorage.getItem("authToken");


    const getAllUsers = () => {
        axios
        .get(`${API_URL}/auth/community`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setUsers(response.data)
          console.log("posting message.........", response.data);
        })
        .catch((error) => console.log(error));

    }
  
    useEffect(() => {
        getAllUsers();
      }, []);



      return (
<div>
        <h1>Community page</h1>
        {users.map((user, index)=>{
           return(
            <div key={index}>
           <img src={user.imageUrl} alt="" srcset="" />
            <h1>Name: {user.name}</h1>
            <p>Email: {user.email}</p>
            <p>Created at: {new Date(user.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year:  'numeric' })}</p>
            </div>

           )
         
           
        })}


      </div>
      )
      
      
      
      

  };


   


export default CommunityPage