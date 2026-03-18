import React from "react";

const Header: React.FC = () => {
  return (
    <div className="w-full  bg-linear-to-br from-slate-800 to-slate-900 shadow px-6 py-4 flex justify-between items-center">

      <h1 className="text-2xl md:text-3xl font-bold 
        bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 
        text-transparent bg-clip-text">
        Library Management System
      </h1>

      <div className="flex items-center gap-4">
        <span className=" text-lg font-semibold 
        bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 
        text-transparent bg-clip-text">Admin</span>
        <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">👤</div>
      </div>

    </div>
  );
};

export default Header;