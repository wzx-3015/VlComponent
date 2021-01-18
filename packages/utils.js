/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-01-13 20:40:42
 * @LastEditTime: 2021-01-18 13:47:44
 * @LastEditors: @Xin (834529118@qq.com)
 */
/**
 * @description  判断数据类型
 * @param {any} value 值
 * @returns  {String}  "[object String]"
 */
export function typeToString(value) {
  return Object.prototype.toString.call(value)
}
/**
 * @description:   判断数据类型
 * @param {*} data
 * @param {*} type
 * @return {*} Boolean
 */
export function isType (value, type) {
  return typeToString(value) === `[object ${type}]`
}


/**
 * @description   判断是否为object | function | bigint
 * @param {any} value
 * @returns {Boolean}
 */
export function isOther(value) {
  const type = typeof value
  const typeList = ['object', 'function', 'bigint']
  return typeList.includes(type)
}

/**
 * @description:   浅合并对象
 * @param {*} d1
 * @param {*} d2
 * @return {*}
 */
export function merge (source, other) {
  if (isType(source, 'Array') && isType(source, 'Array')) {
    return [].concat(source, other)
  }

  if (isType(other, 'Undefined') || isType(other, 'Null')) {
    return source
  }

  if (typeToString(source) !== typeToString(other)) {
    return other
  }

  // 为具体的值或者是FN时返回值
  if (!isOther(source) || !isOther(other)) {
    return other === undefined ? source : other
  }

  return Object.keys({
    ...source,
    ...other
  }).reduce(
    (acc, key) => {
      acc[key] = merge(source[key], other[key])
      return acc
    },
    Array.isArray(source) ? [] : {}
  )
}
