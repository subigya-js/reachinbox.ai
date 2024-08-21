import React from "react";
import Sidebar from "./Sidebar";
import OneboxHeader from "./OneboxHeader";
import OneboxLanding from "./OneboxLanding";
import Inbox from "./Inbox";

const Onebox = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div>
        <OneboxHeader />
       
        <Inbox />
      </div>
    </div>
  );
};

export default Onebox;
