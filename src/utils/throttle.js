// 节流
export function throttle(fn, delay = 500) {
  let date = 0
  return function callback(...args) {
    const newDate = new Date().getTime()
    if (newDate - date <= delay) return
    fn.call(this, ...args)
    date = newDate
  }
}

// 防抖
export function debounce(fn, delay = 500) {
  let timer = null
  return function callback(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, ...args)
    }, delay)
  }
}
