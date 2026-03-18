import { useState, useEffect } from "react";
import { ApiService } from "Service";
import { Loader } from "Shared/Component/Loader/Loader";
import { Grid } from "Shared/Component/Grid";

interface MemberList {
  memberId: number;
  memberName: string;
  memberType: string;
}

export default function MemberList() {
  const [memberList, setMemberList] = useState<MemberList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ApiService.get<MemberList[]>("Members")
      .then(data => setMemberList(data ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader />
      </div>
    );
  }

  if (memberList.length === 0) {
    return (
      <div className="text-center py-10 text-slate-400">
        No Members Found
      </div>
    );
  }

  return (
    <div className="mt-10 px-6 text-white">

      <div className="flex justify-start mb-10">
        <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Member List
        </h1>
      </div>

      <Grid<MemberList>
        data={memberList}
        rowKey={(m) => m.memberId}
        columns={[
          {
            field: "memberName",
            header: "Member Name",
          },
          {
            field: "memberType",
            header: "Member Type",

          },
        ]}
      />

    </div>
  );
}