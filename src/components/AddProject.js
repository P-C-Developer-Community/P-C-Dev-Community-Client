import { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import service from "../api/service";
const API_URL = "http://localhost:5005";

function AddProject(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [projectsId, setProjectsId] = useState(props.match?.params?.id || props.projectsId || "");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const projectId = props.match?.params?.id || props.projectsId;
    setProjectsId(projectId);
  }, [props]);

  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { projectsId } = props;
     // Create an object representing the body of the POST request
    const requestBody = { title, description, owner: user._id, imageUrl };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .post(`${API_URL}/api/projects`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state to clear the inputs
        setTitle("");
        setDescription("");

        // Invoke the callback function coming through the props
        // from the ProjectDetailsPage, to refresh the project details
        props.handleAddProjectSuccess();
        props.refreshProjects();
        props.onClose();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div class="text-zinc-100 bg-opacity-80">
        <h1 class="mb-8 font-black text-2xl ">Add a new Project</h1>
      </div>

      <label>Owner:</label>
      <span>{user && user.name}</span>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-zinc-200 font-bold mb-2">
            Title:
          </label>

          <input
            type="text"
            title="title"
            id="title"
            className="appearance-none border bg-transparent  border-cyan-400 rounded-xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-white "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title of your project"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-zinc-200 font-bold mb-2">
            Description:
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            className="h-24 appearance-none border bg-transparent text-white border-cyan-400 rounded-xl w-full py-2 px-3  leading-tight focus:outline-none focus:ring-white "
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a description of your contribution"></textarea>
        </div>
        <input type="hidden" title="owner" value={user._id} />
        <input
          type="file"
          name="file"
          id="file"
          className=" appearance-none border border-cyan-400 rounded-xl w-full py-2 px-3 text-slate-300 leading-tight focus:outline-none focus:ring-white"
          onChange={(e) => handleFileUpload(e)}
        />

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-cyan-400 hover:bg-white text-black font-bold py-2 px-4 rounded-full hover:italic hover:shadow-lg hover:shadow-cyan-400 ">
            Submit
          </button>
          <button
            type="cancel"
            className="bg-red-600 hover:bg-slate-700 text-black ml-6 font-bold py-2 px-4 rounded-full hover:text-red-600  hover:italic hover:shadow-lg hover:shadow-red-600">
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default AddProject;
