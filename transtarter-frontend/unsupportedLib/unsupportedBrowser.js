; (function (w, d, fallbackUrl) {
  var renderBrowserError = d.createElement('body');
  var css = d.createElement('style');
  css.type = 'text/css';
  css.innerHTML = 'body{height:100%;width:100%;display:table}.unsupported-browser{display:table-cell;vertical-align:middle;position:relative;background:#323230;height:100%;font-family:sans-serif}.unsupported-browser *{margin:0;padding:0;}.unsupported-browser a:hover{text-decoration:none;}.unsupported-browser .center{text-align:center;}.unsupported-browser__container{width:80%;padding:30px 0;margin:0 auto;}.unsupported-browser__link{color:#11a815;}.unsupported-browser__title{font-weight:bold;font-size:28px;margin-bottom:24px;}.unsupported-browser__subtitle{font-weight:normal;font-size:22px;margin-bottom:48px;}.unsupported-browser__old-site-version{font-size:18px;text-align:center;}.unsupported-browser__old-site-version a{font-size 18px:color:#0cb520;}.unsupported-browser__browsers-container{max-width:800px;margin:0 auto;margin-top:42px;margin-bottom:40px;}.unsupported-browser__browsers-container::after{display:block;content:"";clear:both;}.unsupported-browser__content-container{background:white;padding:28px;}.unsupported-browser__icon{width:100px;height:100px;background-size:contain;background-repeat:no-repeat;margin:0 auto;margin-bottom:10px;}.unsupported-browser__icon--chrome{background-image:url("https://res.cloudinary.com/duz1yo4sl/image/upload/v1570110752/chrome.png");}.unsupported-browser__icon--firefox{background-image:url("https://res.cloudinary.com/duz1yo4sl/image/upload/v1570110752/firefox.png");}.unsupported-browser__icon--opera{background-image:url("https://res.cloudinary.com/duz1yo4sl/image/upload/v1570110752/opera.png");}.unsupported-browser__chrome-text{font-size:18px;color:#0cb520;}.unsupported-browser__chrome-text:hover{text-decoration:underline;}.unsupported-browser__browser-container{text-align:center;display:inline-block;width:33.333%}.unsupported-browser__browser-container:hover a{text-decoration:underline;}.unsupported-browser__instruction{margin:8px auto;max-width:1024px;}.unsupported-browser__instruction-text{font-size:18px;top:30%;text-align:center;margin:0 0 20px 0;}.unsupported-browser__instruction-img{width:100%;}.unsupported-browser__instruction-img img{margin:0 auto;width:100%;max-width:700px;height:auto;display:block;box-shadow:2px 2px 10px rgba(0,0,0,.6);}';
  var browsersTemplate =
    '<div class="unsupported-browser">' +
    '<div class="unsupported-browser__container">' +
    '<div class="unsupported-browser__content-container">' +
  '<div class="title">' +
    '<h1 class="unsupported-browser__title center" =""> ' +
      'К сожалению, мы не поддерживаем Ваш браузер' +
    '</h1>' +
  '</div>' +
  '<div class="unsupported-browser__browsers-container" = "" > ' +
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
  '</a>' +
  '<a href = "https://www.opera.com/ru" class="unsupported-browser__chrome-text" = "" > Firefox</a > ' +
  '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

  var mainTemplate = '<div class="unsupported-browser">' +
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
      '<div class="unsupported-browser__old-site-version" ="">' +
        'Пожалуйста перейдите на предыдущую версию сайта ' +
        '<a class="unsupported-browser__link" href="' + fallbackUrl + '">' + fallbackUrl + '</a>' +
      '</div>' +
      '<div class="unsupported-browser__instruction">' +
      '<div class="unsupported-browser__instruction-text">' +
        'и нажмите "авторизоваться", следуя инструкции ниже'+
      '</div>' +
      '<div class="unsupported-browser__instruction-img">' +
        '<img src="https://res.cloudinary.com/duz1yo4sl/image/upload/v1570110752/instruction.png" >' +
      '</div>'
      '<div style="clear: both;"></div>'
    '</div>' +
  '</div>' +
'</div>' +
'</div>';

  var template = '';
  var isValidBrowserVersion = true;
  var clientBrowser = bowser.getParser(navigator.userAgent);
  var clientOS = clientBrowser.getOSVersion();
  var XP = clientOS === 'NT 5.1' || clientOS === 'NT 5.1' || clientOS === 'NT 5.2';
  var clientBrowserEngine = clientBrowser.parseEngine().name;
  var unsupportedEngine = clientBrowserEngine === 'EdgeHTML' || clientBrowserEngine === 'Trident';

  if (clientBrowser.is('Chrome') ) {
    isValidBrowserVersion = clientBrowser.satisfies({ chrome: '>49.0.2623.112' });
  }

  if (clientBrowserEngine === 'EdgeHTML') {
    w.location.href = fallbackUrl;
  }

  if (XP) {
    template = mainTemplate;
  } else {
    template = browsersTemplate;
  }

  if (!isValidBrowserVersion || unsupportedEngine) {
    d.body = renderBrowserError;
    d.body.style.margin = '0px';
    d.documentElement.style.height = '100%';
    d.body.style.height = '100%';
    d.head.appendChild(css);
  }

  renderBrowserError.innerHTML = template;

})(window, document, 'https://old.tstarter.ru/store/')

