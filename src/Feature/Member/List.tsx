import { useState, useEffect } from "react";
import { ApiService } from "Service";

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
    <div className="max-w-7xl mx-auto mt-10 px-6 py-10 rounded-xl bg-white shadow-lg">
      
      <div className="flex justify-center mb-8">
        <h1 className="text-5xl font-bold text-slate-800 ">
          Member List
        </h1>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full border border-gray-300">
          
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-6 py-3 text-center border">Member Name</th>
              <th className="px-6 py-3 text-center border">Member Type</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={2} className="text-center py-5">
                  Loading...
                </td>
              </tr>
            ) : memberList.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center py-5 text-gray-500">
                  No Members Found
                </td>
              </tr>
            ) : (
              memberList.map((c, index) => (
                <tr
                  key={c.memberId}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="px-6 py-3 text-center border">
                    {c.memberName}
                  </td>
                  <td className="px-6 py-3 text-center border">
                    {c.memberType}
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}