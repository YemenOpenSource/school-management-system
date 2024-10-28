import Button from "@/components/ui/button";
// import Button from "@/components/ui/button";
import { IClientResponse, IDepartment } from "@/definitions";
import { Edit, User } from "lucide-react";
import React from "react";

type Props = {
  departmentById: IClientResponse<IDepartment>;
};

export default function DepartmentProfile(props: Props) {
  const { data, isSuccess, isError, isEmpty, message } = props?.departmentById || {};

  const subjectsCheck = data?.subjects?.length || 0
  const studentsCheck = data?.students?.length || 0
  const instructorsCheck = data?.instructors?.length || 0

  return (
    <div className="table border border-gray-200 rounded p-4 relative">
      <Button href={'/dashboard/departments/update/' + data?.id} variant="info" outline size="xs" className="absolute -top-4 -right-4">
        <Edit />
      </Button>
      <div className="PROFILE flex flex-col gap-4 text-center mb-2">
        <div className="table mx-auto size-40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <User
            className="size-full aspect-square object-cover flex rounded broder border-2 border-gray-300"
          />
        </div>
        <div className="text-center">
          <h3 className="text-gray-600 text-xl font-bold mb-1">
            {data?.name}
          </h3>
          <p className="text-gray-400 text-sm font-normal mb-2">Managed by: <span className="flex">{data?.managerName}</span></p>
          {subjectsCheck > 0 && <p className="text-gray-400 text-sm font-normal mb-2">subjects:<span className="flex flex-wrap gap-1">{data?.subjects?.map((subject) => <Button key={subject?.name} size="xs" variant="info" href={"/dashboard/subjects/" + subject?.id}>{subject.name}</Button>)}</span></p>}
          {studentsCheck > 0 && <p className="text-gray-400 text-sm font-normal mb-2">students:<span className="flex flex-wrap gap-1">{data?.students?.map((student) => <Button key={student?.name} size="xs" variant="info" href={"/dashboard/students/" + student?.id}>{student.name}</Button>)}</span></p>}
          {instructorsCheck > 0 && <p className="text-gray-400 text-sm font-normal mb-2">instructors:<span className="flex flex-wrap gap-1">{data?.instructors?.map((instructor) => <Button key={instructor?.name} size="xs" variant="info" href={"/dashboard/instructors/" + instructor?.id}>{instructor?.name}</Button>)}</span></p>}
        </div>
      </div>
    </div>
  );
}
