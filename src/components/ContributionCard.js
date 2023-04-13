function ContributionCard({ title, description }) {
    return (
      <div className="Contributions card">
        <h3>{title}</h3>
        <h4>Description:</h4>
        <p>{description}</p>
      </div>
    );
  }
   
  export default ContributionCard;