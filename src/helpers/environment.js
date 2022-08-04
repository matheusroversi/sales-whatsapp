export const REACT_APP_API_ADDRESS =
  process.env.NODE_ENV === "development"
    ? "http://localhost:7000"
    : "https://numenu-backend.herokuapp.com";

export const PUBLIC_URL =
  process.env.NODE_ENV === "development"
    ? "https://localhost:3003"
    : "https://numenu.herokuapp.com";
