import { useEffect, useState } from "react";
import { ApiService } from "Service";


interface BookissueList{
    issueId : number;
    memberId : number;
    bookId : number;
    issueDate : number;
    returnDate : number;
    renewCount : number;
    renewDate : number;
    status : string;
    memberName : string;
    memberType : string;
    bookName : string;
}

export default function BookissueList(){
    const[BookissueList, setBookissueList] = useState<BookissueList[]>([]);
    const[loading,setloading] = useState(true);

    useEffect(()=>{
        ApiService.get<BookissueList[]>("BookIssue")
        .then(setBookissueList)
        .finally(()=> setloading(false));
    },[]);

     return (
    <div className="max-w-7xl mx-auto mt-10 px-6 py-10 rounded-xl bg-white shadow-lg">
      
      <div className="flex justify-center mb-8">
        <h1 className="text-5xl font-bold text-slate-800 ">
          Book List
        </h1>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full border border-gray-300">
          
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-6 py-3 text-center border">Member Name</th>
              <th className="px-6 py-3 text-center border">Member Type</th>
                <th className="px-6 py-3 text-center border">Book Name </th>
                <th className="px-6 py-3 text-center border">Issue Date </th>
                <th className="px-6 py-3 text-center border">Return Date </th>
                <th className="px-6 py-3 text-center border">Renew Count </th>
                <th className="px-6 py-3 text-center border">Renew Date </th>
                <th className="px-6 py-3 text-center border">Status </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={2} className="text-center py-5">
                  Loading...
                </td>
              </tr>
            ) : BookissueList.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center py-5 text-gray-500">
                  No Book Issue Found
                </td>
              </tr>
            ) : (
              BookissueList.map((c, index) => (
                <tr
                  key={c.issueId}
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
                   <td className="px-6 py-3 text-center border">
                    {c.bookName}
                  </td>
                  <td className="px-6 py-3 text-center border">
                    {c.issueDate}
                  </td>
                  <td className="px-6 py-3 text-center border">
                    {c.returnDate}
                  </td>
                  <td className="px-6 py-3 text-center border">
                    {c.renewCount}
                  </td>
                  <td className="px-6 py-3 text-center border">
                    {c.renewDate ? c.renewDate : "-"}
                  </td>
                  <td className="px-6 py-3 text-center border">
                    {c.status}
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