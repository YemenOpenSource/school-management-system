import Badge from "@/components/ui/badge";
import { IClientResponse, IUser } from "@/definitions";
import React from "react";

type Props = {
  userById: IClientResponse<IUser>;
};

export default function Profile(props: Props) {
  const { data, isSuccess, isError, isEmpty, message } = props?.userById || {};

  return (
    <div>
      <div className="PROFILE flex flex-col gap-4 text-center mb-2">
        <div className="table mx-auto size-40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data?.imagePath || ""}
            alt="proifle image"
            className="size-full aspect-square object-cover flex rounded broder border-2 border-gray-300"
          />
        </div>
        <div>
          <h3 className="text-gray-600 text-4xl font-bold mb-1">
            {data?.fullName}
          </h3>
          <p className="text-gray-400 text-sm font-normal">@{data?.userName}</p>
          <p className="text-gray-400 text-sm font-normal mb-2">
            {data?.email}
          </p>
          <Badge variant="info">{data?.roles?.[0].toString()}</Badge>
        </div>
      </div>
      <hr />
    </div>
  );
}
