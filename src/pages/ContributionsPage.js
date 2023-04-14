import { useState, useEffect } from "react";
import axios from "axios";
import AddContribution from "../components/AddContribution";
import ContributionCard from "../components/ContributionCard";
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
    <div className="bg-slate-800 bg-repeat flex flex-wrap justify-center items-center h-screen">
    <div className="flex flex-col  justify-center min-h-screen">
      <h1 className="text-3xl font-extrabold mb-4" >Contributions Page</h1>
      <AddContribution refreshContributions={getAllContributions} />
      <div className="">
      <div className="w-full rounded-t-lg mb-4">
        <div className="p-4">
          
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-x-16 gap-y-10" >
          {contributions.length > 0 ? (
            contributions.map((contribution) => (
              <ContributionCard key={contribution._id} {...contribution} />
            ))
          ) : (
            <p className="text-lg text-gray-500"> No contributions available at the moment </p>
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
