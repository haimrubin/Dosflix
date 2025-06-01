import { NextApiResponse, NextApiRequest } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { currentUser } = await serverAuth(req, res);
    if (req.method === "GET") {      
      const history = await prismadb.movie.findMany({
        where: {
          id: {
            in: currentUser?.myLectures,//history
          },
        },
      });
      return res.status(200).json(history);
    }
    else if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);

      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      const user = await prismadb.user.update({
        where: {
          id: currentUser.id || "",
        },
        data: {
          myLectures: { //history
            push: movieId,
          },
        },
      });

      return res.status(200).json(user);
    }

    else{
      return res.status(405).end();
    }

  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
