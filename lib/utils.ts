import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFromAndTo(page: number, itemPerPage: number) {
  let from = page * itemPerPage;

  // eslint-disable-next-line prefer-const
  let to = from + itemPerPage;

  if (page > 0) {
    from += 1;
  }
  return { from, to };
}
