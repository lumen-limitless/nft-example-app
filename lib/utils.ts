import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatUnits } from 'viem';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (s: string) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// shorten string to its maximum length using three dots
export function shortenString(string: string, length: number): string {
  if (!string) return '';
  if (length < 5) return string;
  if (string.length <= length) return string;
  return (
    string.slice(0, 4) +
    '...' +
    string.slice(string.length - length + 5, string.length)
  );
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function formatPercent(percentString: any) {
  const percent = parseFloat(percentString);
  if (!percent || percent === Infinity || percent === 0) {
    return '0%';
  }
  if (percent < 0.0001 && percent > 0) {
    return '< 0.0001%';
  }
  if (percent < 0 && percent > -0.0001) {
    return '< 0.0001%';
  }
  const fixedPercent = percent.toFixed(2);
  if (fixedPercent === '0.00') {
    return '0%';
  }
  if (Number(fixedPercent) > 0) {
    if (Number(fixedPercent) > 100000) {
      return `> 100,000%`;
    } else if (Number(fixedPercent) > 100) {
      return `${commify(percent?.toFixed(0).toLocaleString())}%`;
    } else {
      return `${fixedPercent}%`;
    }
  } else {
    return `${fixedPercent}%`;
  }
}

export const formatBalance = (
  value: bigint | string | number,
  decimals = 18,
  maxFraction = 2,
) => {
  const formatted: string =
    typeof value === 'string'
      ? value
      : typeof value === 'number'
        ? value.toString()
        : formatUnits(value, decimals);

  if (maxFraction > 0) {
    const split = formatted.split('.');
    if (split.length > 1) {
      return commify(split[0] + '.' + split[1].substr(0, maxFraction));
    }
  }
  return commify(formatted === '0' ? '0.0' : formatted);
};

export const parseBalance = (value: bigint, decimals = 18) => {
  return parseFloat(formatUnits(value, decimals));
};

export function commify(n: number | string): string {
  if (n === null || n === undefined) {
    return '';
  }
  const str = typeof n === 'number' ? n.toString() : n;
  const [integer, decimal] = str.split('.');
  const integerWithCommas = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decimal ? `${integerWithCommas}.${decimal}` : integerWithCommas;
}
