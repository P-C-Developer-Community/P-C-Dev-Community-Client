import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import backgroundImage from "../assets/com-bg.jpg";
const API_URL = "http://localhost:5005";


function EditContributionPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const storedToken = localStorage.getItem("authToken");
  
  const { contributionId } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

  useEffect(() => {
    axios
      .get(`${API_URL}/api/contributions/${contributionId}`)
      .then((response) => {
        const oneContribution = response.data;
        setTitle(oneContribution.title);
        setDescription(oneContribution.description);
      })
      .catch((error) => console.log(error));
    
  }, [contributionId]);
  

  const handleFormSubmit = (e) => {

    const storedToken = localStorage.getItem("authToken");

    e.preventDefault();
    const requestBody = { title, description };

   

    axios
      .put(`${API_URL}/api/contributions/${contributionId}`, requestBody,
      {headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((response) => {
        navigate(`/contributions/${contributionId}`)
      });
  };
  
  
  const deleteContribution = () => {
    
    axios
      .delete(`${API_URL}/api/contributions/${contributionId}`, 
      {headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/contributions");
      })
      .catch((err) => console.log(err));
  };  

  
  return (
    <div className="h-screen flex flex-wrap">
    <div
      className="h-screen  flex justify-center  text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        height: "100%",
        width: "100%",
      }}>

        <div className="w-full sm:w-1/2 lg:w-1/2 px-6 py-10">
        <div   className="bg-transparent backdrop-blur-lg hover:shadow-xl hover:shadow-white box-border max-h-100 overflow-y-auto p-4 border-2 rounded-3xl shadow-lg shadow-cyan-400 ml-6 mr-6 mt-4">
      <form className="my-8 mx-1"  onSubmit={handleFormSubmit}>
        <label>Title</label>
        <input className="h-auto my-4 rounded-2xl bg-transparent  appearance-none box-border  text-white placeholder-white border-cyan-400  w-full py-2 px-3  leading-tight  focus:ring-white"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <label className="mz-2">Description:</label>
        <textarea className="h-72 mt-2  rounded-2xl bg-transparent  appearance-none box-border  text-white placeholder-white border-cyan-400  w-full py-2 px-3  leading-tight  focus:ring-white"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="p-4 drop border bg-slate-800 hover:text-white hover:shadow-lg rounded-full hover:shadow-cyan-400 text-cyan-600" type="submit">
        Update
        </button>
      

      <button className="mx-6 my-6 p-4 drop border bg-red-600 hover:text-black hover:shadow-lg rounded-full hover:shadow-red-500 text-white" onClick={deleteContribution}>
      Delete
      </button>

      <button className="p-4 drop border bg-slate-800 hover:text-white hover:shadow-lg rounded-full hover:shadow-cyan-400 text-cyan-600" onClick={goBack}>
      Back
      </button>
      </form>
    </div>
    </div>
   </div>
   </div>
  );
}

export default EditContributionPage;