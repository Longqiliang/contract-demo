
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

 //将数字转换成金额显示
export function moneyFormat(num){
  num = num.toFixed(2)
  let parts = num.split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return parts.join(".")
}

// 判断对象是否为空
export function isEmptyObj(obj) {
  var data = Object.keys(obj)
  return data.length
}

export function accMul(...args) {
  let sum = 0
  const reducer = (accumulator, currentValue) => Number(accumulator) * Number(currentValue)
  sum = args.reduce(reducer)
  return sum
}

/**
 * @description 数据字典format
 * @param  {Array} list 数据字典列表
 * @param  {String} val 列表fieldcode
 */
export function codeFormat(list, val) {
  if (!list || !val) {
    return
  }
  const obj = list.find(item => {
    return item.fieldcode === val
  })
  if (obj) {
    return obj.fieldname
  } else {
    return false
  }
}
