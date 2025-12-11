export const stringifyPair = (k: string, v: unknown): string => 
  `${k}:${v}[${typeof v}]`;

