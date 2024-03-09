export type ReportDeliveryStatus = "SUCCESS" | "PENDING" | "ERROR";

export type ReportStatus = "DELETED" | "DRAFT" | "FORMED";

export type ReportFile = {
  documentID: number;
  id: number;
  path: string;
};

export type ReportModel = {
  createdAt: Date;
  deliveryStatus: ReportDeliveryStatus;
  files: ReportFile[];
  id: number;
  owner: string;
  sentTime: string;
  receivedTime?: string;
  payload: string;
  status: ReportDeliveryStatus;
  file?: File[];
  title: string;
};

export type ReportUpdateApi = {
  owner: string;
  payload: string;
  title: string;
};

export type Props = {
  id: number;
  owner: string;
  sentTime: Date;
  receivedTime?: Date;
  payload?: string;
  status: ReportDeliveryStatus;
  file?: File[];
};

export type SearchParams = {
  statuses: ReportDeliveryStatus[];
  search: string;
};
