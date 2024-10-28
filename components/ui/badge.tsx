"use client";
import React, { PropsWithChildren, PropsWithRef } from "react";

type Props = {
  children?: string;
  className?: string;
  title?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "initial" | "success" | "warning" | "danger" | "info";
};

export default function Badge(props: Props) {
  const sizes = {
    xs: "text-xs px-1",
    sm: "text-sm px-1",
    md: "text-md px-1",
    lg: "text-lg px-1",
    xl: "text-xl px-1",
  };
  const variants = {
    initial: "bg-gray-100 text-gray-700 outline-1 outline outline-gray-200",
    success: "bg-green-100 text-green-700 outline-1 outline outline-green-200",
    warning: "bg-yellow-100 text-yellow-700 outline-1 outline outline-yellow-200",
    danger: "bg-red-100 text-red-700 outline-1 outline outline-red-200",
    info: "bg-blue-100 text-blue-700 outline-1 outline outline-blue-200",
  };

  const sfwndotme = (
    <a href="https://sfwn.me" className="">
      sfwn.me
    </a>
  );
  const title = props?.title || props.children || sfwndotme;
  const size = sizes[props?.size || "sm"];
  const variant = variants[props?.variant || "initial"];
  const settings = `${size} ${variant}`;

  return (
    <span
      className={`${settings} ${props?.className} rounded-[2.5px] cursor-default lowercase font-normal table`}
    >
      {title}
    </span>
  );
}
