import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-linear-to-br from-slate-800 to-slate-900 text-white">

      <div className="p-4 text-xl 
      
      
      text-center text-white font-bold ">
        LMS
      </div>

      <nav className="p-4">


        <Link to="/Dashboard" className="block px-4 py-2 text-white font-bold hover:bg-slate-600 hover:text-white rounded transition duration-200">
          Dashboard
        </Link>

        <Link to="/Category" className="block px-4 py-2 text-white font-bold hover:bg-slate-700 hover:text-white rounded transition duration-200">
          Category
        </Link>

        <Link to="/Book" className="block px-4 py-2 text-white font-bold hover:bg-slate-700 hover:text-white rounded transition duration-200">
          Books
        </Link>

        <Link to="/Member" className="block px-4 py-2 text-white font-bold hover:bg-slate-700 hover:text-white rounded transition duration-200">
          Members
        </Link>

        <Link to="/BookIssueList" className="block px-4 py-2 text-white font-bold hover:bg-slate-700 hover:text-white rounded transition duration-200">
          Book Issue
        </Link>

      </nav>

    </div>
  );
};

export default Sidebar;