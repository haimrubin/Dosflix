import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check user authentication
    const { currentUser } = await serverAuth(req, res);

    if (!currentUser) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (req.method === "POST") {
      const { movieId } = req.body;

      if (!movieId) {
        return res.status(400).json({ error: "Movie ID is required" });
      }

      // Update the movie to set isApprove to true
      const updatedMovie = await prismadb.movie.update({
        where: { id: movieId },
        data: { isApproved: true },
      });

      return res.status(200).json(updatedMovie);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error: unknown) {
    console.error("Error updating movie approval:", error);

    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(500).json({ error: "An unexpected error occurred." });
  }
}
