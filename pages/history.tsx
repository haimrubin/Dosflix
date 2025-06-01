import { Billboard, MovieList, Navbar, InfoModal } from "@/components";
import useHistory from "@/hooks/useHistory";
import useInfo from "@/hooks/useInfo";
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

const History: NextPage = () => {
  const { data: history = [] } = useHistory();

  const { isOpen, closeModal } = useInfo();

  return (
    <Meta title="Favorites">
      <>
        <InfoModal visible={isOpen} onClose={closeModal} />
        <Navbar />
        <div className="h-32"></div>
        <div className="pb-40">
          <MovieList title="היסטוריית הצפיה שלי" data={history} />
        </div>
      </>
    </Meta>
  );
};

export default History;
