import { MultiSelect, Table, TextInput } from "@mantine/core";
import { REPORTS_MOCK } from "../../constants/mocks";
import { useState } from "react";
import { Report } from "../../entities/Report";
import "./index.scss";
import { ReportStatus } from "../../entities/types";
import { Props } from "../../entities/types";
import { SearchParams } from "../../entities/types";
import { ReportSidebar } from "../../widget/ReportSidebar";
import { Link } from "react-router-dom";

export const Reports = () => {
  // TODO: Add getting data from stomp
  const [reports, setReports] = useState(REPORTS_MOCK as Props[]);
  const [activeReport, setActiveReport] = useState<string>("")
  const [searchParams, setSearchParams] = useState<SearchParams>({
    statuses: [],
    search: "",
  });

  // TODO когда будем получать отчеты с бека, надо добавить фильтр по activeReport
  // activeReport = "" -- все отчеты
  // activeReport = "*Тут имя пользователя*" -- мои отчеты

  const handleStatusChange = (statuses: string[]) => {
    const newStatuses: ReportStatus[] = [];
    if (statuses.length === 0) {
      setSearchParams({
        ...searchParams,
        statuses: ["DRAFT", "ERROR", "PENDING", "SUCCESS"],
      });
    } else {
      if (statuses.includes("Успешно")) {
        newStatuses.push("SUCCESS");
      }
      if (statuses.includes("В ожидании")) {
        newStatuses.push("PENDING");
      }
      if (statuses.includes("Ошибка")) {
        newStatuses.push("ERROR");
      }
    }
    setSearchParams({ ...searchParams, statuses: newStatuses });
  };


  return (
    <div className="reports">
      <ReportSidebar setActiveReport={setActiveReport} />
      <div className="reports-table">
        <div className="reports-table-filters">
          <MultiSelect
            className="reports-table-filters__status"
            data={["Успешно", "В ожидании", "Ошибка"]}
            label="Выберите статусы"
            comboboxProps={{
              transitionProps: { transition: "scale-y", duration: 200 },
            }}
            onChange={(value) => handleStatusChange(value)}
          />
          <TextInput
            label="Поиск"
            className="reports-table-filters__search"
            onChange={(event) =>
              setSearchParams({
                ...searchParams,
                search: event.currentTarget.value,
              })
            }
          ></TextInput>
        </div>
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Статус</Table.Th>
              <Table.Th>Отправитель</Table.Th>
              <Table.Th>Время отправки</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {reports
              .filter(
                (report) =>
                  searchParams.statuses.length === 0 ||
                  searchParams.statuses.includes(report.status)
              )
              .filter(
                (report) =>
                  report.owner
                    .toLowerCase()
                    .includes(searchParams.search.toLowerCase()) ||
                  report.payload
                    ?.toLowerCase()
                    .includes(searchParams.search.toLowerCase())
              )
              .map((report) => (
                <Report
                  key={report.id}
                  owner={report.owner}
                  sendedTime={report.sendedTime}
                  recievedTime={report.recievedTime}
                  payload={report.payload}
                  status={report.status}
                  file={report.file}
                  id={report.id}
                />
              ))}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};
