import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { IClientResponse, IDepartment, IInstructor } from "@/definitions";
import { Edit, User } from "lucide-react";
import React from "react";

type Props = {
  instructorById: IClientResponse<IInstructor>;
  department: IClientResponse<IDepartment>,
};

export default function InstructorProfile(props: Props) {
  const { data, isSuccess, isError, isEmpty, message } = props?.instructorById || {};
  const department = props?.department

  return (
    <div className="table border border-gray-200 rounded p-4 relative">
      <Button href={'/dashboard/instructors/update/' + data?.id} variant="info" outline size="xs" className="absolute -top-4 -right-4">
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
          <p className="text-gray-400 text-sm font-normal mb-2">position: {data?.position}</p>
          <p className="text-gray-400 text-sm font-normal mb-2">department:</p>
          <Button href={`/dashboard/departments/${department?.data?.id}`} width="initial" outline variant="info" size="xs" className="mx-auto w-fit">{department?.data?.name}</Button>
        </div>
      </div>
    </div>
  );
}
