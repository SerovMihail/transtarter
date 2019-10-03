;(function(w, d, fallbackUrl) {
    var renderBrowserError = d.createElement('body')
    renderBrowserError.innerHTML =
        '<div class="unsupported-browser">' +
          '<div class="unsupported-browser__container">' +
            '<div class="unsupported-browser__content-container">' +
              '<div class="title">' +
                '<h1 class="unsupported-browser__title center" =""> ' +
                  'К сожалению, мы не поддерживаем Ваш браузер' +
                '</h1>' +
              '</div>' +
              '<div class="subtitle">' +
                '<div class="unsupported-browser__subtitle center" =""> ' +
                  'Вы используете Windows XP, данная операционная система не поддерживается данным сайтом' +
                '</div>' +
              '</div>' +

              '<div class="unsupported-browser__browsers-container" ="">' +
                '<div class="unsupported-browser__browser-container" ="">' +
                  '<a href="https://www.mozilla.org/ru/firefox/new" ="">' +
                    '<div class="unsupported-browser__icon unsupported-browser__icon--firefox" ="">' +
                    '</div>' +
                  '</a>' +
                  '<a href="https://www.mozilla.org/ru/firefox/new" class="unsupported-browser__chrome-text"="">Firefox</a>' +
                '</div>' +

                '<div class="unsupported-browser__browser-container" ="">' +
                  '<a href="https://www.google.com/chrome" ="">' +
                    '<div class="unsupported-browser__icon unsupported-browser__icon--chrome" ="">' +
                    '</div>' +
                  '</a>' +
                  '<a href="https://www.google.com/chrome" class="unsupported-browser__chrome-text"="">Google&nbsp;Chrome</a>' +
                '</div>' +

                '<div class="unsupported-browser__browser-container" ="">' +
                  '<a href="https://www.opera.com/ru" ="">' +
                    '<div class="unsupported-browser__icon unsupported-browser__icon--opera" ="">' +
                    '</div>' +
                  '</a>'+
                  '<a href = "https://www.opera.com/ru" class="unsupported-browser__chrome-text" = "" > Firefox</a > ' +
                '</div>' +
              '</div>' +

              '<div class="unsupported-browser__old-site-version" ="">' +
                'Пожалуйста перейдите на предыдущую версию сайта ' +
                '<a class="unsupported-browser__link" href="' + fallbackUrl + '">' + fallbackUrl + '</a>' +
              '</div>' +
              '<div class="unsupported-browser__instruction">' +
              '<div class="unsupported-browser__instruction-text">' +
                'и нажмите "авторизоваться", следуя инструкции ниже'+
              '</div>' +
              '<div class="unsupported-browser__instruction-img">' +
                '<img src="./assets/instruction.png" >' +
              '</div>'
              '<div style="clear: both;"></div>'
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>'
    var isValidBrowserVersion = true
    var clientBrowser = bowser.getParser(navigator.userAgent)
    var clientOS = clientBrowser.getOS()

    var clientBrowserEngine = clientBrowser.parseEngine().name
    if (clientBrowser.is('Chrome') || clientBrowser.parsedResult.os.versionName === 'XP' ) {
      isValidBrowserVersion = clientBrowser.satisfies({ chrome: '>49.0.2623.112' })
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
