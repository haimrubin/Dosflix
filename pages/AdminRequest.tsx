import { useState } from "react";
import axios from "axios";
import Meta from "@/lib/meta";
import { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { Navbar } from "@/components";

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

const AdminRequest: NextPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    city: "",
    phoneNumber: "",
    message: ""
  });

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    const numericPhone = phoneNumber.replace(/\D/g, '');

    return /^\d+$/.test(numericPhone) && numericPhone.length >= 9 && numericPhone.length <= 12;
  };

  const submitAdminRequest = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    // Validate required fields
    if (Object.values(formData).some((value) => !value.trim())) {
      setError("כל השדות הם חובה");
      setLoading(false);
      return;
    }
    if (!validatePhoneNumber(formData.phoneNumber)) {
      setError("אנא הזן מספר טלפון תקין");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/admins/admin-request", formData);
      setMessage("בקשת האדמין שלך נשלחה בהצלחה");

      setFormData({
        name: "",
        country: "",
        city: "",
        phoneNumber: "",
        message: ""
      });
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("משהו השתבש, אנא נסה שוב");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Meta title="בקשת אדמין">
      <>
        <Navbar />
        <div className="h-32"></div>

        <div className="max-w-2xl mx-auto bg-[#141414] p-6 rounded-lg shadow-lg border border-[#222]">
          <h2 className="text-2xl text-white font-semibold mb-4">הפוך להיות מעלה תוכן</h2>

          {message && <p className="text-green-500 mb-4">{message}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="שם מלא"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#333] text-white border border-[#555] focus:ring-2 focus:ring-red-600 outline-none"
            />
            <input
              type="text"
              name="country"
              placeholder="מדינה"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#333] text-white border border-[#555] focus:ring-2 focus:ring-red-600 outline-none"
            />
            <input
              type="text"
              name="city"
              placeholder="עיר"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#333] text-white border border-[#555] focus:ring-2 focus:ring-red-600 outline-none"
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="מספר טלפון"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#333] text-white border border-[#555] focus:ring-2 focus:ring-red-600 outline-none text-right dir-rtl"
            />
            <textarea
              name="message"
              placeholder="הודעה (סוג התוכן שאתה רוצה להעלות, נושאים, שמות הרבנים שידרשו)"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 resize-none h-32 rounded bg-[#333] text-white border border-[#555] focus:ring-2 focus:ring-red-600 outline-none"
            />

            <button
              onClick={submitAdminRequest}
              className="w-full bg-red-600 text-white p-3 rounded font-semibold hover:bg-red-700 transition disabled:bg-gray-500"
              disabled={loading}
            >
              {loading ? "שולח בקשה..." : "שלח בקשה"}
            </button>
          </div>
        </div>
      </>
    </Meta>
  );
};

export default AdminRequest;