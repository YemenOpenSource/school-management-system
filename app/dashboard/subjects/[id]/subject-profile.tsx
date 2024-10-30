import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { IClientResponse, ISubject } from "@/definitions";
import { Edit, User } from "lucide-react";
import React from "react";

type Props = {
  subjectById: IClientResponse<ISubject>;
};

export default function SubjectProfile(props: Props) {
  const { data, isSuccess, isError, isEmpty, message } = props?.subjectById || {};

  const date: Date = new Date(data?.period ?? '');

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  // Convert to a readable string
  const readableDate: string = date.toLocaleString("en-US", options);

  return (
    <div className="table border border-gray-200 rounded p-4 relative">
      <Button href={'/dashboard/subjects/update/' + data?.id} variant="info" outline size="xs" className="absolute -top-4 -right-4">
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
          <p className="text-gray-400 text-sm font-normal mb-2">period: <span className="flex">{readableDate}</span></p>
        </div>
      </div>
    </div>
  );
}
