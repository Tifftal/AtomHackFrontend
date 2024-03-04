import { Badge } from "@mantine/core"
import { ReportStatus } from "../types";

export const Status: React.FC<{ status: ReportStatus }> = ({ status }) => {
    const formattedStatus = status.toLowerCase();

    switch (status) {
        case 'SUCCESS':
            return (
                <Badge
                    defaultChecked
                    color="green"
                    variant="filled"
                >
                    {formattedStatus}
                </Badge>
            );
        case 'PENDING':
            return (
                <Badge
                    color="yellow"
                    variant="filled"
                    >
                    {formattedStatus}
                </Badge>
            );
        case 'ERROR':
            return (
                <Badge
                    color="red"
                    variant="filled"
                    >
                    {formattedStatus}
                </Badge>
            );
        case 'DRAFT':
        default:
            return (
                <Badge
                    color="gray"
                    variant="filled"
                >
                    {formattedStatus}
                </Badge>
            )
    }
}