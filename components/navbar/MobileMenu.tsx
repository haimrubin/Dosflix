import React from "react";
import { menuData } from "./data";
import { NavbarItem } from "./NavbarItem";

type Props = {
  visible?: boolean;
};

export const MobileMenu = ({ visible }: Props) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black w-56 absolute top-8 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4 text-center">
        {menuData.map((item) => (
          <NavbarItem label={item.text} key={item.id} href={item.href} />
        ))}
      </div>
    </div>
  );
};
