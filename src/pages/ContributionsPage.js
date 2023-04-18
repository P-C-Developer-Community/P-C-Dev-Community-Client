import { useState, useEffect } from "react";
import axios from "axios";
import backgroundImage from "../assets/com-bg.jpg";
import AddContributionModal from "../components/AddContributionModal";
import ContributionCard from "../components/ContributionCard";



function ContributionsPage() {
  const [contributions, setContributions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddContributionForm, setShowAddContributionForm] = useState(false);

  const getAllContributions = () => {
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/contributions`, {
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

  const handleShowAddContributionForm = () => {
    setShowModal(true);
    setShowAddContributionForm(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setShowAddContributionForm(false);
  };

  const handleAddContributionSuccess = () => {
    getAllContributions();
    setShowModal(false);
  };

  const sortedContributions = [...contributions].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <>
      <div
        className=" flex flex-col items-center justify-top  pt-4 min-h-screen"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }}>
        <p className="text-3xl text-white font-extrabold mb-6">Contributions</p>
        <button
          className="text-white rounded-full bg-cyan-500 border-double border-4 border-violet-600"
          onClick={handleShowAddContributionForm}>
          Add Contribution
        </button>
        {showAddContributionForm && (
          <AddContributionModal
            refreshContributions={getAllContributions}
            showModal={showModal}
            onClose={handleClose}
            handleAddContributionSuccess={handleAddContributionSuccess}
          />
        )}
        {/* Rendering and sorting contributions */}
        <div className="">
          <div className="w-full rounded-t-lg mb-4">
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-10">
                {sortedContributions.length > 0 ? (
                  sortedContributions.map((contribution) => (
                    <ContributionCard
                      key={contribution._id}
                      {...contribution}
                    />
                  ))
                ) : (
                  <div className="h-full flex justify-center items-center">
                    <p className="text-lg text-gray-400">
                      No contributions available at the moment
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ContributionsPage;
