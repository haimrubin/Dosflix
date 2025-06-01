import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useToApprove = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/movies/toApprove", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { data, error, isLoading, mutate };
};

export default useToApprove;
