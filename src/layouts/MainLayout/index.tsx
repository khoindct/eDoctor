import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Header from "../../components/navigation/Header";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./index.scss";

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const { authenticated, authorization } = useTypedSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (authenticated) {
      authorization === "doctor" && navigate("/app/dashboard");
      authorization === "admin" && navigate("/admin/clinics");
    }
    // eslint-disable-next-line
  }, []);

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
