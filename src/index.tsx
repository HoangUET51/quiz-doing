import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Toastify from "./components/blocks/Toastify/Toastify";
import RoutesApp from "./routes/route";
import "./styles/index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <RoutesApp />
    <Toastify />
  </BrowserRouter>
);
