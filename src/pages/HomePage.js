import logo from "../assets/WDC-logo-Background.png";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="bg-slate-800 flex flex-wrap justify-center items-center h-screen">
        <Link to={`/projects`} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4">
           <div className="bg-slate-400 rounded-3xl shadow-xl shadow-cyan-300/80 hover:shadow-slate-50 hover:rounded-full transition-all duration-300 ease-in-out transition duration-1000 ease-in-out relative">
              <div className="h-60 flex flex-col justify-center items-center p-12">
                <div className="absolute h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 bg-cover bg-no-repeat bg-center"></div>
                <p className="text-gray-300 font-mono italic font-black text-2xl">Projects</p>
                <div className="flex justify-between items-center"></div>
              </div>
            </div>
        </Link>
        <Link to={`/projects`} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4">
        <div className="bg-slate-400 rounded-3xl shadow-xl shadow-cyan-300/80 hover:shadow-slate-50 hover:rounded-full transition-all duration-300 ease-in-out transition duration-1000 ease-in-out relative">
              <div className="h-60 flex flex-col justify-center items-center p-12">
                <div className="absolute h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 bg-cover bg-no-repeat bg-center"></div>
                <p className="text-gray-300 font-mono italic font-black text-2xl ">Community</p>
                <div className="flex justify-between items-center"></div>
              </div>
            </div>
        </Link>
        <Link to={`/contributions`} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4">
        <div className="bg-slate-400 rounded-3xl shadow-xl shadow-cyan-300/80 hover:shadow-slate-50 hover:rounded-full transition-all duration-300 ease-in-out transition duration-1000 ease-in-out relative">
              <div className="h-60 flex flex-col justify-center items-center p-12">
                <div className="absolute h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 bg-cover bg-no-repeat bg-center"></div>
                <p className="text-gray-300 font-mono italic font-black text-2xl ">Contribute</p>
                <div className="flex justify-between items-center"></div>
              </div>
            </div>
        </Link>
    </div>
  );
}

export default HomePage;
