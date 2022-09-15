import { Outlet } from "react-router-dom";
import HeaderHomePage from "./components/blocks/header/header";

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <HeaderHomePage />
      </div>
      <div className="main-container"></div>
      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
