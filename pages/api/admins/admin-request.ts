import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { currentUser } = await serverAuth(req, res);

      if (currentUser?.type !== "3") {
        return res.status(403).json({ error: "גישה מוגבלת למנהלים בלבד" });
      }

      const adminRequests = await prismadb.adminRequest.findMany({});

      return res.status(200).json(adminRequests);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "משהו השתבש, אנא נסה שוב" });
    }
  } else if (req.method === "POST") {
    try {
      const { currentUser } = await serverAuth(req, res);

      const { 
        name, 
        country, 
        city, 
        phoneNumber, 
        message 
      } = req.body;

      if (!name || !country || !city || !phoneNumber || !message) {
        return res.status(400).json({ error: "כל השדות הם חובה" });
      }

      const existingRequest = await prismadb.adminRequest.findFirst({
        where: {
          userId: currentUser?.id,
        }
      });

      if (existingRequest) {
        return res.status(400).json({ error: "בקשת אדמין כבר קיימת" });
      }

      const adminRequest = await prismadb.adminRequest.create({
        data: {
          name,
          country,
          city,
          phoneNumber,
          message,
          userId: currentUser?.id, 
        },
      });

      await prismadb.user.update({
        where: {
          id: currentUser?.id || ""
        },
        data: {
          type: "0" 
        }
      });

      return res.status(200).json(adminRequest);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "משהו השתבש, אנא נסה שוב" });
    }
  } else {
    return res.status(405).end();
  }
}