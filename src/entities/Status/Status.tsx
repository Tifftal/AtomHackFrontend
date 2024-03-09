import { ThemeIcon } from "@mantine/core";
import { ReportDeliveryStatus } from "../Report/types";
import { IconCheck, IconClock, IconX } from "@tabler/icons-react";

export const Status: React.FC<{ status: ReportDeliveryStatus }> = ({
  status,
}) => {
  // TODO: Change status style
  switch (status) {
    case "SUCCESS":
      return (
        <ThemeIcon variant="filled" color="green" radius="xl" >
          <IconCheck style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ThemeIcon>
      );
    case "ERROR":
      return (
        <ThemeIcon variant="filled" color="red" radius="xl" >
          <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ThemeIcon>
      );
    case "PENDING":
    default:
      return (
        <ThemeIcon variant="filled" color="yellow" radius="xl" >
          <IconClock style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ThemeIcon>
      );
  }
};
