import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserInfoProvider } from "./ContextAPI";

ReactDOM.render(
  <GoogleOAuthProvider clientId="288609565068-7uuvg2pvvsfilgrq0n8h8mv51vmtl1tl.apps.googleusercontent.com">
    <UserInfoProvider>
      <App />
    </UserInfoProvider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
