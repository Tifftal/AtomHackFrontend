import {
  Group,
  MultiSelect,
  Pagination,
  Table,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Report } from "../../entities/Report/Report";
import { ReportDeliveryStatus, ReportModel } from "../../entities/Report/types";
import { SearchParams } from "../../entities/Report/types";

import "./Reports.modul.scss";
import { getAll } from "../../entities/Report/api";
import { IReportsProps } from "./types";
import { useAuth } from "../../utils/hooks/useAuth";

const PAGE_SIZE = 10;

export const Reports = (props: IReportsProps) => {
  const { isUserReports } = props;
  const [reports, setReports] = useState<ReportModel[]>([]);
  // TODO: use auth
  const { user } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getAll({ page: currentPage, pageSize: PAGE_SIZE, type: "formed" }).then(
      (res) => {
        setReports(
          isUserReports
            ? res.data.items.filter((report) => report.owner === user.name)
            : res.data.items
        );
        setTotal(res.data.total);
      }
    );

    const intervalId = setInterval(() => {
      getAll({ page: currentPage, pageSize: PAGE_SIZE, type: "formed" }).then(
        (res) => {
          setReports(
            isUserReports
              ? res.data.items.filter((report) => report.owner === user.name)
              : res.data.items
          );
          setTotal(res.data.total);
        }
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, [currentPage, isUserReports, user]);

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
        <Table.Tbody>
          {reports
            .filter(
              (report) =>
                searchParams.statuses.length === 0 ||
                searchParams.statuses.includes(report.deliveryStatus)
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
                receivedTime={new Date(report.receivedTime || "")}
                status={report.deliveryStatus}
                file={report.file}
                id={report.id}
                title={report.title}
              />
            ))}
        </Table.Tbody>
      </Table>

      {reports.length > 0 && (
        <Pagination.Root
          value={currentPage}
          onChange={setCurrentPage}
          total={total / PAGE_SIZE}
          style={{ marginTop: "16px" }}
        >
          <Group gap={5} justify="center">
            <Pagination.First />
            <Pagination.Previous />
            <Pagination.Items />
            <Pagination.Next />
            <Pagination.Last />
          </Group>
        </Pagination.Root>
      )}
    </div>
  );
};
