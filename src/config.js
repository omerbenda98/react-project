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

// Move the environment declaration before using it
const environment =
  process.env.REACT_APP_ENV || process.env.NODE_ENV || "development";

// Then add the debug logs after the declaration
console.log("REACT_APP_ENV:", process.env.REACT_APP_ENV);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Selected environment:", environment);
console.log("Selected apiBaseUrl:", config[environment].apiUrl);

export const apiBaseUrl = config[environment].apiUrl;
