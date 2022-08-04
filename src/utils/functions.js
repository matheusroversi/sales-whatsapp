export function parseToNumber(value) {
  return parseFloat(value.replace("R$ ", "").replace(",", "."));
}
