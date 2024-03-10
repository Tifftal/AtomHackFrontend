import { Group, Pagination, Table, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { Report } from "../../entities/Report/Report";
import { ReportModel } from "../../entities/Report/types";

import "./styles.modul.scss";
import { getAll, getDetailed } from "../../entities/Report/api";
import { useAuth } from "../../utils/hooks/useAuth";
import DraftReport from "../../feature/DraftReport";
/* import { IInitialDraftData } from "../../feature/DraftReport/types"; */

const PAGE_SIZE = 10;

export const Drafts = () => {
  const [reports, setReports] = useState<ReportModel[]>([]);
  const [selectedDraftInfo, setSelectedDraftInfo] = useState<ReportModel>();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useState("");
  const [isDraftOpen, setIsDraftOpen] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    getAll({ page: currentPage, pageSize: PAGE_SIZE, type: "draft" }).then(
      (res) => {
        setReports(
          res.data.items.filter((report) => report.owner === user.name)
        );
        setTotal(res.data.total);
      }
    );

    const intervalId = setInterval(() => {
      getAll({ page: currentPage, pageSize: PAGE_SIZE, type: "draft" }).then(
        (res) => {
          setReports(
            res.data.items.filter((report) => report.owner === user.name)
          );
          setTotal(res.data.total);
        }
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, [currentPage, user]);

  const handleDraftClick = async (id: number) => {
    getDetailed({ id: id }).then((res) => {
      setSelectedDraftInfo({
        ...res.data,
        id: id,
      });
      setIsDraftOpen(true);
    });
  };

  return (
    <>
      {isDraftOpen && (
        <DraftReport
          key={selectedDraftInfo?.id}
          toggleReport={setIsDraftOpen}
          initialData={selectedDraftInfo}
        />
      )}
      <div className="drafts-table">
        <div className="reports-table-filters">
          <TextInput
            label="Поиск"
            className="reports-table-filters__search"
            onChange={(event) => setSearchParams(event.currentTarget.value)}
          ></TextInput>
        </div>
        <Table highlightOnHover>
          <Table.Tbody>
            {reports
              .filter(
                (report) =>
                  report.owner
                    .toLowerCase()
                    .includes(searchParams.toLowerCase()) ||
                  report.payload
                    ?.toLowerCase()
                    .includes(searchParams.toLowerCase())
              )
              .map((report) => (
                <Report
                  onClick={() => handleDraftClick(report.id)}
                  key={report.id}
                  owner={report.owner}
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
    </>
  );
};
