export function unitConvertToB(value){
  value = value.toLocaleLowerCase();
  if( /[a-zA-Z]/.test(value)){
    if(value.indexOf('k') > -1){ // 只要包含 K 默认单位为 KB
      value = value.replace(/[a-zA-Z]/g,'')
      value = parseInt(value * 1024)
      return value
    }
    else if(value.indexOf('m') > -1){ // 只要包含M 默认单位为 MB
      value = value.replace(/[a-zA-Z]/g,'')
      value = parseInt(value * 1024 * 1024)
      return value
    }
    else if(value.indexOf('g') > -1){ // 只要包含G 默认单位为 GB
      value = value.replace(/[a-zA-Z]/g,'')
      value = parseInt(value * 1024 * 1024 * 1024)
      return value
    }else if(value.indexOf('b') > -1){// 只要包含B 默认单位为 B
      value = value.replace(/[a-zA-Z]/g,'')
      return value
    }
  }
  else{
    return value
  }
}