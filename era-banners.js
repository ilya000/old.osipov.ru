/*
 *  era-banners.js — атмосферная ротация баннеров для архива old.osipov.ru
 *  ---------------------------------------------------------------------
 *  Это НЕ оригинальные баннеры. На сайте стоял баннерообменник Russian
 *  Link Exchange (linkexchange.ru), который при каждой загрузке отдавал
 *  случайный баннер 468x60. Сама сеть давно мертва, картинки утрачены.
 *  Здесь — новодел в духе 1997-98: три период-стилизованных баннера,
 *  которые так же случайно меняются при загрузке — только для атмосферы.
 */
(function () {
  var BANNERS = ['rle_banner1.gif', 'rle_banner2.gif', 'rle_banner3.gif'];
  function rotate() {
    var imgs = document.querySelectorAll('img.rle-banner');
    for (var i = 0; i < imgs.length; i++) {
      // разнообразие без Math.random-зависимости от времени: по индексу + длине
      var pick = (i + imgs.length + (location.pathname.length || 0)) % BANNERS.length;
      imgs[i].src = BANNERS[Math.floor(Math.random() * BANNERS.length) || pick];
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rotate);
  } else {
    rotate();
  }
})();
