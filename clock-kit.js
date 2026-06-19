/*
 *  clock-kit.js — интерактивный «конструктор часов» для c_conkit.htm.
 *  -----------------------------------------------------------------------
 *  Реконструкция апплета-конструктора Clockconkit.class (1997, автор iLya).
 *  Оригинальный апплет давал менять параметры часов и сразу видеть результат,
 *  а понравившийся вариант — скопировать. Java-апплеты больше не работают;
 *  здесь то же самое на JS: меняешь параметры → живой предпросмотр (через
 *  clock-canvas.js) → готовый код для вставки на свою страницу.
 *  Оригинальный класс сохранён как история в original-java/Clockconkit.class.
 */
(function () {
  // Циферблаты, доступные в архиве (часть исходного списка утрачена: dashb8,
  // comp, incomb не сохранились ни в одной копии).
  var FACES = ['rol.gif', 'globe.gif', 'sunset.gif', 'view.gif', 'round1.gif', 'nz.gif',
               'dashb1.gif', 'dashb2.gif', 'dashb3.gif', 'dashb4.gif', 'dashb5.gif',
               'dashb6.gif', 'dashb7.gif'];
  var BASE = 'https://old.osipov.ru/';

  function row(label, ctrl) {
    return '<tr><td align=right valign=middle>' + label + ':</td><td>' + ctrl + '</td></tr>';
  }

  function build() {
    var root = document.getElementById('clock-kit');
    if (!root) return;

    var st = { image: 'rol.gif', width: 76, height: 84, textsize: 14,
               handcolor: '#000000', shadowcolor: '#888877', bgcolor: '#eeeedd',
               textcolor: '#771100', timeoffset: '' };

    var faceOpts = FACES.map(function (f) {
      return '<option value="' + f + '"' + (f === st.image ? ' selected' : '') + '>' + f + '</option>';
    }).join('');

    root.innerHTML =
      '<table border=1 cellpadding=8 bgcolor=#E0E0E0 style="margin:0 auto"><tr>' +
        '<td valign=top><b>Параметры</b>' +
          '<table cellpadding=2 style="font-size:13px">' +
            row('Циферблат', '<select id=k_image>' + faceOpts + '</select>') +
            row('Ширина',    '<input id=k_width type=number min=20 max=400 value=' + st.width + ' size=4>') +
            row('Высота',    '<input id=k_height type=number min=20 max=400 value=' + st.height + ' size=4>') +
            row('Размер текста', '<input id=k_textsize type=number min=6 max=40 value=' + st.textsize + ' size=4>') +
            row('Стрелки',   '<input id=k_handcolor type=color value=' + st.handcolor + '>') +
            row('Тень',      '<input id=k_shadowcolor type=color value=' + st.shadowcolor + '>') +
            row('Фон',       '<input id=k_bgcolor type=color value=' + st.bgcolor + '>') +
            row('Текст',     '<input id=k_textcolor type=color value=' + st.textcolor + '>') +
            row('Сдвиг, мин', '<input id=k_timeoffset type=number value="" size=5 placeholder="местное"> <span style="font-size:11px">180 = Москва</span>') +
          '</table>' +
        '</td>' +
        '<td valign=top align=center><b>Предпросмотр</b><br><br>' +
          '<canvas id=k_preview class="ilya-clock" width=' + st.width + ' height=' + st.height + '></canvas>' +
        '</td>' +
      '</tr><tr>' +
        '<td colspan=2><b>Код для вставки на вашу страницу</b> (выделите мышью и скопируйте):<br>' +
          '<textarea id=k_code readonly rows=4 style="width:100%;font-family:monospace;font-size:12px"></textarea>' +
        '</td>' +
      '</tr></table>';

    var preview = document.getElementById('k_preview');

    function paramString(absolute) {
      var s = 'image=' + (absolute ? BASE : '') + st.image +
              ' shadowcolor=' + st.shadowcolor + ' bgcolor=' + st.bgcolor +
              ' textcolor=' + st.textcolor + ' handcolor=' + st.handcolor +
              ' textsize=' + st.textsize;
      var off = parseInt(st.timeoffset, 10);
      if (st.timeoffset !== '' && !isNaN(off)) s += ' timeoffset=' + off;
      return s;
    }

    function refresh() {
      preview.width = st.width;
      preview.height = st.height;
      preview.setAttribute('data-clock', paramString(false));
      if (window.IlyaClock) window.IlyaClock.start(preview);
      document.getElementById('k_code').value =
        '<canvas class="ilya-clock" width="' + st.width + '" height="' + st.height + '"\n' +
        '        data-clock="' + paramString(true) + '"></canvas>\n' +
        '<script src="' + BASE + 'clock-canvas.js"><\/script>';
    }

    function bind(id, key) {
      document.getElementById(id).addEventListener('input', function () {
        st[key] = this.value;
        refresh();
      });
    }
    ['image', 'width', 'height', 'textsize', 'handcolor', 'shadowcolor',
     'bgcolor', 'textcolor', 'timeoffset'].forEach(function (k) { bind('k_' + k, k); });

    refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
