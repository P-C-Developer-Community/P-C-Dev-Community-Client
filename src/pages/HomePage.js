import logo from "../assets/WDC-logo-Background.png";

function HomePage() {
  return (
    <div className="bg-slate-800 flex flex-wrap justify-center items-center h-screen">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4">
        <div className="bg-slate-400 rounded-lg shadow-xl shadow-cyan-300/80 hover:shadow-slate-50 relative">
          <div className="h-60 flex flex-col justify-center items-center p-12">
          <p>Projects</p>
            <div
              className="absolute h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 bg-cover bg-no-repeat bg-center"></div>
            <div className="flex justify-between items-center"></div>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4">
        <div className="bg-slate-400 rounded-lg shadow-xl shadow-cyan-300/80 hover:shadow-slate-50 relative">
          <div className="h-60 flex flex-col justify-center items-center p-12">
          <p>Community</p>
            <div
              className="absolute h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 bg-cover bg-no-repeat bg-center"></div>
            <div className="flex justify-between items-center"></div>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4">
        <div className="bg-slate-400 rounded-lg shadow-xl shadow-cyan-300/80 hover:shadow-slate-50 relative">
          <div className="h-60 flex flex-col justify-center items-center p-12">
          <p>Contribute</p>
            <div
              className="absolute h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 bg-cover bg-no-repeat bg-center"></div>
            <div className="flex justify-between items-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
