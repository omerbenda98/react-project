const config = {
  development: {
    apiUrl: "http://localhost:8181/api",
  },
  staging: {
    apiUrl: "https://puppyadoptions.duckdns.org:32223/api",
  },
  production: {
    apiUrl: "https://puppyadoptions.duckdns.org/api",
  },
};

// Add these debug logs
console.log("REACT_APP_ENV:", process.env.REACT_APP_ENV);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Selected environment:", environment);
console.log("Selected apiBaseUrl:", config[environment].apiUrl);

const environment =
  process.env.REACT_APP_ENV || process.env.NODE_ENV || "development";
export const apiBaseUrl = config[environment].apiUrl;
