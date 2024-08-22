import React, { useEffect, useState } from "react";
import { useUserInfo } from "../../ContextAPI";
import ReplyPopUp from "./ReplyPopUp";

const Reply = () => {
  const { theme, name } = useUserInfo();

  const [emailList, setEmailList] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isReplyPopUpVisible, setIsReplyPopUpVisible] = useState(false);

  const fetchEmailThread = async (threadId) => {
    try {
      const response = await fetch(
        `https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZGV2ZWxvcGVyLnN1YmlneWFAZ21haWwuY29tIiwiaWQiOjEwOTYsImZpcnN0TmFtZSI6IlNVQklHWUEiLCJsYXN0TmFtZSI6IlNVQkVESSJ9LCJpYXQiOjE3MjQxNzkxMjksImV4cCI6MTc1NTcxNTEyOX0.qr5VbxU121ZnAQP7By3D4slFjs7HEErt_0VgcwfYJVg",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch email thread");
      }

      const data = await response.json();
      console.log("Selected Email Data:", data);
      setSelectedEmail(data);
      console.log("Thread ID:", data.data[0]?.threadId);
    } catch (error) {
      console.error("Error fetching email thread:", error);
    }
  };

  useEffect(() => {
    fetchEmailThread();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "r" || event.key === "R") {
        if (!isReplyPopUpVisible) {
          setIsReplyPopUpVisible(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isReplyPopUpVisible]);

  const handleClosePopUp = () => {
    setIsReplyPopUpVisible(false);
  };

  const placeholder = "{FIRST_NAME}";

  const containerClass = theme === "dark" ? "bg-[#0b0b0b] text-white" : "bg-gray-100 text-black";
  const borderClass = theme === "dark" ? "border-[#242424]" : "border-gray-300";
  const textColor = theme === "dark" ? "text-white" : "text-black";

  return (
    <>
      <div className={`w-full h-[78vh] p-5 flex flex-col items-center ${containerClass}`}>
        <div className={`w-full border-b-2 ${borderClass} mt-5 flex justify-center items-center`}></div>

        <div className={`mt-4 h-[40%] w-[95%] border-2 ${borderClass} rounded-md p-3`}>
          <p className={`text-sm font-semibold ${textColor}`}>New Product Launch</p>

          <div className="flex flex-col gap-2 mt-3">
            <p className={`text-xs ${textColor}`}>
              from: jeanne@icloud.com &nbsp;&nbsp;&nbsp;cc: lennon.j@mail.com
            </p>
            <p className={`text-xs ${textColor}`}>to: lennon.j@mail.com</p>
          </div>

          <div className="mt-8 text-sm max-w-[80%] flex flex-col gap-2">
            <p className={textColor}>Hi {placeholder},</p>
            <p className={textColor}>
              I would like to introduce you to SaaSgrow, a productized design
              service specifically tailored for SaaS startups. Our aim is to
              help you enhance the user experience and boost the visual appeal
              of your software products.
            </p>
          </div>
        </div>

        <div className="mt-5">
          {isReplyPopUpVisible && <ReplyPopUp onClose={handleClosePopUp} />}
        </div>
      </div>
    </>
  );
};

export default Reply;
