import React from "react";
import { IClientResponse, IDepartment } from "@/definitions";
import Title from "@/components/ui/title";
import Button from "@/components/ui/button";
import DepartmentProfile from "./department-profile";
import { getDepartmentById, getInstructorById } from "@/lib/actions";

type Props = {
  params: { id: string };
};
export default async function page(props: Props) {
  const { id } = props?.params;
  const departmentById = (await getDepartmentById(Number(id))) as IClientResponse<IDepartment>;
  const instructorById = await getInstructorById(Number(departmentById?.data?.managerId))

  console.log(departmentById?.data)
  console.log(instructorById?.data)
  
  return (
    <div className="">
      <Title title="Profile">
        <Button href="/dashboard/departments" value="Departments" />
      </Title>
      <div className="w-full flex items-center justify-center">
        <DepartmentProfile departmentById={departmentById}/>
      </div>
    </div>
  );
}
