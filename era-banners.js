/*
 *  era-banners.js — ротация баннеров 468x60 для архива old.osipov.ru
 *  ---------------------------------------------------------------------
 *  На сайте стояли баннерообменники (Russian Link Exchange, InterReklama),
 *  отдававшие случайный баннер 468x60 при каждой загрузке. Сети давно мертвы.
 *  Здесь крутятся ПОДЛИННЫЕ баннеры той эпохи (из архивов автора и сетей
 *  NN.RU): на старте — случайный, дальше меняются раз в несколько секунд,
 *  воспроизводя поведение баннерообменника.
 */
(function () {
  var BANNERS = [
    'nnbn.gif',           // NNBN — Нижегородская баннерная сеть
    'yarmarka.gif',       // Нижегородская ярмарка / Автофорум 2000
    'autobanner_f2.gif',  // АвтоБаннер / Формата 2
    'anek2.jpg',          // www.anekdot.nn.ru — «Yahoo по анекдотам»
    'naubaner9.jpg',      // www.auto.nn.ru — «Заходи, Садись, Поехали»
    'irads.gif'           // InterReklama — баннерная сеть
  ];

  // путь к баннерам относительно расположения этого скрипта
  // (на страницах в корне — "", в подпапке ref/ — "../")
  var base = '';
  var s = document.querySelector('script[src$="era-banners.js"]');
  if (s) { var src = s.getAttribute('src'); base = src.slice(0, src.length - 'era-banners.js'.length); }

  function url(n) {
    var len = BANNERS.length;
    return base + BANNERS[((n % len) + len) % len];
  }

  function start() {
    var imgs = document.querySelectorAll('img.rle-banner');
    for (var i = 0; i < imgs.length; i++) {
      (function (img, k) {
        var idx = Math.floor(Math.random() * BANNERS.length) + k;
        img.src = url(idx);
        setInterval(function () { idx++; img.src = url(idx); }, 7000);
      })(imgs[i], i);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
