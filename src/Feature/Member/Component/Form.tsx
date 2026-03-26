import { useNavigate } from "react-router-dom";
import TextBox from "Shared/Component/Forms/TextBox";
import Button from "Shared/Component/Button/Button";
import { useMemberForm } from "./Member.Form";
import { Controller } from "react-hook-form";

interface FormProps {
    onSubmit: (p: Master.MemberForm) => Promise<void>;
    onLoad?: () => Promise<Master.Member>;
    submitCaption: string;
}

export default function Form({ onLoad, onSubmit, ...props }: FormProps) {
    const { get, handleSubmit, submitting } = useMemberForm(onLoad);
    const navigate = useNavigate();

    return (
        <div className="flex justify-center">
            <form
                className="w-full max-w-lg bg-slate-900 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
                onSubmit={handleSubmit(async data => {
                    await onSubmit(data);
                    navigate('../list');
                })}
            >
                <TextBox label="Member Name" {...get('memberName')} />

                <div className="mb-4">
                    <label className="block text-slate-300 text-sm font-medium mb-1">
                        Member Type
                    </label>

                    <Controller
                        control={get('memberType').control}
                        name="memberType"
                        render={({ field }) => (
                            <select
                                {...field}
                                disabled={submitting}
                                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white"
                            >
                                <option value="">Select Member Type</option>
                                <option value="Premium">Premium</option>
                                <option value="Regular">Regular</option>
                            </select>
                        )}
                    />
                </div>

                <Button caption={props.submitCaption} disabled={submitting} />
            </form>
        </div>
    );
}