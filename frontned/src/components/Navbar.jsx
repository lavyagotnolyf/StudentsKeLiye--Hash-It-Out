import React from "react";
import { Link } from "react-router-dom";

// TopBar Component
const TopBar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
      <input
        type="text"
        placeholder="Search properties..."
        className="p-2 w-1/2 rounded text-black"
      />
      <Link to="/post-property" className="bg-white text-blue-600 px-4 py-2 rounded">
        Post Your Property
      </Link>
    </div>
  );
};

export default TopBar;
