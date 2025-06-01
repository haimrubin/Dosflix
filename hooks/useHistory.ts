import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useHistory = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/history", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { data, error, isLoading, mutate };
};

export default useHistory;
