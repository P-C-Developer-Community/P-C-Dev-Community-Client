import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext, useState, useEffect } from "react";
import backgroundImage from "../assets/globe-net.jpeg";
import { NavLink, Link } from "react-router-dom";

function CommunityPage() {
  const [users, setUsers] = useState([]);
  const [counts, setCounts] = useState({});
  const [review, setReview] = useState (null);

  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/community`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }, [storedToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        for (const user of users) {
          const projectsResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/projects/`,
            { headers: { Authorization: `Bearer ${storedToken}` } }
          );
          const myProjects = projectsResponse.data.filter(
            (project) => project.owner._id === user._id
          );
          const numberOfProjects = myProjects.length;

          const contributionsResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/contributions/`,
            { headers: { Authorization: `Bearer ${storedToken}` } }
          );
          const myContributions = contributionsResponse.data.filter(
            (contribution) => contribution.owner === user._id
          );
          const numberOfContributions = myContributions.length;

          setCounts((prevState) => ({
            ...prevState,
            [user._id]: {
              projects: numberOfProjects,
              contributions: numberOfContributions,
            },
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (users.length > 0) {
      fetchData();
    }
  }, [users]);


  const postReview = (e) => {
    e.preventDefault();
    console.log("review",review)

    const requestBody = { review };

    axios.put(`${process.env.REACT_APP_API_URL}/auth/user/review`, requestBody, {headers: { Authorization: `Bearer ${storedToken}` },
  })
    .then((response) => {
      console.log("responsyto", response)
      setReview("")
    }
    );
};




  return (
    <div
      className="flex flex-col items-center justify-top  pt-4 min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}>
      <h1 className="text-3xl text-white font-extrabold mb-6">
        Dev Community 
      </h1>

      <div className=" rounded-t-lg mb-4">
        <div className="p-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-10">
            {users.map((user, index) => {
              return (
                <div
                  key={index}
                  className="backdrop-blur-sm border rounded-3xl grid justify-items-center text-white  hover:shadow-white hover-shadow-xl shadow-lg shadow-cyan-400  p-4">
                  <img
                    className=" h-24 w-24  rounded-3xl"
                    src={user.imageUrl}
                    alt=""
                    srcset=""
                  />
                  <p className="text-2xl font-bold text-white">{user.name}</p>
                  <p className="text-slate-300 -mt-1">Em@il: {user.email}</p>
                  <p className="text-slate-300 mt-1">
                    Member Since:{" "}
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <div className="mt-2">
                    {user.gitHub && (
                      <div className="ml-12 mb-2 mt-2 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          class="bi bi-github"
                          viewBox="0 0 16 16">
                          {" "}
                          <path
                            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                            fill="white"></path>{" "}
                        </svg>

                        <NavLink className="mx-6" to={user.gitHub}>
                          GitHub
                        </NavLink>
                      </div>
                    )}

                    {user.linkedIn && (
                      <div className="ml-12 mb-2 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="7.025 7.025 497.951 497.95">
                          <linearGradient
                            id="a"
                            gradientUnits="userSpaceOnUse"
                            x1="-974.482"
                            y1="1306.773"
                            x2="-622.378"
                            y2="1658.877"
                            gradientTransform="translate(1054.43 -1226.825)">
                            <stop offset="0" stop-color="#2489be" />
                            <stop offset="1" stop-color="#0575b3" />
                          </linearGradient>
                          <path
                            d="M256 7.025C118.494 7.025 7.025 118.494 7.025 256S118.494 504.975 256 504.975 504.976 393.506 504.976 256C504.975 118.494 393.504 7.025 256 7.025zm-66.427 369.343h-54.665V199.761h54.665v176.607zM161.98 176.633c-17.853 0-32.326-14.591-32.326-32.587 0-17.998 14.475-32.588 32.326-32.588s32.324 14.59 32.324 32.588c.001 17.997-14.472 32.587-32.324 32.587zm232.45 199.735h-54.4v-92.704c0-25.426-9.658-39.619-29.763-39.619-21.881 0-33.312 14.782-33.312 39.619v92.704h-52.43V199.761h52.43v23.786s15.771-29.173 53.219-29.173c37.449 0 64.257 22.866 64.257 70.169l-.001 111.825z"
                            fill="url(#a)"
                          />
                        </svg>
                        <NavLink className="mx-6" to={user.linkedIn}>
                          LinkedIn
                        </NavLink>
                      </div>
                    )}

                    {user.twitter && (
                      <div className="ml-12  mb-2 flex items-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 -4 48 48"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg">
                          <title>Twitter-color</title>
                          <desc>Created with Sketch.</desc>
                          <defs></defs>
                          <g
                            id="Icons"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd">
                            <g
                              id="Color-"
                              transform="translate(-300.000000, -164.000000)"
                              fill="#00AAEC">
                              <path
                                d="M348,168.735283 C346.236309,169.538462 344.337383,170.081618 342.345483,170.324305 C344.379644,169.076201 345.940482,167.097147 346.675823,164.739617 C344.771263,165.895269 342.666667,166.736006 340.418384,167.18671 C338.626519,165.224991 336.065504,164 333.231203,164 C327.796443,164 323.387216,168.521488 323.387216,174.097508 C323.387216,174.88913 323.471738,175.657638 323.640782,176.397255 C315.456242,175.975442 308.201444,171.959552 303.341433,165.843265 C302.493397,167.339834 302.008804,169.076201 302.008804,170.925244 C302.008804,174.426869 303.747139,177.518238 306.389857,179.329722 C304.778306,179.280607 303.256911,178.821235 301.9271,178.070061 L301.9271,178.194294 C301.9271,183.08848 305.322064,187.17082 309.8299,188.095341 C309.004402,188.33225 308.133826,188.450704 307.235077,188.450704 C306.601162,188.450704 305.981335,188.390033 305.381229,188.271578 C306.634971,192.28169 310.269414,195.2026 314.580032,195.280607 C311.210424,197.99061 306.961789,199.605634 302.349709,199.605634 C301.555203,199.605634 300.769149,199.559408 300,199.466956 C304.358514,202.327194 309.53689,204 315.095615,204 C333.211481,204 343.114633,188.615385 343.114633,175.270495 C343.114633,174.831347 343.106181,174.392199 343.089276,173.961719 C345.013559,172.537378 346.684275,170.760563 348,168.735283"
                                id="Twitter"></path>
                            </g>
                          </g>
                        </svg>
                        <NavLink className="mx-6" to={user.twitter}>
                          Twitter
                        </NavLink>
                      </div>
                    )}

                    {user.instagram && (
                      <div className="ml-12  mb-2 flex items-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 3364.7 3364.7"
                          xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <radialGradient
                              id="0"
                              cx="217.76"
                              cy="3290.99"
                              r="4271.92"
                              gradientUnits="userSpaceOnUse">
                              <stop offset=".09" stop-color="#fa8f21" />
                              <stop offset=".78" stop-color="#d82d7e" />
                            </radialGradient>
                            <radialGradient
                              id="1"
                              cx="2330.61"
                              cy="3182.95"
                              r="3759.33"
                              gradientUnits="userSpaceOnUse">
                              <stop
                                offset=".64"
                                stop-color="#8c3aaa"
                                stop-opacity="0"
                              />
                              <stop offset="1" stop-color="#8c3aaa" />
                            </radialGradient>
                          </defs>
                          <path
                            d="M853.2,3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5S119.7,2988.6,82.6,2892.8c-28.2-72.3-61.5-181-70.6-381.1C2,2295.4,0,2230.5,0,1682.5s2.2-612.8,11.9-829.3C21,653.1,54.5,544.6,82.5,472.1,119.8,376.3,164.3,308,236,236c71.8-71.8,140.1-116.4,236-153.5C544.3,54.3,653,21,853.1,11.9,1069.5,2,1134.5,0,1682.3,0c548,0,612.8,2.2,829.3,11.9,200.1,9.1,308.6,42.6,381.1,70.6,95.8,37.1,164.1,81.7,236,153.5s116.2,140.2,153.5,236c28.2,72.3,61.5,181,70.6,381.1,9.9,216.5,11.9,281.3,11.9,829.3,0,547.8-2,612.8-11.9,829.3-9.1,200.1-42.6,308.8-70.6,381.1-37.3,95.8-81.7,164.1-153.5,235.9s-140.2,116.2-236,153.5c-72.3,28.2-181,61.5-381.1,70.6-216.3,9.9-281.3,11.9-829.3,11.9-547.8,0-612.8-1.9-829.1-11.9"
                            fill="url(#0)"
                          />
                          <path
                            d="M853.2,3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5S119.7,2988.6,82.6,2892.8c-28.2-72.3-61.5-181-70.6-381.1C2,2295.4,0,2230.5,0,1682.5s2.2-612.8,11.9-829.3C21,653.1,54.5,544.6,82.5,472.1,119.8,376.3,164.3,308,236,236c71.8-71.8,140.1-116.4,236-153.5C544.3,54.3,653,21,853.1,11.9,1069.5,2,1134.5,0,1682.3,0c548,0,612.8,2.2,829.3,11.9,200.1,9.1,308.6,42.6,381.1,70.6,95.8,37.1,164.1,81.7,236,153.5s116.2,140.2,153.5,236c28.2,72.3,61.5,181,70.6,381.1,9.9,216.5,11.9,281.3,11.9,829.3,0,547.8-2,612.8-11.9,829.3-9.1,200.1-42.6,308.8-70.6,381.1-37.3,95.8-81.7,164.1-153.5,235.9s-140.2,116.2-236,153.5c-72.3,28.2-181,61.5-381.1,70.6-216.3,9.9-281.3,11.9-829.3,11.9-547.8,0-612.8-1.9-829.1-11.9"
                            fill="url(#1)"
                          />
                          <path
                            d="M1269.25,1689.52c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7-416.6-186.59-416.6-416.7m-225.26,0c0,354.5,287.36,641.86,641.86,641.86s641.86-287.36,641.86-641.86-287.36-641.86-641.86-641.86S1044,1335,1044,1689.52m1159.13-667.31a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M1180.85,2707c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27S2059.13,666,2191,672c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M1170.5,447.09c-133.07,6.06-224,27.16-303.41,58.06-82.19,31.91-151.86,74.72-221.43,144.18S533.39,788.47,501.48,870.76c-30.9,79.46-52,170.34-58.06,303.41-6.16,133.28-7.57,175.89-7.57,515.35s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43s139.14,112.18,221.43,144.18c79.56,30.9,170.34,52,303.41,58.06,133.35,6.06,175.89,7.57,515.35,7.57s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2586.8,537.06,2504.71,505.15c-79.56-30.9-170.44-52.1-303.41-58.06C2068,441,2025.41,439.52,1686,439.52s-382.1,1.41-515.45,7.57"
                            fill="#ffffff"
                          />
                        </svg>
                        <NavLink className="mx-6" to={user.instagram}>
                          instagram
                        </NavLink>
                      </div>
                    )}

                    {counts[user._id] && (
                      <>
                        <p className="text-slate-400 mt-5">
                          Active Projects: {" "}
                          {counts[user._id].projects}
                        </p>
                        <p className="text-slate-400 ">
                          Active Collaborations: {" "}
                          {counts[user._id].contributions}
                        </p>
                        <div>
      <form onSubmit={postReview}>
      <input
        
        placeholder="Leave a review"
        type="text"
        
        onChange={(e) => {
          setReview(e.target.value);
        }}
      />
      <button>Submit Review</button>
      </form>
    </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
