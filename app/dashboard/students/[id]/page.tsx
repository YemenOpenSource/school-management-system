import React from "react";
import { getDepartmentById, getStudentById } from "@/lib/actions";
import { IClientResponse, IDepartment, IStudent } from "@/definitions";
import Title from "@/components/ui/title";
import Button from "@/components/ui/button";
import StudentProfile from "./student-profile";

type Props = {
  params: { id: string };
};
export default async function page(props: Props) {
  const { id } = props?.params;
  const studentById = (await getStudentById(Number(id))) as IClientResponse<IStudent>;
  const { data } = await getDepartmentById(Number(studentById?.data?.departmentId)) as IClientResponse<IDepartment>
  console.log(studentById)

  return (
    <div>
      <Title title="Profile">
        <Button href="/dashboard/students" value="Students" />
      </Title>
      <div className="w-full flex items-center justify-center">
        <StudentProfile studentById={studentById} department={data?.name ?? ''} />
      </div>
    </div>
  );
}
