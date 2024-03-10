import { ActionIcon, Button, FileButton, Group } from "@mantine/core";
import { IconPaperclip } from "@tabler/icons-react";
import { Props } from "./types";
import { send } from "../../entities/Report/api";
import { upload } from "../../entities/File/api";
import { useState } from "react";

export const FileList = (props: Props) => {
  const {
    isSendActive,
    onCompleteHandler,
    reportId,
    setFiles,
    beforeCompleteHandler,
  } = props;

  const [isSendButtonLoading, setIsSendButtonLoading] = useState(false);

  const handleSend = async () => {
    if (!reportId) return;
    setIsSendButtonLoading(true);
    await beforeCompleteHandler();
    send({ id: reportId }).finally(() => onCompleteHandler());
  };

  const handleFileUpload = (newFiles: File[]) => {
    if (!reportId) {
      return;
    }

    newFiles.forEach((file) =>
      upload({ reportId, file }).then((res) =>
        setFiles((prevFiles) => [...prevFiles, { id: res.data.id, file }])
      )
    );
  };

  return (
    <div className="footer-report">
      <div className="group-btn">
        <Button
          loading={isSendButtonLoading}
          variant="filled"
          color="orange"
          onClick={handleSend}
          disabled={!isSendActive}
        >
          Отправить
        </Button>
        <Group justify="center">
          <FileButton
            disabled={isSendButtonLoading}
            onChange={handleFileUpload}
            multiple
          >
            {(props) => (
              <ActionIcon
                variant="transparent"
                color="rgba(0, 0, 0, 1)"
                size="lg"
                aria-label="Settings"
                {...props}
              >
                <IconPaperclip
                  style={{ width: "80%", height: "80%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            )}
          </FileButton>
        </Group>
      </div>
    </div>
  );
};
