import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiService } from "Service";
import Button from "Shared/Component/Button/Button";
import TextBox from "Shared/Component/Forms/TextBox";

export default function Create() {
  const [memberId, setMemberId] = useState("");
  const [bookId, setBookId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="mt-10 px-6 text-white">

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Create Book Issue
        </h1>

        <button
          onClick={() => navigate("/bookIssue/list")}
          className="text-slate-400 hover:text-white text-sm"
        >
          ← Back to List
        </button>
      </div>


      <div className="flex justify-center">
        <form
          className="w-full max-w-lg bg-slate-900 p-8 rounded-2xl shadow-md hover:shadow-xl transition"
          onSubmit={async (e) => {
            e.preventDefault();

            try {
              setSubmitting(true);

              await ApiService.post("bookIssue", {
                memberId: Number(memberId),
                bookId: Number(bookId),
              });

              navigate("/bookIssue/list");

            } catch (ex) {
              alert(ex);
            } finally {
              setSubmitting(false);
            }
          }}
        >

          <TextBox
            label="Member Id"
            name="memberId"
            placeholder="Enter Member Id"
            value={memberId}
            onChange={setMemberId}
            disabled={submitting}
          />

          <TextBox
            label="Book Id"
            name="bookId"
            placeholder="Enter Book Id"
            value={bookId}
            onChange={setBookId}
            disabled={submitting}
          />

          <div className="mt-6 flex justify-end">
            <Button
              caption={submitting ? "Creating..." : "Create"}
              disabled={submitting}
              type="submit"
            />
          </div>

        </form>
      </div>
    </div>
  );
}