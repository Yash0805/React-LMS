import { useNavigate } from "react-router-dom";
import { Loader } from "Shared/Component/Loader/Loader";
import { useBookIssueQuery, useRemoveBookIssueMutation } from "../queries";
import Button from "Shared/Component/Button/Button";
import { Grid } from "Shared/Component/Grid/Index";
import Status from "./Status";
import { useState } from "react";


export default function BookIssueList() {
  const navigate = useNavigate();
  const { data, isLoading } = useBookIssueQuery();
  
  const { isPending: isDeleting, mutateAsync: deleteBooks, } = useRemoveBookIssueMutation();

  const [isOpen,setIsOpen] = useState(false)

  const [selectedId,setSelectedId] = useState<number|null>(null)


  if (isLoading || isDeleting) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader />
      </div>
    )
  }
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

  return (
    <div className="px-6 text-white">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold bg-white text-transparent bg-clip-text">
          Book Issue List
        </h1>

        <Button
          caption="+ Issue Book"
          type="button"
          onClick={() => navigate("/BookIssue/create")}
        />
      </div>

      {!data || data.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          No Book Issue Found
        </div>
      ) : (
        <Grid<Master.BookIssue>
          data={data ?? []}
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
                    value as string
                  )}`}
                >
                  {value}
                </span>
              ),
            },
            {
              header: "Action",
              actions: [
                {
                  icon: "pi pi-pencil",
                  className: "px-3 py-1 rounded",
                  onClick: (bookissue) => {
                    console.log(bookissue)
                    navigate(`/BookIssue/edit/${bookissue.issueId}`);
                  },
                },
                {
                  icon: "pi pi-trash",
                  className: "px-3 py-1 rounded",
                  onClick: async (bookissue) => {
                    if (confirm("Are you sure you want to delete?")) {
                      await deleteBooks(bookissue.issueId);
                    }
                  }
                },
                {
                  icon: "pi pi-calendar",
                  className: "px-3 py-1 rounded",
                  onClick: (bookissue) => {
                    console.log(bookissue)
                    setSelectedId(bookissue.issueId);
                    setIsOpen(true);
                  },
                }
              ]
            }
          ]}
        />
      )}
      <Status
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        issueId={selectedId}
      />
    </div>
  );

}