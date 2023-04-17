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
  const [projectsId, setProjectsId] = useState(
    props.match?.params?.id || props.projectsId || ""
  );
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
        <h1 class="-mb-4 font-black text-2xl ">Add a new Project</h1>
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

        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white" >Languages used</h3>
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white" >
          
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600" >
            <div className="flex items-center pl-3" >
              <input id="vue-checkbox-list" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label for="vue-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vue JS</label>
            </div>
          </li>

          <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div class="flex items-center pl-3">
            <input id="react-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
            <label for="react-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">React</label>
        </div>
    </li>

    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div class="flex items-center pl-3">
            <input id="angular-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
            <label for="angular-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Angular</label>
        </div>
    </li>

    <li class="w-full dark:border-gray-600">
        <div class="flex items-center pl-3">
            <input id="laravel-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
            <label for="laravel-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Laravel</label>
        </div>
    </li>


    <li>
  <input type="checkbox" id="flowbite-option" value="" class="hidden peer" />
  <label for="flowbite-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
    <div class="block">
      <svg class="mb-2 text-green-400 w-7 h-7" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M356.9 64.3H280l-56 88.6-48-88.6H0L224 448 448 64.3h-91.1zm-301.2 32h53.8L224 294.5 338.4 96.3h53.8L224 384.5 55.7 96.3z"/></svg>
      <div class="w-full text-lg font-semibold">Vue Js</div>
      <div class="w-full text-sm">Vue.js is an model–view front end JavaScript framework.</div>
    </div>
  </label>
</li>



        </ul>

        <input type="hidden" title="owner" value={user._id} />

        <div className="mb-4">
          <label htmlFor="file" className="block text-zinc-200 font-bold mb-2">
            Upload file:
          </label>
          <input
            type="file"
            name="file"
            id="file"
            className="mb-10 appearance-none border border-cyan-400 rounded-xl w-full py-2 px-3 text-slate-300 leading-tight focus:outline-none focus:ring-white"
            onChange={(e) => handleFileUpload(e)}
          />

          <div className="flex justify-center">
            <button
              type="cancel"
              className=" bg-red-600 hover:bg-slate-700 text-black mr-6 font-bold py-2 px-4 rounded-full hover:text-red-600  hover:italic hover:shadow-lg hover:shadow-red-600">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-cyan-400 hover:bg-white text-black font-bold py-2 px-4 rounded-full hover:italic hover:shadow-lg hover:shadow-cyan-400 ">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddProject;
