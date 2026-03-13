import { useState, useEffect } from "react";
interface MemberList {
  memberId: number;
  memberName: string;
  memberType: string;
}
export default function MemberList() {
  const [MemberList, setMemberList] = useState<MemberList[]>([]);
  useEffect(() => {
    fetch("http://localhost:5018/api/Members", {
      method: "GET",
      headers: {
        Origin: window.location.host,
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((data) => setMemberList(data));
  }, []);

  return (
    <div className="md:table-fixed max-w-7xl mx-auto mt-10 px-6 py-10 rounded-xl bg-white shadow-lg">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="text-teal-600" />
        <h1 className="text-5xl font-bold bg-linear-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
          Member List
        </h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed border border-gray-300 rounded-lg">
          <thead className="sticky top-0 bg-teal-700 text-white z-10">
            <tr>
              <th className="px-6 py-3 text-center font-semibold border border-gray-300">
                Member Name
              </th>
              <th className="px-6 py-3 text-center font-semibold border border-gray-300">
                Member Type
              </th>
            </tr>
          </thead>

          <tbody>
            {MemberList.map((c, index) => (
              <tr
                key={c.memberId}
                className={
                  index % 2 === 0
                    ? "bg-gray-50 hover:bg-gray-100"
                    : "bg-white hover:bg-teal-100"
                }
              >
                <td className="px-6 py-3 text-center border border-gray-300">
                  {c.memberName}
                </td>
                <td className="px-6 py-3 text-center border border-gray-300">
                  {c.memberType}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
