import { ReportModel } from "../../entities/Report/types";

export type Props = {
  toggleReport: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: ReportModel;
};

export type FormFields = {
  title: string;
  payload: string;
};

export type FileField = {
  id: number;
  file: File;
};
