const html = (url, options) => {
  return fetch(url)
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, 'text/html'))
    .then(dom => {
      if (options.hasOwnProperty('selector')) {
        return dom.querySelector(options.selector)
      } else if (options.hasOwnProperty('selectorAll')) {
        return dom.querySelectorAll(options.selectorAll)
      } else {
        return dom
      }
    })
}

let _sourceText = ''

const translate = ({
                     sourceLang = 'auto',
                     targetLang = 'en',
                     sourceText = ''
                   }) => {
  sourceText = sourceText.trim()

  // Cache sourceText
  if (sourceText === _sourceText) {
    return
  } else {
    _sourceText = sourceText
  }

  const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl='
    + sourceLang + '&tl=' + targetLang + '&dt=t&q=' + encodeURI(sourceText)

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('response data', data)
      const translatedText = data[0][0][0]
      console.log('translatedText', translatedText)
      document.querySelector('#translatedText').innerHTML = translatedText

      html('http://tureng.com/en/turkish-english/' + translatedText, {
        selectorAll: '.searchResultsTable'
      })
        .then(dom => {
          document.querySelector('#results').innerHTML = ''
          console.log(dom)
          document.querySelector('#results').appendChild(dom[0])
          document.querySelector('#results').appendChild(dom[1])
        })
    })
}
