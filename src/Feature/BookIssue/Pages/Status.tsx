import {
  useRenewBookIssueMutation,
  useReturnBookIssueMutation,
} from "../queries";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  issueId: number | null;
}

export default function Status({ isOpen, onClose, issueId }: Props) {
  const { mutateAsync: returnBook, isPending: returning } =
    useReturnBookIssueMutation(issueId ?? 0);

  const { mutateAsync: renewBook, isPending: renewing } =
    useRenewBookIssueMutation(issueId ?? 0);

    
  if (!isOpen || !issueId) return null;

  const handleAction = async (
    action: "return" | "renew",
    confirmMessage: string
  ) => {
    if (!confirm(confirmMessage)) return;

    try {
      if (action === "return") {
        await returnBook();
      } else {
        await renewBook();
      }
      onClose();
    } catch (err) {
      console.error(`${action} failed`, err);
    }
  };

  const isLoading = returning || renewing;

  return (
    <div className="fixed inset-0 bg-white/10 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-lg shadow-lg w-100 p-6 text-center">
        <h2 className="text-xl font-bold mb-6 text-white">
          Choose Action
        </h2>

        <div className="flex justify-center gap-4">
          <button
            onClick={() =>
              handleAction("return", "Are you sure you want to return this book?")
            }
            disabled={isLoading}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            {returning ? "Returning..." : "Return"}
          </button>

          <button
            onClick={() =>
              handleAction("renew", "Are you sure you want to renew this book?")
            }
            disabled={isLoading}
            className="px-4 py-2 bg-emerald-500 text-white rounded"
          >
            {renewing ? "Renewing..." : "Renew"}
          </button>
        </div>

        <button
          onClick={onClose}
          disabled={isLoading}
          className="mt-6 text-gray-500 underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}