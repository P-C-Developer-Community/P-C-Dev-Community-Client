import { useEffect, useState } from "react";
import axios from "axios";



function SearchBar () {
    const [search, setSearch] = useState ();
    
   

    const retrieveSearch = (searchValue) => {
        setSearch(searchValue)
        console.log("search value...", search);
        axios.get(`${process.env.REACT_APP_API_URL}/api/projects/quer/${search}`)
        // .then((response) => {
            // setSearch(response.data);
        // }
        // );
    };



 return (
    
    <div>
      <input
        className="mx-auto placeholder:italic placeholder:text-slate-400 block bg-white w-300 justify-center border border-slate-300 rounded-md py-2 pl-9 pr-3 mt-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm "
        placeholder="Search..."
        type="text"
        onChange={(e) => {
          retrieveSearch(e.target.value);
        }}
      />
    </div>


        // {SearchBar && 
        // SearchBar.map(() => {
        //     return (
        //         <div className="container mx-auto bg-slate-100 shadow-lg rounded-lg drop-shadow-sm hover:drop-shadow-xl pb-4 m-8">
        //         <div className="p4">
        //         <p>{projects.title}</p>
        //         <p>{contributions.title}</p>
        //         <p>{users.name}</p>
        //         </div>
        //     </div>
        //     )
        // })}

 )



}

export default SearchBar;