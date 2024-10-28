import React from "react";
import { getDepartmentById, getSubjectById } from "@/lib/actions";
import { IClientResponse, IDepartment, ISubject } from "@/definitions";
import Title from "@/components/ui/title";
import Button from "@/components/ui/button";
import SubjectProfile from "./subject-profile";

type Props = {
  params: { id: string };
};
export default async function page(props: Props) {
  const { id } = props?.params;
  const subjectById = (await getSubjectById(Number(id))) as IClientResponse<ISubject>;

  return (
    <div>
      <Title title="Profile">
        <Button href="/dashboard/subjects" value="Subjects" />
      </Title>
      <div className="w-full flex items-center justify-center">
        <SubjectProfile subjectById={subjectById}/>
      </div>
    </div>
  );
}
