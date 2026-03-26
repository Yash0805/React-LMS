import { useNavigate } from "react-router-dom";
import Button from "Shared/Component/Button/Button";
import TextBox from "Shared/Component/Forms/TextBox";
import { useNewBookIssueMutation } from "../queries";
import { useForm } from "react-hook-form";

export default function Create() {
  const { mutate, isPending } = useNewBookIssueMutation();

  const { control, handleSubmit, reset } = useForm<Master.BookIssueForm>();

  const navigate = useNavigate();

  const onSubmit = (data: Master.BookIssueForm) => {
    console.log("FORM DATA:", data);

    mutate(data, {
      onSuccess: () => {
        reset();
        navigate("/bookIssue/list");
      },
    });
  };

  return (
    <div className="mt-10 px-6 text-white">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Create Book Issue</h1>

        <button
          onClick={() => navigate("/bookIssue/list")}
          className="text-slate-400 hover:text-white text-sm"
        >
          ← Back to List
        </button>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-lg bg-slate-900 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <TextBox
              label="Member Id"
              name="memberId"
              control={control}
              rules={{
                required: "Member Id is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Only numbers are allowed",
                },
              }}
            />

            <TextBox
              label="Book Id"
              name="bookId"
              control={control}
              rules={{
                required: "Book Id is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Only numbers are allowed",
                },
              }}
            />
            <div className="mt-6 flex justify-end">
              <Button
                caption="Submit"
                disabled={isPending}
                type="submit"
              />
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}