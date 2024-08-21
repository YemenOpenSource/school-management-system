"use client";
import React from "react";
import { navLinks } from "../../lib/nav-links";
import Link from "next/link";
import LogoLayout from "./logo-layout";
import { PanelLeft } from "lucide-react";
import { usePathname } from "next/navigation";

type Props = {
  toggleDrawer: boolean;
  setToggleDrawer: UpdateStateType;
};

export default function DrowerNavLinksLayout(props: Props) {
  const { toggleDrawer, setToggleDrawer } = props;
  const pathname = usePathname();

  function handleToggleDrawer() {
    setToggleDrawer((prev) => !prev);
  }

  const navLinksData = navLinks.map((link) => {
    const isActive = pathname === link?.href;
    return (
      <Link
        href={link?.href}
        key={link?.href}
        className={`text-gray-800 ${
          isActive ? "text-gray-600 bg-gray-50" : null
        } hover:text-gray-600 hover:bg-gray-50 font-normal rounded-sm mx-px my-1 p-3 flex items-end gap-1 duration-150 text-sm md:text-base`}
      >
        {link?.icon ? (
          <link.icon className="stroke-[1.5] bg-gray-50 p-[2px] rounded" />
        ) : (
          <div className="h-[25px] w-[25px]" />
        )}
        <p className="first-letter:capitalize">{link?.title}</p>
      </Link>
    );
  });

  return (
    <aside className="">
      <div className="px-3 py-4 flex items-center justify-between">
        <LogoLayout height={30} width={30} hasText={true} />
        <PanelLeft
          size={30}
          className="stroke-[1.5] bg-gray-50 p-[2px] rounded text-gray-500 hover:text-gray-600 cursor-pointer"
          onClick={handleToggleDrawer}
        />
      </div>
      <div className="flex flex-col flex-wrap items-stretch justify-start">
        {navLinksData}
      </div>
    </aside>
  );
}
