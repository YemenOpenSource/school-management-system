import Button from "@/components/ui/button";
import TableLayer from "@/components/ui/table/table-layer";
import Title from "@/components/ui/title";
import { IDepartment, IStudent } from "@/definitions";
import { deleteStudent, getAllDepartments, getAllStudents } from "@/lib/actions";
import React from "react";

export default async function page() {
  const students = await getAllStudents();
  const departments = await getAllDepartments()

  const replaceDepartmentIdByDeparmentName = (students?.data as IStudent[])?.map((stud) => {
    const dept = (departments?.data as IDepartment[])?.find((dep) => dep.id === stud.departmentId)
    return {
      ...stud,
      departmentId: dept ? dept.name : '-'
    }
  })

  const studentsWithDepartments = {
    ...students,
    data: replaceDepartmentIdByDeparmentName,
  }

  const studentsKeysAndNames = [
    {
      key: "id",
      name: "id",
    },
    {
      key: "name",
      name: "name",
    },
    {
      key: "address",
      name: "address",
    },
    {
      key: "departmentId",
      name: "department",
    },
  ];

  return (
    <div>
      <Title title="All Students">
        <Button href="/dashboard/students/add">Create</Button>
      </Title>
      <TableLayer
        dataFunction={studentsWithDepartments}
        deleteFunction={deleteStudent}
        tableHeader={studentsKeysAndNames}
        route="students"
      />
    </div>
  );
}
