export function getBasePath() {
  if (process.env.NODE_ENV === "production") {
    return process.env.REACT_APP_PROD_API;
  }

  return process.env.REACT_APP_DEV_API;
}
