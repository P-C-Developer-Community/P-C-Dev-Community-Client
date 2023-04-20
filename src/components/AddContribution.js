import { useState, useEffect } from "react";
import axios from "axios";
import service from "../api/service";

function AddContribution(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [contributionsId, setContributionsId] = useState("");
  const [languages, setLanguages] = useState([]);
  const [isLoadingImg, setIsLoadingImg] = useState(false);

  useEffect(() => {
    // Get the contribution ID from URL params or from the contribution object passed as a prop
    const contributionId = props.match?.params?.id || props.contributionsId;
    setContributionsId(contributionId);
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
        setIsLoadingImg(false);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (imageUrl) {
      const { contributionsId } = props;
      // Create an object representing the body of the POST request
      const requestBody = {
        title,
        description,
        contributionsId,
        imageUrl,
        languages,
      };

      const storedToken = localStorage.getItem("authToken");

      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/contributions`,
          requestBody,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        )

        .then((response) => {
          // Reset the state to clear the inputs
          setTitle("");
          setDescription("");

          // Invoke the callback function coming through the props
          // from the ContributionDetailsPage, to refresh the contribution details
          props.handleAddContributionSuccess();
          props.refreshContributions();
          props.onClose();
        })
        .catch((error) => console.log(error));
    } else setIsLoadingImg(true);
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
      <div className="text-zinc-100 bg-opacity-80">
        <h1 className="mb-8 font-black text-2xl ">Add a new Collaboration</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-zinc-200 font-bold mb-2">
            Title:
          </label>

          <input
            type="text"
            name="title"
            id="title"
            className="appearance-none border bg-transparent  border-cyan-400 rounded-xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-white "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title of your contribution offer"
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

        <table class="table-auto sm:overflow-x-auto">
          <tbody className="overflow-auto">
            <tr className=" ms-center w-full text-sm flex flex-wrap  appearance-none border bg-transparent text-white border-cyan-400 rounded-xl leading-tight focus:outline-none focus:ring-white  ">
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
                    className="ml-4 -mr-2 "
                    height="36"
                    width="56"
                    viewBox="0 -101.5 512 512"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                    fill="#000000">
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <path
                          d="M120.81043,80.5613102 L217.378325,80.5613102 L217.378325,88.2366589 L129.662487,88.2366589 L129.662487,146.003758 L212.147564,146.003758 L212.147564,153.679106 L129.662487,153.679106 L129.662487,217.101725 L218.384241,217.101725 L218.384241,224.777073 L120.81043,224.777073 L120.81043,80.5613102 Z M226.0292,80.5613102 L236.289538,80.5613102 L281.756922,143.983929 L328.230222,80.5613102 L391.441486,0 L287.591232,150.649363 L341.105941,224.777073 L330.443237,224.777073 L281.756922,157.314798 L232.869425,224.777073 L222.407904,224.777073 L276.324978,150.649363 L226.0292,80.5613102 Z M344.928421,88.2366588 L344.928421,80.5613102 L454.975585,80.5613102 L454.975585,88.2366589 L404.27744,88.2366589 L404.27744,224.777073 L395.425382,224.777073 L395.425382,88.2366589 L344.928421,88.2366588 Z M1.42108547e-14,80.5613102 L11.0650714,80.5613102 L163.64593,308.884007 L100.591558,224.777073 L9.25442331,91.4683847 L8.85205708,224.777073 L1.42108547e-14,224.777073 L1.42108547e-14,80.5613102 Z M454.083705,214.785469 C452.275167,214.785469 450.918762,213.38418 450.918762,211.573285 C450.918762,209.762388 452.275167,208.361099 454.083705,208.361099 C455.913774,208.361099 457.248648,209.762388 457.248648,211.573285 C457.248648,213.38418 455.913774,214.785469 454.083705,214.785469 Z M462.781915,206.334618 L467.518563,206.334618 C467.583153,208.900055 469.456284,210.624719 472.212151,210.624719 C475.290972,210.624719 477.03492,208.770705 477.03492,205.29982 L477.03492,183.310363 L481.85769,183.310363 L481.85769,205.321379 C481.85769,211.573285 478.240613,215.173518 472.255212,215.173518 C466.635824,215.173518 462.781915,211.681076 462.781915,206.334618 Z M488.166045,206.054362 L492.945754,206.054362 C493.354828,209.007848 496.239878,210.883419 500.395211,210.883419 C504.270652,210.883419 507.11264,208.878498 507.11264,206.119036 C507.11264,203.747625 505.304102,202.324777 501.191828,201.354653 L497.187209,200.384531 C491.56782,199.069474 489.005723,196.353129 489.005723,191.782772 C489.005723,186.24229 493.527071,182.555823 500.30909,182.555823 C506.617445,182.555823 511.224912,186.24229 511.504805,191.480955 L506.811217,191.480955 C506.359083,188.613703 503.861576,186.824365 500.244499,186.824365 C496.43365,186.824365 493.893085,188.656819 493.893085,191.459398 C493.893085,193.679901 495.52938,194.95184 499.577063,195.900406 L503.000368,196.741178 C509.373314,198.228702 512,200.815695 512,205.493846 C512,211.443935 507.392533,215.173518 500.029197,215.173518 C493.139526,215.173518 488.51053,211.6164 488.166045,206.054362 Z"
                          fill="#ffffff"
                          fill-rule="nonzero">
                          {" "}
                        </path>{" "}
                      </g>{" "}
                    </g>
                  </svg>

                  <label
                    for="NextJs-checkbox-list"
                    class="w-full py-3  text-sm font-medium text-gray-900 dark:text-gray-300">
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

              {/* Other-checkbox */}
              <td class=" mt-2 ml-5 dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input
                    id="Other-checkbox-list"
                    type="checkbox"
                    value="Other"
                    class="w-4 h-4 text-cyan-500 bg-transparent border rounded focus:ring-white ring-offset-cyan-400 focus:ring-offset-gray-700 focus:ring-2  border-white"
                    onChange={handleLanguageChange}
                  />

                  <svg
                    className="ml-3"
                    width="48"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff">
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M13.3252 3.05011L8.66765 20.4323L10.5995 20.9499L15.257 3.56775L13.3252 3.05011Z"
                        fill="#28edf0"
                      />{" "}
                      <path
                        d="M7.61222 18.3608L8.97161 16.9124L8.9711 16.8933L3.87681 12.1121L8.66724 7.00798L7.20892 5.63928L1.0498 12.2017L7.61222 18.3608Z"
                        fill="#28edf0"
                      />{" "}
                      <path
                        d="M16.3883 18.3608L15.0289 16.9124L15.0294 16.8933L20.1237 12.1121L15.3333 7.00798L16.7916 5.63928L22.9507 12.2017L16.3883 18.3608Z"
                        fill="#28edf0"
                      />{" "}
                    </g>
                  </svg>

                  <label
                    for="Other-checkbox-list"
                    class="w-full py-3  text-sm font-medium text-gray-900 dark:text-gray-300">
                    Other
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mb-4">
          <label htmlFor="file" className="block text-zinc-200 font-bold mb-2">
            Upload file:
          </label>
          <input
            type="file"
            name="file"
            id="file"
            className="mb-6 appearance-none border border-cyan-400 rounded-xl w-full py-2 px-3 text-slate-300 leading-tight focus:outline-none focus:ring-white"
            onChange={(e) => handleFileUpload(e)}
          />
        </div>
        {isLoadingImg && (
          <p className="text-cyan-500 font-black mb-6">
            Loading image please wait
          </p>
        )}
        <div className="flex justify-center">
          <a
            className="bg-red-600 hover:bg-slate-700 text-black mr-6 font-bold py-2 px-4 rounded-full hover:text-red-600  hover:italic hover:shadow-lg hover:shadow-red-600"
            href="/contributions">
            Cancel
          </a>
          <button
            type="submit"
            className="bg-cyan-400 hover:bg-white text-black font-bold py-2 px-4 rounded-full hover:italic hover:shadow-lg hover:shadow-cyan-400 ">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default AddContribution;
