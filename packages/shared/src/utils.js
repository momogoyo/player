export const isNaN = Number.isNaN || window.isNaN

// From: https://davidwalsh.name/detect-native-function
export function isNative (value) {
  return (/\{\s*\[native code\]\s*\}/).test('' + value)
}

export function isObject (value) {
  return typeof value === 'object' && value !== null
}

export function isArray (value) {
  return Array.isArray(value)
}

export function isFunction (value) {
  return typeof value === 'function'
}

export function isString (value) {
  return typeof value === 'string'
}

export function isNumber (value) {
  return typeof value === 'number' && !isNaN(value)
}

export function isFloat (value) {
  return Number(value) === value && value % 1 !== 0
}

export function isUndefined (value) {
  return typeof value === 'undefined'
}

export function isNull (value) {
  return value === null
}

export function isFalsy (value) {
  return isUndefined(value) || isNull(value)
}

export function isRange (value) {
  return value instanceof Range
}

// from: https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object
export function isElement (elem) {
  return (elem instanceof Element || 
  elem && typeof elem === 'object' && elem !== null && elem.nodeType === 1 && typeof elem.nodeName === 'string')
}

export function isAbsoluteURL (url) {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function preventDefault (event) {
  event.preventDefault()
}

export function isCssVarSupport () {
  return window.CSS && window.CSS.supports && window.CSS.supports('(--foo: red)')
}

export function addCSSRule (sheet, selector, rules, index) {
  if ('insertRule' in sheet) {
    sheet.insertRule(`${selector} { ${rules} }`, index)
  }
  else if ('addRule' in sheet) {
    sheet.addRule(selector, rules, index)
  }
}

// http://stackoverflow.com/a/3809435/951517
export function isURL (str) {
  return str.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
}

// From: https://gist.github.com/davidtheclark/5515733
export function isElementInViewport(rect) {
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document. documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document. documentElement.clientWidth)
  )
}

// From: http://ccoenraets.github.io/es6-tutorial-data/promisify/
export function request (options) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open(options.method || 'GET', options.path)

    if (options.responseType) {
      xhr.responseType = options.responseType
    }

    if (options.headers) {
      Object.keys(options.headers).forEach(key => {
        xhr.setRequestHeader(key, options.headers[key])
      })
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response)
      } else {
        reject(xhr.statusText)
      }
    }
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send(options.body)
  })
}

// From: https://ourcodeworld.com/articles/read/278/how-to-split-an-array-into-chunks-of-the-same-size-easily-in-javascript
export function chunkArray (arr, size) {
  const result = []

  while (arr.length) {
    result.push(arr.splice(0, size))
  }

  return result
}

export function addStyle (element, value) {
  if (isNumber(element.length)) {
    Array.from(element).forEach(
      elem => addStyle(elem.style, value)
    )

    return
  }

  assign(element.style, value)
}

export function emptyStyle (element) {
  if (isNumber(element.length)) {
    Array.from(element).forEach(
      elem => emptyStyle(elem)
    )

    return
  }

  element.setAttribute('style', '')
}

export function addClass (element, value) {
  if (isNumber(element.length)) {
    Array.from(element).forEach(
      elem => addClass(elem, value)
    )

    return
  }

  element.classList.add(value)
}

export function removeClass (element, value) {
  if (isNumber(element.length)) {
    Array.from(element).forEach(
      elem => removeClass(elem, value)
    )

    return
  }

  element.classList.remove(value)
}

export function hasClass (element, value) {
  return element.classList.contains(value)
}

// From: https://medium.com/browserquirks/browserquirk-programmatically-removing-selections-in-ios-safari-a7c9dc9b26ba
export function clearSelections () {
  // create temp input field to store focus
  var $selectionSmasher = document.createElement('input');
  $selectionSmasher.setAttribute('type', 'text');
  $selectionSmasher.setAttribute('readonly', 'readonly');

  // append to body for focus to actually shift
  document.querySelector('body').appendChild( $selectionSmasher );

  // run the focus and then remove element
  $selectionSmasher.focus();
  $selectionSmasher.blur();

  $selectionSmasher.parentNode.removeChild( $selectionSmasher );
} // clearSelections

// From: https://github.com/futurist/replace-css-url/blob/master/src/replace-css-url.js
var hasQuote = /^\s*('|")/
export function replacePathInCSS (css, mapFunc) {
  return [
      /(@import\s+)(')(.+?)(')/gi,
      /(@import\s+)(")(.+?)(")/gi,
      /(url\s*\()(\s*')([^']+?)(')/gi,
      /(url\s*\()(\s*")([^"]+?)(")/gi,
      /(url\s*\()(\s*)([^\s'")].*?)(\s*\))/gi,
  ].reduce((css, reg, index) => {
    return css.replace(reg, (all, lead, quote1, path, quote2) => {
      var ret = mapFunc(path, quote1)
      if(hasQuote.test(ret) && hasQuote.test(quote1)) quote1=quote2=''
      return lead + quote1 + ret + quote2
    })
  }, css)
}

export function filename (path) {
  return path.replace(/^.*[\\\/]/, '')
}

export function dirname (path) {
  return join(path, '..')
}

// From: https://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript
export function getExtension (path) {
  const regex = /(?:\.([^.]+))?$/

  return regex.exec(path)[1]
}

// From: https://gist.github.com/creationix/7435851
export function join () {
  var parts = []
  for (var i = 0, l = arguments.length; i < l; i++) {
    if (arguments[i]) parts = parts.concat(arguments[i].split('/'))
  }

  var newParts = []
  for (i = 0, l = parts.length; i < l; i++) {
    var part = parts[i]

    if (!part || part === '.') continue
    if (part === '..') newParts.pop()
    else newParts.push(part)
  }

  if (parts[0] === '') newParts.unshift('')

  var result = newParts.join('/') || (newParts.length ? '/' : '.')

  return result.replace(':/', '://')
}

export const assign = Object.assign || function extend (obj, ...args) {
  if (isObject(obj) && args.length > 0) {
    args.forEach((arg) => {
      if (isObject(arg)) {
        Object.keys(arg).forEach((key) => {
          obj[key] = arg[key]
        })
      }
    })
  }

  return obj
}

export const extend = (target, ...sources) => {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) assign(target, { [key]: {} })
        extend(target[key], source[key])
      } else {
        assign(target, { [key]: source[key] })
      }
    }
  }

  return extend(target, ...sources)
}

// From: https://medium.com/@TCAS3/debounce-deep-dive-javascript-es6-e6f8d983b7a1
export function debounce (fn, time) {
  let timeout

  return function () {
    const functionCall = () => fn.apply(this, arguments)

    clearTimeout(timeout)
    timeout = setTimeout(functionCall, time)
  }
}

export function createTreeWalker (node) {
  return document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
    acceptNode: function (node) {
      return (
        node.parentNode.nodeName !== 'SCRIPT' &&
        node.parentNode.nodeName !== 'NOSCRIPT' &&
        node.parentNode.nodeName !== 'STYLE' &&
        node.nodeValue.length >= 1 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
      )
    }
  })
}

export function createTextNodeIterator (node) {
  return document.createNodeIterator(node, NodeFilter.SHOW_TEXT, {
    acceptNode () {
      return NodeFilter.FILTER_ACCEPT
    },
  }, true)
}

export function getNextTextNode (range) {
  const node = range.endContainer
  const nextNode = node.nextSibling    

  if (nextNode) {
    if (nextNode.nodeType === Node.TEXT_NODE) {
      return nextNode
    }

    const textNode = createTextNodeIterator(nextNode).nextNode()
    if (textNode) {
      return textNode
    }

    range.setEnd(nextNode, 0)
    return getNextTextNode(range)
  }

  range.setEndAfter(range.endContainer)
  if (range.endContainer.nodeName === 'BODY') {
    return null
  }

  return getNextTextNode(range)
}

// From: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascriptexport
export function uuid () {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)

    return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16)
  })

  return uuid
}

// From: https://davidwalsh.name/javascript-once
export function once (fn, context = null) {
  var result
  return function () {
    if (fn) {
      result = fn.apply(context || this, arguments)
      fn = null
    }

    return result
  }
}

// From: https://developer.mozilla.org/ko/docs/Web/API/Background_Tasks_API
export const requestIdleCallback = window.requestIdleCallback || function (handler, options) {
  let startTime = Date.now()
 
  return setTimeout(function() {
    handler({
      didTimeout: false,
      timeRemaining () {
        return Math.max(0, 50.0 - (Date.now() - startTime))
      }
    })
  }, 1)
}

// From: https://developer.mozilla.org/ko/docs/Web/API/Background_Tasks_API
export const cancelIdleCallback = window.cancelIdleCallback || function (id) {
  clearTimeout(id)
}

export const requestAnimationFrame = window.requestAnimationFrame || function (callback) {
  setTimeout(callback, 0)
}

export const getChildNodes = (root) => {
  if (!root) {
    return
  }

  const childNodes = []
  Array.from(root.childNodes).forEach((node) => {
    if (node.nodeType !== Node.TEXT_NODE || node.nodeType === Node.TEXT_NODE 
      && /\S+/g.test(node.textContent)) {
        childNodes.push(node)
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      childNodes.push(...getChildNodes(node))
    }
  })

  return childNodes
}