import { useNavigate } from "react-router";
import { Loader } from "Shared/Component/Loader/Loader";
import { Grid } from "Shared/Component/Grid/Index";
import Button from "Shared/Component/Button/Button";
import { useMemberQuery, useRemoveMemberMutation } from "../queries";

export default function MemberList() {
  const navigate = useNavigate();
  const {data, isLoading} = useMemberQuery();
  const{
    isPending: isDeleting,
    mutateAsync: deleteMember,
  }= useRemoveMemberMutation();



  if (isLoading || isDeleting) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mt-10 px-6 text-white">


      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold bg-white text-transparent bg-clip-text">
          Member List
        </h1>

        <Button
          caption="+ Add Member"
          type="button"
          onClick={() => navigate("/member/create")}
        />
      </div>

      {!data || data.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          No Members Found
        </div>
      ) : (
        <Grid<Master.Member>
          data={data ?? []}
          columns={[
            {
              field: "memberName",
              header: "Member Name",
            },
            {
              field: "memberType",
              header: "Member Type",
            },
              {
              header: "Action",
              actions: [
                {
                  icon: "pi pi-pencil",
                  className: "px-3 py-1 rounded",
                  onClick: (member) => {
                    navigate(`/member/Edit/${member.memberId}`);
                  },
                },
                {
                  icon: "pi pi-trash",
                  className: "px-3 py-1 rounded",
                  onClick: async (member) => {
                    if (confirm("Are you sure you want to delete?")) {
                      await deleteMember(member.memberId);
                    }
                  },
                },
              ],
            },
          ]}
        />
      )}
    </div>
  );
}