import Button from "@/components/ui/button";
import TableLayer from "@/components/ui/table/table-layer";
import Title from "@/components/ui/title";
import { IClientResponse, IRole, IUser } from "@/definitions";
import { deleteUser, getAllRoles, getAllUsers, getCurrentUser, getRolesByUserId } from "@/lib/actions";

export default async function page() {
  const [users, currentUser] = await Promise.all([
    getAllUsers(),
    getCurrentUser(),
  ]);
  const roles = await getAllRoles()
  const replaceRoleIdByRoleName = (users?.data as IUser[])?.map((user) => {
    const rols = (roles?.data as IRole[])?.find((role) => role.id === user.roles?.[0])
    return {
      ...user,
      roles: rols ? rols.name : '-'
    }
  })

  const userWithRoles = {
    ...users,
    data: replaceRoleIdByRoleName,
  }

  const userKeysAndNames = [
    {
      key: "id",
      name: "id",
    },
    {
      key: "imagePath",
      name: "image",
    },
    {
      key: "fullName",
      name: "name",
    },
    {
      key: "userName",
      name: "user name",
    },
    {
      key: "email",
      name: "email",
    },
    {
      key: "roles",
      name: "role",
    },
  ];

  return (
    <div className="relative">
      <Title title="All Users">
        <Button href="/dashboard/users/add">
          Create
        </Button>
      </Title>
      <TableLayer
        dataFunction={userWithRoles}
        deleteFunction={deleteUser}
        tableHeader={userKeysAndNames}
        currentUser={currentUser as IClientResponse<IUser>}
        route={"users"}
      />
    </div>
  );
}
