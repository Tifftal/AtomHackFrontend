import { ReportSidebar } from "../ReportSidebar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import styles from "./styles.module.scss";
import { RoutesEnum } from "../../AppRoutes";
import { useAuth } from "../../utils/hooks/useAuth";

export const MainLayout = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const isReportRoute =
    pathname.includes(RoutesEnum.Report) && pathname.split("/").length === 3;

  if (!user.isAuth) return <Navigate to={RoutesEnum.Login} />;
  return (
    <div className={styles["main-layout-root"]}>
      {!isReportRoute && <ReportSidebar />}
      <Outlet />
    </div>
  );
};
