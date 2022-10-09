import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Toastify from "./components/blocks/Toastify/Toastify";
import RoutesApp from "./routes/route";
import "./styles/index.scss";
import "font-awesome/css/font-awesome.min.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
let persistor = persistStore(store);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <RoutesApp />
        <Toastify />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
