import type { RequestDetails } from "../../lib/domain/requestDetails";

export const sendHttpRequest = async <T>(
  url: string,
  options?: RequestDetails
) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
