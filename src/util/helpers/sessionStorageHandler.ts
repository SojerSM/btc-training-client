export const writeSessionValue = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};

export const readSessionValue = (key: string) => {
  return sessionStorage.getItem(key);
};
