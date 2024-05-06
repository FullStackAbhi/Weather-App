import React, { useState } from "react";

const Search = ({ handlesearch }) => {
  const [search, setsearch] = useState("");

  return (
    <div className="search">
      <form
        className="inputform"
        onSubmit={(e) => {
          e.preventDefault();
          handlesearch(search);
          setsearch("");
        }}
      >
        <input
          className="input"
          type="text"
          value={search}
          placeholder="Search City"
          onChange={(e) => setsearch(e.target.value)}
        ></input>
        <button className="search-btn">Search</button>
      </form>
    </div>
  );
};

export default Search;
