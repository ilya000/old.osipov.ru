/*
 *  era-banners.js — ротация баннеров 468x60 для архива old.osipov.ru
 *  ---------------------------------------------------------------------
 *  На сайте стоял баннерообменник Russian Link Exchange (linkexchange.ru),
 *  который при каждой загрузке отдавал случайный баннер 468x60. Сама сеть
 *  давно мертва. Здесь крутятся ПОДЛИННЫЕ баннеры той эпохи (из архивов
 *  автора и партнёрских сетей NN.RU), так же случайно меняясь при загрузке —
 *  чтобы воспроизвести поведение оригинального баннерообменника.
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
  function rotate() {
    var imgs = document.querySelectorAll('img.rle-banner');
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].src = BANNERS[Math.floor(Math.random() * BANNERS.length)];
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rotate);
  } else {
    rotate();
  }
})();
