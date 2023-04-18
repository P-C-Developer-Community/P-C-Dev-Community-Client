import { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import service from "../api/service";


function AddProject(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [projectsId, setProjectsId] = useState(
    props.match?.params?.id || props.projectsId || ""
  );
  const [languages, setLanguages] = useState([]);

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
        console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { projectsId } = props;
    // Create an object representing the body of the POST request

    const requestBody = {
      title,
      description,
      owner: user._id,
      imageUrl,
      languages,
    };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/projects`, requestBody, {
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

  const handleLanguageChange = (e) => {
    const isChecked = e.target.checked;
    console.log("is checked,,,,,,,", isChecked);
    const value = e.target.value;
    console.log("values......", value);
    if (isChecked) {
      setLanguages([value, ...languages]);
      console.log("languages..........", languages);
    } else {
      setLanguages(languages.filter((lang) => lang !== value));
    }
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
        Code Languages
        </h3>

        <table class="table-auto">
          <tbody>
            <tr className="ms-center w-full text-sm sm:flex sm:flex-wrap  appearance-none border bg-transparent text-white border-cyan-400 rounded-xl leading-tight focus:outline-none focus:ring-white  ">
              {/* React-checkbox */}
              <td class=" mt-2 border-white">
                <div class="flex items-center pl-3">
                  <input
                    id="React-checkbox-list"
                    type="checkbox"
                    value="React"
                    class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
                    onChange={handleLanguageChange}
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
              </td>

              {/* Angular-checkbox */}
              <td class=" mt-2 dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input
                    id="Angular-checkbox-list"
                    type="checkbox"
                    value="Angular"
                    class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
                    onChange={handleLanguageChange}
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
              </td>


              {/* JavaScript-checkbox */}
              <td class=" mt-2 dark:border-gray-600">
                <div class="flex items-center pl-4">
                  <input
                    id="JavaScript-checkbox-list"
                    type="checkbox"
                    value="JavaScript"
                    class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
                    onChange={handleLanguageChange}
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
              </td>

              {/* NextJs-checkbox */}
              <td class=" mt-2 dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input
                    id="NextJs-checkbox-list"
                    type="checkbox"
                    value="NextJs"
                    class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
                    onChange={handleLanguageChange}
                  />

                  <svg
                    className="ml-1 "
                    height="36"
                    preserveAspectRatio="xMidYMid"
                    viewBox="0 0 512 308.883"
                    width="56"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="m120.81 80.561h96.568v7.676h-87.716v57.767h82.486v7.675h-82.486v63.423h88.722v7.675h-97.574zm105.22 0h10.26l45.467 63.423 46.473-63.424 63.211-80.56-103.85 150.65 53.515 74.127h-10.663l-48.686-67.462-48.888 67.462h-10.461l53.917-74.128zm118.898 7.676v-7.677h110.048v7.676h-50.699v136.54h-8.852v-136.539zm-344.928-7.677h11.065l152.58 228.323-63.053-84.107-91.338-133.308-.402 133.31h-8.852zm454.084 134.224c-1.809 0-3.165-1.4-3.165-3.212 0-1.81 1.356-3.212 3.165-3.212 1.83 0 3.165 1.401 3.165 3.212s-1.335 3.212-3.165 3.212zm8.698-8.45h4.737c.064 2.565 1.937 4.29 4.693 4.29 3.079 0 4.823-1.854 4.823-5.325v-21.99h4.823v22.011c0 6.252-3.617 9.853-9.603 9.853-5.62 0-9.473-3.493-9.473-8.84zm25.384-.28h4.78c.409 2.953 3.294 4.828 7.45 4.828 3.875 0 6.717-2.005 6.717-4.764 0-2.371-1.809-3.794-5.921-4.764l-4.005-.97c-5.62-1.316-8.181-4.032-8.181-8.602 0-5.54 4.521-9.227 11.303-9.227 6.308 0 10.916 3.686 11.196 8.925h-4.694c-.452-2.867-2.95-4.657-6.567-4.657-3.81 0-6.35 1.833-6.35 4.635 0 2.22 1.635 3.493 5.683 4.441l3.423.841c6.373 1.488 9 4.075 9 8.753 0 5.95-4.607 9.68-11.97 9.68-6.89 0-11.52-3.558-11.864-9.12z" />
                  </svg>

                  <label
                    for="NextJs-checkbox-list"
                    class="w-full py-3 pr-1 text-sm font-medium text-gray-900 dark:text-gray-300">
                    NextJs
                  </label>
                </div>
              </td>

              {/* TypeScript-checkbox */}
              <td class=" pr-2  mt-2 dark:border-gray-600">
                <div class="flex items-center ">
                  <input
                    id="TypeScript-checkbox-list"
                    type="checkbox"
                    value="TypeScript"
                    class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
                    onChange={handleLanguageChange}
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
              </td>

              {/* VueJS-checkbox */}
              <td class=" mt-2 dark:border-gray-600">
                <div class="flex items-center ">
                  <input
                    id="VueJS-checkbox-list"
                    type="checkbox"
                    value="VueJS"
                    class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
                    onChange={handleLanguageChange}
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
                    class="w-full py-3 mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    VueJS
                  </label>
                </div>
              </td>

              {/* Python-checkbox */}
              <td class=" mt-2 dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input
                    id="Python-checkbox-list"
                    type="checkbox"
                    value="Python"
                    class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
                    onChange={handleLanguageChange}
                 />

                  <svg
                    className="ml-3 "
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
                    class="w-full py-3 pl-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Python
                  </label>
                </div>
              </td>

              {/* NodeJS-checkbox */}
              <td class=" mt-2 dark:border-gray-600">
                <div class="flex items-center pl-1">
                  <input
                    id="NodeJS-checkbox-list"
                    type="checkbox"
                    value="NodeJS"
                    class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
                    onChange={handleLanguageChange}
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
              </td>

              {/* TailwindCSS-checkbox */}
              <td class=" mt-2 dark:border-gray-600">
                <div class="flex items-center pl-1 ml-8">
                  <input
                    id="TailwindCSS-checkbox-list"
                    type="checkbox"
                    value="TailwindCSS"
                    class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
                    onChange={handleLanguageChange}
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
                    class="w-full py-3  text-sm font-medium text-gray-900 dark:text-gray-300">
                    TailwindCSS
                  </label>
                </div>
              </td>

              {/* Bootstrap-checkbox */}
              <td class=" mt-2 dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input
                    id="Bootstrap-checkbox-list"
                    type="checkbox"
                    value="Bootstrap"
                    class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
                    onChange={handleLanguageChange}
                 />

                  <svg
                    className="ml-3 "
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
              </td>

              {/* Sass-checkbox */}
              <td class=" mt-2 dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input
                    id="Sass-checkbox-list"
                    type="checkbox"
                    value="Sass"
                    class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
                    onChange={handleLanguageChange}
                />

                  <svg
                    className="ml-3 "
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="36"
                    viewBox="0 0 512 384">
                    <path
                      fill="#CF649A"
                      d="M440.6 220.6c-17.9.101-33.4 4.4-46.4 10.801-4.8-9.5-9.6-17.801-10.399-24-.9-7.2-2-11.601-.9-20.2C384 178.6 389 166.4 389 165.4c-.101-.9-1.101-5.3-11.4-5.4s-19.2 2-20.2 4.7-3 8.9-4.3 15.3c-1.8 9.4-20.6 42.7-31.3 60.2-3.5-6.8-6.5-12.8-7.101-17.601-.899-7.199-2-11.6-.899-20.199 1.1-8.601 6.1-20.8 6.1-21.8-.1-.9-1.1-5.3-11.399-5.4-10.301-.1-19.2 2-20.2 4.7s-2.1 9.1-4.3 15.3C281.9 201.4 256.9 257 250.4 271.5c-3.3 7.4-6.199 13.3-8.3 17.3-2.1 4-.1.3-.3.7-1.8 3.4-2.8 5.3-2.8 5.3v.101c-1.4 2.5-2.9 4.899-3.601 4.899-.5 0-1.5-6.7.2-15.899 3.7-19.301 12.7-49.4 12.601-50.5 0-.5 1.699-5.801-5.801-8.5-7.3-2.7-9.899 1.8-10.5 1.8-.6 0-1.1 1.6-1.1 1.6s8.1-33.899-15.5-33.899c-14.8 0-35.2 16.1-45.3 30.8-6.4 3.5-20 10.899-34.4 18.8-5.5 3-11.2 6.2-16.6 9.1L117.9 251.9c-28.6-30.5-81.5-52.1-79.3-93.1.8-14.9 6-54.2 101.601-101.8 78.3-39 141-28.3 151.899-4.5 15.5 34-33.5 97.2-114.899 106.3-31 3.5-47.301-8.5-51.4-13-4.3-4.7-4.9-4.9-6.5-4-2.6 1.4-1 5.6 0 8.1 2.4 6.3 12.4 17.5 29.4 23.1 14.899 4.9 51.3 7.6 95.3-9.4 49.3-19.1 87.8-72.1 76.5-116.4-11.5-45.1-86.3-59.9-157-34.8C121.4 27.4 75.8 50.8 43 81.5 4 117.9-2.2 149.7.4 162.9c9.101 47.1 74 77.8 100 100.5-1.3.699-2.5 1.399-3.6 2-13 6.399-62.5 32.3-74.9 59.699-14 31 2.2 53.301 13 56.301 33.4 9.3 67.6-7.4 86.1-34.9 18.399-27.5 16.2-63.2 7.7-79.5l-.301-.6 10.2-6c6.601-3.9 13.101-7.5 18.8-10.601-3.199 8.7-5.5 19-6.699 34-1.4 17.601 5.8 40.4 15.3 49.4 4.2 3.899 9.2 4 12.3 4 11 0 16-9.101 21.5-20 6.8-13.3 12.8-28.7 12.8-28.7s-7.5 41.7 13 41.7c7.5 0 15-9.7 18.4-14.7v.1s.2-.3.6-1a36.13 36.13 0 0 0 1.2-1.899v-.2c3-5.2 9.7-17.1 19.7-36.8 12.899-25.4 25.3-57.2 25.3-57.2s1.2 7.8 4.9 20.6c2.199 7.601 6.999 15.9 10.699 24-3 4.2-4.8 6.601-4.8 6.601l.1.1c-2.399 3.2-5.1 6.601-7.899 10-10.2 12.2-22.4 26.101-24 30.101-1.9 4.699-1.5 8.199 2.2 11 2.7 2 7.5 2.399 12.6 2 9.2-.601 15.6-2.9 18.8-4.301 5-1.8 10.7-4.5 16.2-8.5 10-7.399 16.1-17.899 15.5-31.899-.3-7.7-2.8-15.3-5.9-22.5.9-1.3 1.801-2.601 2.7-4 15.8-23.101 28-48.5 28-48.5s1.2 7.8 4.9 20.6c1.899 6.5 5.7 13.601 9.1 20.601-14.8 12.1-24.1 26.1-27.3 35.3-5.9 17-1.3 24.7 7.4 26.5 3.899.8 9.5-1 13.699-2.8 5.2-1.7 11.5-4.601 17.301-8.9 10-7.4 19.6-17.7 19.1-31.6-.3-6.4-2-12.7-4.3-18.7 12.6-5.2 28.899-8.2 49.6-5.7 44.5 5.2 53.3 33 51.601 44.6-1.7 11.601-11 18-14.101 20-3.1 1.9-4.1 2.601-3.8 4 .4 2.101 1.8 2 4.5 1.601 3.7-.601 23.4-9.5 24.2-30.899 1.2-27.504-24.9-57.504-71.2-57.205zM97.4 336.3c-14.7 16.1-35.4 22.2-44.2 17-9.5-5.5-5.801-29.2 12.3-46.3 11-10.4 25.3-20 34.7-25.9 2.1-1.3 5.3-3.199 9.1-5.5.6-.399 1-.6 1-.6.7-.4 1.5-.9 2.3-1.4 6.7 24.4.3 45.8-15.2 62.7zm107.5-73.1c-5.1 12.5-15.9 44.6-22.4 42.8-5.601-1.5-9-25.8-1.101-49.8 4-12.101 12.5-26.5 17.5-32.101 8.101-9 16.9-12 19.101-8.3 2.6 4.801-9.9 39.601-13.1 47.401zm88.7 42.4c-2.2 1.101-4.2 1.9-5.1 1.301-.7-.4.899-1.9.899-1.9s11.1-11.9 15.5-17.4c2.5-3.199 5.5-6.899 8.7-11.1v1.2C313.6 292.1 299.8 301.7 293.6 305.6zm68.399-15.6c-1.6-1.2-1.399-4.9 4-16.5 2.101-4.6 6.9-12.3 15.2-19.6 1 3 1.601 5.899 1.5 8.6-.099 18-12.899 24.7-20.7 27.5z"
                    />
                  </svg>

                  <label
                    for="Sass-checkbox-list"
                    class="w-full py-3  text-sm font-medium text-gray-900 dark:text-gray-300">
                    Sass
                  </label>
                </div>
              </td>

              {/* jQuery-checkbox */}
              <td class=" mt-2 ml-6 dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input
                    id="jQuery-checkbox-list"
                    type="checkbox"
                    value="jQuery"
                    class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
                    onChange={handleLanguageChange}
                  />

                  <svg
                    className="ml-3 "
                    xmlns="http://www.w3.org/2000/svg"
                    width="56"
                    height="24"
                    viewBox="2.146 180.818 494.707 139.364">
                    <path
                      d="M143.491 235.256l.001-.006-3.953 14.007 3.952-14.001zM163.818 265.664l-4.355-.025 4.355.025zM162.698 286.583h.004l-26.093.095 26.089-.095zM168.169 265.689l-4.357-.025 4.357.025zM164.985 284.805l4.545-17.334-4.545 17.338v-.004zM261.055 204.977l-8.466 39.804 8.466-39.804zM239.29 204.977l-6.428 29.735 6.428-29.738v.003z"
                      fill="#6ba0ab"
                    />
                    <path
                      d="M259.605 203.186h-18.106c-1.004 0-2.001.806-2.216 1.788l-6.428 29.737-6.428 29.738c-.213.982-1.209 1.785-2.213 1.785h-12.815c-12.679 0-11.212-8.771-8.615-20.783l.078-.363.285-1.514c.017-.098.037-.196.053-.285l.579-3.083.62-3.305c.189-.996.475-2.453.662-3.368l2.922-14.277 2.924-14.278c.202-.984-.458-1.793-1.462-1.793H190.86c-1.005 0-2 .809-2.205 1.791l-3.996 18.958-3.995 18.956c-.004.008-.005.021-.006.029l-.372 1.762c-4.603 21.014-3.382 41.051 21.632 41.678.409.013.726.016.726.016h39.265c1.004 0 1.999-.807 2.209-1.791l8.468-39.801 8.467-39.805c.208-.986-.444-1.791-1.448-1.792zM331.834 266.441c1.006 0 1.664.808 1.462 1.789l-1.759 8.595M329.782 285.423l1.757-8.599-1.758 8.601.001-.002zM327.577 287.23l.008-.002c-5.327.043-21.339.164-33.374.164 14.646.001 33.365-.162 33.366-.162zM283.41 255.374c-.016-.94 1.057-2.562 2.062-2.562l-2.265-.037c-1.016 10.246.203 2.599.203 2.599z"
                      fill="#6ba0ab"
                    />
                    <path
                      d="M295.861 287.391c-.115 0-.234 0-.353.002.119-.002.238-.002.353-.002zM331.834 266.441c1.006 0 1.664.808 1.462 1.789l-1.759 8.595-.286 1.401M304.434 287.368h-.073.073zM299.988 287.383h-.261.261zM298.632 287.387c-.146 0-.286 0-.427.004.141-.004.281-.004.427-.004zM297.252 287.391h-.374.374zM299.729 287.383l-1.097.002 1.097-.002zM304.361 287.368zM327.59 287.229c-3.904.03-13.547.104-23.163.144 9.61-.039 19.256-.114 23.163-.144zM329.782 285.426l1.473-7.199-1.474 7.205.001-.006zM298.208 287.391h-.956.956zM295.507 287.393h-1.292 1.292zM296.874 287.391h-1.019 1.019zM32.029 255.589l2.812-12.467-3.215 14.252-3.086 14.517 2.705-12.725c.207-.986.562-2.596.784-3.577zM65.69 202.976H45.807c-1.006 0-2.009.803-2.233 1.782l-1.885 8.322-1.885 8.325c-.222.979.418 1.782 1.425 1.782h20.038c1.004 0 2.003-.803 2.219-1.785l1.822-8.322 1.822-8.316v-.002c.213-.983-.433-1.786-1.44-1.786zM61.363 230.659v-.002l-5.832 26.979 5.832-26.977zM3.601 320.053s10.023.129 16.395.129c-4.84 0-12.833-.09-16.403-.131l.01.002h-.002zM37.652 230.655l-2.815 12.467 2.815-12.467z"
                      fill="#6ba0ab"
                    />
                    <path
                      d="M59.925 228.871H39.884c-1.005 0-2.009.803-2.231 1.785l-2.815 12.468-2.812 12.468c-.222.98-.576 2.592-.784 3.574l-2.705 12.725-2.703 12.729c-.21.979-.642 2.565-.964 3.521 0 0-3.743 11.14-10.038 11.012a94.583 94.583 0 0 1-.786-.014c-3.049-.06-5.446-.103-5.446-.103h-.004c-1.003-.017-2.012.771-2.247 1.743l-2.078 8.736-2.076 8.731c-.233.978.397 1.78 1.396 1.798 3.569.044 11.563.137 16.403.137 15.722 0 24.009-8.715 29.322-33.777l6.218-28.771 5.832-26.979c.212-.979-.438-1.783-1.441-1.783zM344.604 286.372c-1.005 0-1.653-.806-1.441-1.79l15.075-70.614M365.555 284.58l6.101-30.141-6.101 30.141z"
                      fill="#6ba0ab"
                    />
                    <path
                      d="M343.377 285.479c-.123-.492-.051-1.699.162-2.684l7.155-33.518-7.537 35.305c-.212.984.438 1.792 1.439 1.792h1.831c-1 0-2.929-.403-3.05-.895zM364.363 285.971c-.547.221-1.818.401-2.825.401h1.831c1.005 0 1.992-.806 2.188-1.792l.362-1.792c-.196.985-1.007 2.959-1.556 3.183zM368.607 269.51l2.688-13.302c-.001.008-.002.021-.005.026l-2.683 13.276zM428.092 218.698l.831 3.431c.229.982-.406 1.779-1.409 1.782M365.921 282.789l2.688-13.278-2.688 13.278zM427.266 215.184l.822 3.515-.822-3.515zM371.297 256.209c.2-.984.53-2.579.74-3.557l2.874-13.464-3.257 15.253-.357 1.768zM358.48 212.811c-.201.95-.456 2.15-.631 2.945l-7.149 33.521 7.537-35.308.243-1.158z"
                      fill="#6ba0ab"
                    />
                    <path
                      d="M428.917 222.129l-.83-3.431-.822-3.515-.416-1.779c-1.628-6.324-6.402-9.974-16.777-9.974l-16.153-.018-14.875-.017H362.3c-1.005 0-2 .803-2.207 1.788l-.739 3.498-.871 4.13-.243 1.157-7.537 35.308-7.154 33.518c-.213.983-.285 2.19-.163 2.683.121.494 2.05.896 3.061.896h15.101c1.006 0 2.278-.184 2.825-.403.548-.223 1.356-2.196 1.559-3.183l2.688-13.278 2.687-13.274c.001-.006.002-.018.005-.022l.358-1.771 3.256-15.25 2.876-13.472c.213-.979 1.203-1.779 2.206-1.782l47.518-.023c.986-.006 1.621-.804 1.391-1.786z"
                      fill="#6ba0ab"
                    />
                    <path
                      d="M490.086 191.104c-1.006.007-2.65.013-3.656.013h-15.21c-1.005 0-2.293.68-2.856 1.51l-33.63 49.269c-.569.832-1.221.708-1.439-.271l-2.475-10.855c-.228-.981-1.23-1.782-2.234-1.782h-21.62c-1.007 0-1.604.789-1.328 1.756l9.688 33.938c.272.967.296 2.56.047 3.528l-4.226 16.427c-.252.975.368 1.771 1.373 1.771h21.368c1.005 0 2.032-.797 2.282-1.771l4.224-16.427c.249-.974.948-2.429 1.558-3.231l54.599-72.46c.605-.803.277-1.457-.727-1.45l-5.738.035zM318.322 233.609l-.002-.021c-.126 1.091-1.137 1.892-2.141 1.892h-27.406c-.948 0-1.435-.645-1.291-1.439.008-.023.013-.043.022-.063 0 0-.009.002-.021.009.009-.032.009-.061.019-.092 0 0 .056-.193.124-.466 2.618-6.96 7.951-11.528 17.976-11.528 11.284-.002 13.487 5.51 12.72 11.708zm-8.042-31.639c-35.185 0-43.521 21.356-48.198 42.911-4.68 21.971-4.275 42.512 32.133 42.512h1.292c.115-.002.233-.002.349-.002h2.353c.145-.004.279-.004.426-.004l1.101-.002h.258c1.438-.002 2.903-.01 4.367-.015h.073c9.613-.038 19.259-.109 23.163-.142.998-.019 1.979-.82 2.185-1.797l1.474-7.205.287-1.4 1.758-8.594c.203-.983-.455-1.791-1.461-1.791h-32.729c-13.02 0-16.886-3.459-15.462-13.629h52.323l-.005.006c.013 0 .024-.006.036-.006.831-.019 1.6-.588 1.905-1.354.058-.146.104-.3.127-.458l-.006.006c7.762-29.3 5.532-49.035-27.749-49.036zM143.986 233.497l-.495 1.753-.001.006-3.951 14.001-3.949 13.999c-.273.967-1.318 1.76-2.326 1.76h-20.912c-15.862 0-19.724-12.406-15.862-30.706 3.861-18.716 11.434-30.352 27.045-31.529 21.335-1.61 25.603 13.396 20.451 30.716zm14.342 30.441s9.859-23.938 12.098-37.767c3.066-18.509-6.202-45.353-41.998-45.353-35.594 0-51.049 25.629-56.947 53.49-5.897 28.063 1.829 52.672 37.219 52.473l27.918-.104 26.094-.096c1.005-.008 2.032-.806 2.289-1.776l4.545-17.338c.253-.973-.362-1.773-1.366-1.777l-4.356-.023-4.355-.023c-.854-.009-1.344-.561-1.24-1.293a1.65 1.65 0 0 1 .106-.408h-.007v-.005z"
                      fill="#6ba0ab"
                    />
                    <path
                      d="M334.521 247.916c0 .662-.537 1.201-1.2 1.201-.662 0-1.199-.539-1.199-1.201s.537-1.197 1.199-1.197c.663-.001 1.2.534 1.2 1.197z"
                      fill="#6ba0ab"
                    />
                  </svg>

                  <label
                    for="jQuery-checkbox-list"
                    class="w-full py-3  text-sm font-medium text-gray-900 dark:text-gray-300">
                    jQuery
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

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
