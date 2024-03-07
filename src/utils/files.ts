export const saveMarkdownFile = (fileName: string, content: string) => {
  const blob = new Blob([content], { type: "text/markdown" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.md`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
