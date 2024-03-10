import TextEditor from "../TextEditor";
import { Button, Dialog, Group, TextInput, Text } from "@mantine/core";
import { MdFullscreen } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { IoChevronDownOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import File from "../../entities/File";
import "./index.scss";
import { FileList } from "../FileList/FileList";
import { FileField, FormFields, Props } from "./types";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import { create, update } from "../../entities/Report/api";
import { remove } from "../../entities/File/api";
import { useAuth } from "../../utils/hooks/useAuth";
import { ReportFile } from "../../entities/Report/types";

const DraftReport: React.FC<Props> = ({ toggleReport, initialData }) => {
  const [initialFiles, setInitialFiles] = useState<ReportFile[]>(
    initialData?.files || []
  );
  const [files, setFiles] = useState<FileField[]>([]);
  const [isCollapsed, setCollapsed] = useState(false);
  const [isFullscreen, setFullscreen] = useState(false);

  const [draftId, setDraftId] = useState<number | null>(
    initialData?.id || null
  );

  const [fields, setFields] = useState<FormFields>({
    title: initialData?.title || "",
    payload: initialData?.payload || "",
  });

  const { user } = useAuth();

  const isText: boolean =
    fields.payload &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    JSON.parse(fields.payload).content.some((item: any) => item.content);
  const isFieldsDone: boolean =
    !!fields.title.trim() && (isText || !!files.length);

  useEffect(() => {
    if (initialData?.id) return;
    create().then((res) => setDraftId(res.data.id));
  }, [initialData]);

  const handleChange = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    return setFields({
      ...fields,
      [key]: event.target.value,
    });
  };

  const handleCollapseWindow = () => {
    setCollapsed((state) => !state);
    setFullscreen(false);
  };

  const handleFullscreenWindow = () => {
    setCollapsed(false);
    setFullscreen((state) => !state);
  };

  const saveReport = async () => {
    if (!isFieldsDone || !draftId) return;
    await update({
      ...fields,
      id: initialData?.id || draftId,
      owner: user.name,
    });
  };

  const handleClose = () => {
    saveReport();
    toggleReport((state) => !state);
  };

  const DeleteLocalFile = (index: number) => {
    if (!draftId) {
      return;
    }
    const fileId = files[index].id;
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    remove({ reportId: draftId, fileId });
  };
  const DeleteFile = (index: number) => {
    if (!draftId) {
      return;
    }
    const fileId = initialFiles.find((file) => file.id === index)?.id;
    if (!fileId) return;
    const updatedFiles = initialFiles.filter((file) => file.id !== index);
    setInitialFiles(updatedFiles);
    remove({ reportId: draftId, fileId });
  };

  const draftReportClassName = [
    "draft-report",
    isCollapsed && "draft-report__collapsed",
    isFullscreen && !isCollapsed && "draft-report__fullscreen",
  ]
    .filter(Boolean)
    .join(" ");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Начните писать отчёт" }),
    ],
    onUpdate: ({ editor }) =>
      setFields((prevValue) => ({
        ...prevValue,
        payload: JSON.stringify(editor.getJSON()),
      })),
  });

  useEffect(() => {
    if (!initialData?.payload || !editor) return;
    editor.commands.setContent(JSON.parse(initialData.payload));
  }, [initialData, editor]);

  return (
    <Dialog
      className={draftReportClassName}
      opened={true}
      position={
        draftReportClassName === "draft-report draft-report__fullscreen"
          ? { bottom: "2vh", right: "2vw" }
          : draftReportClassName === "draft-report draft-report__collapsed"
          ? { bottom: "0", right: "2vw" }
          : { bottom: "2vh", right: "2vw" }
      }
    >
      <Group justify="space-between">
        <Text size="lg" fw={600}>
          Новый отчет
        </Text>
        <Button.Group>
          <Button
            color="orange"
            size="compact-sm"
            onClick={handleCollapseWindow}
          >
            {draftReportClassName === "draft-report" ? (
              <IoChevronDownOutline size={"18"} />
            ) : draftReportClassName ===
              "draft-report draft-report__fullscreen" ? (
              <IoChevronDownOutline size={"18"} />
            ) : (
              <MdFullscreen size={"12"} />
            )}
          </Button>
          <Button
            color="orange"
            size="compact-sm"
            onClick={handleFullscreenWindow}
          >
            {draftReportClassName === "draft-report" ? (
              <MdFullscreen size={"18"} />
            ) : draftReportClassName ===
              "draft-report draft-report__fullscreen" ? (
              <MdFullscreen size={"12"} />
            ) : (
              <MdFullscreen size={"18"} />
            )}
          </Button>
          <Button color="red" size="compact-sm" onClick={handleClose}>
            <IoMdClose size={"18"} />
          </Button>
        </Button.Group>
      </Group>
      {!isCollapsed && (
        <>
          {/* <TextInput
            label="От кого"
            withAsterisk
            placeholder="Введите ФИО"
            value={user.name}
            disabled
          /> */}
          {/* <div className="owner">
            <Text c="dimmed" size="sm" fw={500}>
              От кого
            </Text>
            <Text size="xl" >{user.name}</Text>
          </div> */}
          <TextInput
            label="Заголовок"
            withAsterisk
            placeholder="Введите заголовок"
            value={fields.title}
            onChange={(e) => handleChange("title", e)}
          />
          <TextEditor editor={editor} />
          {(files.length > 0 || initialFiles.length > 0) && (
            <div className="files">
              {files.length > 0 &&
                files.map((item, index) => (
                  <File
                    key={index}
                    index={index}
                    name={item.file.name}
                    isDraft={true}
                    type={item.file.type}
                    DeleteFile={DeleteLocalFile}
                  />
                ))}
              {initialFiles.length > 0 &&
                initialFiles.map((item, index) => (
                  <File
                    key={index}
                    index={item.id}
                    name={item.path.split("/").slice(-1)[0]}
                    isDraft={true}
                    type={"file"}
                    DeleteFile={DeleteFile}
                  />
                ))}
            </div>
          )}
          <FileList
            setFiles={setFiles}
            reportId={draftId}
            onCompleteHandler={() => toggleReport(false)}
            beforeCompleteHandler={saveReport}
            isSendActive={isFieldsDone}
          />
        </>
      )}
    </Dialog>
  );
};

export default DraftReport;
