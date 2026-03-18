import { useState, useEffect } from "react";
import { ApiService } from "Service";
import { Loader } from "Shared/Component/Loader/Loader";

interface MemberList {
  memberId: number;
  memberName: string;
  memberType: string;
}

export default function MemberList() {
  const [memberList, setMemberList] = useState<MemberList[]>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    ApiService.get<MemberList[]>("Members")
      .then(setMemberList)
      .finally(() => setloading(false));
  }, []);

  return (
    <div className="mt-10 px-6">

      <div className="flex justify-start mb-10">
        <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Member List
        </h1>
      </div>

      <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-2xl shadow-lg overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead className="bg-slate-900/70 backdrop-blur-sm text-slate-300 uppercase text-sm tracking-wider">
              <tr>
                <th className="px-6 py-4">Member Name</th>
                <th className="px-6 py-4">Member Type</th>
              </tr>
            </thead>

            <tbody className="text-slate-300">

              {loading ? (
                <tr>
                  <td colSpan={2} className="py-12">
                    <div className="flex justify-center items-center">
                      <Loader />
                    </div>
                  </td>
                </tr>
              ) : memberList.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center py-8 text-slate-400">
                    No Members Found
                  </td>
                </tr>
              ) : (
                memberList.map((c, index) => (
                  <tr
                    key={c.memberId}
                    className={`
                      border-b border-slate-700/50
                      ${index % 2 === 0 ? "bg-slate-800/30" : "bg-slate-800/10"}
                      hover:bg-slate-700/40
                      hover:scale-[1.01]
                      hover:shadow-md hover:shadow-purple-500/5
                      transition duration-200
                    `}
                  >
                    <td className="px-6 py-4 font-medium text-white">
                      {c.memberName}
                    </td>

                    <td className="px-6 py-4">
                      <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full text-xs">
                        {c.memberType}
                      </span>
                    </td>
                  </tr>
                ))
              )}

            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}