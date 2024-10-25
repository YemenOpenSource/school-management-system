import React from "react";
import Profile from "./profile";
import { getUserById } from "@/lib/actions";
import { IClientResponse, IUser } from "@/definitions";

type Props = {
  params: { id: string };
};
export default async function page(props: Props) {
  const { id } = props?.params;
  const userById = (await getUserById(Number(id))) as IClientResponse<IUser>;
  return (
    <div>
      <Profile userById={userById} />
    </div>
  );
}
