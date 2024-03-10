import { Group, Pagination, Table, TextInput } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { Report } from "../../entities/Report/Report";
import { ReportModel } from "../../entities/Report/types";

import "./styles.modul.scss";
import { getAll, getDetailed, remove } from "../../entities/Report/api";
import { useAuth } from "../../utils/hooks/useAuth";
import DraftReport from "../../feature/DraftReport";
import { useSearchParams } from "react-router-dom";
/* import { IInitialDraftData } from "../../feature/DraftReport/types"; */

const PAGE_SIZE = 10;

export const Drafts = () => {
  const [reports, setReports] = useState<ReportModel[]>([]);
  const [selectedDraftInfo, setSelectedDraftInfo] = useState<ReportModel>();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [isDraftOpen, setIsDraftOpen] = useState(false);

  const { user } = useAuth();

  const handleFetch = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {
      page: currentPage,
      pageSize: PAGE_SIZE,
      type: "draft",
    };

    const ownerOrTitle = searchParams.get("ownerOrTitle");
    if (ownerOrTitle) {
      options.ownerOrTitle = ownerOrTitle;
    }

    getAll(options).then((res) => {
      // @todo: вынести в бэк
      // setReports(res.data.items.filter((report) => report.owner === user.name));
      setReports(res.data.items);
      setTotal(res.data.total);
    });
  }, [currentPage, searchParams, user.name]);

  useEffect(() => {
    handleFetch();

    const intervalId = setInterval(() => {
      handleFetch();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [handleFetch]);

  const handleDraftClick = async (id: number) => {
    getDetailed({ id: id }).then((res) => {
      setSelectedDraftInfo({
        ...res.data,
        id: id,
      });
      setIsDraftOpen(true);
    });
  };

  const handleDraftRemove = (id: number) => {
    remove({ id }).then(() => handleFetch());
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
            placeholder="Искать"
            label="Поиск"
            className="reports-table-filters__search"
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                search
                  ? searchParams.set("ownerOrTitle", search)
                  : searchParams.delete("ownerOrTitle");
                setSearchParams(searchParams);
              }
            }}
          ></TextInput>
        </div>
        <Table highlightOnHover>
          <Table.Tbody>
            {reports.map((report) => (
              <Report
                onClick={() => handleDraftClick(report.id)}
                onRemove={() => handleDraftRemove(report.id)}
                key={report.id}
                owner={report.owner}
                file={report.file}
                id={report.id}
                title={report.title}
                isDraft
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
