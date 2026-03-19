import { useState } from "react";
import { useNavigate } from "react-router";
import { ApiService } from "Service";
import Button from "Shared/Component/Button/Button";

export default function Create() {
    const [memberName, setMemberName] = useState("");
    const [memberType, setMemberType] = useState("");
    const [errors, setErrors] = useState<{
        memberName?: string;
        memberType?: string;
        general?: string;
    }>({});
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();

    const validate = () => {
        const newErrors: typeof errors = {};

        if (!memberName.trim()) {
            newErrors.memberName = "Member Name is required";
        }

        if (!memberType) {
            newErrors.memberType = "Member Type is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div className="mt-10 px-6 text-white">

            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                    Create Member
                </h1>

                <button
                    onClick={() => navigate("/member/list")}
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

                        setErrors({});

                        if (!validate()) return;

                        try {
                            setSubmitting(true);

                            await ApiService.post("Members", {
                                memberName,
                                memberType,
                            });

                            navigate("/member/list");
                        } catch {
                            setErrors({ general: "Something went wrong" });
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    <div className="mb-4">
                        <label className="block text-slate-300 text-sm font-medium mb-1">
                            Member Name
                        </label>

                        <input
                            type="text"
                            value={memberName}
                            onChange={(e) => {
                                setMemberName(e.target.value);
                                setErrors((prev) => ({ ...prev, memberName: undefined }));
                            }}
                            disabled={submitting}
                            placeholder="Enter member name"
                            className={`w-full px-3 py-2 rounded-lg bg-slate-800 border 
              ${errors.memberName ? "border-red-500" : "border-slate-600"}
              text-white focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                        />

                        {errors.memberName && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.memberName}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-slate-300 text-sm font-medium mb-1">
                            Member Type
                        </label>

                        <select
                            value={memberType}
                            onChange={(e) => {
                                setMemberType(e.target.value);
                                setErrors((prev) => ({ ...prev, memberType: undefined }));
                            }}
                            disabled={submitting}
                            className={`w-full px-3 py-2 rounded-lg bg-slate-800 border 
              ${errors.memberType ? "border-red-500" : "border-slate-600"}
              text-white focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                        >
                            <option value="">Select Member Type</option>
                            <option value="Premium">Premium</option>
                            <option value="Regular">Regular</option>
                        </select>

                        {errors.memberType && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.memberType}
                            </p>
                        )}
                    </div>

                    {errors.general && (
                        <p className="text-red-400 text-sm mb-4">
                            {errors.general}
                        </p>
                    )}

                    <div className="mt-6 flex justify-end">
                        <Button caption="Create" disabled={submitting} />
                    </div>
                </form>
            </div>
        </div>
    );
}