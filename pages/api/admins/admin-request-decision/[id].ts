import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { currentUser } = await serverAuth(req, res);
    
    // Only super admins (type 3) can approve or resject admin requests
    if (currentUser?.type !== "3") {
      return res.status(403).json({ error: "גישה מוגבלת למנהלים ראשיים בלבד" });
    }

    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: "מזהה לא תקין" });
    }

    // Get the admin request
    const adminRequest = await prismadb.adminRequest.findUnique({
      where: {
        id: id
      }
    });

    if (!adminRequest) {
      return res.status(404).json({ error: "בקשת מנהל לא נמצאה" });
    }

    if (req.method === "POST") {
      // APPROVE: Change user type to "2" (admin) and delete the request
      await prismadb.user.update({
        where: {
          id: adminRequest.userId || ""
        },
        data: {
          type: "2" // Change to admin
        }
      });

      // Delete the request
      await prismadb.adminRequest.delete({
        where: {
          id: id
        }
      });

      return res.status(200).json({ message: "בקשת מנהל אושרה בהצלחה" });
    } 
    else if (req.method === "DELETE") {
      // REJECT: Change user type to "0" (regular user) and delete the request
      await prismadb.user.update({
        where: {
          id: adminRequest.userId || ""
        },
        data: {
          type: "0" // Set to regular user
        }
      });

      // Delete the request
      await prismadb.adminRequest.delete({
        where: {
          id: id
        }
      });

      return res.status(200).json({ message: "בקשת מנהל נדחתה בהצלחה" });
    }
    
    return res.status(405).json({ error: "Method not allowed" });
    
  } catch (error) {
    console.error("Error in admin-request-decision API:", error);
    return res.status(500).json({ error: "משהו השתבש, אנא נסה שוב" });
  }
}