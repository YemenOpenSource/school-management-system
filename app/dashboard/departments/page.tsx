import Button from "@/components/ui/button";
import TableLayer from "@/components/ui/table/table-layer";
import Title from "@/components/ui/title";
import { IDepartment, IInstructor } from "@/definitions";
import { deleteDepartment, getAllDepartments, getAllInstructors } from "@/lib/actions";
import React from "react";

export default async function page() {
  const departments = await getAllDepartments();
  const instructors = await getAllInstructors()
  console.log(departments);

  const replaceInstructorIdByInstructorName = (departments?.data as IDepartment[])?.map((dep) => {
    const inst = (instructors?.data as IInstructor[])?.find((inst) => inst.id === dep.managerId)
    return {
      ...dep,
      managerId: inst ? inst.name : '-'
    }
  })

  const instructorWithDepartments = {
    ...instructors,
    data: replaceInstructorIdByInstructorName,
  }

  const departmentsKeysAndNames = [
    {
      key: "id",
      name: "id",
    },
    {
      key: "name",
      name: "name",
    },
    {
      key: "managerId",
      name: "manager",
    },
  ];
  return (
    <div>
      <Title title="All Departments">
        <Button href="/dashboard/departments/add">Create</Button>
      </Title>
      <TableLayer
        dataFunction={instructorWithDepartments}
        deleteFunction={deleteDepartment}
        tableHeader={departmentsKeysAndNames}
        route="departments"
      />
    </div>
  );
}
