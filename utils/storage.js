// storage本地存储 持久化

// 1.规定一个通用键名
const InfoKey = 'userLoginInfo'
// 2.导出本地取方法getInfo
export const getInfo = () => {
  const result = localStorage.getItem(InfoKey)
  const defaultObj = { token: '', userId: '' }// 如果result值为空则返回一个空对象{ token: '', userId: '' }
  return result ? JSON.parse(result) : defaultObj
}
// 3.导出本地存入方法setInfo
export const setInfo = (obj) => {
  localStorage.setItem(InfoKey, JSON.stringify(obj))
  // 对象不能直接往本地存 需要序列化 stringify
}

// 存取搜索历史
const HistoryKey = 'historySearch'
// 取搜索历史
export const getHistoryList = () => {
  const result = localStorage.getItem(HistoryKey)
  return result ? JSON.parse(result) : []
}
// 存搜索历史
export const setHistoryList = (arr) => {
  localStorage.setItem(HistoryKey, JSON.stringify(arr))
}
