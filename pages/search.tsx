import { Billboard, MovieList, Navbar, InfoModal } from "@/components";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useInfo from "@/hooks/useInfo";
import useMovieList from "@/hooks/useMovieList";
import Meta from "@/lib/meta";
import { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";



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

const Search: NextPage = () => {
  const { data: movies = [] } = useMovieList();
  const { data } = useCurrentUser();
  const { isOpen, closeModal } = useInfo();
  const router = useRouter();
  const searchQuery = typeof router.query.s === "string" ? router.query.s : "";
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [selectedGenre, setSelectedGenre] = useState<string>("הכל");


  const filteredMovies = movies.filter((movie: { title: string; description?: string }) => {
    const lowerQuery = searchQuery.toLowerCase();
    return (
      movie.title.toLowerCase().includes(lowerQuery) ||
      (movie.description?.toLowerCase().includes(lowerQuery) ?? false)
    );
  });

  const genres = Array.from(
    new Set(
      filteredMovies
        .flatMap((movie: any) =>
          movie.genre ? movie.genre.split(",").map((g: string) => g.trim()) : []
        )
    )
  ) as string[];



  const genreFilteredMovies =
    selectedGenre === "הכל"
      ? filteredMovies
      : filteredMovies.filter((movie: any) =>
        movie.genre?.split(",").map((g: string) => g.trim()).includes(selectedGenre)
      );





  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = () => {
    router.push(`/search?s=${encodeURIComponent(searchInput)}`);
    if (searchInput.trim() !== "") {
      
    }
  };

  return (
    <>
      <Meta title="Search">
        <>
          <InfoModal visible={isOpen} onClose={closeModal} />
          <Navbar />
          <div className="h-32"></div>
          <div className="flex gap-4 items-center my-8 px-4 w-full max-w-4xl mx-auto">
            <div className="relative w-full">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchSubmit();
                }}
                placeholder="חפש סרטים או תיאורים..."
                className="w-full bg-neutral-800 text-white text-lg rounded-md py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <BsSearch
                onClick={handleSearchSubmit}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
                size={20}
              />
            </div>

            <div className="ml-4 w-48 flex items-center">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="bg-neutral-800 text-white text-md rounded-md py-4 px-8 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="הכל">כל הז׳אנרים</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          </div>




          <div className="pb-40">
            <MovieList
              title={`נמצאו ${genreFilteredMovies.length} תוצאות`}
              data={genreFilteredMovies}
              admin={data?.type === "3"}
            />
          </div>
        </>
      </Meta>
    </>
  );
};

export default Search;
