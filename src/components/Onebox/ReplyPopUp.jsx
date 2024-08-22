import React, { useState, useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { useUserInfo } from "../../ContextAPI";

const ReplyPopUp = ({ onClose, threadId }) => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const { theme, name } = useUserInfo();

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Submitting reply with:", { to, from, subject, body });

    try {
      const response = await fetch(
        `https://hiring.reachinbox.xyz/api/v1/onebox/reply/${threadId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZGV2ZWxvcGVyLnN1YmlneWFAZ21haWwuY29tIiwiaWQiOjEwOTYsImZpcnN0TmFtZSI6IlNVQklHWUEiLCJsYXN0TmFtZSI6IlNVQkVESSJ9LCJpYXQiOjE3MjQxNzkxMjksImV4cCI6MTc1NTcxNTEyOX0.qr5VbxU121ZnAQP7By3D4slFjs7HEErt_0VgcwfYJVg",
          },
          body: JSON.stringify({ to, from, subject, body }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to send reply: ${response.status} ${response.statusText} ${errorText}`
        );
      }

      alert("Reply sent");
    } catch (error) {
      console.error("Error sending reply:", error);
      alert(`Failed to send reply: ${error.message}`);
    }

    onClose();
  };

  const containerClass =
    theme === "dark"
      ? "bg-[#0b0b0b] border-[#242424]"
      : "bg-white border-gray-300";
  const headerClass = theme === "dark" ? "bg-[#272727]" : "bg-gray-200";
  const borderColor = theme === "dark" ? "border-[#323232]" : "border-gray-300";
  const inputClass =
    theme === "dark" ? "bg-[#0b0b0b] text-white" : "bg-white text-black";
  const buttonClass = theme === "dark" ? "bg-blue-600" : "bg-blue-500";

  return (
    <div className={`h-[35vh] w-[40vw] border-2 rounded-md ${containerClass}`}>
      <div className={`flex justify-between py-2 px-3 ${headerClass}`}>
        <p
          className={`text-sm ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Reply
        </p>
        <button
          onClick={onClose}
          className={`p-2 rounded-md`}
        >
          <IoMdClose
            className={`text-xl ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          />
        </button>
      </div>

      <form className="text-xs p-2 flex flex-col gap-2" onSubmit={handleSubmit}>
        <p className={`border ${borderColor} py-1 px-2 rounded-md`}>
          To:{" "}
          <span>
            <input
              type="email"
              required
              placeholder="example@gmail.com"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className={`outline-none px-2 py-[1px] ${inputClass}`}
            />
          </span>
        </p>
        <p className={`border ${borderColor} py-1 px-2 rounded-md`}>
          From:{" "}
          <span>
            <input
              type="email"
              required
              placeholder="example@gmail.com"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className={`outline-none px-2 py-[1px] ${inputClass}`}
            />
          </span>
        </p>
        <p className={`border ${borderColor} py-1 px-2 rounded-md`}>
          Subject:{" "}
          <span>
            <input
              type="text"
              required
              placeholder="Email Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={`outline-none px-2 py-[1px] ${inputClass}`}
            />
          </span>
        </p>

        <textarea
          className={`min-h-[6vh] max-h-[6vh] py-1 px-3 rounded-md ${
            theme === "dark"
              ? "bg-[#0b0b0b] border-[#4a4a4a] text-white"
              : "bg-white border-[#d1d5db] text-black"
          } border`}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <button
          type="submit"
          className={`mt-2 ml-2 ${buttonClass} ${borderColor} px-6 py-1 rounded-md text-[14px] w-[80px]`}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ReplyPopUp;
