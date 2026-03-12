import { useState,useEffect } from "react";
interface MemberList{
    memberId:number;
    memberName:string;
    memberType:string;
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
  if (MemberList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
  <div className="flex justify-center items-center mb-6">
    <h1 className="text-3xl font-bold">Member List</h1>
  </div>

  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-300 rounded-lg">
      <thead className="bg-gray-100">
        <tr>
          <th className="border border-gray-300 px-4 py-2 text-center">
            Member ID
          </th>
          <th className="border border-gray-300 px-4 py-2 text-center">
            Member Name
          </th>
          <th className="border border-gray-300 px-4 py-2 text-center">
            Member Type
          </th>
        </tr>
      </thead>

      <tbody>
        {MemberList.map((c) => (
          <tr key={c.memberId} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2 text-center">
              {c.memberId}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {c.memberName}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
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
