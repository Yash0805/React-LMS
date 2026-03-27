import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-800 to-slate-900  text-white">

      <main className="flex-1 p-6">

        <h1 className="text-3xl font-bold mb-6 
        bg-white text-transparent bg-clip-text">
          Dashboard
        </h1>

        <div className="grid grid-cols-4 gap-6 mb-6">

          <div className="bg-linear-to-br from-slate-900 via-[#0f172a] to-[#020617] p-5 rounded-xl hover:scale-105 transition">
            <p className="text-gray-400">Total Books</p>
            <h2 className="text-2xl font-bold">25</h2>
          </div>

          <div className="bg-linear-to-br from-slate-900 via-[#0f172a] to-[#020617] p-5 rounded-xl hover:scale-105 transition">
            <p className="text-gray-400">Members</p>
            <h2 className="text-2xl font-bold">20</h2>
          </div>

          <div className="bg-linear-to-br from-slate-900 via-[#0f172a] to-[#020617] p-5 rounded-xl hover:scale-105 transition">
            <p className="text-gray-400">Books Issued</p>
            <h2 className="text-2xl font-bold ">10</h2>
          </div>

          <div className="bg-linear-to-br from-slate-900 via-[#0f172a] to-[#020617] p-5 rounded-xl hover:scale-105 transition">
            <p className="text-gray-400">Overdue</p>
            <h2 className="text-2xl font-bold ">0</h2>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">

          <div className="bg-linear-to-br from-slate-900 via-[#0f172a] to-[#020617]p-5 rounded-xl">
            <h2 className="mb-4 font-semibold">Books Issued (Monthly)</h2>
            <div className="h-40 flex items-end gap-2">
              {[40, 60, 30, 80, 50, 90, 70].map((value, i) => (
                <div
                  key={i}
                  className="bg-indigo-500 w-6 rounded"
                  style={{ height: `${value}%` }}
                />
              ))}
            </div>
          </div>



        </div>

        <div className="grid grid-cols-2 gap-6">

          <div className="bg-linear-to-br from-slate-900 via-[#0f172a] to-[#020617] p-5 rounded-xl">
            <h2 className="mb-4 font-semibold">Recent Issues</h2>

            <table className="w-full text-sm">
              <thead className="text-gray-400 border-b border-slate-700">
                <tr>
                  <th className="py-2">Member</th>
                  <th>Book</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-slate-700">
                  <td className="py-2">John</td>
                  <td>React Guide</td>
                  <td className="text-emerald-400">Returned</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-2">Emma</td>
                  <td>Atomic Habits</td>
                  <td className="text-yellow-400">Issued</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-linear-to-br from-slate-900 via-[#0f172a] to-[#020617] p-5 rounded-xl">
            <h2 className="mb-4 font-semibold">Overdue Books</h2>

            <table className="w-full text-sm">
              <thead className="text-gray-400 border-b border-slate-700">
                <tr>
                  <th className="py-2">Member</th>
                  <th>Book</th>
                  <th>Days</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-slate-700">
                  <td className="py-2">Sarah</td>
                  <td>Clean Code</td>
                  <td >10</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-2">David</td>
                  <td>1984</td>
                  <td >7</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

      </main>
    </div>
  );
};

export default Dashboard;