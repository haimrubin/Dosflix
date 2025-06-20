import { NextApiResponse, NextApiRequest } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }
    await serverAuth(req, res);

    const { movieId } = req.query;

    if (typeof movieId !== "string") {
      throw new Error("Invalid ID");
    }

    if (!movieId) {
      throw new Error("Invalid ID");
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    const { currentUser } = await serverAuth(req, res);

    await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        myLectures: { //history
          push: movieId,
        },
      },
    });

    if (!movie) {
      throw new Error("Invalid ID");
    }

    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
