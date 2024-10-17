const devApiUrl = "http://localhost:8181/api";
const prodApiUrl = "https://puppyadoptions.duckdns.org/api";

export const apiBaseUrl =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production" ? prodApiUrl : devApiUrl);
