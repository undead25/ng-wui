// 转换为boolean
export function coerceBoolean(value) {
    return value != null && "" + value !== 'false';
}
// 转换为number
export function coerceNumber(value, fallbackValue) {
    if (fallbackValue === void 0) { fallbackValue = 0; }
    return isNaN(parseFloat(value)) || isNaN(Number(value)) ? fallbackValue : Number(value);
}
