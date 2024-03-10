import { Group, Pagination, Select, Table, TextInput } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { Report } from "../../entities/Report/Report";
import { ReportModel } from "../../entities/Report/types";

import "./Reports.modul.scss";
import { getAll } from "../../entities/Report/api";
import { IReportsProps } from "./types";
import { useAuth } from "../../utils/hooks/useAuth";
import { useSearchParams } from "react-router-dom";

const PAGE_SIZE = 2;

export const Reports = (props: IReportsProps) => {
  const { isUserReports } = props;
  const [reports, setReports] = useState<ReportModel[]>([]);
  // TODO: use auth
  const { user } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [total, setTotal] = useState(0);

  const handleFetch = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {
      page: currentPage,
      pageSize: PAGE_SIZE,
      type: "formed",
    };

    const deliveryStatus = searchParams.get("deliveryStatus");
    if (deliveryStatus) {
      options.deliveryStatus = deliveryStatus;
    }

    getAll(options).then((res) => {
      setReports(
        isUserReports
          ? res.data.items.filter((report) => report.owner === user.name)
          : res.data.items
      );
      setTotal(res.data.total);
    });
  }, [currentPage, searchParams, isUserReports, user.name]);

  useEffect(() => {
    handleFetch();

    const intervalId = setInterval(() => {
      handleFetch();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [handleFetch]);

  useEffect(() => {
    searchParams.set("page", currentPage.toString());
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleStatusChange = (status: string | null) => {
    if (!status) {
      searchParams.delete("deliveryStatus");
    }
    if (status === "Успешно") {
      searchParams.set("deliveryStatus", "SUCCESS");
    }
    if (status === "В ожидании") {
      searchParams.set("deliveryStatus", "PENDING");
    }

    setSearchParams(searchParams);
    setCurrentPage(1);
  };

  return (
    <div className="reports-table">
      <div className="reports-table-filters">
        <Select
          placeholder="Указать фильтры"
          className="reports-table-filters__status"
          data={["Успешно", "В ожидании"]}
          label="Выберите статусы"
          comboboxProps={{
            transitionProps: { transition: "scale-y", duration: 200 },
          }}
          onChange={(value) => handleStatusChange(value)}
        />
        <TextInput
          placeholder="Искать"
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
            .filter((report) => {
              const statuses = JSON.parse(searchParams.get("statuses") || "[]");

              return (
                !statuses.length || statuses.includes(report.deliveryStatus)
              );
            })
            .filter((report) => {
              const search = searchParams.get("search") || "";

              return (
                report.owner.toLowerCase().includes(search.toLowerCase()) ||
                report.payload?.toLowerCase().includes(search.toLowerCase())
              );
            })
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
