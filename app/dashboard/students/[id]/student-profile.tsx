import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { IClientResponse, IStudent } from "@/definitions";
import { Edit, User } from "lucide-react";
import React from "react";

type Props = {
  studentById: IClientResponse<IStudent>;
  department: string,
};

export default function StudentProfile(props: Props) {
  const { data, isSuccess, isError, isEmpty, message } = props?.studentById || {};
  const department = props?.department

  return (
    <div className="table border border-gray-200 rounded p-4 relative">
      <Button href={'/dashboard/students/update/' + data?.id} variant="info" outline size="xs" className="absolute -top-4 -right-4">
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
          <p className="text-gray-400 text-sm font-normal mb-2">{data?.address}</p>
          {department && <p className="text-gray-400 text-sm font-normal mb-2">department: <span className="flex">{department}</span></p>}
        </div>
      </div>
    </div>
  );
}
