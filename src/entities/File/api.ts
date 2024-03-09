import { apiInstance } from "../../shared/api";
import { BASE_URL } from "../../shared/config";

export const upload = async (options: { reportId: number; file: File }) => {
  const formData = new FormData();
  formData.append("file", options.file, "test.name");
  return apiInstance.post<{ id: number }>(
    `${BASE_URL}/api/v1/document/${options.reportId}/file`,
    {
      formData,
    }
  );
};

export const remove = async (options: { reportId: number; file: File }) => {
  return apiInstance.delete<null>(
    `${BASE_URL}/api/v1/document/${options.reportId}/file`
  );
};
