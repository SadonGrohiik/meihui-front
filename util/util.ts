export function formatNum(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function calculateDiscount(price: number, discount: number) {
  return formatNum(price * (discount / 100));
}

export function generateSortUrl(filter: string, route: string) {
  const url =
    route.indexOf("sort") === -1
      ? route + filter
      : route.substring(0, route.indexOf("sort")) + filter;

  return url;
}

export function sortNumbers(numbers: number[]) {
  numbers.sort(function (a, b) {
    if (a === Infinity) return 1;
    else if (isNaN(a)) return -1;
    else return a - b;
  });
  return numbers;
}

export function uniq(a: any[]) {
  return [...new Set(a.map((p: any) => p))];
}
