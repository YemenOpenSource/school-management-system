import Nav from "@/components/ui/nav";
import { IClientResponse, IRole, IUser } from "@/definitions";
import { getCurrentUser, getRoleById } from "@/lib/actions";
import React from "react";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import NotFound from "../not-found";

type Props = {
  children: React.ReactNode;
};

// export const metadata: Metadata = {
//   title: 'home',
//   description: 'school management system for your next step',
//   // metadataBase: new URL('')
//   icons: ""
// }

export default async function layout({ children }: Props) {
  const user = (await getCurrentUser()) as IClientResponse<IUser>;
  const userRole = await getRoleById(Number(user?.data?.roles?.[0])) as IClientResponse<IRole>

  // console.log(user, userRole)

  const userWithRoles = {
    ...user,
    data: {
      ...user?.data,
      roles: userRole?.data?.name
    },
  }

  // if(!user) {
  // redirect('/login')
  //   // return notFound()
  // }
  
  return (
    <div>
      <Nav isDashboard={false} user={userWithRoles} />
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
