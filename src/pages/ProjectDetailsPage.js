import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import backgroundImage from "../assets/display-bg.jpeg";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

const API_URL = "http://localhost:5005";

function ProjectDetailsPage(props) {
  const [project, setProject] = useState({});
  const { projectId } = useParams();
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const getProject = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneProject = response.data;
        setProject(oneProject);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      message,
      owner: project.owner,
      projectInInterest: project._id,
    };

    console.log("requestBody......", requestBody);

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .post(`${API_URL}/api/requests`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Set the formSubmitted state to trigger a re-render
        console.log("response", response);
        setFormSubmitted(true);
        setMessageSent(true); // set the messageSent state to true after successful message submission
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProject(projectId);
    // Reset the formSubmitted state after a successful form submission
    if (formSubmitted) {
      setMessage("");
      setFormSubmitted(false);
    }
  }, [projectId, formSubmitted, messageSent]);

  return (
    <div
      className="h-screen flex flex-wrap"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}>
      <div className="w-full sm:w-1/2 lg:w-1/2 px-6 py-10">
        <div className="bg-transparent backdrop-blur-lg hover:shadow-xl hover:shadow-white box-border h-64 w-72 p-4 border-2 bg-slate-200 rounded-3xl shadow-lg shadow-cyan-400 ml-6 mr-6 mt-4">
          <form className="mb-4" onSubmit={handleSubmit}>
            <label className="text-xl font-bold text-white mb-4">Message</label>
            <input
              className="h-auto mt-12 rounded-2xl bg-transparent  appearance-none box-border  text-white placeholder-white border-cyan-400  w-full py-2 px-3  leading-tight  focus:ring-white"
              type="text"
              name="message"
              value={message}
              placeholder="Type your message here...."
              onChange={(e) => setMessage(e.target.value)}
            />
            {messageSent && <p>Message sent successfully!</p>}
            <button
              className="mt-4 p-4  bg-slate-800 border hover:text-green-400 hover:shadow-lg rounded-2xl hover:shadow-green-400 text-green-500"
              type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/2 px-6 py-10">
        <div className=" bg-transparent backdrop-blur-md text-white rounded-3xl border-2 shadow-lg shadow-cyan-400 hover:shadow-xl hover:shadow-white ml-6 mr-6 mt-4 p-8">
          {project && (
            <>
              <h1 className="text-3xl uppercase font-bold  mb-4">
                {project.title}
              </h1>
              <span className="text-sm">
                {" "}
                {new Date(project.createdAt).toLocaleDateString()}
              </span>
              <p className="whitespace-pre-line break-normal text-center mt-6 mb-8">
                {project.description}
              </p>
              <div className="flex items-center justify-between"></div>
            </>
          )}

          <Link to="/projects">
            <button className="mt-6 mr-8 p-4 drop bg-slate-800 border hover:text-white hover:shadow-lg rounded-2xl hover:shadow-cyan-400 text-cyan-600">
              Back
            </button>
          </Link>

          <Link to={`/projects/edit/${projectId}`}>
            <button className="p-4 drop bg-slate-800 border hover:text-red-500 hover:shadow-lg rounded-2xl hover:shadow-red-500 text-cyan-600">
              Edit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailsPage;
