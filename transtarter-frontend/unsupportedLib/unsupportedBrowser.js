;(function(w, d, fallbackUrl) {
    var renderBrowserError = d.createElement('body')
    renderBrowserError.innerHTML =
        '<div class="unsupported-browser">' +
        '<div class="unsupported-browser__container">' +
        '<div class="unsupported-browser__content-container">' +
        '<div class="title">' +
        '<div class="unsupported-browser__title center" =""> ' +
        'К сожалению, мы не поддерживаем ваш браузер.' +
        '</div>' +
        '</div>' +
        '<div class="app-modal__message center" =""> ' +
        'Пожалуйста, установите один из поддерживаемых нами браузеров последней версии.' +
        '</div>' +
        '<div class="unsupported-browser__browsers-container" ="">' +
        '<div class="unsupported-browser__browser-container" =""><a' +
        'href="https://www.mozilla.org/ru/firefox/new" ="">' +
        '<div class="unsupported-browser__icon unsupported-browser__icon--firefox" =""></div>' +
        '</a> <a href="https://www.mozilla.org/ru/firefox/new" class="unsupported-browser__chrome-text"' +
        '="">Firefox</a></div>' +
        '<div class="unsupported-browser__browser-container" =""><a href="https://www.google.com/chrome"' +
        '="">' +
        '<div class="unsupported-browser__icon unsupported-browser__icon--chrome" =""></div>' +
        '</a> <a href="https://www.google.com/chrome" class="unsupported-browser__chrome-text"' +
        '="">Google Chrome</a></div>' +
        '<div class="unsupported-browser__browser-container" =""><a href="https://www.opera.com/ru"' +
        '="">' +
        '<div class="unsupported-browser__icon unsupported-browser__icon--opera" =""></div>' +
        '</a> <a href="https://www.opera.com/ru" class="unsupported-browser__chrome-text" ="">Opera</a>' +
        '</div>' +
        '</div>' +
        '<div class="unsupported-browser__old-site-version" ="">' +
        'Или перейдите на старую версию сайта ' +
        '<a href="' +
        fallbackUrl +
        '">' +
        fallbackUrl +
        '</a></div>' +
        '</div>' +
        '</div>' +
        '</div>'
    var isValidBrowserVersion = true
    var clientBrowser = bowser.getParser(navigator.userAgent)
    var clientBrowserEngine = clientBrowser.parseEngine().name
    if (clientBrowser.is('Chrome')) {
<<<<<<< HEAD
        isValidBrowserVersion = clientBrowser.satisfies({ chrome: '>49.0.2623.112' })
=======
        isValidBrowserVersion = clientBrowser.satisfies({ chrome: '>49.0.2623.75' })
>>>>>>> f0340e0bcb943496162ab408782971b68c685d33
    }
    if (clientBrowserEngine === 'EdgeHTML') {
        w.location.href = fallbackUrl
    }
    var unsupportedEngine = clientBrowserEngine === 'EdgeHTML' || clientBrowserEngine === 'Trident'
    if (!isValidBrowserVersion || unsupportedEngine) {
        d.body = renderBrowserError
        d.body.style.margin = '0px'
        d.documentElement.style.height = '100%'
        d.body.style.height = '100%'
    }
})(window, document, 'https://old.tstarter.ru')
