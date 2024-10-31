import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    template: '%s | users',
    default: 'users'
  },
};

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return <div>{children}</div>;
}
