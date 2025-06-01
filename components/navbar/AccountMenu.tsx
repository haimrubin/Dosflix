import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import Link from "next/link";

type Props = { visible?: boolean };

export const AccountMenu = ({ visible }: Props) => {
  const { data } = useCurrentUser();
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black w-56 absolute top-14 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img
            className="w-8 rounded-md"
            src="/images/default-blue.png"
            alt="default"
          />
          <p className="text-white text-sm group-hover/item:underline">
            {data?.name}
          </p>
        </div>
        <hr className="bg-gray-500 border-0 h-px my-4" />
        <div
          onClick={() => signOut()}
          className="px-3 text-center text-white text-sm hover:underline transition"
        >
          התנתק
        </div>
        {(data.type == "3" || data.type == "2") &&
          <Link href="/admin">
            <div className="px-3 text-center text-white text-sm hover:underline transition">
              מסך אדמין
            </div>
          </Link>}
          {( data.type == "") &&
          <Link href="/AdminRequest">
            <div className="px-3 text-center text-white text-sm hover:underline transition">
              הפוך למעלה תוכן
            </div>
          </Link>}
      </div>
    </div>
  );
};
