import { ReportSidebar } from "../ReportSidebar";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./styles.module.scss";
import { RoutesEnum } from "../../AppRoutes";

export const MainLayout = () => {
  const { pathname } = useLocation();
  const isReportRoute =
    pathname.includes(RoutesEnum.Report) && pathname.split("/").length === 3;

  return (
    <div className={styles["main-layout-root"]}>
      {!isReportRoute && <ReportSidebar />}
      <Outlet />
    </div>
  );
};
