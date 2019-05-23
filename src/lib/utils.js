const $local = {
  set (key, val) {
    localStorage.setItem(key, JSON.stringify(val))
  },
  get (key) {
    return localStorage.getItem(key)
  },
  remove (key) {
    localStorage.removeItem(key)
  },
  recordHistory (id, title) {
    const recordTime = Date.now()
    let history = JSON.parse(localStorage.getItem('history')) || {}
    history[id] = { id, title, recordTime }
    localStorage.setItem('history', JSON.stringify(history))
  },
  getHistoryList () {
    return JSON.parse(localStorage.getItem('history')) || {}
  },
  removeHistoryList () {
    localStorage.removeItem('history')
  },
  recordSearchHistory (id, title) {
    const recordTime = Date.now()
    let history = JSON.parse(localStorage.getItem('searchHistory')) || {}
    history[id] = {
      id,
      title,
      recordTime
    }
    localStorage.setItem('searchHistory', JSON.stringify(history))
  },
  getSearchHistoryList () {
    return JSON.parse(localStorage.getItem('searchHistory')) || {}
  },
  removeSearchHistoryList () {
    localStorage.removeItem('searchHistory')
  }
}

const $throttle = function (func, wait = 0, options = {}) {
  let { leading = true, trailing = true } = options
  let previous = 0
  let timeoutID = null
  let result
  let context
  let lastArgs
  return function (...args) {
    let runtime = Date.now()
    context = this
    lastArgs = args
    if (previous === 0 && leading === false) {
      previous = runtime
    }
    let remaining = wait - (runtime - previous)
    if (remaining <= 0 || remaining > wait) {
      if (timeoutID) {
        clearTimeout(timeoutID)
        timeoutID = null
      }
      previous = runtime
      result = func.call(context, ...lastArgs)
    } else if (!timeoutID && trailing !== false) {
      timeoutID = setTimeout(() => {
        previous = leading === false ? 0 : Date.now()
        timeoutID = null
        result = func.call(context, ...lastArgs)
      }, remaining)
    }
    return result
  }
}

export default {
  install (vm) {
    vm.prototype.$local = $local
    vm.prototype.$throttle = $throttle
  }
}
