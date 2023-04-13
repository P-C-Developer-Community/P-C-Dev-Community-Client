import { Link } from "react-router-dom";

function ContributionCard({ title, description, _id }) {
    return (
      <div className="Contributions card">
      <Link to={`/contributions/${_id}`}>
        <h3>{title}</h3>
        </Link>
        
        <h4>Details:</h4>
        <p style={{ maxWidth: "900px" }}>{description} </p>
      </div>
    );
  }
   
  export default ContributionCard;