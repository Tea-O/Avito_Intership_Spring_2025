
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};


export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
};


export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean';
};


export const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};


export const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};


export const isFunction = (value: unknown): value is (...args: unknown[]) => unknown => {
  return typeof value === 'function';
};


export const isNullable = (value: unknown): value is null => {
  return value === null;
};


export const isNonNullable = (value: unknown): value is NonNullable<unknown> => {
  return value !== null && value !== undefined;
};


export const isUndefined = (value: unknown): value is undefined => {
  return value === undefined;
};


export const isEmpty = (value: unknown): boolean => {
  return value === null || value === undefined || value === '';
};


export const isDate = (value: unknown): value is Date => {
  return value instanceof Date;
};
