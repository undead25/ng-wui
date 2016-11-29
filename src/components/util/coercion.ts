
// 转换为boolean
export function coerceBoolean(value: any): boolean {
  return value != null && `${value}` !== 'false';
}

// 转换为number
export function coerceNumber(value: any, fallbackValue = 0) {
  return isNaN(parseFloat(value as any)) || isNaN(Number(value)) ? fallbackValue : Number(value);
}
