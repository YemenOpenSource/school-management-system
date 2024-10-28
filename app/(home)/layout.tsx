import Nav from "@/components/ui/nav";
import { IClientResponse, IRole, IUser } from "@/definitions";
import { getCurrentUser, getRoleById } from "@/lib/actions";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
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
    <div>
      <Nav isDashboard={false} user={userWithRoles} />
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
