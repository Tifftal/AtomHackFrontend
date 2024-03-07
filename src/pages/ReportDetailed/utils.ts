export const getNameAndType = (path: string) => {
    const type = path.split(".").pop();
    const fileName = path.split("/").pop();
    return { type, fileName };
  }
  