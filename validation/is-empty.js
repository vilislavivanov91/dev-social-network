module.exports = (value) =>
  value === null ||
  value === undefined ||
  (typeof value === Object && Object.keys(value).length === 0) ||
  (typeof value === String && data.trim().length === 0);
