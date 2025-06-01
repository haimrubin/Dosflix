import Link from "next/link";

type Props = {
  label: string;
  href: string;
};

export const NavbarItem = ({ label, href }: Props) => {
  return (
    <Link href={href}>
      <div className="text-white cursor-pointer hover:text-gray-300 transition">
        {label}
      </div>
    </Link>
  );
};
