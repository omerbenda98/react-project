const localApiUrl = "http://localhost:8181/api";
const stagingApiUrl = "https://puppyadoptions.duckdns.org:32223/api"; // Added port 32223 for staging
const prodApiUrl = "https://puppyadoptions.duckdns.org/api";

export const apiBaseUrl =
  process.env.REACT_APP_ENV === "staging"
    ? stagingApiUrl
    : process.env.NODE_ENV === "production"
    ? prodApiUrl
    : localApiUrl;

console.log(process.env);
console.log(process.env.REACT_APP_API_URL);
console.log("Selected apiBaseUrl:", apiBaseUrl);
