import { useEffect, useState } from "react";
import { ApiService } from "Service";
import { Loader } from "Shared/Component/Loader/Loader";
import { Grid } from "Shared/Component/Grid";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ApiService.get<BookissueList[]>("BookIssue")
      .then((data) => setBookissueList(data ?? []))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (date: number) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB");
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader />
      </div>
    );
  }

  if (bookIssueList.length === 0) {
    return (
      <div className="text-center py-10 text-slate-400">
        No Book Issue Found
      </div>
    );
  }

  return (
    <div className="mt-10 px-6 text-white">
      <div className="flex justify-start mb-10">
        <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Book Issue List
        </h1>
      </div>

      <Grid<BookissueList>
        data={bookIssueList}
        rowKey={(m) => m.issueId}
        columns={[
          {
            field: "memberName",
            header: "Member Name",
          },
          {
            field: "memberType",
            header: "Type",
          },
          {
            field: "bookName",
            header: "Book Name",
          },
          {
            field: "issueDate",
            header: "Issue Date",
            render: (value) => formatDate(value as number),
          },
          {
            field: "returnDate",
            header: "Return Date",
            render: (value) => formatDate(value as number),
          },
          {
            field: "renewCount",
            header: "Renew Count",
          },
          {
            field: "renewDate",
            header: "Renew Date",
            render: (value) => formatDate(value as number),
          },
          {
            field: "status",
            header: "Status",
            render: (value) => (
              <span
                className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(
                  value as string,
                )}`}
              >
                {value}
              </span>
            ),
          },
        ]}
      />
    </div>
  );
}
