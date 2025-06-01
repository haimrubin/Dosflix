import React from "react";
import { isEmpty } from "lodash";
import { FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";
import { AdminRequest } from "@prisma/client";
import axios from "axios";

type Props = {
  data: Record<string, any>[];
  title: string;
  onAdminAction?: (id: string) => void;
};

export const AdminsToApproveList = ({ data, onAdminAction, title }: Props) => {
  if (isEmpty(data)) {
    return null;
  }
  const handleApprove = async (id: string) => {
    try {
      await axios.post(`/api/admins/admin-request-decision/${id}`);
      console.log("Admin request approved");
      if (onAdminAction) onAdminAction(id);
    } catch (error) {
      console.error("Error approving admin", error);
    }
  };
  
  const handleReject = async (id: string) => {
    try {
      await axios.delete(`/api/admins/admin-request-decision/${id}`);
      console.log("Admin request rejected");
      if (onAdminAction) onAdminAction(id);
    } catch (error) {
      console.error("Error rejecting admin", error);
    }
  };
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>

        <div className="grid grid-cols-1 gap-2">
          {data.map((admin, index) => (
            <div key={index} className="bg-[#141414] p-4 rounded-lg shadow-lg flex justify-between">
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{admin.name}</h3>
                <p className="text-gray-400 text-sm">📍 {admin.city}, {admin.country}</p>
                <p className="text-gray-400 text-sm">📞 {admin.phoneNumber}</p>
                <p className="text-gray-300 text-lg italic mt-2">{admin.message}</p>
              </div>
              <div className="flex flex-col justify-center items-center mr-4">
                <button 
                  className="bg-green-600 hover:bg-green-500 text-white p-2 rounded-lg mb-2"
                  onClick={() => handleApprove(admin.id)}
                >
                  <FaCheckDouble className="w-5 h-5" />
                </button>
                <button 
                  className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-lg"
                  onClick={() => handleReject(admin.id)}
                >
                  <FaRegTrashAlt className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};



export default AdminsToApproveList;
