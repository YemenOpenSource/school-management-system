import Drawer from "@/components/drawer";
import IsAuth from "@/lib/is-auth";
import DrawerContainer from "@/components/drawer-container";
import IsRoleAuth from "@/lib/is-role-auth";
import BreadCrump from "@/components/breadcrump";
import Title from "@/components/ui/title";
import Button from "@/components/ui/button";
type Props = {
  children: React.ReactNode;
};
export default function layout({ children }: Props) {
  return (
    <div>
      <IsAuth route="protected">
        <DrawerContainer>
          <IsRoleAuth>
            {/* <Title title="Update User">
              <Button href="/dashboard/users" value="Users" />
            </Title>
            <BreadCrump /> */}
            {children}
          </IsRoleAuth>
        </DrawerContainer>
      </IsAuth>
    </div>
  );
}
