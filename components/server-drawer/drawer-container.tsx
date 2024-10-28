import { getAllRoles, getCurrentUser, getRoleById } from "@/lib/actions";
import React from "react";
import Drawer from "../dashboard-layout/drawer";
import { IClientResponse, IRole, IUser } from "@/definitions";

type Props = {
  children: React.ReactNode;
};

export default async function DrawerContainer(props: Props) {
  const user = (await getCurrentUser()) as IClientResponse<IUser>;
  const userRole = await getRoleById(Number(user?.data?.roles?.[0])) as IClientResponse<IRole>

  const userWithRoles = {
    ...user,
    data: {
      ...user.data,
      roles: userRole?.data?.name
    },
  }

  return (
    <>
      <Drawer user={userWithRoles}>{props.children}</Drawer>
    </>
  );
}
