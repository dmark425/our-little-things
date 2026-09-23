// 語言切換：預設跟瀏覽器語言，可手動切；記在 localStorage
(function () {
  var supported = ["zh-Hant", "zh-Hans", "ja", "ko", "es", "de", "fr", "en"];
  function pick() {
    try { var saved = localStorage.getItem("olt-lang"); if (saved && supported.indexOf(saved) >= 0) return saved; } catch (e) {}
    var langs = navigator.languages || [navigator.language || "en"];
    for (var i = 0; i < langs.length; i++) {
      var l = langs[i];
      if (/^zh-(Hant|TW|HK|MO)/i.test(l)) return "zh-Hant";
      if (/^zh/i.test(l)) return "zh-Hans";
      for (var j = 0; j < supported.length; j++) if (l.toLowerCase().indexOf(supported[j].toLowerCase()) === 0) return supported[j];
    }
    return "en";
  }
  function apply(lang) {
    document.querySelectorAll("section[data-lang]").forEach(function (s) { s.classList.toggle("active", s.dataset.lang === lang); });
    document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false"); });
    document.documentElement.lang = lang;
    try { localStorage.setItem("olt-lang", lang); } catch (e) {}
  }
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".lang button").forEach(function (b) { b.addEventListener("click", function () { apply(b.dataset.lang); }); });
    apply(pick());
  });
})();
