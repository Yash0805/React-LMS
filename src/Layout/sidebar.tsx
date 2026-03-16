import React from "react";

const Sidebar: React.FC = () =>  {
  return (
    <div className="w-64 h-screen bg-slate-800 text-white">

      <div className="p-4 text-xl text-white font-bold ">
        Library  Management 
      </div>

      <nav className="p-4">


        <a href="/" className="block px-4 py-2 text-white font-bold hover:bg-slate-600 hover:text-white rounded transition duration-200">
          Dashboard
        </a>

        <a href="/CategoryList" className="block px-4 py-2 text-white font-bold hover:bg-slate-700 hover:text-white rounded transition duration-200">
          Category
        </a>

        <a href="/BookList" className="block px-4 py-2 text-white font-bold hover:bg-slate-700 hover:text-white rounded transition duration-200">
          Books
        </a>

        <a href="/MemberList" className="block px-4 py-2 text-white font-bold hover:bg-slate-700 hover:text-white rounded transition duration-200">
          Members
        </a>

        <a href="/BookIssueList" className="block px-4 py-2 text-white font-bold hover:bg-slate-700 hover:text-white rounded transition duration-200">
          Book Issue
        </a>

      </nav>

    </div>
  );
};

export default Sidebar;