import { Link } from "react-router-dom";
import logo from "../assets/WDC-logo.png";

function ContributionCard({ title, description, _id, imageUrl }) {

  console.log("imageUrl.......",title)
    return (<div>
      <div className="bg-slate-400 rounded-lg shadow-xl shadow-cyan-500/40 hover:shadow-slate-50 relative">
      <Link to={`/contributions/${_id}`}>  
      <img src={imageUrl} alt="" />
        <div className="p-4">
        <div className="absolute  h-8 w-8 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${logo})` }}></div>

        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 text-base mb-4">{description} </p>
        <div className="flex justify-between items-center" >
        </div>
        </div>
        </Link>     
         
      </div>
      </div>
       
    );
  }
   
  export default ContributionCard;