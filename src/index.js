import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <React.StrictMode>
  <Toaster
    position="top-right"
    toastOptions={{
      style: {
        background: "#18181b",
        color: "#fff",
        border: "1px solid #27272a"
      }
    }}
  />

  <App />
</React.StrictMode>
  </AuthProvider>
);