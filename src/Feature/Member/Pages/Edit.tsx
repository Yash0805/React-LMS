import { useNavigate, useParams } from "react-router-dom";
import { useUpdateMemberMutation } from "../queries";
import { useCallback } from "react";
import { ApiService } from "Service";
import Form from "../Component/Form";

interface EditRouteParams extends Record<string,string>{
    memberId:string;
}
export default function Edit(){
     const {memberId} = useParams<EditRouteParams>();
    const {mutateAsync} = useUpdateMemberMutation(parseInt(memberId!,10))
    const navigate = useNavigate();
    const handleLoad = useCallback(
    async function () {
      const data = await ApiService.get<Master.Member>(
        'Members/' + memberId
      );
      if (!data) {
        return {
          memberId: 0,
          memberName: '',
          memberType:'',
        };
      }

      return data;
    },
    [memberId]
  );
   return (
    <div className="mt-10 px-6 text-white">
    <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Edit Category
        </h1>

        <button
          onClick={() => navigate("/member/list")}
          className="text-slate-400 hover:text-white text-sm"
        >
          ← Back to List
        </button>
      </div>
    <Form
      onLoad={handleLoad}
      onSubmit={async member => {
        await mutateAsync(member);
      }}
      submitCaption="Update"
    />
    </div>
    
  );
}