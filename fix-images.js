/*
 *  fix-images.js — добавлено при восстановлении (не оригинал).
 *  Прячет «битые» картинки: на сайте остались ссылки на давно закрытые
 *  внешние сервисы (счётчики, кнопки, баннеры — inforis.ru, other-world.com,
 *  nn.ru, ilya.nn.ru и т.п.). Их картинки больше не отдаются, и браузер
 *  показывал бы иконку «сломанного изображения». Локальные картинки грузятся
 *  нормально и не затрагиваются — прячется только то, что реально не
 *  загрузилось.
 */
(function () {
  function hide(img) {
    if (img && img.tagName === 'IMG' && img.complete && img.naturalWidth === 0) {
      img.style.display = 'none';
    }
  }
  // будущие ошибки загрузки (фаза перехвата — ловит даже не-всплывающие error)
  document.addEventListener('error', function (e) {
    var t = e.target;
    if (t && t.tagName === 'IMG') t.style.display = 'none';
  }, true);
  // уже не загрузившиеся к этому моменту
  function sweep() {
    var imgs = document.images, k;
    for (k = 0; k < imgs.length; k++) hide(imgs[k]);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sweep);
  } else {
    sweep();
  }
  window.addEventListener('load', sweep);
})();
