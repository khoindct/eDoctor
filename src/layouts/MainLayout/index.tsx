import { Outlet } from "react-router";
import Header from "../../components/navigation/Header";
import "./index.scss";

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
