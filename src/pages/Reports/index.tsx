import { MultiSelect, Table, TextInput } from "@mantine/core";
import { reportsMock } from "../../constants/mocks";
import { useState } from "react";
import { Report } from "../../entities/Report";
import "./index.scss";

export const Reports = () => {
    // TODO: Add getting data from sockets
    const [reports, setReports] = useState(reportsMock);

    return (
        <div className="reports">
            <div className="reports-filters">
                <MultiSelect
                    className="reports-filters__status"
                    data={['Успешно', 'В ожидании', 'Ошибка']}
                    label="Выберите статусы"
                    comboboxProps={{ transitionProps: { transition: 'scale-y', duration: 200 } }}
                />
                <TextInput
                    label="Поиск"
                    className="reports-filters__search"
                >

                </TextInput>
            </div>
            <Table
                highlightOnHover
                stickyHeader
            >
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>
                            Статус
                        </Table.Th>
                        <Table.Th>
                            Отправитель
                        </Table.Th>
                        <Table.Th>
                            Время отправки
                        </Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {reports.map(report => (
                        <Report
                            key={report.id}
                            owner={report.owner}
                            sendedTime={report.sendedTime}
                            recievedTime={report.recievedTime}
                            payload={report.payload}
                            status={report.status}
                            file={report.file}
                        />
                    ))}
                </Table.Tbody>
            </Table>
        </div>
    )
};
