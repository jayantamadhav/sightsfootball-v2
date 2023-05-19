export const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const sanitizeFilename = (fileName: string): string => {
  return fileName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
};
