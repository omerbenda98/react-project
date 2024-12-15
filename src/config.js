const localApiUrl = "http://localhost:8181/api";
const k8sApiUrl = "http://puppy-adoption.local/api";
const prodApiUrl = "https://puppyadoptions.duckdns.org/api";

export const apiBaseUrl = process.env.REACT_APP_API_URL // Check for Kubernetes environment
  ? k8sApiUrl
  : process.env.NODE_ENV === "production"
  ? prodApiUrl
  : localApiUrl;

console.log(process.env);
console.log(process.env.REACT_APP_API_URL);

console.log("Selected apiBaseUrl:", apiBaseUrl);
