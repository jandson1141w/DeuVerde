/* Deu Verde — scripts. JavaScript puro, sem bibliotecas. */
(function () {
  "use strict";

  var doc = document;
  doc.documentElement.classList.add("js");

  // ---------- Modo claro / escuro ----------
  var root = doc.documentElement;
  var themeBtn = doc.querySelector(".theme-toggle");
  var themeMeta = doc.querySelector('meta[name="theme-color"]');
  var themeColors = { light: "#ffffff", dark: "#050d09" };
  var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function storedTheme() {
    try {
      var t = localStorage.getItem("dv-theme");
      return t === "light" || t === "dark" ? t : null;
    } catch (e) { return null; }
  }

  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    if (themeMeta) themeMeta.setAttribute("content", themeColors[t]);
    if (themeBtn) {
      themeBtn.setAttribute("aria-label", t === "dark" ? "Ativar modo claro" : "Ativar modo escuro");
    }
  }

  applyTheme(root.getAttribute("data-theme") || (mq && mq.matches ? "dark" : "light"));

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("dv-theme", next); } catch (e) {}
    });
  }

  // Se a pessoa nunca escolheu, acompanha o tema do sistema
  if (mq && mq.addEventListener) {
    mq.addEventListener("change", function (e) {
      if (!storedTheme()) applyTheme(e.matches ? "dark" : "light");
    });
  }

  // ---------- Menu mobile ----------
  var toggle = doc.querySelector(".nav-toggle");
  var menu = doc.getElementById("menu");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.classList.toggle("open", open);
    doc.body.classList.toggle("menu-open", open);
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  // ---------- Link ativo conforme a seção visível ----------
  var links = Array.prototype.slice.call(doc.querySelectorAll(".nav a"));
  var sections = links
    .map(function (a) { return doc.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  // ---------- Animação de entrada ----------
  var reveals = doc.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  // ---------- Contador das metas ----------
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var counters = doc.querySelectorAll(".count");

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-target"), 10);
    if (isNaN(target) || reduceMotion) { el.textContent = target; return; }
    var duration = 1200;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { c.textContent = "0"; co.observe(c); });
  }

  // ---------- Protótipo interativo ----------
  var content = {
    denunciar: {
      title: "Denunciar problema",
      text: "Registre um descarte irregular com foto e localização. A equipe analisa os registros para reduzir informações falsas ou duplicadas e, quando houver parceria ou canal apropriado, encaminha a ocorrência à entidade responsável.",
      note: "A plataforma não substitui os canais oficiais de denúncia."
    },
    pontos: {
      title: "Pontos de coleta",
      text: "Escolha o tipo de material e veja os locais que o recebem, com endereço, materiais aceitos e horário de funcionamento. A empresa busca manter esses dados atualizados.",
      note: "Informações exibidas sempre que estiverem disponíveis e confirmadas."
    },
    assistente: {
      title: "Assistente virtual",
      text: "Receba orientações sobre como descartar corretamente cada tipo de material, de celulares e computadores a pilhas e baterias.",
      note: ""
    },
    campanhas: {
      title: "Campanhas",
      text: "Acompanhe ações e iniciativas ambientais verificadas, com conteúdos sobre os riscos do descarte incorreto e a importância da reciclagem.",
      note: "Em uma versão futura: acompanhamento das denúncias e notificações sobre atualizações dos pontos de coleta."
    }
  };

  var tabs = Array.prototype.slice.call(doc.querySelectorAll(".phone-buttons [role=tab]"));
  var panel = doc.getElementById("painel-proto");
  var titleEl = doc.getElementById("proto-title");
  var textEl = doc.getElementById("proto-text");

  function selectTab(tab) {
    var data = content[tab.getAttribute("data-key")];
    if (!data) return;
    tabs.forEach(function (t) {
      t.setAttribute("aria-selected", String(t === tab));
      t.tabIndex = t === tab ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", tab.id);
    titleEl.textContent = data.title;
    textEl.textContent = data.text;
    var noteEl = panel.querySelector(".note");
    if (noteEl) {
      noteEl.textContent = data.note;
      noteEl.hidden = !data.note;
    }
  }

  tabs.forEach(function (tab, i) {
    tab.tabIndex = i === 0 ? 0 : -1;
    tab.addEventListener("click", function () { selectTab(tab); });
    tab.addEventListener("keydown", function (e) {
      var idx = tabs.indexOf(tab);
      var next = null;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next = tabs[(idx + 1) % tabs.length];
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = tabs[(idx - 1 + tabs.length) % tabs.length];
      if (next) { e.preventDefault(); next.focus(); selectTab(next); }
    });
  });
})();
