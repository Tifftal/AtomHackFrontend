import { Editor } from "@tiptap/react";

export type Props = {
  /** Текущий контент редактора */
  editor: Editor | null;
  customToolbar?: React.ReactNode;
};
