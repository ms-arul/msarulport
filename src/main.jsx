import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Layout from "./components/Layout";
import { ActiveSectionProvider } from "./components/ActiveSectionContext";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ActiveSectionProvider>
        <Layout>
          <App />
        </Layout>
      </ActiveSectionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
