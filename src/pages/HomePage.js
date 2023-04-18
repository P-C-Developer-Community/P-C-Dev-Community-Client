import backgroundImage from "../assets/keyB-bg.jpeg";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div
      className="flex flex-col items-center justify-top  pt-4 h-screen "
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}>
      <div className=" font-extrabold  flex flex-wrap justify-center items-center h-screen">
        <div className="mx-24 mt-36 ">
          <p className="text-white text-lg">
            Are you a developer looking for exciting new projects to
            collaborate? Or are you a project owner in search of talented
            developers to bring your vision to life? Look no further than our
            platform, where developers and project owners can come together to
            create something truly amazing.
          </p>
        </div>

        <Link
          to={`/projects`}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4">
          <div className="bg-transparent backdrop-blur-md border rounded-3xl shadow-xl shadow-cyan-300/80 hover:shadow-slate-50 hover:rounded-full transition-all duration-300 ease-in-out relative">
            <div className="h-52 flex flex-col justify-center items-center p-12 transition duration-1000 ease-in-out">
              <div className="absolute h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 bg-cover bg-no-repeat bg-center"></div>
              <p className="text-gray-300 font-mono italic font-black text-2xl">
                Projects
              </p>
              <div className="flex justify-between items-center"></div>
            </div>
          </div>
        </Link>

        <Link
          to={`/contributions`}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4">
          <div className="bg-transparent backdrop-blur-md border rounded-3xl shadow-xl shadow-cyan-300/80 hover:shadow-slate-50 hover:rounded-full transition-all duration-300 ease-in-out relative">
            <div className="h-52 flex flex-col justify-center items-center p-12 transition duration-1000 ease-in-out">
              <div className="absolute h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 bg-cover bg-no-repeat bg-center"></div>
              <p className="text-gray-300 font-mono italic font-black text-2xl ">
                Collaborate
              </p>
              <div className="flex justify-between items-center"></div>
            </div>
          </div>
        </Link>

        <Link
          to={`/community`}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4">
          <div className="bg-transparent backdrop-blur-md border rounded-3xl shadow-xl shadow-cyan-300/80 hover:shadow-slate-50 hover:rounded-full transition-all duration-300 ease-in-out relative">
            <div className="h-52 flex flex-col justify-center items-center p-12 transition duration-1000 ease-in-out ">
              <div className="absolute h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 bg-cover bg-no-repeat bg-center"></div>
              <p className="text-gray-300 font-mono italic font-black text-2xl ">
                Community
              </p>
              <div className="flex justify-between items-center"></div>
            </div>
          </div>
        </Link>

        <div className="mx-24 backdrop-blur-md bg-blur-4xl ">
          <p className="text-white pb-16 -mt-10 text-lg">
            Whether you're a frontend or backend developer, a designer, or a
            project manager, our platform has opportunities for everyone. Browse
            our curated list of projects or create your own project and start
            attracting talented developers today. Our platform offers a seamless
            experience for both project owners and developers, with easy project
            creation and management tools, powerful collaboration features. Join
            our community of passionate developers and project owners today and
            take your skills and projects to the next level. Start building
            something great today!
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
