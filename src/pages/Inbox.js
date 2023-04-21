import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/message-bg.jpeg";

function Inbox() {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState(null);
  const [readStatus, setReadStatus] = useState(false);
  const { user } = useContext(AuthContext);
  const [deleteStatus, setDeleteStatus] = useState(false);

  const getAllRequests = () => {
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/requests`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => console.log(error));
  };

  const changeToRead = (id) => {
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/request/read`, {
        headers: { Authorization: `Bearer ${storedToken}` },
        params: { id: id },
      })
      .then((response) => {
        if (readStatus === false) {
          setReadStatus(true);
        } else {
          setReadStatus(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const deleteMessage = (id) => {
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/request/delete`, {
        headers: { Authorization: `Bearer ${storedToken}` },
        params: { id: id },
      })
      .then((response) => {
        setDeleteStatus(!deleteStatus); // update state variable after successful delete
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllRequests();
  }, [readStatus, deleteStatus]);

  return (
    <>
      <div>
        <div
          className="pt-4 min-h-screen"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
          }}>
          {/* Unread Messages */}
          <div className="flex  p-4">
            <div className="flex-1 mt-20 w-full">
              <div className="contents ">
                <div className="  hover:shadow-xl hover:shadow-red-500 box-border p-4 border-2 px-8 mx-10 border-red-500 rounded-3xl shadow-lg shadow-white ">
                  <div className="text-white">
                    <label className="text-white text-3xl font-bold">
                      Unread Messages:
                    </label>
                    {requests &&
                    requests.filter((e) => !e.isRead).length > 0 ? (
                      requests
                        .filter((e) => !e.isRead)
                        .map((e) => {
                          return (
                            <div
                              key={e._id}
                              className="appearance-none border-2 backdrop-blur-md mb-6 border-white rounded-xl py-2 px-1 leading-tight ">
                              <div className="">
                                <h1 className="text-lg text-green-500 italic">{`New message from: ${e.sender.email}`}</h1>
                                {e.projectInInterest && (
                                  <h2 className="text-base font-medium italic text-white">{`Re: Project - ${e.projectInInterest.title}`}</h2>
                                )}
                                {e.contributionInInterest && (
                                  <h2 className="text-base font-medium italic text-white">{`Re: Your Collaboration - ${e.contributionInInterest.title}`}</h2>
                                )}
                              </div>
                              <div className="overflow-hidden">
                                <p className="px-4 py-1 text-white">
                                  {e.message}
                                </p>
                                <div className="px-4 py-1 flex justify-end">
                                  <button
                                    onClick={() => {
                                      changeToRead(e._id);
                                    }}
                                    className="mt-8 -mr-2 p-2 border drop bg-slate-800 hover:text-white hover:shadow-lg rounded-2xl hover:shadow-green-500 text-green-500">
                                    Mark As Read
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })
                    ) : (
                      <p className="text-red-600 backdrop-blur-sm text-3xl font-bold">
                        No new messages
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Read Messages */}
              <div className=" flex backdrop-filter bg-blur-sm p-4  ">
                <div className="mt-16 w-full flex-1 ">
                  <div className="hover:shadow-xl hover:shadow-green-400 box-border px-8 mx-6 py-4 border-2 border-green-500 rounded-3xl shadow-lg shadow-white ">
                    <label className="text-green-400 backdrop-blur-sm mt-6 text-3xl font-bold">
                      Read Messages:
                    </label>
                    <div className="text-white"></div>
                    {requests &&
                      requests
                        .filter((e) => e.isRead)
                        .map((e) => {
                          //  console.log("this is element,,,",e.message)

                          return (
                            <div
                              key={e._id}
                              className="appearance-none border-2 backdrop-blur-md mb-6 border-white rounded-xl py-2 px-3 text-white leading-tight ">
                              <div className="">
                                <h1 className="text-lg text-gray-400 italic">{`Read message from: ${e.sender.email}`}</h1>
                                {e.projectInInterest && (
                                  <h2>
                                    Re: Project - {e.projectInInterest.title}
                                  </h2>
                                )}
                                {e.contributionInInterest && (
                                  <h2 className="text-base inline-flex  font-medium italic text-white">{`Re: Collaboration - ${e.contributionInInterest.title}`}</h2>
                                )}
                              </div>
                              <div className=" overflow-hidden">
                                <p className="px-4 py-1 text-white">
                                  {e.message}
                                </p>
                                <div className="px-2 py-1 flex justify-end">
                                  <button
                                    onClick={() => {
                                      deleteMessage(e._id);
                                    }}
                                    className="mt-8 -mr-2 p-2 border drop bg-transparent  hover:shadow-lg hover:bg-red-700 hover:text-black rounded-2xl hover:shadow-red-500 text-red-500">
                                    Delete Message
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Inbox;
