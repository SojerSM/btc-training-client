import type { RequestDetails } from "../../lib/domain/requestDetails";

export const sendHttpRequest = async <T>(
  url: string,
  options?: RequestDetails
) => {
  try {
    const response = await fetch(url, options);

    if (!response.status.toString().startsWith("2")) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
