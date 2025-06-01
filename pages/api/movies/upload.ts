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
      const { title, description, videoUrl, thumbnailUrl, genre, duration } = req.body;

      console.log("Received data:", req.body); // Debugging log

      // Validate required fields
      if (!title || !description || !videoUrl || !thumbnailUrl || !genre || !duration) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Create new movie in the database
      const newMovie = await prismadb.movie.create({
        data: {
          title,
          description,
          videoUrl,
          thumbnailUrl,
          genre,
          duration,
          userId: currentUser.id,
        },
      });

      return res.status(201).json(newMovie);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error: unknown) {
    console.error("Error uploading movie:", error);

    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(500).json({ error: "An unexpected error occurred." });
  }
}
