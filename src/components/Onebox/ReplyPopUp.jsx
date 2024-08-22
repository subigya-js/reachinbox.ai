import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const ReplyPopUp = ({ onClose, threadId }) => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

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
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZGV2ZWxvcGVyLnN1YmlneWFAZ21haWwuY29tIiwiaWQiOjEwOTYsImZpcnN0TmFtZSI6IlNVQklHWUEiLCJsYXN0TmFtZSI6IlNVQkVESSJ9LCJpYXQiOjE3MjQxNzkxMjksImV4cCI6MTc1NTcxNTEyOX0.qr5VbxU121ZnAQP7By3D4slFjs7HEErt_0VgcwfYJVg",
          },
          body: JSON.stringify({ to, from, subject, body }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to send reply: ${response.status} ${response.statusText} ${errorText}`);
      }

      alert("Reply sent");
    } catch (error) {
      console.error("Error sending reply:", error);
      alert(`Failed to send reply: ${error.message}`);
    }

    onClose();
  };

  return (
    <div className="h-[35vh] w-[40vw] border-2 border-[#242424] rounded-md bg-[#0b0b0b]">
      <div className="flex justify-between bg-[#272727] py-2 px-3">
        <p>Reply</p>
        <button onClick={onClose}>
          <IoMdClose />
        </button>
      </div>

      <form className="text-xs p-2 flex flex-col gap-2" onSubmit={handleSubmit}>
        <p className="border border-[#323232] py-1 px-2 rounded-md">
          To:{" "}
          <span>
            <input
              type="email"
              required
              placeholder="example@gmail.com"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="bg-[#0b0b0b] outline-none px-2 py-[1px]"
            />
          </span>
        </p>
        <p className="border border-[#323232] py-1 px-2 rounded-md">
          From:{" "}
          <span>
            <input
              type="email"
              required
              placeholder="example@gmail.com"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="bg-[#0b0b0b] outline-none px-2 py-[1px]"
            />
          </span>
        </p>
        <p className="border border-[#323232] py-1 px-2 rounded-md">
          Subject:{" "}
          <span>
            <input
              type="text"
              required
              placeholder="Email Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-[#0b0b0b] outline-none px-2 py-[1px]"
            />
          </span>
        </p>

        <textarea
          className="bg-[#0b0b0b] min-h-[6vh] max-h-[6vh] py-1 px-3 border border-[#323232]"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <button
          type="submit"
          className="mt-2 ml-2 bg-blue-600 px-6 py-1 rounded-md text-[14px] w-[80px]"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ReplyPopUp;
