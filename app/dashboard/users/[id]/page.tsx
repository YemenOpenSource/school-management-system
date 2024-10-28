import React from "react";
import Profile from "./profile";
import { getRoleById, getUserById } from "@/lib/actions";
import { IClientResponse, IRole, IUser } from "@/definitions";
import Title from "@/components/ui/title";
import Button from "@/components/ui/button";

type Props = {
  params: { id: string };
};
export default async function page(props: Props) {
  const { id } = props?.params;
  const userById = (await getUserById(Number(id))) as IClientResponse<IUser>;
  const { data } = await getRoleById(Number(userById?.data?.roles?.[0])) as IClientResponse<IRole>

  return (
    <div>
      <Title title="Profile">
        <Button href="/dashboard/users" value="Users" />
      </Title>
      <div className="w-full flex items-center justify-center">
        <Profile userById={userById} role={data?.name ?? ''} />
      </div>
    </div>
  );
}
