import { Table } from "@mantine/core";
import { Props } from "./types";
import { Status } from "../Status/Status";
import { formatTime } from "../../utils/helpers";

import "./Report.modul.scss";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { RoutesEnum } from "../../AppRoutes";

export const Report: React.FC<Props> = ({
  id,
  owner,
  sentTime,
  payload = "",
  status,
  title,
}) => {
  const formattedSendedTime = formatTime(sentTime);

  const truncatedPayload = (() => {
    if (payload.length > 50) {
      return payload.substring(0, 50) + "...";
    }

    return payload;
  })();

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(RoutesEnum.Report + id);
  }, [navigate, id]);

  return (
    <Table.Tr className="report-wrapper" onClick={handleClick}>
       <Table.Td className="report-owner"><h4>{owner}</h4></Table.Td>
      <Table.Td className="report-payload">
        <h5>{title}</h5>
        <p>{truncatedPayload}</p>
      </Table.Td>
      <Table.Td className="report-timestamp">{formattedSendedTime}</Table.Td>
      <Table.Td className="report-status">
        <Status status={status} />
      </Table.Td>
    </Table.Tr>
  );
};
