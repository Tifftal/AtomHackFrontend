import { Button, MultiSelect, NavLink, Table, TextInput } from "@mantine/core";
import { reportsMock } from "../../constants/mocks";
import { useState } from "react";
import { Report } from "../../entities/Report";
import { ActionIcon } from '@mantine/core';
import { IconPencilPlus, IconRefresh } from '@tabler/icons-react';
import "./index.scss";
import DraftReport from "../../widget/DraftReport";
import { navlinks } from "./navlinks";

export const Reports = () => {
    // TODO: Add getting data from stomp
    const [reports, setReports] = useState(reportsMock);
    const [active, setActive] = useState(0);
    const [isDraftOpen, setIsDraftOpen] = useState(false);

    const items = navlinks.map((item, index) => (
        <NavLink
            className="custom-navlink"
            href={`#${item.label}`}
            key={item.label}
            active={index === active}
            label={item.label}
            rightSection={item.rightSection}
            leftSection={<item.icon size="1rem" stroke={1.5} />}
            onClick={() => setActive(index)}
            color="violet.6"
        />
    ));

    return (
        <div className="reports">
            {isDraftOpen && (
                <DraftReport
                    toggleReport={setIsDraftOpen}
                />
            )}
            <div className="sidebar">
                <div className="sidebar-new-btn">
                    <Button
                        leftSection={<IconPencilPlus size={20} />}
                        fullWidth
                        variant="filled"
                        color="violet"
                        onClick={()=>(setIsDraftOpen((state) => !state))}
                    >
                        Написать
                    </Button>
                    <ActionIcon variant="filled" color="violet" size="lg" aria-label="Settings">
                        <IconRefresh style={{ width: '70%', height: '70%' }} stroke={2} />
                    </ActionIcon>
                </div>
                <div className="sidebar-menu">
                    {items}
                </div>
            </div>
            <div className="reports-table">
                <div className="reports-table-filters">
                    <MultiSelect
                        className="reports-table-filters__status"
                        data={['Успешно', 'В ожидании', 'Ошибка']}
                        label="Выберите статусы"
                        comboboxProps={{ transitionProps: { transition: 'scale-y', duration: 200 } }}
                    />
                    <TextInput
                        label="Поиск"
                        className="reports-table-filters__search"
                    >

                    </TextInput>
                </div>
                <Table
                    highlightOnHover
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
        </div>
    )
};
