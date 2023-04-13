import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function ProjectCard ( { title, description, _id, owner } ) {
  

  return (
    <div className="ProjectCard card">
      <Link to={`/projects/${_id}`}>
        <h3>Title {title}</h3>
      </Link>
      <h2>Owner {owner.name}</h2>
      <p style={{ maxWidth: "400px" }}>{description} </p>
    </div>
  );
}

export default ProjectCard;