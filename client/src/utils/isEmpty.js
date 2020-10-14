export default (value) =>
  value === null ||
  value === undefined ||
  (typeof value === Object && Object.keys(value).length === 0) ||
  (typeof value === String && value.trim().length === 0);
