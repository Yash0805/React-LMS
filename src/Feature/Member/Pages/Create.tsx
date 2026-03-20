import { useState } from "react";
import { useNavigate } from "react-router";
import { ApiService } from "Service";
import Button from "Shared/Component/Button/Button";
import TextBox from "Shared/Component/Forms/TextBox";

export default function Create() {
    const [memberName, setMemberName] = useState("");
    const [memberType, setMemberType] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();

    const validate = () => {
        if (!memberName.trim()) return false;
        if (!memberType) return false;
        return true;
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

                        if (!validate()) return;

                        try {
                            setSubmitting(true);

                            await ApiService.post("Members", {
                                memberName,
                                memberType,
                            });

                            navigate("/member/list");
                        } catch (ex) {
                            alert(ex);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    <TextBox
                        label="Member Name"
                        name="memberName"
                        placeholder="Enter member name"
                        value={memberName}
                        onChange={setMemberName}
                        disabled={submitting}
                    />




                    <div className="mb-4">
                        <label className="block text-slate-300 text-sm font-medium mb-1">
                            Member Type
                        </label>

                        <select
                            value={memberType}
                            onChange={(e) => setMemberType(e.target.value)}
                            disabled={submitting}
                            className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            <option value="">Select Member Type</option>
                            <option value="Premium">Premium</option>
                            <option value="Regular">Regular</option>
                        </select>
                    </div>

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