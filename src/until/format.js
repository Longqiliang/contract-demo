// 标准时间转 yyyy-MM-dd
function format(time, format) {
  if (!time) {
    return ''
  }
  time = time.toString().replace(/^\s*/g, '').replace(/\s*$/g, '')
  if (time === '') {
    return ''
  }
  var t = new Date(time)
  var tf = function (i) {
    return (i < 10 ? '0' : '') + i
  }
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear())
      case 'MM':
        return tf(t.getMonth() + 1)
      case 'mm':
        return tf(t.getMinutes())
      case 'dd':
        return tf(t.getDate())
      case 'HH':
        return tf(t.getHours())
      case 'ss':
        return tf(t.getSeconds())
    }
  })
}
// 时间戳转 yyyy-MM-dd
function fmtDate(obj) {
  if (!obj) {
    return ''
  }
  var date = new Date(obj)
  var y = 1900 + date.getYear()
  var m = '0' + (date.getMonth() + 1)
  var d = '0' + date.getDate()
  return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length)
}
function fmtMonth(obj) {
  var date = new Date(obj)
  var y = 1900 + date.getYear()
  var m = '0' + (date.getMonth() + 1)
  return y + '-' + m.substring(m.length - 2, m.length)
}

// 时间增减
function addDate(type,date,data){
  let d = new Date(date); 
  data = parseInt(data)
  switch(type){
    case 'day':
        d.setDate(d.getDate() + data); 
    break;
    case 'mounth':
        d.setMonth(d.getMonth() + data); 
    break;
    case 'year':
        d.setFullYear(d.getFullYear() + data); 
    break;
  }
  let m = (d.getMonth() + 1) > 10 ? (d.getMonth() + 1) : ('0'+(d.getMonth() + 1))
  let day = d.getDate() > 10 ?d.getDate(): ('0'+d.getDate())
  
  return d.getFullYear() + '-' + m + '-' + day; 
}
var Datemat = {
  format: format,
  fmtDate: fmtDate,
  fmtMonth: fmtMonth,
  addDate:addDate
}
export default Datemat
