import { FileField } from "../DraftReport/types";

export type Props = {
  setFiles: React.Dispatch<React.SetStateAction<FileField[]>>;
  reportId: number | null;
  onCompleteHandler: () => void;
  isSendActive: boolean;
};
