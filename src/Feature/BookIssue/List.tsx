import { useEffect, useState } from "react";
import { ApiService } from "Service";
import { Loader } from "Shared/Component/Loader/Loader";

interface BookissueList {
  issueId: number;
  memberId: number;
  bookId: number;
  issueDate: number;
  returnDate: number;
  renewCount: number;
  renewDate: number;
  status: string;
  memberName: string;
  memberType: string;
  bookName: string;
}

export default function BookissueList() {
  const [bookIssueList, setBookissueList] = useState<BookissueList[]>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    ApiService.get<BookissueList[]>("BookIssue")
      .then(setBookissueList)
      .finally(() => setloading(false));
  }, []);

  const formatDate = (date: number) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString();
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "renewed":
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
      case "issued":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
      case "returned":
        return "bg-red-500/20 text-red-400 border border-red-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border border-slate-500/30";
    }
  };

  return (
    <div className="mt-10 px-6">

      <div className="flex justify-start mb-10">
        <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Book Issue List
        </h1>
      </div>

      <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-2xl shadow-lg overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead className="bg-slate-900/70 backdrop-blur-sm text-slate-300 uppercase text-sm tracking-wider">
              <tr>
                <th className="px-6 py-4">Member</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Book</th>
                <th className="px-6 py-4">Issue Date</th>
                <th className="px-6 py-4">Return Date</th>
                <th className="px-6 py-4">Renew</th>
                <th className="px-6 py-4">Renew Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="text-slate-300">

              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12">
                    <div className="flex justify-center items-center">
                      <Loader />
                    </div>
                  </td>
                </tr>
              ) : bookIssueList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-400">
                    No Book Issue Found
                  </td>
                </tr>
              ) : (
                bookIssueList.map((c, index) => (
                  <tr
                    key={c.issueId}
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

                    <td className="px-6 py-4 text-slate-400">
                      {c.memberType}
                    </td>

                    <td className="px-6 py-4 text-slate-300">
                      {c.bookName}
                    </td>

                    <td className="px-6 py-4 text-slate-400">
                      {formatDate(c.issueDate)}
                    </td>

                    <td className="px-6 py-4 text-slate-400">
                      {formatDate(c.returnDate)}
                    </td>

                    <td className="px-6 py-4 text-indigo-400 font-semibold">
                      {c.renewCount}
                    </td>

                    <td className="px-6 py-4 text-slate-400">
                      {formatDate(c.renewDate)}
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(c.status)}`}>
                        {c.status}
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