var idStart = 0;
export function setUid(prefix) {
    return prefix + "_" + ++idStart;
}
