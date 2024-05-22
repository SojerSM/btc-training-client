export const writeSessionValue = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};

export const readSessionValue = (key: string): string | null => {
  return sessionStorage.getItem(key);
};

export const clearSessionStorage = () => {
  sessionStorage.removeItem("jwt");
  sessionStorage.removeItem("accountId");
};
