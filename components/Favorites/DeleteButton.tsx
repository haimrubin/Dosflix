import axios from "axios";
import React, { useCallback, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { FaRegTrashAlt } from "react-icons/fa";
import useToApprove from "@/hooks/useToApprove";
import useMyLectures from "@/hooks/useMyLectures";

interface DeleteButtonProps {
  movieId: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ movieId }) => {
  const [deleted, setDeleted] = useState(false);
  const { mutate: mutateToApprove } = useToApprove();
  const { mutate: mutateMyLec } = useMyLectures();
  

  const toggleDelete = useCallback(async () => {
    try {
      await axios.delete(`/api/movies/delete?movieId=${movieId}`);
      setDeleted(true);
      mutateToApprove();
      mutateMyLec();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }, [movieId]);

  const Icon = deleted ? CheckIcon : FaRegTrashAlt;

  return (
    <div
      onClick={toggleDelete}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  );
};

export default DeleteButton;
