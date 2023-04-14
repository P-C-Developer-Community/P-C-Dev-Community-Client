import logo from "../assets/WDC-logo-Background.png";

function HomePage() {
  return (
    <div className="relative">
      
      <div
        className="h-screen bg-no-repeat bg-center flex justify-center"
        style={{ backgroundImage: `url(${logo})` }}>
         {/* <div className="absolute bg-gradient-to-l hover:bg-gradient-to-r inset-0 z-5  from-cyan-500 to-blue-500 "></div> */}
        <h1 className="text-5xl text-black font-bold">Home Page</h1>
      </div>
    </div>
  );
}

export default HomePage;
