export type Props = {
  toggleReport: React.Dispatch<React.SetStateAction<boolean>>;
};

export type FormFields = {
  title: string;
  payload: string;
};

export type FileField = {
  id: number;
  file: File;
};
