import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/msg-bg.jpeg";

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
      <div
        className=" text-white backdrop-filter backdrop-blur-md  pt-4 min-h-screen"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }}>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4" >
          
            <div className=" backdrop-filter mt-8 bg-blur-sm justify-center items-center">
              <div className="hover:shadow-xl hover:shadow-white box-border p-4 border-2 rounded-3xl shadow-lg shadow-cyan-400 ml-6 mr-6 mt-4 ">
                <label className="text-slate-300 font-black ">
                  Unread Messages:
                </label>
                <div className="text-white">
                  {requests && requests
                    .filter((e) => !e.isRead)
                    .map((e) => {
                      return (
                        <div
                          key={e._id}
                          className="appearance-none border-2 bg-transparent  border-cyan-400 rounded-xl py-2 px-3 text-white leading-tight ">
                          <div className="">
                            <h1 className="text-lg text-red-600 italic">{`New message from: ${e.sender.email}`}</h1>
                            {e.projectInInterest && (
                              <h2 className="text-base font-medium italic text-white">{`Re: Project - ${e.projectInInterest.title}`}</h2>
                            )}
                            {e.contributionInInterest && (
                              <h2 className="text-base font-medium italic text-white">{`Re: Your Collaboration - ${e.contributionInInterest.title}`}</h2>
                            )}
                          </div>
                          <div className="mb-20">
                            <p className="px-4 py-2 text-white">{e.message}</p>
                            <div className="px-4 py-2 flex justify-end">
                              <button
                                onClick={() => {
                                  changeToRead(e._id);
                                }}
                                className="mt-8 -mr-2 p-1 border drop bg-slate-800 hover:text-white hover:shadow-lg rounded-2xl hover:shadow-cyan-400 text-cyan-600">
                                Mark As Read
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Market as read....... */}
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4" >
            <div className="flex flex-wrap  text-white backdrop-filter backdrop-blur-md  grid-rows-2 pt-4 h-screen">
              <div className=" ">
                <div className="backdrop-filter mt-8 bg-blur-sm ">
                  <div className="hover:shadow-xl hover:shadow-white box-border p-4 border-2 rounded-3xl shadow-lg shadow-cyan-400 ml-6 mr-6 mt-4 ">
                    <label className="text-slate-300 font-black ">
                      Read Messages:
                    </label>
                    <div className="text-white"></div>
                    {requests && requests
                      .filter((e) => e.isRead)
                      .map((e) => {
                        //  console.log("this is element,,,",e.message)

                        return (
                          <div
                            key={e._id}
                            className="appearance-none border-2 bg-transparent  border-cyan-400 rounded-xl py-2 px-3 text-white leading-tight ">
                            <div className="">
                              <h1 className="text-lg text-red-600 italic">{`Read message from: ${e.sender.email}`}</h1>
                              {e.projectInInterest && (
                                <h2>
                                  Re: Project - {e.projectInInterest.title}
                                </h2>
                              )}
                              {e.contributionInInterest && (
                                <h2 className="text-base font-medium italic text-white">{`Re: Your Collaboration - ${e.contributionInInterest.title}`}</h2>
                              )}
                            </div>
                            <div className="mb-20">
                              <p className="px-4 py-2 text-white">
                                {e.message}
                              </p>
                              <div className="px-4 py-2 flex justify-end">
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
