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

        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
          Languages used
        </h3>
        <ul className="ms-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex sm:flex-wrap dark:bg-gray-700 dark:border-gray-600 dark:text-white">
         
         
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 sm:w-1/4">
            <div className="flex items-center pl-3">
              <input
                id="vue-checkbox-list"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <svg
                enable-background="new 0 0 2500 2165.1"
                viewBox="0 0 2500 2165.1"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m1538.7 0-288.7 500-288.7-500h-961.3l1250 2165.1 1250-2165.1z"
                  fill="#4dba87"
                />
                <path
                  d="m1538.7 0-288.7 500-288.7-500h-461.3l750 1299 750-1299z"
                  fill="#435466"
                />
              </svg>
              <label
                for="vue-checkbox-list"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Vue JS
              </label>
            </div>
          </li>

          <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center pl-3">
              <input
                id="react-checkbox-list"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />

              <svg
                height="36"
                viewBox="175.7 78 490.6 436.9"
                width="36"
                xmlns="http://www.w3.org/2000/svg">
                <g fill="#61dafb">
                  <path d="m666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9v-22.3c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6v-22.3c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zm-101.4 106.7c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24s9.5 15.8 14.4 23.4zm73.9-208.1c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6s22.9-35.6 58.3-50.6c8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zm53.8 142.9c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6z" />
                  <circle cx="420.9" cy="296.5" r="45.7" />
                </g>
              </svg>

              <label
                for="react-checkbox-list"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                React
              </label>
            </div>
          </li>

          <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center pl-3">
              <input
                id="angular-checkbox-list"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />

              <svg
                width="24"
                height="24"
                viewBox="0 0 256 270"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin meet">
                <path
                  d="M127.606.341L.849 44.95 20.88 211.022l106.86 58.732 107.412-59.528L255.175 44.16 127.606.341z"
                  fill="#B3B3B3"
                />
                <path
                  d="M242.532 53.758L127.31 14.466v241.256l96.561-53.441 18.66-148.523z"
                  fill="#A6120D"
                />
                <path
                  d="M15.073 54.466l17.165 148.525 95.07 52.731V14.462L15.074 54.465z"
                  fill="#DD1B16"
                />
                <path
                  d="M159.027 142.898L127.31 157.73H93.881l-15.714 39.305-29.228.54L127.31 23.227l31.717 119.672zm-3.066-7.467l-28.44-56.303-23.329 55.334h23.117l28.652.97z"
                  fill="#F2F2F2"
                />
                <path
                  d="M127.309 23.226l.21 55.902 26.47 55.377h-26.62l-.06 23.189 36.81.035 17.204 39.852 27.967.518-81.981-174.873z"
                  fill="#B3B3B3"
                />
              </svg>

              <label
                for="angular-checkbox-list"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Angular
              </label>
            </div>
          </li>

          


          <li class="w-full dark:border-gray-600">
            <div class="flex items-center pl-3">
              <input
                id="laravel-checkbox-list"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />

              <svg
                height="24"
                width="24"
                viewBox="0 -.11376601 49.74245785 51.31690859"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1 -.402.694l-9.209 5.302v10.509c0 .286-.152.55-.4.694l-19.223 11.066c-.044.025-.092.041-.14.058-.018.006-.035.017-.054.022a.805.805 0 0 1 -.41 0c-.022-.006-.042-.018-.063-.026-.044-.016-.09-.03-.132-.054l-19.219-11.066a.801.801 0 0 1 -.402-.694v-32.916c0-.072.01-.142.028-.21.006-.023.02-.044.028-.067.015-.042.029-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.071-.093.023-.023.053-.04.079-.06.029-.024.055-.05.088-.069h.001l9.61-5.533a.802.802 0 0 1 .8 0l9.61 5.533h.002c.032.02.059.045.088.068.026.02.055.038.078.06.028.029.048.062.072.094.017.024.04.045.054.071.023.04.036.082.052.124.008.023.022.044.028.068a.809.809 0 0 1 .028.209v20.559l8.008-4.611v-10.51c0-.07.01-.141.028-.208.007-.024.02-.045.028-.068.016-.042.03-.085.052-.124.015-.026.037-.047.054-.071.024-.032.044-.065.072-.093.023-.023.052-.04.078-.06.03-.024.056-.05.088-.069h.001l9.611-5.533a.801.801 0 0 1 .8 0l9.61 5.533c.034.02.06.045.09.068.025.02.054.038.077.06.028.029.048.062.072.094.018.024.04.045.054.071.023.039.036.082.052.124.009.023.022.044.028.068zm-1.574 10.718v-9.124l-3.363 1.936-4.646 2.675v9.124l8.01-4.611zm-9.61 16.505v-9.13l-4.57 2.61-13.05 7.448v9.216zm-36.84-31.068v31.068l17.618 10.143v-9.214l-9.204-5.209-.003-.002-.004-.002c-.031-.018-.057-.044-.086-.066-.025-.02-.054-.036-.076-.058l-.002-.003c-.026-.025-.044-.056-.066-.084-.02-.027-.044-.05-.06-.078l-.001-.003c-.018-.03-.029-.066-.042-.1-.013-.03-.03-.058-.038-.09v-.001c-.01-.038-.012-.078-.016-.117-.004-.03-.012-.06-.012-.09v-21.483l-4.645-2.676-3.363-1.934zm8.81-5.994-8.007 4.609 8.005 4.609 8.006-4.61-8.006-4.608zm4.164 28.764 4.645-2.674v-20.096l-3.363 1.936-4.646 2.675v20.096zm24.667-23.325-8.006 4.609 8.006 4.609 8.005-4.61zm-.801 10.605-4.646-2.675-3.363-1.936v9.124l4.645 2.674 3.364 1.937zm-18.422 20.561 11.743-6.704 5.87-3.35-8-4.606-9.211 5.303-8.395 4.833z"
                  fill="#ff2d20"
                />
              </svg>

              <label
                for="laravel-checkbox-list"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Laravel
              </label>
            </div>
            
          </li>

          <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center pl-3">
              <input
                id="angular-checkbox-list"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />

              <svg
                width="24"
                height="24"
                viewBox="0 0 256 270"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin meet">
                <path
                  d="M127.606.341L.849 44.95 20.88 211.022l106.86 58.732 107.412-59.528L255.175 44.16 127.606.341z"
                  fill="#B3B3B3"
                />
                <path
                  d="M242.532 53.758L127.31 14.466v241.256l96.561-53.441 18.66-148.523z"
                  fill="#A6120D"
                />
                <path
                  d="M15.073 54.466l17.165 148.525 95.07 52.731V14.462L15.074 54.465z"
                  fill="#DD1B16"
                />
                <path
                  d="M159.027 142.898L127.31 157.73H93.881l-15.714 39.305-29.228.54L127.31 23.227l31.717 119.672zm-3.066-7.467l-28.44-56.303-23.329 55.334h23.117l28.652.97z"
                  fill="#F2F2F2"
                />
                <path
                  d="M127.309 23.226l.21 55.902 26.47 55.377h-26.62l-.06 23.189 36.81.035 17.204 39.852 27.967.518-81.981-174.873z"
                  fill="#B3B3B3"
                />
              </svg>

              <label
                for="angular-checkbox-list"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Angular
              </label>
            </div>
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
