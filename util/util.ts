export function formatNum(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function calculateDiscount(price: number, discount: number) {
  return formatNum(price * (discount / 100));
}
