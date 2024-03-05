import { Badge, Container, Table } from "@mantine/core";
import { Props } from "../types";
import { Status } from "../Status";
import { formatTime } from "../../utils/helpers";

import "./styles.scss";

export const Report: React.FC<Props> = ({
    owner,
    sendedTime,
    payload = "",
    status,
    file = [],
}) => {
    const formattedSendedTime = formatTime(sendedTime);

    const truncatedPayload = (() => {
        if (payload.length > 50) {
            return payload.substring(0, 50) + '...';
        }

        return payload;
    })();

    return (
        <Table.Tr className="report-wrapper">
            <Table.Td className='report-status'>
                <Status status={status} />
            </Table.Td>
            <Table.Td className='report-payload'>
                <h4>{owner}</h4>&nbsp;<p>{truncatedPayload}</p>
            </Table.Td>
            <Table.Td className="report-timestamp">
                {formattedSendedTime}
            </Table.Td>
        </Table.Tr>
    )
};
