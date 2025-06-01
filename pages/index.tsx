import { Billboard, MovieList, Navbar, InfoModal } from "@/components";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useInfo from "@/hooks/useInfo";
import useMovieList from "@/hooks/useMovieList";
import Meta from "@/lib/meta";
import { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Home: NextPage = () => {
  const { data: movies = [] } = useMovieList();
  const { data } = useCurrentUser();

  const { isOpen, closeModal } = useInfo();

  return (
    <>
    <Meta title="Home">
      <>
      <h1>Test</h1>
        <InfoModal visible={isOpen} onClose={closeModal} />
        <Navbar />
        <Billboard />
        <div className="pb-40">
          <MovieList title="שיעורים חדשים" data={movies} admin={data?.type === "3"}/>
        </div>
      </>
    </Meta>
    </>
  );
};

export default Home;


