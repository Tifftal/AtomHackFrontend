import { Content } from "@tiptap/core";

export type Props = {
  /** Текущий контент редактора */
  content?: Content;
  isEditMode?: boolean;
  customToolbar?: React.ReactNode;
};
