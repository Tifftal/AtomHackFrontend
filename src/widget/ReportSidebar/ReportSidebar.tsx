import { Button, NavLink } from "@mantine/core";
import {
  IconChevronRight,
  IconPencilPlus,
} from "@tabler/icons-react";
import DraftReport from "../../feature/DraftReport";
import { useState } from "react";
import { Text } from "@mantine/core";

import s from "./ReportSidebar.module.scss";
import { smallRoutes as AppRoutes } from "../../AppRoutes";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/hooks/useAuth";

export const ReportSidebar = () => {
  const [isDraftOpen, setIsDraftOpen] = useState(false);
  const { pathname } = useLocation();
  const { user } = useAuth();

  const items = AppRoutes.map((item) => (
    <NavLink
      component={Link}
      to={item.path}
      className="custom-navlink"
      key={item.label}
      label={item.label}
      active={item.path === pathname}
      rightSection={<IconChevronRight size="18" stroke={1.5} />}
      leftSection={item.icon}
      color="orange.9"
    />
  ));

  return (
    <>
      {isDraftOpen && <DraftReport toggleReport={setIsDraftOpen} />}
      <div className={s.sidebar}>
        <Text size="md" fw={700}>
          {user.name.toUpperCase()}
        </Text>
        <div className={s["sidebar__new-btn"]}>
          <Button
            leftSection={<IconPencilPlus size={20} />}
            fullWidth
            variant="filled"
            color="orange.8"
            onClick={() => setIsDraftOpen((state) => !state)}
          >
            Написать
          </Button>
         {/*  <ActionIcon
            variant="filled"
            color="orange"
            size="lg"
            aria-label="Settings"
          >
            <IconRefresh className={s["sidebar__refresh-btn"]} stroke={2} />
          </ActionIcon> */}
        </div>
        <div className="sidebar-menu">{items}</div>
      </div>
    </>
  );
};
