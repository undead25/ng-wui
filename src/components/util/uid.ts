let idStart = 0;
export function setUid(prefix: any) {
  return `${prefix}-${++idStart}`;
}
