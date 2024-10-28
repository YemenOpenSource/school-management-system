import React from "react";
import { getDepartmentById, getInstructorById, getRoleById, getUserById } from "@/lib/actions";
import { IClientResponse, IDepartment, IInstructor, IRole, IUser } from "@/definitions";
import Title from "@/components/ui/title";
import Button from "@/components/ui/button";
import InstructorProfile from "./instructor-profile";

type Props = {
  params: { id: string };
};
export default async function page(props: Props) {
  const { id } = props?.params;
  const instructorById = (await getInstructorById(Number(id))) as IClientResponse<IInstructor>;
  const { data } = await getDepartmentById(Number(instructorById?.data?.deptId)) as IClientResponse<IDepartment>

  return (
    <div>
      <Title title="Profile">
        <Button href="/dashboard/instructors" value="Instructors" />
      </Title>
      <div className="w-full flex items-center justify-center">
        <InstructorProfile instructorById={instructorById} department={data?.name ?? ''} />
      </div>
    </div>
  );
}
