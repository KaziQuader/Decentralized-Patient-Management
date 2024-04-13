import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"
import { BrowserRouter } from "react-router-dom";
import EthProvider from "./contexts/EthContext/EthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
      <BrowserRouter>
        <EthProvider>
          <App />
        </EthProvider>
      </BrowserRouter>
    </React.StrictMode>  
);
