import { useState, useEffect } from "react";
import axios from "axios";
import AddContribution from "../components/AddContribution";
import ContributionCard from "../components/ContributionCard";
import logo from "../assets/WDC-logo Background.png";
const API_URL = "http://localhost:5005";

function ContributionsPage() {
  const [contributions, setContributions] = useState([]);

  const getAllContributions = () => {
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/contributions`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setContributions(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllContributions();
  }, []);

  return (
    <div className="bg-cover  bg-center bg-slate-600"  >
    <div className="flex flex-col  justify-center min-h-screen">
      <h1 className="text-3xl font-extrabold mb-4" >Contributions Page</h1>
      <AddContribution refreshContributions={getAllContributions} />
      <div className="">
      <div className="w-full rounded-t-lg mb-4">
        <div className="p-4">
          
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-4" >
          {contributions.length > 0 ? (
            contributions.map((contribution) => (
              <ContributionCard key={contribution._id} {...contribution} />
            ))
          ) : (
            <p className="text-lg text-gray-500"> No available contributions at the moment </p>
          )}
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
}
export default ContributionsPage;
