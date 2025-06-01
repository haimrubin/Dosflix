import useInfo from "@/hooks/useInfo";
import { useRouter } from "next/router";
import { BsFillPlayFill } from "react-icons/bs";
import { DeleteButton } from "../Favorites";
import { ApproveButton } from "../Movie";
import { FaInfo } from "react-icons/fa";

type Props = {
  data: Record<string, any>;
  admin?: boolean;
};

export const MovieToApproveCard = ({ data, admin }: Props) => {
  const router = useRouter();
  const { openModal } = useInfo();

  return (
    <div className="flex items-center justify-between bg-zinc-900 p-4 border-b border-gray-700">
      <div className="flex flex-col">
        <p className="text-white font-semibold text-lg">{data?.title}</p>
        <p className="text-gray-400 text-sm">{data?.duration} | {data?.genre}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="bg-white text-black p-2 rounded-full flex items-center justify-center w-10 h-10"
          onClick={() => router.push(`/watch/${data?.id}`)}
        >
          <BsFillPlayFill size={20} />
        </button>
        <button
          className="border border-white text-white p-2 rounded-full flex items-center justify-center w-10 h-10"
          onClick={() => openModal(data?.id)}
        >
          <FaInfo />
        </button>
        <ApproveButton movieId={data?.id} />
        <DeleteButton movieId={data?.id} />
      </div>
    </div>
  );
};
