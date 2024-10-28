import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { IClientResponse, IUser } from "@/definitions";
import { Edit } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  userById: IClientResponse<IUser>;
  role: string,
};

export default function Profile(props: Props) {
  const { data, isSuccess, isError, isEmpty, message } = props?.userById || {};
  const role = props?.role

  return (
    <div className="table border border-gray-200 rounded p-4 relative">
      <Button href={'/dashboard/users/update/' + data?.id} variant="info" outline size="xs" className="absolute -top-4 -right-4">
        <Edit />
      </Button>
      <div className="PROFILE flex flex-col gap-4 text-center mb-2">
        <div className="table mx-auto size-40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data?.imagePath || ""}
            alt="proifle image"
            className="size-full aspect-square object-cover flex rounded broder border-2 border-gray-300"
          />
        </div>
        <div className="text-center">
          <h3 className="text-gray-600 text-xl font-bold mb-1">
            {data?.fullName}
          </h3>
          <p className="text-gray-400 text-sm font-normal">@{data?.userName}</p>
          <p className="text-gray-400 text-sm font-normal mb-2">
            {data?.email}
          </p>
          <Badge variant="info" size="md" className="mx-auto">{role}</Badge>
        </div>
      </div>
    </div>
  );
}
