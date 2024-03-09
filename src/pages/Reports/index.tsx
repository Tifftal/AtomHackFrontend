import { MultiSelect, Table, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { Report } from "../../entities/Report";
import { ReportDeliveryStatus, ReportModel } from "../../entities/Report/types";
import { SearchParams } from "../../entities/Report/types";
import { ReportSidebar } from "../../widget/ReportSidebar";

import "./index.scss";
import { getAll } from "../../entities/Report/api";

const PAGE_SIZE = 10;

export const Reports = () => {
  // TODO: Add getting data from stomp
  const [activeReport, setActiveReport] = useState<string>("");
  const [reports, setReports] = useState<ReportModel[]>([]);

  // @todo: добавить бесконечный скролл
  const [currentPage] = useState(1);

  useEffect(() => {
    getAll({ page: currentPage, pageSize: PAGE_SIZE, type: "formed" }).then(
      (res) => setReports(res.data)
    );

    const intervalId = setInterval(() => {
      getAll({ page: currentPage, pageSize: PAGE_SIZE, type: "formed" }).then(
        (res) => setReports(res.data)
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, [currentPage]);

  const [searchParams, setSearchParams] = useState<SearchParams>({
    statuses: [],
    search: "",
  });

  const handleStatusChange = (statuses: string[]) => {
    const newStatuses: ReportDeliveryStatus[] = [];
    if (statuses.length === 0) {
      setSearchParams({
        ...searchParams,
        statuses: ["ERROR", "PENDING", "SUCCESS"],
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
                  sentTime={new Date(report.sentTime)}
                  receivedTime={new Date(report.receivedTime)}
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
