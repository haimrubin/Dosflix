import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useMyLectures = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/mylec", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { data, error, isLoading, mutate };
};

export default useMyLectures;
