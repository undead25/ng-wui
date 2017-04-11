/**
 * @description 将source对象中的属性扩展到target对象上
 * @param {Object} target - 目标对象，新的属性将附加到该对象上
 * @param {Object} source - 源对象，该对象的属性会被附加到target对象上
 * @param {boolean} isKeepTarget 是否保留目标对象中与源对象中属性名相同的属性
 * @returns {Object} - 返回target对象
 *
 * @example
 * ```javascript
 *
 *  const target:Object = { name: 'target', sex: 1 };
 *  const source:Object = { name: 'source', age: 17 };
 *  merge(target, source);
 *  console.log(target);
 *  // 输出：{ name: 'source', sex: 1, age: 17 }
 *
 *  merge(target, source, true);
 *  console.log(target);
 *  // 输出：{ name: 'target', sex: 1, age: 17 }
 *
 * ```
 */
export function merge(target: any, source: any, isKeepTarget?: boolean): any {
  if (source) {
    for (let key in source) {
      if (!isKeepTarget || !target.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}
