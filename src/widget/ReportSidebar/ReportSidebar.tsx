import { ActionIcon, Button, NavLink } from "@mantine/core";
import { IconPencilPlus, IconRefresh } from "@tabler/icons-react";
import DraftReport from "../../feature/DraftReport";
import { useState } from "react";
import { NAV_LINK_LIST, Props } from "./config";

import s from "./ReportSidebar.module.scss";

export const ReportSidebar: React.FC<Props> = ({ setActiveReport }) => {
  const [isDraftOpen, setIsDraftOpen] = useState(false);
  const [active, setActive] = useState(0);

  const handleSetActiveReport = (index: number) => {
    setActive(index)
    setActiveReport(index)
    console.log(index)
  }

  const items = NAV_LINK_LIST.map((item, index) => (
    <NavLink
      className="custom-navlink"
      href={`#${item.label}`}
      key={item.label}
      active={index === active}
      label={item.label}
      rightSection={item.rightSection}
      leftSection={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => handleSetActiveReport(index)}
      color="violet.6"
    />
  ));

  return (
    <>
      {isDraftOpen && <DraftReport toggleReport={setIsDraftOpen} />}
      <div className={s.sidebar}>
        <div className={s["sidebar__new-btn"]}>
          <Button
            leftSection={<IconPencilPlus size={20} />}
            fullWidth
            variant="filled"
            color="violet"
            onClick={() => setIsDraftOpen((state) => !state)}
          >
            Написать
          </Button>
          <ActionIcon
            variant="filled"
            color="violet"
            size="lg"
            aria-label="Settings"
          >
            <IconRefresh className={s["sidebar__refresh-btn"]} stroke={2} />
          </ActionIcon>
        </div>
        <div className="sidebar-menu">{items}</div>
      </div>
    </>
  );
};
