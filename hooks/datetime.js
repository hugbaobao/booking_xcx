// 生成一个返回当前时间加10分钟的钩子函数，时间不传参直接获取当前真实时间
export function datetimer() {
  const now = new Date()
  // 返回格式为2017-12-18 10:12:13
  return now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + (now.getMinutes() + 10) + ':' + now.getSeconds()
}

// 生成获取当前访问者ip的钩子函数
