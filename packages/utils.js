/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-01-13 20:40:42
 * @LastEditTime: 2021-01-13 20:43:15
 * @LastEditors: @Xin (834529118@qq.com)
 */
/**
 * @description:   判断数据类型
 * @param {*} data
 * @param {*} type
 * @return {*} Boolean
 */
export function isType (data, type) {
  return Object.prototype.toString.call(data) === `[object ${type}]`
}
