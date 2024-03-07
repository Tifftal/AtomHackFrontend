import { useParams } from "react-router-dom";
import TextEditor from "../../feature/TextEditor";
import { ReportSidebar } from "../../widget/ReportSidebar";
import s from "./ReportDetailed.module.scss";
import { REPORTS_MOCK } from "../../constants/mocks";
import { useCallback } from "react";
import { Button, Text } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

export const ReportDetailed = () => {
  const { id } = useParams();

  const report = REPORTS_MOCK.find((report) => report.id === Number(id));

  const handleSave = useCallback(() => {
    const markdownContent = `# Author: ${report?.owner}\n\n${report?.payload}`;
    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report?.owner}.md`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, [report?.owner, report?.payload]);

  if (!id || !report) {
    // @todo: замена на NotFoundPage
    return null;
  }

  return (
    <div className={s.root}>
      <ReportSidebar />
      <TextEditor
        isEditMode={false}
        content={JSON.parse(report.payload)}
        customToolbar={
          <div className={s.root__toolbar}>
            <Text
              tt="uppercase"
              fw={700}
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
            >
              {report.owner}
            </Text>

            <Button
              leftSection={<IconDownload size={20} />}
              variant="outline"
              color="blue"
              onClick={handleSave}
            >
              Сохранить
            </Button>

            <div style={{ textAlign: "end" }}>
              <Text size="sm" fw={500}>
                Отправлено: {report.sendedTime.toLocaleString()}
              </Text>

              {report.recievedTime ? (
                <Text size="sm">
                  Доставлено: {report.recievedTime.toLocaleString()}
                </Text>
              ) : (
                <Text c="dimmed" size="sm">
                  Не доставлено
                </Text>
              )}
            </div>
          </div>
        }
      />
    </div>
  );
};
