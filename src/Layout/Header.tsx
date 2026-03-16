import React from "react";

const Header: React.FC = () => {
  return (
    <div className="w-full bg-slate-800 shadow px-6 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-white">
        Library Management System
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-white">Admin</span>

        <button className="bg-white  text-text px-4 py-2 rounded">
          Logout
        </button>
      </div>

    </div>
  );
};

export default Header;