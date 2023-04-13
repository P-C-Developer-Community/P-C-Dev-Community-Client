import { useState } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";


function AddContribution(props) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  
  const handleSubmit = (e) => {
    e.preventDefault();

  const { contributionsId } = props;
    // Create an object representing the body of the POST request
    const requestBody = { title, description, contributionsId };

    axios
      .post(`${API_URL}/api/contributions`, requestBody)
      .then((response) => {
        // Reset the state to clear the inputs
        setTitle("");
        setDescription("");
      
        // Invoke the callback function coming through the props
        // from the ContributionDetailsPage, to refresh the project details
        props.refreshContribution();
      })
      .catch((error) => console.log(error));
  };

  
  return (
    <div className="AddContribution">
      <h3>Add New Contribution</h3>
      
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Add Contribution</button>
      </form>
    </div>
  );
}

export default AddContribution;