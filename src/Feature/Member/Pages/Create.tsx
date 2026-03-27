import { useNavigate } from "react-router";
import Form from "../Component/Form";
import { useNewMemberMutation } from "../queries";



export default function Create() {
    const{mutateAsync}= useNewMemberMutation();

    const navigate = useNavigate();


    return (
        <div className="mt-10 px-6 text-white">

            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-bold bg-white text-transparent bg-clip-text">
                    Create Member
                </h1>

                <button
                    onClick={() => navigate("/member/list")}
                    className="text-slate-400 hover:text-white text-sm"
                >
                    ← Back to List
                </button>
            </div>

           <Form 
            submitCaption="Create"
      onSubmit={async member => {
        await mutateAsync(member);
      }}
    />

        </div>
    );
}