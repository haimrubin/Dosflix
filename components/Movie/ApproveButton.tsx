import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { FaCheckDouble } from "react-icons/fa";

import useCurrentUser from "@/hooks/useCurrentUser";
import useToApprove from "@/hooks/useToApprove";

interface ApproveButtonProps {
  movieId: string;
}

const ApproveButton: React.FC<ApproveButtonProps> = ({ movieId }) => {
  let isApproved = false
  const { mutate: mutateToApprove } = useToApprove();


  const toggleApprove = useCallback(async () => {
    let response;

    response = await axios.post('/api/movies/approve', { movieId });
    console.log(response);
    isApproved = response?.status == 200;
    mutateToApprove();

  }, [movieId, isApproved]);

  const Icon = isApproved ? FaCheckDouble : CheckIcon ;

  return (
    <div
      onClick={toggleApprove}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  );
};

export default ApproveButton;
