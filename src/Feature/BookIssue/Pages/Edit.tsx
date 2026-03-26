import { useNavigate, useParams } from "react-router-dom";
import Button from "Shared/Component/Button/Button";
import TextBox from "Shared/Component/Forms/TextBox";
import { useUpdateBookIssueMutation } from "../queries";
import { useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { ApiService } from "Service";

interface EditRouteParams extends Record<string, string> {
    issueId: string;
}

interface BookIssueFormUI {
    memberId: string;
    bookId: string;
    issueDate: string;
    returnDate: string;
}

export default function Edit() {
    const { issueId } = useParams<EditRouteParams>();
    const id = parseInt(issueId!, 10);

    const { mutateAsync, isPending } = useUpdateBookIssueMutation(id);

    const { control, handleSubmit, reset } = useForm<BookIssueFormUI>({
        defaultValues: {
            memberId: "",
            bookId: "",
            issueDate: "",
            returnDate: "",
        },
    });

    const navigate = useNavigate();

    const handleLoad = useCallback(async (): Promise<BookIssueFormUI> => {
        const data = await ApiService.get<Master.BookIssue>(
            "BookIssue/" + id
        );

        if (!data) {
            return {
                memberId: "",
                bookId: "",
                issueDate: "",
                returnDate: "",
            };
        }

        return {
            memberId: data.memberId?.toString() ?? "",
            bookId: data.bookId?.toString() ?? "",
            issueDate: data.issueDate
                ? new Date(data.issueDate).toISOString().split("T")[0]
                : "",
            returnDate: data.returnDate
                ? new Date(data.returnDate).toISOString().split("T")[0]
                : "",
        };
    }, [id]);


    useEffect(() => {
        handleLoad().then((res) => {
            reset(res);
        });
    }, [handleLoad, reset]);

    const mapFormToApi = (form: BookIssueFormUI) => ({
        issueId: id,
        memberId: Number(form.memberId),
        bookId: Number(form.bookId),
        issueDate: form.issueDate,
        returnDate: form.returnDate,
    });


    const onSubmit = (data: BookIssueFormUI) => {
        const payload = mapFormToApi(data);


        mutateAsync(payload, {
            onSuccess: () => {
                reset();
                navigate("/bookIssue/list");
            },
            onError: (err) => {
                console.error("Update failed:", err);
            },
        });
    };

    return (
        <div className="mt-10 px-6 text-white">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-bold">Edit Book Issue</h1>

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

                        <TextBox
                            label="Issue Date"
                            name="issueDate"
                            control={control}
                            type="date"
                        />

                        <TextBox
                            label="Return Date"
                            name="returnDate"
                            control={control}
                            type="date"
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