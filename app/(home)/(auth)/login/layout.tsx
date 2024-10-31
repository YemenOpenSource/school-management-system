import IsAuth from "@/lib/is-auth";
import { Metadata } from "next";

type Props = {
  children: React.ReactNode;
};
export const metadata: Metadata = {
  title: "login",
  description: "your next step for managing your employees",
};

export default function layout({ children }: Props) {
  return (
    <div className="flex items-center justify-center h-full">
      <IsAuth route="public">
        {children}
      </IsAuth>
    </div>
  );
}
