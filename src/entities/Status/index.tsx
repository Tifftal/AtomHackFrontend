import { Badge } from "@mantine/core"
import { ReportStatus } from "../types";

export const Status: React.FC<{ status: ReportStatus }> = ({ status }) => {

    switch (status) {
        case 'SUCCESS':
            return (
                <Badge
                    defaultChecked
                    color="green"
                    variant="filled"
                >
                    Успешно
                </Badge>
            );
        case 'PENDING':
            return (
                <Badge
                    color="yellow"
                    variant="filled"
                    >
                    В ожидании
                </Badge>
            );
        case 'ERROR':
            return (
                <Badge
                    color="red"
                    variant="filled"
                    >
                    Ошибка
                </Badge>
            );
        case 'DRAFT':
        default:
            return (
                <Badge
                    color="gray"
                    variant="filled"
                >
                    Черновик
                </Badge>
            )
    }
}