import { Outlet } from "react-router";
import "./index.scss";

const MainLayout: React.FC = () => {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
};

export default MainLayout;
