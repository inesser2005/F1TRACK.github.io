import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import './F1theme.css'; // O seu tema customizado deve vir depois para poder sobrescrever o bootstrap
import "./comp/Menu.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <StrictMode>
      <>
        <App />
      </>
    </StrictMode>
  </>
);
