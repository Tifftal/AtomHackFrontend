import TextEditor from "../TextEditor";
import { Button, Dialog, Group, TextInput, Text } from "@mantine/core";
import { MdFullscreen } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { IoChevronDownOutline } from "react-icons/io5";
import { useState } from "react";
import File from "../../entities/File";
import "./index.scss";
import { FileList } from "../FileList/FileList";
import { Props } from "./types";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";

const DraftReport: React.FC<Props> = ({ toggleReport }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isCollapsed, setCollapsed] = useState(false);
  const [isFullscreen, setFullscreen] = useState(false);

  const handleCollapseWindow = () => {
    setCollapsed((state) => !state);
  };

  const handleFullscreenWindow = () => {
    setCollapsed(false);
    setFullscreen((state) => !state);
  };

  const DeleteFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
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
  });

  return (
    <Dialog className={draftReportClassName} opened={true}>
      <Group justify="space-between">
        <Text>Отчет</Text>
        <Button.Group>
          <Button
            color="violet"
            size="compact-sm"
            onClick={handleCollapseWindow}
          >
            <IoChevronDownOutline size={"18"} />
          </Button>
          <Button
            color="violet"
            size="compact-sm"
            onClick={handleFullscreenWindow}
          >
            <MdFullscreen size={"18"} />
          </Button>
          <Button
            color="red"
            size="compact-sm"
            onClick={() => toggleReport((state) => !state)}
          >
            <IoMdClose size={"18"} />
          </Button>
        </Button.Group>
      </Group>
      {!isCollapsed && (
        <>
          <TextInput label="От кого" withAsterisk placeholder="Введите ФИО" />
          <TextInput
            label="Заголовок"
            withAsterisk
            placeholder="Введите заголовок"
          />
          <TextEditor editor={editor} />
          {files.length > 0 && (
            <div className="files">
              {files.map((file, index) => (
                <File
                  key={index}
                  index={index}
                  name={file.name}
                  isDraft={true}
                  type={file.type}
                  DeleteFile={DeleteFile}
                />
              ))}
            </div>
          )}
          <FileList setFiles={setFiles} />
        </>
      )}
    </Dialog>
  );
};

export default DraftReport;
