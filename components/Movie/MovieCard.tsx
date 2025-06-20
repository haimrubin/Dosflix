import useInfo from "@/hooks/useInfo";
import { useRouter } from "next/router";
import { BsChevronDown, BsFillPlayFill } from "react-icons/bs";
import { FavoriteButton, DeleteButton } from "../Favorites";

type Props = {
  data: Record<string, any>;
  admin?: boolean;
};

export const MovieCard = ({ data, admin }: Props) => {
  const router = useRouter();

  const { openModal } = useInfo();
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <img
        src={data.thumbnailUrl}
        alt="movie thumbnail"
        className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]"
      />

      <div className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
        <img
          src={data.thumbnailUrl}
          alt="movie thumbnail"
          className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]"
        />
        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            <div
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              onClick={() => router.push(`/watch/${data?.id}`)}
            >
              <BsFillPlayFill size={24} />
            </div>

            <FavoriteButton movieId={data?.id} />
            
            <div
              onClick={() => openModal(data?.id)}
              className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 flex rounded-full items-center justify-center transition hover:border-neutral-300"
            >
              <BsChevronDown className="text-white group-hover/item:text-neutral-300 w-4" />
            </div>
            {admin && <DeleteButton movieId={data?.id} />}
          </div>

          <p className="text-white-400 font-semibold mt-4">
          <span className="text-white">{data?.title}</span>
          </p>

          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">
              {data?.duration} דק׳ |
            </p>
            <p className="text-white text-[10px] lg:text-sm">{data?.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
