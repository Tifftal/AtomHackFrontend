import { apiInstance } from "../../shared/api";
import { ReportModel, ReportUpdateApi } from "./types";

const ENDPOINTS = {
  base: "/document",
  withPath: (id: number) => `/document/${id}`,
};

export const getAll = async (options: { page: number; pageSize: number }) => {
  return apiInstance.get<ReportModel[]>(ENDPOINTS.base, {
    params: options,
  });
};

export const getDetailed = async (options: { id: number }) => {
  return apiInstance.get<ReportModel>(ENDPOINTS.withPath(options.id));
};

export const create = async () => {
  return apiInstance.post<{ id: number }>(ENDPOINTS.base);
};

export const update = async (options: ReportUpdateApi) => {
  return apiInstance.put<null>(ENDPOINTS.base, options);
};
