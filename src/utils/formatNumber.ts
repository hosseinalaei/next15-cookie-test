export function formatNumberIntl(number: number) {
  return new Intl.NumberFormat("en-US").format(number);
}
