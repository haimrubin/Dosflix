import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Ensure user is authenticated
    const { currentUser } = await serverAuth(req, res);

    if (!currentUser) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (req.method === "DELETE") {
      const { movieId } = req.query as { movieId: string };


      if (!movieId) {
        return res.status(400).json({ error: "Movie ID is required" });
      }

      // Delete the movie
      const deletedMovie = await prismadb.movie.delete({
        where: {
          id: movieId,
        },
      });

      if (!deletedMovie) {
        return res.status(404).json({ error: "Movie not found" });
      }

 
      // const updatedMyLecturesIds = without(currentUser.myLectures, movieId);

      // // Update the user's  favoriets
      // const updatedUser = await prismadb.user.update({
      //   where: {
      //     email: currentUser.email || "",
      //   },
      //   data: {
      //     favoriteIds: updatedMyLecturesIds, 
      //   },
      // });

      // Return the updated user info
      return res.status(200).json(deletedMovie);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("Error deleting movie:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
