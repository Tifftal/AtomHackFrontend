import { Badge, Container } from "@mantine/core";
import { Props } from "../types";
import { Status } from "../Status";
import { formatTime } from "../../utils/helpers";

import "./styles.scss";

export const Report: React.FC<Props> = ({
    owner,
    sendedTime,
    recievedTime,
    payload = "",
    status,
    file = [],
}) => {
    const formattedSendedTime = formatTime(sendedTime);
    const formattedRecievedTime = formatTime(recievedTime);

    const truncatedPayload = (() => {
        if (payload.length > 50) {
            return payload.substring(0, 50) + '...';
        }

        return payload;
    })();

    return (
        <Container className="report-wrapper">
            <p>{owner} : {truncatedPayload}</p>
            <p>Время отправки: {formattedSendedTime}</p>
            <p>Время получения: {formattedRecievedTime}</p>
            {file.length > 0 ? (
                <Badge>{file.length} вложений</Badge>
            ) : null }
            <Status status={status} />
        </Container>
    )
};
