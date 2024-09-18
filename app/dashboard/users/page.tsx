import Button from "@/components/ui/button";
import Title from "@/components/ui/title";
import UsersData from "@/components/ui/users/users-data";
import UsersTable from "@/components/ui/users/users-table";

export default function page() {
  return (
    <div>
      <Title>
        Users
        <Button tag="link" href="/dashboard/users/add" variant="info">
          Add User
        </Button>
      </Title>
      <UsersTable />
      {/* <UsersData /> */}
      {/* </UsersTable> */}
    </div>
  );
}
