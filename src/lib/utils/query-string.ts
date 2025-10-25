export type QueryValue = string | number | boolean | null | undefined;

export function createQueryString(params?: Record<string, QueryValue>): string {
  if (!params) return "";

  const searchParams = new URLSearchParams();
  const emptyValues = [undefined, null, ""];

  Object.entries(params).forEach(([key, value]) => {
    if (!emptyValues.includes(value as string | null | undefined)) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();

  return queryString ? `?${queryString}` : "";
}
