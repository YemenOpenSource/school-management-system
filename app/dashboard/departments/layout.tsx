import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  // title: "departments",
  title: {
    template: '%s | departments',
    default: 'departments'
  }
};
type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return <div>{children}</div>;
}
