import { Link } from "react-router-dom";
import logo from "../assets/WDC-logo.png";

function ContributionCard({ title, description, _id, imageUrl }) {
  console.log("imageUrl.......", title);
  return (
    <div>
      <div className="bg-slate-400 rounded-xl shadow-xl shadow-cyan-300/80 hover:shadow-slate-50 hover:rounded-full transition-all duration-300 ease-in-out transition duration-1000 ease-in-out relative">
        <Link to={`/contributions/${_id}`}>
          <img src={imageUrl} alt="" />
          <div className="p-4">
            {/* <div
              className="absolute  h-8 w-8 bg-cover bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${logo})` }}></div> */}

            <h2 className="text-gray-300 font-mono italic font-black text-2xl">{title}</h2>
            <p className="text-gray-300 font-mono italic font-black line-clamp-2 ">{description} </p>
            <div className="flex justify-between items-center"></div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ContributionCard;
