/*
 *  clock-canvas.js — живые часы для архива old.osipov.ru
 *  -----------------------------------------------------------------------
 *  Это НЕ оригинальный код. Оригинальные часы 1997 (автор iLya; по штампу
 *  "Created 24'09.97" и копирайту "(C),97" на страницах часов) — это
 *  Java-апплеты Clock.class и Clockconkit.class. Они не запускаются ни
 *  в одном современном браузере (поддержка Java-апплетов прекращена ~2017),
 *  и исходник Clock.java не сохранился — уцелел только скомпилированный
 *  байт-код. Оригинальные классы лежат в папке original-java/ как история.
 *
 *  Эта реализация ВОССТАНОВЛЕНА АВТОМАТИЧЕСКИ по строкам/именам методов
 *  внутри Clock.class / Clockconkit.class (image=, handcolor=, shadowcolor=,
 *  bgcolor=, textcolor=, textsize=, TimeOffset=, getHours/getMinutes/
 *  getSeconds, drawImage, drawLine). Это аналоговые часы: картинка-циферблат
 *  как фон + часовая/минутная/секундная стрелки с тенью поверх неё.
 *
 *  Читает ту же строку параметров, что и оригинальный апплет, например:
 *    image=rol.gif shadowcolor=#888877 bgcolor=#EEEEDD textcolor=#771100
 *    handcolor=#000000 textsize=14 timeoffset=180
 *  timeoffset — в минутах от GMT (180 = Москва, +3 ч).
 *
 *  Прорисовка даты текстом (textcolor/textsize) в оригинале была, но её
 *  точное расположение по байт-коду без JRE не восстановить, поэтому здесь
 *  не воспроизводится — рисуется только аналоговый циферблат и стрелки.
 */
(function () {
  'use strict';

  function parseParams(str) {
    var p = {};
    (str || '').trim().split(/\s+/).forEach(function (tok) {
      var i = tok.indexOf('=');
      if (i > 0) p[tok.slice(0, i).toLowerCase()] = tok.slice(i + 1);
    });
    return p;
  }

  // Местное время с учётом timeoffset (минуты от GMT), как в оригинале.
  function nowWithOffset(offsetMin) {
    var d = new Date();
    if (offsetMin === null || isNaN(offsetMin)) return d;
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;
    return new Date(utc + offsetMin * 60000);
  }

  function hand(ctx, cx, cy, ang, len, w, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = w;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + len * Math.sin(ang), cy - len * Math.cos(ang));
    ctx.stroke();
  }

  // Запасной циферблат, если картинка утрачена (round1.gif, nz.gif, dashb2-7…).
  function fallbackDial(ctx, cx, cy, R, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = Math.max(1, R * 0.04);
    ctx.beginPath();
    ctx.arc(cx, cy, R - ctx.lineWidth, 0, 2 * Math.PI);
    ctx.stroke();
    for (var i = 0; i < 12; i++) {
      var a = i / 12 * 2 * Math.PI;
      var r1 = R * 0.80, r2 = R * 0.92;
      ctx.beginPath();
      ctx.moveTo(cx + r1 * Math.sin(a), cy - r1 * Math.cos(a));
      ctx.lineTo(cx + r2 * Math.sin(a), cy - r2 * Math.cos(a));
      ctx.stroke();
    }
    ctx.restore();
  }

  function makeDrawer(canvas, p, img) {
    var W = canvas.width, H = canvas.height;
    var ctx = canvas.getContext('2d');
    var cx = W / 2, cy = H / 2, R = Math.min(W, H) / 2;
    var hand_c = p.handcolor || '#000000';
    var shadow_c = p.shadowcolor || 'rgba(0,0,0,0.35)';
    var bg = p.bgcolor || null;
    var off = (p.timeoffset != null) ? parseInt(p.timeoffset, 10) : null;
    var sh = Math.max(1, R * 0.06); // сдвиг тени

    return function draw() {
      ctx.clearRect(0, 0, W, H);
      if (bg) { ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H); }
      if (img && img.complete && img.naturalWidth) {
        ctx.drawImage(img, 0, 0, W, H);
      } else {
        fallbackDial(ctx, cx, cy, R, hand_c);
      }

      var t = nowWithOffset(off);
      var h = t.getHours() % 12, m = t.getMinutes(), s = t.getSeconds();
      var aH = (h + m / 60) / 12 * 2 * Math.PI;
      var aM = (m + s / 60) / 60 * 2 * Math.PI;
      var aS = s / 60 * 2 * Math.PI;

      var wH = Math.max(2, R * 0.11), wM = Math.max(1.5, R * 0.075), wS = Math.max(1, R * 0.035);

      // тень
      ctx.save();
      ctx.translate(sh, sh);
      hand(ctx, cx, cy, aH, R * 0.50, wH, shadow_c);
      hand(ctx, cx, cy, aM, R * 0.78, wM, shadow_c);
      hand(ctx, cx, cy, aS, R * 0.90, wS, shadow_c);
      ctx.restore();

      // стрелки
      hand(ctx, cx, cy, aH, R * 0.50, wH, hand_c);
      hand(ctx, cx, cy, aM, R * 0.78, wM, hand_c);
      hand(ctx, cx, cy, aS, R * 0.90, wS, hand_c);

      // центральная ось
      ctx.fillStyle = hand_c;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(1.5, R * 0.06), 0, 2 * Math.PI);
      ctx.fill();
    };
  }

  function initOne(canvas) {
    var p = parseParams(canvas.getAttribute('data-clock'));
    var img = null;
    if (p.image) {
      img = new Image();
      img.src = p.image; // относительный путь, как у оригинала
    }
    var draw = makeDrawer(canvas, p, img);
    if (img) { img.onload = draw; img.onerror = draw; }
    draw();
    setInterval(draw, 1000);
  }

  function initAll() {
    var list = document.querySelectorAll('canvas.ilya-clock');
    for (var i = 0; i < list.length; i++) initOne(list[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
