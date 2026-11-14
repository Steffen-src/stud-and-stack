/* StudStack portfolio experience 1.3.0 — local-only merchandising helpers. */
(() => {
  "use strict";
  let api,
    bound = false,
    lastSource = null,
    currentAngle = "iso",
    activeId = null,
    detailKey = null;
  const words = {
    en: {
      recent: "Recently explored",
      recentSub: "Pick up where your curiosity left off.",
      clear: "Clear history",
      views: "Explore the details",
      iso: "Perspective",
      front: "Front",
      side: "Side",
      top: "Above",
      large: "Larger view",
      small: "Compact view",
      colour: "Colour",
      condition: "Condition",
      new: "New",
      used: "Used",
      stock: "Available sample stock",
      size: "Footprint",
      height: "Relative height",
      studs: "studs",
      unit: "brick height",
      approx:
        "Simplified dimensions for this portfolio model; not an official technical drawing.",
      available: "Available variants",
      notAvailable: "This combination is not in the sample catalogue.",
      conditionHelp:
        "New and used variants have their own illustrative prices and stock.",
      compare: "Check missing pieces",
      required: "Required",
      inBag: "In your bag",
      missing: "Missing",
      missingTitle: "Your build, piece by piece",
      compareHint:
        "This compares the build with your current shopping bag, not a personal collection. All stock and prices are illustrative.",
      allReady: "All required pieces are already in your bag.",
      missingTotal: "Additional parts total",
      addMissing: "Add missing pieces",
      bag: "Open shopping bag",
      added: "Missing pieces added.",
      stockError:
        "Some pieces exceed the available sample stock. Nothing was added.",
      parts: "pieces",
      preview: "Portfolio preview · No real order or payment",
      save: "Save design",
      designs: "My saved designs",
      empty: "You have not saved a design yet.",
      load: "Open design",
      remove: "Delete design",
      saved: "Design saved on this device.",
      limit: "You can save up to 12 designs. Delete one before saving another.",
      deleteConfirm:
        "Delete this saved design? Your current canvas will remain unchanged.",
      cancel: "Cancel",
      delete: "Delete",
      local: "Saved only in this browser. No account or cloud sync.",
      error:
        "The browser could not save this design. Please check available storage.",
      restore:
        "Replace the current canvas with this saved design? You can undo the change.",
      addedToBag: "Added to your bag",
    },
    de: {
      recent: "Zuletzt entdeckt",
      recentSub: "Mach dort weiter, wo deine Neugier begonnen hat.",
      clear: "Verlauf leeren",
      views: "Details entdecken",
      iso: "Perspektive",
      front: "Vorne",
      side: "Seite",
      top: "Oben",
      large: "Großansicht",
      small: "Kompakte Ansicht",
      colour: "Farbe",
      condition: "Zustand",
      new: "Neu",
      used: "Gebraucht",
      stock: "Verfügbarer Beispielbestand",
      size: "Grundfläche",
      height: "Relative Höhe",
      studs: "Noppen",
      unit: "Steinhöhe",
      approx:
        "Vereinfachte Maße dieses Portfolio-Modells, keine offizielle technische Zeichnung.",
      available: "Verfügbare Varianten",
      notAvailable: "Diese Kombination ist im Beispielkatalog nicht vorhanden.",
      conditionHelp:
        "Neue und gebrauchte Varianten besitzen eigene Beispielpreise und Bestände.",
      compare: "Fehlende Teile prüfen",
      required: "Benötigt",
      inBag: "Im Warenkorb",
      missing: "Fehlend",
      missingTitle: "Dein Bauprojekt, Teil für Teil",
      compareHint:
        "Verglichen wird mit deinem aktuellen Warenkorb, nicht mit einer persönlichen Sammlung. Bestände und Preise sind Beispiele.",
      allReady: "Alle benötigten Teile sind bereits im Warenkorb.",
      missingTotal: "Preis der zusätzlichen Teile",
      addMissing: "Fehlende Teile hinzufügen",
      bag: "Warenkorb öffnen",
      added: "Fehlende Teile hinzugefügt.",
      stockError:
        "Einige Teile überschreiten den Beispielbestand. Es wurde nichts hinzugefügt.",
      parts: "Teile",
      preview: "Portfolio-Vorschau · Keine echte Bestellung oder Zahlung",
      save: "Entwurf speichern",
      designs: "Meine gespeicherten Entwürfe",
      empty: "Du hast noch keinen Entwurf gespeichert.",
      load: "Entwurf öffnen",
      remove: "Entwurf löschen",
      saved: "Entwurf auf diesem Gerät gespeichert.",
      limit:
        "Du kannst bis zu 12 Entwürfe speichern. Lösche vorher einen bestehenden Entwurf.",
      deleteConfirm:
        "Diesen gespeicherten Entwurf löschen? Die aktuelle Baufläche bleibt erhalten.",
      cancel: "Abbrechen",
      delete: "Löschen",
      local:
        "Nur in diesem Browser gespeichert. Kein Konto und keine Cloud-Synchronisierung.",
      error:
        "Der Browser konnte den Entwurf nicht speichern. Bitte prüfe den verfügbaren Speicher.",
      restore:
        "Die aktuelle Baufläche durch diesen Entwurf ersetzen? Der Schritt lässt sich rückgängig machen.",
      addedToBag: "Zum Warenkorb hinzugefügt",
    },
  };
  const tr = (k) => words[api?.language() === "de" ? "de" : "en"][k] || k;
  const esc = (s) =>
    String(s ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  function history() {
    try {
      const list = JSON.parse(
        localStorage.getItem("studstack-recent-v1") || "[]",
      );
      return Array.isArray(list)
        ? list.filter((k) => api.products.some((p) => p.key === k)).slice(0, 6)
        : [];
    } catch {
      return [];
    }
  }
  function remember(p) {
    const list = [p.key, ...history().filter((k) => k !== p.key)].slice(0, 6);
    try {
      localStorage.setItem("studstack-recent-v1", JSON.stringify(list));
    } catch {}
    renderRecent();
  }
  function renderRecent() {
    let el = api.host.querySelector("#ex-recent");
    if (!el) {
      el = document.createElement("section");
      el.id = "ex-recent";
      el.className = "wrap ex-recent";
      api.host.querySelector("main:not(#ss-creative)").append(el);
    }
    const items = history();
    el.hidden = !items.length;
    el.innerHTML = `<div class="ex-section-head"><div><div class="eyebrow">${tr("recent")}</div><h2>${tr("recentSub")}</h2></div><button data-exp="clearrecent">${tr("clear")}</button></div><div class="ex-recent-grid">${items
      .map((key) => {
        const p = api.products.find((p) => p.key === key);
        return `<button class="ex-recent-card" data-act="product" data-key="${key}"><img src="${api.img(p)}" width="480" height="320" alt="${esc(api.pname(p))}"><span><strong>${esc(api.pname(p))}</strong><small>${p.id} · ${api.colorName(p)}</small><b>${api.money(p.price)}</b></span></button>`;
      })
      .join("")}</div>`;
  }
  function detail(p) {
    detailKey = p.key;
    if (activeId !== p.id) {
      activeId = p.id;
      currentAngle = "iso";
    }
    remember(p);
    const variants = api.products.filter((v) => v.id === p.id),
      colours = [...new Set(variants.map((v) => v.color))];
    api.openModal(
      api.pname(p),
      `<div class="ex-detail"><div><div class="ex-visual"><div class="ex-product-view"><img src="${api.img(p)}" width="480" height="320" alt="${esc(api.pname(p) + " · " + api.colorName(p))}"></div><button class="ex-enlarge" data-exp="enlarge">⤢ ${tr("large")}</button></div><div class="ex-angle-tabs">${["iso", "front", "side", "top"].map((v, i) => `<button data-exp="angle" data-value="${v}" aria-pressed="${currentAngle === v}">${tr(v)}</button>`).join("")}</div><dl class="ex-dimensions"><div><dt>${tr("size")}</dt><dd>${p.ny} × ${p.nx} ${tr("studs")}</dd></div><div><dt>${tr("height")}</dt><dd>${p.h.toLocaleString(api.language())} × ${tr("unit")}</dd></div></dl><p class="ex-fine">${tr("approx")}</p></div><div class="ex-product-info"><div class="eyebrow">${p.id} · ${tr(p.condition)}</div><h3>${esc(api.pname(p))}</h3><p>${api.colorName(p)} · ${tr(p.condition)}</p><div class="price">${api.money(p.price)}<small>${api.language() === "de" ? "/ Stück" : "/ piece"}</small></div><h4>${tr("colour")}</h4><div class="ex-colours">${colours
        .map((c) => {
          const same = variants.find(
              (v) => v.color === c && v.condition === p.condition,
            ),
            other = same || variants.find((v) => v.color === c);
          const col = api.colors.find((x) => x[0] === c);
          return `<button data-exp="variant" data-value="${other.key}" aria-label="${col[api.language() === "de" ? 3 : 2]} · ${tr(other.condition)}" aria-pressed="${p.color === c}" title="${col[api.language() === "de" ? 3 : 2]} · ${tr(other.condition)}"><i style="background:${col[1]}"></i><small>${col[api.language() === "de" ? 3 : 2]}</small></button>`;
        })
        .join("")}</div><h4>${tr("condition")}</h4><div class="ex-condition">${[
        "new",
        "used",
      ]
        .map((c) => {
          const match = variants.find(
            (v) => v.condition === c && v.color === p.color,
          );
          return `<button data-exp="variant" data-value="${match?.key || ""}" ${match ? "" : "disabled"} aria-pressed="${p.condition === c}" title="${match ? tr(c) : tr("notAvailable")}">${tr(c)}</button>`;
        })
        .join(
          "",
        )}</div><p class="ex-fine">${tr("conditionHelp")}</p><div class="ex-stock"><i></i>${p.stock.toLocaleString(api.language())} · ${tr("stock")}</div><div class="buyrow">${api.qtyHTML(p, 1, "detail")}<button class="button blue" data-act="add" data-key="${p.key}" data-context="detail">${api.language() === "de" ? "In den Warenkorb" : "Add to bag"} →</button></div><p class="ex-fine">${tr("preview")}</p></div></div>`,
      "product",
    );
    const container = api.host.querySelector(".ex-product-view");
    window.StudStack3D?.product(container, p);
    const expand = api.host.querySelector(".ex-enlarge");
    if (expand)
      expand.textContent =
        "⤢ " +
        tr(
          api.host.querySelector("dialog").classList.contains("ex-expanded")
            ? "small"
            : "large",
        );
    reveal();
  }
  let compareData = null;
  function compare(layout, label) {
    const required = new Map();
    layout.forEach((b) => required.set(b.key, (required.get(b.key) || 0) + 1));
    const committed = api.cartParts();
    const rows = [...required].map(([key, q]) => {
      const p = api.products.find((p) => p.key === key),
        have = Math.min(q, committed[key] || 0);
      return { key, p, q, have, missing: q - have };
    });
    compareData = rows
      .filter((r) => r.missing)
      .map((r) => ({ key: r.key, q: r.missing }));
    const total = rows.reduce((n, r) => n + r.missing * r.p.price, 0);
    api.openModal(
      tr("missingTitle"),
      `<div class="ex-comparison"><div class="eyebrow">${esc(label)}</div><p>${tr("compareHint")}</p><div class="ex-compare-list"><div class="ex-compare-head"><span>${tr("parts")}</span><span>${tr("required")}</span><span>${tr("inBag")}</span><span>${tr("missing")}</span></div>${rows.map((r) => `<div class="ex-compare-row"><span><img src="${api.img(r.p)}" width="480" height="320" alt=""><span><b>${esc(api.pname(r.p))}</b><small>${r.p.id} · ${api.colorName(r.p)} · ${tr(r.p.condition)}</small></span></span><b>${r.q}</b><b>${r.have}</b><b class="${r.missing ? "ex-short" : "ex-complete"}">${r.missing || "✓"}</b></div>`).join("")}</div><div class="ex-compare-total"><span>${tr("missingTotal")}</span><b>${api.money(total)}</b></div>${!compareData.length ? `<p class="ex-ready">✓ ${tr("allReady")}</p>` : ""}<div class="ex-compare-actions"><button class="button outline" data-exp="bag">${tr("bag")}</button><button class="button blue" data-exp="addmissing" ${compareData.length ? "" : "disabled"}>${tr("addMissing")} →</button></div></div>`,
      "comparison",
    );
    reveal();
  }
  function added(p) {
    const target = api.host.querySelector('[data-act="cart"]');
    if (!target || reduced()) return;
    target.animate?.(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.18)" },
        { transform: "scale(1)" },
      ],
      { duration: 340 },
    );
    if (!p || !lastSource) return;
    const dst = target.getBoundingClientRect(),
      img = document.createElement("img");
    img.className = "ex-flying-part";
    img.src = api.img(p);
    img.alt = "";
    Object.assign(img.style, {
      left: lastSource.x + "px",
      top: lastSource.y + "px",
      width: "72px",
      height: "48px",
    });
    (api.host.querySelector("dialog[open]") || document.body).append(img);
    const animation = img.animate?.(
      [
        { transform: "translate(0,0) scale(1)", opacity: 1 },
        {
          transform: `translate(${dst.x - lastSource.x}px,${dst.y - lastSource.y}px) scale(.18)`,
          opacity: 0,
        },
      ],
      { duration: 520, easing: "cubic-bezier(.3,.1,.25,1)" },
    );
    if (animation)
      animation.finished.then(() => img.remove()).catch(() => img.remove());
    else img.remove();
  }
  let revealObserver;
  function reveal() {
    if (!api) return;
    if (!revealObserver)
      revealObserver = new IntersectionObserver(
        (entries) => {
          for (const e of entries)
            if (e.isIntersecting) {
              e.target.classList.remove("ex-pending");
              revealObserver.unobserve(e.target);
            }
        },
        { threshold: 0.06 },
      );
    for (const el of api.host.querySelectorAll(
      ".cs-project,.ss3d-entry,.ex-recent-card",
    )) {
      if (el.dataset.exSeen) continue;
      el.dataset.exSeen = "1";
      if (!reduced()) {
        el.classList.add("ex-reveal", "ex-pending");
        revealObserver.observe(el);
      }
    }
  }
  function mount(input) {
    api = input;
    renderRecent();
    reveal();
    if (bound) return;
    bound = true;
    api.host.addEventListener(
      "click",
      (e) => {
        const act = e.target.closest(
          '[data-act="add"],[data-cs="add"],[data-cs="get"]',
        );
        if (act) {
          const r = act.getBoundingClientRect();
          lastSource = { x: r.x + r.width / 2 - 36, y: r.y - 30 };
        }
      },
      true,
    );
    api.host.addEventListener("click", (e) => {
      const b = e.target.closest("[data-exp]");
      if (!b) return;
      const a = b.dataset.exp,
        v = b.dataset.value;
      if (a === "variant" && v) api.openProduct(v);
      if (a === "angle") {
        currentAngle = v;
        window.StudStack3D?.productView(v);
        api.host
          .querySelectorAll('[data-exp="angle"]')
          .forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      }
      if (a === "enlarge") {
        const dlg = api.host.querySelector("dialog");
        dlg.classList.toggle("ex-expanded");
        b.textContent =
          "⤢ " + tr(dlg.classList.contains("ex-expanded") ? "small" : "large");
      }
      if (a === "clearrecent") {
        try {
          localStorage.removeItem("studstack-recent-v1");
        } catch {}
        renderRecent();
      }
      if (a === "bag") api.openCart();
      if (a === "addmissing" && compareData?.length) {
        if (api.addMissing(compareData)) {
          api.toast(tr("added"));
          api.openCart();
        } else api.toast(tr("stockError"));
      }
    });
    const observer = new MutationObserver(() => reveal());
    observer.observe(api.host, { childList: true, subtree: true });
  }
  window.addEventListener("studstack3d-ready", () =>
    queueMicrotask(() => {
      const el = api?.host.querySelector(
        'dialog[open][data-kind="product"] .ex-product-view',
      );
      const p = api?.products.find((p) => p.key === detailKey);
      if (el && p) window.StudStack3D?.product(el, p);
    }),
  );
  window.StudStackExperience = {
    mount,
    detail,
    compare,
    added,
    words: () => words[api?.language() === "de" ? "de" : "en"],
    reveal,
  };
})();
