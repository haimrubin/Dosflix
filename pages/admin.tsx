import { useEffect, useState } from "react";
import { MovieList, Navbar, InfoModal, MovieToApproveList } from "@/components";
import useMyLectures from "@/hooks/useMyLectures";
import useToApprove from "@/hooks/useToApprove";
import useInfo from "@/hooks/useInfo";
import Meta from "@/lib/meta";
import { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import axios from "axios";
import useCurrentUser from "@/hooks/useCurrentUser";
import useSWR from "swr";
import AdminsToApproveList from "@/components/AdminsToApproveList";
import { AdminRequest } from "@prisma/client";

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

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const Admin: NextPage = () => {
  const { data: myLec = [], mutate: mutateMyLec } = useMyLectures();
  const { data: toApprove = [], mutate: mutateToApprove } = useToApprove();
  const { isOpen, closeModal } = useInfo();
  const { data } = useCurrentUser();
  const { data: adminRequests = [], mutate: mutateAdminsToApprove } = useSWR(
    data?.type === "3" ? "/api/admins/admin-request" : null,
    fetcher
  );

  const [AdminsToApprove, setAdminsToApprove] = useState<AdminRequest[]>([]);


  useEffect(() => {
    if (adminRequests && adminRequests.length > 0) {
      setAdminsToApprove(adminRequests);
    }
  }, [adminRequests]);

  const handleAdminAction = (id: string) => {
    setAdminsToApprove(AdminsToApprove.filter(admin => admin.id !== id));
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    genre: "",
    duration: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const uploadMovie = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    if (Object.values(formData).some((value) => !value.trim())) {
      setError("כל השדות הם חובה");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/movies/upload", formData);
      setMessage("השיעור הועלה בהצלחה");
      setFormData({
        title: "",
        description: "",
        videoUrl: "",
        thumbnailUrl: "",
        genre: "",
        duration: "",
      });
    } catch (err) {
      setError("משהו השתבש, נסה שוב");
    } finally {
      mutateToApprove();
      mutateMyLec();
      setLoading(false);
    }
  };
  if (!data || (data?.type !== "2" && data?.type !== "3")) {
    return null; // Or redirect to home
  }

  return (
    <Meta title="Admin">
      <>
        <InfoModal visible={isOpen} onClose={closeModal} />
        <Navbar />
        <div className="h-32"></div>

        <div className="max-w-2xl mx-auto bg-[#141414] p-6 rounded-lg shadow-lg border border-[#222]">
          <h2 className="text-2xl text-white font-semibold mb-4">העלה שיעור חדש</h2>

          {message && <p className="text-green-500 mb-4">{message}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="כותרת"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#333] text-white border border-[#555] focus:ring-2 focus:ring-red-600 outline-none"
            />
            <textarea
              name="description"
              placeholder="תקציר"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 resize-none h-32 rounded bg-[#333] text-white border border-[#555] focus:ring-2 focus:ring-red-600 outline-none"
            />
            <input
              type="text"
              name="videoUrl"
              placeholder="קישור לשיעור"
              value={formData.videoUrl}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#333] text-white border border-[#555] focus:ring-2 focus:ring-red-600 outline-none"
            />
            <input
              type="text"
              name="thumbnailUrl"
              placeholder="קישור לתמונה ראשית"
              value={formData.thumbnailUrl}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#333] text-white border border-[#555] focus:ring-2 focus:ring-red-600 outline-none"
            />
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#333] text-white border border-[#555] focus:ring-2 focus:ring-red-600 outline-none"
            >
              <option value="" disabled>בחר קטגוריה</option>
              <option value="פרשת השבוע">פרשת השבוע</option>
              <option value="הלכה יומית / מעשית">הלכה יומית / מעשית</option>
              <option value="אגדה / מדרש">אגדה / מדרש</option>
              <option value="מוסר ועבודת המידות">מוסר ועבודת המידות</option>
              <option value="גמרא ותלמוד">גמרא ותלמוד</option>
              <option value="אמונה וביטחון">אמונה וביטחון</option>
              <option value="תפילה וברכות">תפילה וברכות</option>
              <option value="חינוך ילדים">חינוך ילדים</option>
              <option value="שלום בית וזוגיות">שלום בית וזוגיות</option>
              <option value="קבלה וחסידות">קבלה וחסידות</option>
              <option value="סיפורי צדיקים">סיפורי צדיקים</option>
              <option value="תשובה והתעוררות">תשובה והתעוררות</option>
              <option value="הכנה לחגים">הכנה לחגים</option>
              <option value="שאלות ותשובות בהלכה">שאלות ותשובות בהלכה</option>
              <option value="פניני התורה / חידושים">פניני התורה / חידושים</option>
              <option value="השקפה יהודית">השקפה יהודית</option>
              <option value="נוער וצעירים">נוער וצעירים</option>
              <option value="תורה לנשים">תורה לנשים</option>
              <option value="תיעודי">תיעודי</option>
            </select>

            <input
              type="number"
              min={0}
              name="duration"
              placeholder="משך השיעור בדקות"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#333] text-white border border-[#555] focus:ring-2 focus:ring-red-600 outline-none"
            />

            <button
              onClick={uploadMovie}
              className="w-full bg-red-600 text-white p-3 rounded font-semibold hover:bg-red-700 transition disabled:bg-gray-500"
              disabled={loading}
            >
              {loading ? "אנחנו עובדים על זה..." : "זכה את הרבים"}
            </button>
          </div>
        </div>


        <div className="pb-40">
          <MovieList title="שיעורים שאני העלתי" data={myLec} admin={true} />
        </div>

        {data?.type === "3" &&
          <div className="pb-40">
            <MovieToApproveList title="שיעורים שמחכים לאישור" data={toApprove} admin={data?.type === "3"} />
          </div>}

        {data?.type === "3" &&
          <div className="pb-40">
            <AdminsToApproveList title="מעלי תוכן שמחכים לאישור" data={AdminsToApprove} onAdminAction={handleAdminAction} />
          </div>}

      </>
    </Meta>
  );
};

export default Admin;
