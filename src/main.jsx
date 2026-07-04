import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Layout from "./components/Layout";
import { ActiveSectionProvider } from "./components/ActiveSectionContext";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ActiveSectionProvider>
      <Layout>
        <App />
      </Layout>
    </ActiveSectionProvider>
  </React.StrictMode>
);
