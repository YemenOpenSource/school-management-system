import Button from "@/components/ui/button";
import TableLayer from "@/components/ui/table/table-layer";
import { deleteInstructor, getAllDepartments, getAllInstructors, getDepartmentById, getInstructorById } from "@/lib/actions";
import React from "react";
import Title from "../../../components/ui/title";
import { IDepartment, IInstructor } from "@/definitions";

export default async function page() {
  const instructors = await getAllInstructors();
  const departments = await getAllDepartments()

  const replaceDepartmentIdByDeparmentName = (instructors?.data as IInstructor[])?.map((inst) => {
    const dept = (departments?.data as IDepartment[])?.find((dep) => dep.id === inst.deptId)
    return {
      ...inst,
      deptId: dept ? dept.name : '-'
    }
  })

  const instructorWithDepartments = {
    ...instructors,
    data: replaceDepartmentIdByDeparmentName,
  }

  const instructorsKeysAndNames = [
    {
      key: "id",
      name: "id",
    },
    {
      key: "name",
      name: "name",
    },
    {
      key: "position",
      name: "position",
    },
    {
      key: "salary",
      name: "salary",
    },
    {
      key: "deptId",
      name: "department",
    },
  ];
  return (
    <div>
      <Title title="All Instructors">
        <Button href="/dashboard/instructors/add">Create</Button>
      </Title>
      <TableLayer
        dataFunction={instructorWithDepartments}
        deleteFunction={deleteInstructor}
        tableHeader={instructorsKeysAndNames}
        route="instructors"
      />
    </div>
  );
}
