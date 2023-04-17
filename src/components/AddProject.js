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

        <ul className="ms-center w-full text-sm sm:flex sm:flex-wrap  appearance-none border bg-transparent text-white border-cyan-400 rounded-xl leading-tight focus:outline-none focus:ring-white  ">
         
          {/* React-checkbox */}
          <li class="ml-4 mt-2 border-white">
            <div class="flex items-center pl-3">
              <input
                id="React-checkbox-list"
                type="checkbox"
                value=""
                class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
              />

              <svg
                className="ml-4"
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
                for="React-checkbox-list"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                React
              </label>
            </div>
          </li>

          {/* Angular-checkbox */}
          <li class="ml-10 mt-2 dark:border-gray-600">
            <div class="flex items-center pl-3">
              <input
                id="Angular-checkbox-list"
                type="checkbox"
                value=""
                class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
              />

              <svg
                className="ml-4  "
                width="36"
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
                for="Angular-checkbox-list"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Angular
              </label>
            </div>
          </li>

          {/* JavaScript-checkbox */}
          <li class="ml-4 mt-2 dark:border-gray-600">
            <div class="flex items-center pl-3">
              <input
                id="JavaScript-checkbox-list"
                type="checkbox"
                value=""
                class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
              />

              <svg
                className="ml-4 "
                fill="none"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 124 141.53199999999998">
                <path
                  d="M10.383 126.894L0 0l124 .255-10.979 126.639-50.553 14.638z"
                  fill="#e9ca32"
                />
                <path
                  d="M62.468 129.277V12.085l51.064.17-9.106 104.851z"
                  fill="#ffde25"
                />
                <g fill="#fff">
                  <path d="M57 26H43.5v78L33 102V91.5l-12.5-2V113l36.5 9.5zM67.127 26H104.5L102 40.95H81.394v24.533H102L99.5 115l-32.373 7.5V107L89 99.5 90.263 79l-23.136 3.35z" />
                </g>
              </svg>

              <label
                for="JavaScript-checkbox-list"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                JavaScript
              </label>
            </div>
          </li>

          {/* NextJs-checkbox */}
          <li class="ml-5 mt-2 dark:border-gray-600">
            <div class="flex items-center pl-3">
              <input
                id="NextJs-checkbox-list"
                type="checkbox"
                value=""
                class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
              />

              <svg
                className="ml-4 "
                height="36"
                preserveAspectRatio="xMidYMid"
                viewBox="0 0 512 308.883"
                width="36"
                xmlns="http://www.w3.org/2000/svg">
                <path d="m120.81 80.561h96.568v7.676h-87.716v57.767h82.486v7.675h-82.486v63.423h88.722v7.675h-97.574zm105.22 0h10.26l45.467 63.423 46.473-63.424 63.211-80.56-103.85 150.65 53.515 74.127h-10.663l-48.686-67.462-48.888 67.462h-10.461l53.917-74.128zm118.898 7.676v-7.677h110.048v7.676h-50.699v136.54h-8.852v-136.539zm-344.928-7.677h11.065l152.58 228.323-63.053-84.107-91.338-133.308-.402 133.31h-8.852zm454.084 134.224c-1.809 0-3.165-1.4-3.165-3.212 0-1.81 1.356-3.212 3.165-3.212 1.83 0 3.165 1.401 3.165 3.212s-1.335 3.212-3.165 3.212zm8.698-8.45h4.737c.064 2.565 1.937 4.29 4.693 4.29 3.079 0 4.823-1.854 4.823-5.325v-21.99h4.823v22.011c0 6.252-3.617 9.853-9.603 9.853-5.62 0-9.473-3.493-9.473-8.84zm25.384-.28h4.78c.409 2.953 3.294 4.828 7.45 4.828 3.875 0 6.717-2.005 6.717-4.764 0-2.371-1.809-3.794-5.921-4.764l-4.005-.97c-5.62-1.316-8.181-4.032-8.181-8.602 0-5.54 4.521-9.227 11.303-9.227 6.308 0 10.916 3.686 11.196 8.925h-4.694c-.452-2.867-2.95-4.657-6.567-4.657-3.81 0-6.35 1.833-6.35 4.635 0 2.22 1.635 3.493 5.683 4.441l3.423.841c6.373 1.488 9 4.075 9 8.753 0 5.95-4.607 9.68-11.97 9.68-6.89 0-11.52-3.558-11.864-9.12z" />
              </svg>

              <label
                for="NextJs-checkbox-list"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                NextJs
              </label>
            </div>
          </li>

          {/* TypeScript-checkbox */}
          <li class="ml-4 mr-2 mt-2 dark:border-gray-600">
            <div class="flex items-center pl-3">
              <input
                id="TypeScript-checkbox-list"
                type="checkbox"
                value=""
                class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
              />

              <svg
                className="ml-4 "
                height="24"
                viewBox="0 0 640 640"
                width="24"
                xmlns="http://www.w3.org/2000/svg">
                <path d="m0 0h640v640h-640z" fill="#017acb" />
                <path
                  d="m307.3 237h30.7v53h-83v235.8l-2.2.6c-3 .8-42.5.8-51-.1l-6.8-.6v-235.7h-83v-53l26.3-.3c14.4-.2 51.4-.2 82.2 0s69.8.3 86.8.3zm234.3 263.8c-12.2 12.9-25.3 20.1-47.1 26-9.5 2.6-11.1 2.7-32.5 2.6s-23.1-.1-33.5-2.8c-26.9-6.9-48.6-20.4-63.4-39.5-4.2-5.4-11.1-16.6-11.1-18 0-.4 1-1.3 2.3-1.9s4-2.3 6.2-3.6 6.2-3.7 8.9-5.1 10.5-6 17.3-10.1 13-7.4 13.7-7.4 2 1.4 3 3.1c6 10.1 20 23 29.9 27.4 6.1 2.6 19.6 5.5 26.1 5.5 6 0 17-2.6 22.9-5.3 6.3-2.9 9.5-5.8 13.3-11.6 2.6-4.1 2.9-5.2 2.8-13 0-7.2-.4-9.2-2.4-12.5-5.6-9.2-13.2-14-44-27.6-31.8-14.1-46.1-22.5-57.7-33.8-8.6-8.4-10.3-10.7-15.7-21.2-7-13.5-7.9-17.9-8-38-.1-14.1.2-18.7 1.7-23.5 2.1-7.2 8.9-21.1 12-24.6 6.4-7.5 8.7-9.8 13.2-13.5 13.6-11.2 34.8-18.6 55.1-19.3 2.3 0 9.9.4 17 .9 20.4 1.7 34.3 6.7 47.7 17.4 10.1 8 25.4 26.8 23.9 29.3-1 1.5-40.9 28.1-43.5 28.9-1.6.5-2.7-.1-4.9-2.7-13.6-16.3-19.1-19.8-32.3-20.6-9.4-.6-14.4.5-20.7 4.7-6.6 4.4-9.8 11.1-9.8 20.4.1 13.6 5.3 20 24.5 29.5 12.4 6.1 23 11.1 23.8 11.1 1.2 0 26.9 12.8 33.6 16.8 31.2 18.3 43.9 37.1 47.2 69.5 2.4 24.4-4.5 46.7-19.5 62.5z"
                  fill="#fff"
                />
              </svg>

              <label
                for="TypeScript-checkbox-list"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                TypeScript
              </label>
            </div>
          </li>

          {/* VueJS-checkbox */}
          <li class="ml-2 mt-2 dark:border-gray-600">
            <div class="flex items-center pl-3">
              <input
                id="VueJS-checkbox-list"
                type="checkbox"
                value=""
                class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
              />

              <svg
                className="ml-4"
                width="56"
                height="24"
                viewBox="0 0 256 221"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin meet">
                <path
                  d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36z"
                  fill="#41B883"
                />
                <path
                  d="M0 0l128 220.8L256 0h-51.2L128 132.48 50.56 0H0z"
                  fill="#41B883"
                />
                <path
                  d="M50.56 0L128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56z"
                  fill="#35495E"
                />
              </svg>

              <label
                for="VueJS-checkbox-list"
                class="w-full py-3 mr-28 text-sm font-medium text-gray-900 dark:text-gray-300">
                VueJS
              </label>
            </div>
          </li>

          {/* Python-checkbox */}
          <li class="ml-4 mr-2 mt-2 dark:border-gray-600">
            <div class="flex items-center pl-3">
              <input
                id="Python-checkbox-list"
                type="checkbox"
                value=""
                class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
              />

              <svg
                className="ml-4 "
                width="36"
                height="24"
                viewBox="0 0 256 255"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin meet">
                <defs>
                  <linearGradient
                    x1="12.959%"
                    y1="12.039%"
                    x2="79.639%"
                    y2="78.201%"
                    id="a">
                    <stop stop-color="#387EB8" offset="0%" />
                    <stop stop-color="#366994" offset="100%" />
                  </linearGradient>
                  <linearGradient
                    x1="19.128%"
                    y1="20.579%"
                    x2="90.742%"
                    y2="88.429%"
                    id="b">
                    <stop stop-color="#FFE052" offset="0%" />
                    <stop stop-color="#FFC331" offset="100%" />
                  </linearGradient>
                </defs>
                <path
                  d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z"
                  fill="url(#a)"
                />
                <path
                  d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z"
                  fill="url(#b)"
                />
              </svg>

              <label
                for="Python-checkbox-list"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Python
              </label>
            </div>
          </li>

          {/* NodeJS-checkbox */}
          <li class="ml-5 mt-2 dark:border-gray-600">
            <div class="flex items-center pl-3">
              <input
                id="NodeJS-checkbox-list"
                type="checkbox"
                value=""
                class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
              />

              <svg
                className="ml-4 "
                width="24"
                height="24"
                viewBox="0 0 256 282"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin meet">
                <g fill="#8CC84B">
                  <path d="M116.504 3.58c6.962-3.985 16.03-4.003 22.986 0 34.995 19.774 70.001 39.517 104.99 59.303 6.581 3.707 10.983 11.031 10.916 18.614v118.968c.049 7.897-4.788 15.396-11.731 19.019-34.88 19.665-69.742 39.354-104.616 59.019-7.106 4.063-16.356 3.75-23.24-.646-10.457-6.062-20.932-12.094-31.39-18.15-2.137-1.274-4.546-2.288-6.055-4.36 1.334-1.798 3.719-2.022 5.657-2.807 4.365-1.388 8.374-3.616 12.384-5.778 1.014-.694 2.252-.428 3.224.193 8.942 5.127 17.805 10.403 26.777 15.481 1.914 1.105 3.852-.362 5.488-1.274 34.228-19.345 68.498-38.617 102.72-57.968 1.268-.61 1.969-1.956 1.866-3.345.024-39.245.006-78.497.012-117.742.145-1.576-.767-3.025-2.192-3.67-34.759-19.575-69.5-39.18-104.253-58.76a3.621 3.621 0 0 0-4.094-.006C91.2 39.257 56.465 58.88 21.712 78.454c-1.42.646-2.373 2.071-2.204 3.653.006 39.245 0 78.497 0 117.748a3.329 3.329 0 0 0 1.89 3.303c9.274 5.259 18.56 10.481 27.84 15.722 5.228 2.814 11.647 4.486 17.407 2.33 5.083-1.823 8.646-7.01 8.549-12.407.048-39.016-.024-78.038.036-117.048-.127-1.732 1.516-3.163 3.2-3 4.456-.03 8.918-.06 13.374.012 1.86-.042 3.14 1.823 2.91 3.568-.018 39.263.048 78.527-.03 117.79.012 10.464-4.287 21.85-13.966 26.97-11.924 6.177-26.662 4.867-38.442-1.056-10.198-5.09-19.93-11.097-29.947-16.55C5.368 215.886.555 208.357.604 200.466V81.497c-.073-7.74 4.504-15.197 11.29-18.85C46.768 42.966 81.636 23.27 116.504 3.58z" />
                  <path d="M146.928 85.99c15.21-.979 31.493-.58 45.18 6.913 10.597 5.742 16.472 17.793 16.659 29.566-.296 1.588-1.956 2.464-3.472 2.355-4.413-.006-8.827.06-13.24-.03-1.872.072-2.96-1.654-3.195-3.309-1.268-5.633-4.34-11.212-9.642-13.929-8.139-4.075-17.576-3.87-26.451-3.785-6.479.344-13.446.905-18.935 4.715-4.214 2.886-5.494 8.712-3.99 13.404 1.418 3.369 5.307 4.456 8.489 5.458 18.33 4.794 37.754 4.317 55.734 10.626 7.444 2.572 14.726 7.572 17.274 15.366 3.333 10.446 1.872 22.932-5.56 31.318-6.027 6.901-14.805 10.657-23.56 12.697-11.647 2.597-23.734 2.663-35.562 1.51-11.122-1.268-22.696-4.19-31.282-11.768-7.342-6.375-10.928-16.308-10.572-25.895.085-1.619 1.697-2.748 3.248-2.615 4.444-.036 8.888-.048 13.332.006 1.775-.127 3.091 1.407 3.182 3.08.82 5.367 2.837 11 7.517 14.182 9.032 5.827 20.365 5.428 30.707 5.591 8.568-.38 18.186-.495 25.178-6.158 3.689-3.23 4.782-8.634 3.785-13.283-1.08-3.925-5.186-5.754-8.712-6.95-18.095-5.724-37.736-3.647-55.656-10.12-7.275-2.571-14.31-7.432-17.105-14.906-3.9-10.578-2.113-23.662 6.098-31.765 8.006-8.06 19.563-11.164 30.551-12.275z" />
                </g>
              </svg>

              <label
                for="NodeJS-checkbox-list"
                class="w-full py-3  text-sm font-medium text-gray-900 dark:text-gray-300">
                NodeJS
              </label>
            </div>
          </li>

          {/* TailwindCSS-checkbox */}
          <li class="ml-4 mt-2 dark:border-gray-600">
            <div class="flex items-center pl-3">
              <input
                id="TailwindCSS-checkbox-list"
                type="checkbox"
                value=""
                class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
              />

              <svg
                className="ml-3"
                height="36"
                preserveAspectRatio="xMidYMid"
                width="36"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 153.6">
                <linearGradient id="a" x1="-2.778%" y1="32%" y2="67.556%">
                  <stop offset="0" stop-color="#2298bd" />
                  <stop offset="1" stop-color="#0ed7b5" />
                </linearGradient>
                <path
                  d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0zM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8z"
                  fill="url(#a)"
                />
              </svg>

              <label
                for="TailwindCSS-checkbox-list"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                TailwindCSS
              </label>
            </div>
          </li>

          {/* Bootstrap-checkbox */}
          <li class="-ml-1 mt-2 dark:border-gray-600">
            <div class="flex items-center pl-3">
              <input
                id="Bootstrap-checkbox-list"
                type="checkbox"
                value=""
                class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
              />

              <svg
                className="ml-4 "
                height="24"
                viewBox="0 0 512 407.864"
                width="24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m106.344 0c-29.214 0-50.831 25.57-49.863 53.3.929 26.641-.278 61.145-8.964 89.283-8.717 28.217-23.449 46.098-47.517 48.393v25.912c24.068 2.3 38.8 20.172 47.516 48.393 8.687 28.138 9.893 62.642 8.964 89.283-.968 27.726 20.649 53.3 49.868 53.3h299.347c29.214 0 50.827-25.57 49.859-53.3-.929-26.641.278-61.145 8.964-89.283 8.717-28.221 23.413-46.1 47.482-48.393v-25.912c-24.068-2.3-38.764-20.172-47.482-48.393-8.687-28.134-9.893-62.642-8.964-89.283.968-27.726-20.645-53.3-49.859-53.3h-299.355zm240.775 251.067c0 38.183-28.481 61.34-75.746 61.34h-80.458a8.678 8.678 0 0 1 -8.678-8.678v-199.593a8.678 8.678 0 0 1 8.678-8.678h80c39.411 0 65.276 21.348 65.276 54.124 0 23.005-17.4 43.6-39.567 47.208v1.2c30.176 3.31 50.495 24.21 50.495 53.077zm-84.519-128.1h-45.876v64.8h38.639c29.87 0 46.34-12.028 46.34-33.527-.003-20.148-14.163-31.273-39.103-31.273zm-45.876 90.511v71.411h47.564c31.1 0 47.573-12.479 47.573-35.931s-16.935-35.484-49.573-35.484h-45.564z"
                  fill="#7952b3"
                  fill-rule="evenodd"
                />
              </svg>

              <label
                for="Bootstrap-checkbox-list"
                class="w-full py-3  text-sm font-medium text-gray-900 dark:text-gray-300">
                Bootstrap
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
