/* StudStack Creative Studio 1.3.0 — original SVG builder, no remote services. */
(() => {
  "use strict";
  const SIZE = 12,
    MAX_LAYER = 5,
    MAX_PARTS = 120;
  let api,
    root,
    current = "shop",
    selected = null,
    cursor = { x: 1, y: 1 },
    partId = "3003",
    variant = "",
    rotation = 0,
    layer = 0,
    tool = "place",
    model = [],
    undo = [],
    redo = [],
    name = "",
    delivery = "kit",
    message = "",
    zoom = 1;
  const words = {
    en: {
      build: "Build Your Own",
      discover: "Build & Discover",
      shop: "Shop parts",
      eyebrow: "YOUR IDEA. PIECE BY PIECE.",
      title: "Small pieces.\nEntirely your creation.",
      lead: "A little house, a pocket robot, or something only you could imagine. Pick your pieces and make it yours.",
      studio: "Creation studio",
      board: "Build canvas",
      boardHelp:
        "Click a grid position to place a piece. Arrow keys move the cursor; Enter places; R rotates. In Select mode, click a piece to select it.",
      place: "Place",
      select: "Select & move",
      shape: "01 · Choose your shape",
      colour: "02 · Pick a colour",
      levels: "03 · Build upwards",
      level: "Layer",
      ground: "Base",
      rotate: "Rotate piece",
      undo: "Undo",
      redo: "Redo",
      clear: "Start fresh",
      confirmClear: "Clear this creation? You can undo this action.",
      parts: "pieces",
      selected: "Selected piece",
      move: "Move to cursor",
      remove: "Remove piece",
      up: "Move up a layer",
      down: "Move down a layer",
      nothing: "Select a piece on the canvas or in the parts list.",
      name: "Name your creation",
      namePlaceholder: "My next big idea",
      fulfil: "How would you like it?",
      kit: "Send as a kit",
      kitDesc: "All your pieces, ready for you to build.",
      assembled: "Assemble it for me",
      assembledDesc: "A little help bringing your idea together.",
      assembly: "Assembly surcharge",
      feeRule: "20% of the parts price, minimum €2.95. Illustrative pricing.",
      partsPrice: "Parts",
      total: "Creation total",
      shipping: "Shipping calculated at checkout.",
      add: "Add creation to bag",
      empty: "Place your first piece to get started.",
      bill: "Your parts list",
      download: "Download build plan",
      notice:
        "Interactive preview: assembly, shipping and payment are simulated. This simplified builder checks overlap and basic support, not structural stability.",
      starter: "Need a spark?",
      starterText:
        "Start with an idea from the gallery, then make it your own.",
      browse: "Explore build ideas",
      placed: "Piece placed.",
      collision: "That space is occupied. Try another position or layer.",
      bounds: "Keep the whole piece inside the 12 × 12 base.",
      support:
        "This piece needs at least one supporting stud on the layer below.",
      above: "Remove or move the pieces above this one first.",
      limit: "This creation can contain up to 120 pieces.",
      removed: "Piece removed.",
      moved: "Piece moved.",
      saved: "Creation saved on this device.",
      available: "Available variants",
      new: "New",
      used: "Used",
      list: "Pieces in your creation",
      piece: "Piece",
      delete: "Delete",
      galleryEyebrow: "A LITTLE INSPIRATION. A LOT OF POSSIBILITY.",
      galleryTitle: "What will you build next?",
      galleryLead:
        "Six small ideas to start something bigger. Explore the plan, customise the colours or put the parts straight into your bag.",
      all: "All ideas",
      easy: "Easy",
      medium: "Intermediate",
      house: "Little corner house",
      houseDesc:
        "A colourful little home with a stepped roof and an open doorway. Make the neighbourhood your own.",
      robot: "Pocket companion",
      robotDesc:
        "A friendly block-built robot with bright eyes and a colourful personality.",
      racer: "Weekend racer",
      racerDesc:
        "A compact, abstract racer with a low body and a raised cockpit. Build it in your team colours.",
      time: "Approx. build time",
      minutes: "min",
      customize: "Customise this build",
      get: "Get the parts",
      instructions: "View build plan",
      plan: "Build plan",
      step: "Step",
      planIntro:
        "Build one layer at a time, from the base upwards. The highlighted pieces belong to this step.",
      previous: "Previous layer",
      next: "Next layer",
      toStudio: "Open in studio",
      replace:
        "Replace your current creation with this idea? Your current work remains available with Undo.",
      added: "Creation added to your bag.",
      stock:
        "Some pieces exceed the available sample stock. Reduce the quantity or change your selection.",
      colourNote:
        "Variants reflect the sample catalogue. Change shape to explore other colours.",
      selectedStatus: "Selected",
      cell: "Grid position",
      resetZoom: "Reset zoom",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      draft: "Your progress is saved in this browser.",
      preview: "Preview",
      kitLabel: "Build-it-yourself kit",
      assembledLabel: "Assembled creation",
      kitOnly: "Parts only. Assembly is optional in the studio.",
      downloaded: "Build plan downloaded.",
      connected:
        "Selected shapes, a 12 × 12 base and six layers. Explore freely within a small, deliberate toolkit.",
    },
    de: {
      build: "Selbst gestalten",
      discover: "Bauideen entdecken",
      shop: "Teile entdecken",
      eyebrow: "DEINE IDEE. TEIL FÜR TEIL.",
      title: "Kleine Teile.\nGanz deine Kreation.",
      lead: "Ein kleines Haus, ein Taschenroboter oder etwas, das nur du dir vorstellen kannst. Wähle deine Teile und mach sie zu deinem Projekt.",
      studio: "Deine Bauwerkstatt",
      board: "Baufläche",
      boardHelp:
        "Klicke auf ein Rasterfeld, um einen Stein zu setzen. Pfeiltasten bewegen den Cursor; Enter setzt; R dreht. Im Auswahlmodus einen Stein anklicken.",
      place: "Bauen",
      select: "Auswählen & bewegen",
      shape: "01 · Form auswählen",
      colour: "02 · Farbe wählen",
      levels: "03 · Nach oben bauen",
      level: "Ebene",
      ground: "Grundfläche",
      rotate: "Stein drehen",
      undo: "Rückgängig",
      redo: "Wiederholen",
      clear: "Neu beginnen",
      confirmClear:
        "Diese Kreation leeren? Du kannst den Schritt rückgängig machen.",
      parts: "Teile",
      selected: "Ausgewählter Stein",
      move: "Zum Cursor verschieben",
      remove: "Stein entfernen",
      up: "Eine Ebene höher",
      down: "Eine Ebene tiefer",
      nothing: "Wähle einen Stein auf der Baufläche oder in der Teileliste.",
      name: "Gib deiner Kreation einen Namen",
      namePlaceholder: "Meine nächste große Idee",
      fulfil: "Wie möchtest du sie erhalten?",
      kit: "Als Bausatz zuschicken",
      kitDesc: "Alle deine Teile – bereit zum Selbstbauen.",
      assembled: "Für mich zusammenbauen",
      assembledDesc: "Ein wenig Hilfe, um deine Idee zusammenzusetzen.",
      assembly: "Montageaufschlag",
      feeRule: "20 % des Teilepreises, mindestens 2,95 €. Beispielkalkulation.",
      partsPrice: "Teilepreis",
      total: "Preis der Kreation",
      shipping: "Versandberechnung im Checkout.",
      add: "Kreation in den Warenkorb",
      empty: "Setze deinen ersten Stein, um loszulegen.",
      bill: "Deine Teileliste",
      download: "Bauplan herunterladen",
      notice:
        "Interaktive Vorschau: Montage, Versand und Zahlung sind simuliert. Der vereinfachte Baukasten prüft Überschneidungen und einfache Auflage, keine statische Stabilität.",
      starter: "Noch keine Idee?",
      starterText:
        "Beginne mit einer Vorlage aus der Galerie und mach sie zu deiner eigenen.",
      browse: "Bauideen entdecken",
      placed: "Stein gesetzt.",
      collision:
        "Dieser Platz ist belegt. Wähle eine andere Position oder Ebene.",
      bounds: "Der ganze Stein muss auf die 12 × 12 Grundfläche passen.",
      support:
        "Der Stein benötigt mindestens einen Auflagepunkt auf der Ebene darunter.",
      above: "Entferne oder verschiebe zuerst die darüberliegenden Steine.",
      limit: "Eine Kreation kann bis zu 120 Teile enthalten.",
      removed: "Stein entfernt.",
      moved: "Stein verschoben.",
      saved: "Kreation auf diesem Gerät gespeichert.",
      available: "Verfügbare Varianten",
      new: "Neu",
      used: "Gebraucht",
      list: "Steine in deiner Kreation",
      piece: "Stein",
      delete: "Löschen",
      galleryEyebrow: "EIN WENIG INSPIRATION. VIELE MÖGLICHKEITEN.",
      galleryTitle: "Was baust du als Nächstes?",
      galleryLead:
        "Sechs kleine Ideen als Anfang für etwas Größeres. Entdecke den Bauplan, passe die Farben an oder lege die Teile direkt in deinen Warenkorb.",
      all: "Alle Ideen",
      easy: "Einfach",
      medium: "Fortgeschritten",
      house: "Kleines Eckhaus",
      houseDesc:
        "Ein buntes Häuschen mit abgestuftem Dach und offener Tür. Gestalte deine eigene Nachbarschaft.",
      robot: "Kleiner Begleiter",
      robotDesc:
        "Ein freundlicher Roboter aus Bausteinen mit leuchtenden Augen und buntem Charakter.",
      racer: "Wochenend-Rennwagen",
      racerDesc:
        "Ein kompakter, abstrakter Rennwagen mit flacher Karosserie und erhöhtem Cockpit. Baue ihn in deinen Teamfarben.",
      time: "Ungefähre Bauzeit",
      minutes: "Min.",
      customize: "Diese Idee anpassen",
      get: "Teile in den Warenkorb",
      instructions: "Bauplan ansehen",
      plan: "Bauplan",
      step: "Schritt",
      planIntro:
        "Baue Ebene für Ebene von unten nach oben. Die hervorgehobenen Steine gehören zu diesem Schritt.",
      previous: "Vorherige Ebene",
      next: "Nächste Ebene",
      toStudio: "In der Werkstatt öffnen",
      replace:
        "Deine aktuelle Kreation durch diese Idee ersetzen? Mit Rückgängig bleibt dein bisheriger Entwurf erreichbar.",
      added: "Kreation zum Warenkorb hinzugefügt.",
      stock:
        "Einige Teile überschreiten den Beispielbestand. Reduziere die Anzahl oder ändere die Auswahl.",
      colourNote:
        "Die Varianten stammen aus dem Beispielkatalog. Andere Formen bieten weitere Farben.",
      selectedStatus: "Ausgewählt",
      cell: "Rasterposition",
      resetZoom: "Zoom zurücksetzen",
      zoomIn: "Vergrößern",
      zoomOut: "Verkleinern",
      draft: "Dein Fortschritt wird in diesem Browser gespeichert.",
      preview: "Vorschau",
      kitLabel: "Bausatz zum Selbstbauen",
      assembledLabel: "Montierte Kreation",
      kitOnly: "Nur Teile. Montage ist in der Werkstatt optional.",
      downloaded: "Bauplan heruntergeladen.",
      connected:
        "Ausgewählte Formen, eine 12 × 12 Grundfläche und sechs Ebenen. Ein kleiner, übersichtlicher Baukasten für deine Ideen.",
    },
  };
  Object.assign(words.en, {
    tower: "Colour tower",
    towerDesc:
      "A miniature tower with alternating colours and a stepped crown. Make your own little skyline.",
    bridge: "Pocket bridge",
    bridgeDesc:
      "Two small piers and a colourful span. A compact idea to rebuild in your favourite colours.",
    bloom: "Mini bloom",
    bloomDesc:
      "A tiny block flower on a green base. A cheerful little build for your desk.",
  });
  Object.assign(words.de, {
    tower: "Bunter Turm",
    towerDesc:
      "Ein kleiner Turm mit wechselnden Farben und abgestufter Krone. Gestalte deine eigene Skyline.",
    bridge: "Kleine Brücke",
    bridgeDesc:
      "Zwei kleine Pfeiler und ein bunter Übergang. Eine kompakte Idee für deine Lieblingsfarben.",
    bloom: "Mini-Blüte",
    bloomDesc:
      "Eine kleine Baustein-Blume auf grüner Grundfläche. Ein fröhliches Bauprojekt für deinen Schreibtisch.",
  });
  const tr = (k) => words[api?.language() === "de" ? "de" : "en"][k] || k;
  const escape = (s) =>
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
  function dimensions(p, b) {
    return b.r ? [p.ny, p.nx] : [p.nx, p.ny];
  }
  function overlap(a, b, lookup) {
    const p = lookup[a.key],
      q = lookup[b.key];
    if (!p || !q) return false;
    const [w, h] = dimensions(p, a),
      [u, v] = dimensions(q, b);
    return a.x < b.x + u && a.x + w > b.x && a.y < b.y + v && a.y + h > b.y;
  }
  function validate(layout, products) {
    if (!Array.isArray(layout) || layout.length > MAX_PARTS) return false;
    const lookup = Object.fromEntries(products.map((p) => [p.key, p]));
    return layout.every((b, i) => {
      const p = lookup[b.key];
      if (
        !p ||
        p.h !== 1 ||
        ![b.x, b.y, b.z, b.r].every(Number.isInteger) ||
        b.r < 0 ||
        b.r > 1 ||
        b.x < 0 ||
        b.y < 0 ||
        b.z < 0 ||
        b.z > MAX_LAYER
      )
        return false;
      const [w, h] = dimensions(p, b);
      return (
        b.x + w <= SIZE &&
        b.y + h <= SIZE &&
        !layout.some(
          (c, j) => i !== j && c.z === b.z && overlap(b, c, lookup),
        ) &&
        (b.z === 0 ||
          layout.some((c) => c.z === b.z - 1 && overlap(b, c, lookup)))
      );
    });
  }
  const project = (x, y, z = 0) => [
    500 + (x - y) * 25,
    160 + (x + y) * 13 - z * 27,
  ];
  const points = (a) =>
    a.map((p) => p.map((n) => Math.round(n * 100) / 100).join(",")).join(" ");
  function shade(hex, f) {
    return (
      "#" +
      hex
        .replace("#", "")
        .match(/../g)
        .map((v) =>
          Math.min(255, Math.round(parseInt(v, 16) * f))
            .toString(16)
            .padStart(2, "0"),
        )
        .join("")
    );
  }
  function brick(b, lookup, options = {}) {
    const p = lookup[b.key];
    if (!p) return "";
    const [w, h] = dimensions(p, b),
      z = b.z;
    const a = project(b.x, b.y, z + 1),
      c = project(b.x + w, b.y, z + 1),
      d = project(b.x + w, b.y + h, z + 1),
      e = project(b.x, b.y + h, z + 1),
      cb = project(b.x + w, b.y, z),
      db = project(b.x + w, b.y + h, z),
      eb = project(b.x, b.y + h, z);
    const color =
      api?.colors.find((c) => c[0] === p.color)?.[1] ||
      options.colors?.find((c) => c[0] === p.color)?.[1] ||
      "#e53c30";
    const active = options.active === b.uid,
      opacity = options.dim && b.z !== options.layer ? ".24" : "1";
    let s = `<g data-brick="${b.uid ?? ""}" class="cs-brick" opacity="${opacity}"><polygon points="${points([c, d, db, cb])}" fill="${shade(color, 0.64)}"/><polygon points="${points([e, d, db, eb])}" fill="${shade(color, 0.8)}"/><polygon points="${points([a, c, d, e])}" fill="${color}" stroke="${active ? "#111" : "#ffffff55"}" stroke-width="${active ? 3 : 0.7}"/>`;
    for (let i = 0; i < w; i++)
      for (let j = 0; j < h; j++) {
        const [x, y] = project(b.x + i + 0.5, b.y + j + 0.5, z + 1);
        s += `<ellipse cx="${x}" cy="${y - 2}" rx="9" ry="5.2" fill="${shade(color, 0.88)}"/><ellipse cx="${x}" cy="${y - 5}" rx="9" ry="4.6" fill="${shade(color, 1.08)}" stroke="#ffffff55" stroke-width=".6"/>`;
      }
    return s + "</g>";
  }
  function svg(layout, products, options = {}) {
    const lookup = Object.fromEntries(products.map((p) => [p.key, p]));
    let base = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 610" ${options.interactive ? 'class="cs-canvas" tabindex="0" role="application" aria-label="' + escape(tr("board")) + '" aria-describedby="cs-key-help"' : 'role="img" aria-label="' + (api?.language() === "de" ? "Baustein-Kreation" : "Building block creation") + '"'}><ellipse cx="500" cy="452" rx="295" ry="80" fill="#0c243010"/><polygon points="${points([project(0, 0), project(12, 0), project(12, 12), project(0, 12)])}" fill="#e4e9ed" stroke="#c2cbd3" stroke-width="2"/>`;
    for (let x = 0; x < SIZE; x++)
      for (let y = 0; y < SIZE; y++) {
        const pp = project(x + 0.5, y + 0.5);
        base += `<polygon ${options.interactive ? `data-cell-x="${x}" data-cell-y="${y}"` : ""} points="${points([project(x, y), project(x + 1, y), project(x + 1, y + 1), project(x, y + 1)])}" fill="transparent" stroke="#c5cfd5" stroke-width=".55"/><ellipse cx="${pp[0]}" cy="${pp[1]}" rx="6" ry="3" fill="#c9d2d8" pointer-events="none"/>`;
      }
    base += layout
      .slice()
      .sort((a, b) => a.z - b.z || a.x + a.y - b.x - b.y)
      .map((b) => brick(b, lookup, options))
      .join("");
    if (options.interactive) {
      const p = lookup[variant];
      if (p) {
        const ghost = {
          key: variant,
          x: cursor.x,
          y: cursor.y,
          z: layer,
          r: rotation,
          uid: "ghost",
        };
        const [w, h] = dimensions(p, ghost);
        if (cursor.x + w <= SIZE && cursor.y + h <= SIZE) {
          base += `<g class="cs-cursor" pointer-events="none"><polygon points="${points([project(cursor.x, cursor.y, layer + 1), project(cursor.x + w, cursor.y, layer + 1), project(cursor.x + w, cursor.y + h, layer + 1), project(cursor.x, cursor.y + h, layer + 1)])}" fill="#ffcf0033" stroke="#111" stroke-width="2" stroke-dasharray="6 4"/></g>`;
        }
      }
    }
    return base + "</svg>";
  }
  const uid = () => Math.random().toString(36).slice(2, 10);
  function clean(layout) {
    return layout.map((b) => ({
      key: b.key,
      x: b.x,
      y: b.y,
      z: b.z,
      r: b.r || 0,
      uid: uid(),
    }));
  }
  function save() {
    try {
      localStorage.setItem(
        "studstack-builder-v1",
        JSON.stringify({
          model: model.map(({ key, x, y, z, r }) => ({ key, x, y, z, r })),
          name,
          delivery,
        }),
      );
    } catch {}
  }
  function checkpoint() {
    undo.push({ model: structuredClone(model), name, delivery });
    if (undo.length > 40) undo.shift();
    redo = [];
  }
  function notify(k) {
    message = k;
    const el = root?.querySelector("#cs-status");
    if (el) el.textContent = tr(k);
  }
  function variants() {
    return api.products.filter(
      (p) =>
        p.id === partId &&
        p.h === 1 &&
        p.condition === "new" &&
        ["red", "blue", "yellow", "green", "white", "black"].includes(p.color),
    );
  }
  function ensureVariant() {
    if (!variants().some((p) => p.key === variant))
      variant = variants()[0]?.key || "";
  }
  function blocked(b, exclude) {
    const lookup = Object.fromEntries(api.products.map((p) => [p.key, p]));
    const p = lookup[b.key],
      [w, h] = dimensions(p, b);
    if (
      b.x < 0 ||
      b.y < 0 ||
      b.x + w > SIZE ||
      b.y + h > SIZE ||
      b.z < 0 ||
      b.z > MAX_LAYER
    )
      return "bounds";
    if (
      model.some(
        (c) => c.uid !== exclude && c.z === b.z && overlap(b, c, lookup),
      )
    )
      return "collision";
    if (
      b.z > 0 &&
      !model.some(
        (c) => c.uid !== exclude && c.z === b.z - 1 && overlap(b, c, lookup),
      )
    )
      return "support";
    return "";
  }
  function carries(b) {
    const lookup = Object.fromEntries(api.products.map((p) => [p.key, p]));
    return model.some((c) => c.z === b.z + 1 && overlap(b, c, lookup));
  }
  function place() {
    if (model.length >= MAX_PARTS) {
      notify("limit");
      return;
    }
    const b = {
      key: variant,
      x: cursor.x,
      y: cursor.y,
      z: layer,
      r: rotation,
      uid: uid(),
    };
    const err = blocked(b);
    if (err) {
      notify(err);
      return;
    }
    checkpoint();
    model.push(b);
    selected = b.uid;
    save();
    renderBuilder();
    notify("placed");
  }
  function selectPiece(id) {
    const b = model.find((p) => p.uid === id);
    if (!b) return;
    selected = id;
    tool = "select";
    const p = api.products.find((p) => p.key === b.key);
    partId = p.id;
    variant = b.key;
    rotation = b.r;
    layer = b.z;
    cursor = { x: b.x, y: b.y };
    renderBuilder();
  }
  function changeSelected(operation) {
    const b = model.find((p) => p.uid === selected);
    if (!b) return;
    if (carries(b)) {
      notify("above");
      return;
    }
    if (operation === "remove") {
      checkpoint();
      model = model.filter((p) => p !== b);
      selected = null;
      save();
      renderBuilder();
      notify("removed");
      return;
    }
    const candidate = { ...b };
    if (operation === "move") {
      candidate.x = cursor.x;
      candidate.y = cursor.y;
      candidate.z = layer;
    } else if (operation === "up") candidate.z++;
    else if (operation === "down") candidate.z--;
    else if (operation === "rotate") candidate.r = 1 - candidate.r;
    const err = blocked(candidate, b.uid);
    if (err) {
      notify(err);
      return;
    }
    checkpoint();
    Object.assign(b, candidate);
    save();
    renderBuilder();
    notify("moved");
  }
  function aggregate(layout) {
    const m = new Map();
    layout.forEach((b) => m.set(b.key, (m.get(b.key) || 0) + 1));
    return [...m].map(([key, q]) => ({
      p: api.products.find((p) => p.key === key),
      q,
    }));
  }
  function price(layout) {
    return aggregate(layout).reduce((n, { p, q }) => n + p.price * q, 0);
  }
  function fee(layout) {
    return Math.max(
      api.assemblyMinimumCents,
      Math.round(price(layout) * api.assemblyRate),
    );
  }
  function partName(p) {
    return (api.language() === "de" ? p.de : p.en) + " " + p.ny + " × " + p.nx;
  }
  function colour(p) {
    return api.colors.find((c) => c[0] === p.color)[
      api.language() === "de" ? 3 : 2
    ];
  }
  function bill(layout) {
    return aggregate(layout)
      .map(
        ({ p, q }) =>
          `<div class="cs-bill-line"><img src="${api.assetBase + p.id + "-" + p.color + ".svg"}" width="480" height="320" alt=""><span><strong>${q} × ${escape(partName(p))}</strong><small>${p.id} · ${colour(p)} · ${tr(p.condition)}</small></span><b>${api.money(q * p.price)}</b></div>`,
      )
      .join("");
  }
  function totals() {
    const el = root.querySelector("#cs-totals");
    if (!el) return;
    const amount = price(model),
      extra = delivery === "assembled" && model.length ? fee(model) : 0;
    el.innerHTML = `<div><span>${tr("partsPrice")} · ${model.length} ${tr("parts")}</span><b>${api.money(amount)}</b></div><div><span>${tr("assembly")}</span><b>${api.money(extra)}</b></div><div class="cs-total"><span>${tr("total")}</span><strong>${api.money(amount + extra)}</strong></div><small>${tr("shipping")}</small>`;
    root.querySelector("#cs-add").disabled = !model.length;
  }
  function renderBuilder() {
    if (current !== "build") return;
    ensureVariant();
    const amount = fee(model),
      chosen = model.find((b) => b.uid === selected);
    root.innerHTML = `<section class="cs-hero"><div class="wrap"><div><div class="eyebrow">${tr("eyebrow")}</div><h1>${tr(
      "title",
    )
      .split("\n")
      .map((s, i) => (i ? "<span>" + s + "</span>" : s))
      .join(
        "",
      )}</h1><p>${tr("lead")}</p><a class="textlink" href="#discover">${tr("browse")} →</a></div><div class="cs-hero-art">${svg(model.length ? model : templates()[1].layout, api.products)}<span class="cs-sticker">12 × 12<br><small>${tr("ground")}</small></span></div></div></section><section class="cs-workspace wrap" aria-label="${tr("studio")}"><div class="cs-workhead"><div><div class="eyebrow">${tr("studio")}</div><h2>${tr("board")}</h2></div><span class="cs-count">${model.length} / ${MAX_PARTS} ${tr("parts")}</span></div><p class="cs-intro">${tr("connected")}</p><div class="ex-design-actions"><button data-cs="savedraft" ${model.length ? "" : "disabled"}>${ew("save")}</button><button data-cs="drafts">${ew("designs")} (${readDesigns().length})</button><button data-cs="compare">${ew("compare")}</button></div><div class="cs-editor"><aside class="cs-palette"><h3>${tr("shape")}</h3><div class="cs-shapes">${[
      "3005",
      "3004",
      "3003",
      "3010",
      "3001",
    ]
      .map((id) => {
        const p = api.products.find((p) => p.id === id);
        return `<button data-cs="shape" data-value="${id}" aria-pressed="${partId === id}"><img src="${api.assetBase + id + "-" + p.color + ".svg"}" width="480" height="320" alt=""><span>${p.ny} × ${p.nx}</span></button>`;
      })
      .join(
        "",
      )}</div><h3>${tr("colour")}</h3><div class="cs-variants">${variants()
      .map(
        (p) =>
          `<button data-cs="variant" data-value="${p.key}" aria-pressed="${variant === p.key}" title="${colour(p)} · ${tr(p.condition)}" aria-label="${colour(p)} · ${tr(p.condition)}"><i style="background:${api.colors.find((c) => c[0] === p.color)[1]}"></i><small>${colour(p)}</small><em>${tr(p.condition)}</em></button>`,
      )
      .join(
        "",
      )}</div><small class="cs-muted">${tr("colourNote")}</small><h3>${tr("levels")}</h3><label class="cs-layer-label">${tr("level")}<select id="cs-layer">${Array.from({ length: 6 }, (_, i) => `<option value="${i}" ${layer === i ? "selected" : ""}>${i} ${i === 0 ? "· " + tr("ground") : ""}</option>`).join("")}</select></label><button class="button outline cs-rotate" data-cs="rotate">↻ ${tr("rotate")} <b>${(tool === "select" && chosen ? chosen.r : rotation) ? 90 : 0}°</b></button></aside><div class="cs-board-wrap"><div class="cs-toolbar"><div class="cs-segment"><button data-cs="tool" data-value="place" aria-pressed="${tool === "place"}">＋ ${tr("place")}</button><button data-cs="tool" data-value="select" aria-pressed="${tool === "select"}">↖ ${tr("select")}</button></div><div><button data-cs="undo" aria-label="${tr("undo")}" title="${tr("undo")}" ${undo.length ? "" : "disabled"}>↶</button><button data-cs="redo" aria-label="${tr("redo")}" title="${tr("redo")}" ${redo.length ? "" : "disabled"}>↷</button><button data-cs="clear" aria-label="${tr("clear")}" title="${tr("clear")}" ${model.length ? "" : "disabled"}>×</button></div></div><div class="cs-stage"><div id="cs-drawing" style="transform:scale(${zoom})">${svg(model, api.products, { interactive: true, active: selected })}</div><div class="cs-coordinate">X ${cursor.x + 1} · Y ${cursor.y + 1} · Z ${layer}</div><div class="cs-zoom"><button data-cs="zoomout" aria-label="${tr("zoomOut")}">−</button><button data-cs="zoomreset" aria-label="${tr("resetZoom")}">${Math.round(zoom * 100)}%</button><button data-cs="zoomin" aria-label="${tr("zoomIn")}">+</button></div></div><div id="cs-status" role="status" class="cs-status">${escape(message ? tr(message) : tr(model.length ? "saved" : "empty"))}</div><p id="cs-key-help" class="cs-key-help">${tr("boardHelp")}</p><div class="cs-selected"><h3>${tr("selected")}</h3>${chosen ? `<p>${escape(partName(api.products.find((p) => p.key === chosen.key)))} · X ${chosen.x + 1} / Y ${chosen.y + 1} / Z ${chosen.z}</p><div><button data-cs="move">${tr("move")}</button><button data-cs="up" aria-label="${tr("up")}">↑ Z</button><button data-cs="down" aria-label="${tr("down")}">↓ Z</button><button data-cs="remove">${tr("remove")}</button></div>` : `<p>${tr("nothing")}</p>`}</div></div><aside class="cs-order"><label class="cs-name">${tr("name")}<input id="cs-name" maxlength="60" value="${escape(name)}" placeholder="${tr("namePlaceholder")}"></label><h3>${tr("fulfil")}</h3><label class="cs-fulfil"><input type="radio" name="cs-delivery" value="kit" ${delivery === "kit" ? "checked" : ""}><span><strong>${tr("kit")}</strong><small>${tr("kitDesc")}</small></span></label><label class="cs-fulfil"><input type="radio" name="cs-delivery" value="assembled" ${delivery === "assembled" ? "checked" : ""}><span><strong>${tr("assembled")}</strong><small>${tr("assembledDesc")}</small><b>+ ${api.money(amount)}</b></span></label><small>${api.language() === "de" ? `${Math.round(api.assemblyRate * 100)} % des Teilepreises, mindestens ${api.money(api.assemblyMinimumCents)}. Beispielkalkulation.` : `${Math.round(api.assemblyRate * 100)}% of the parts price, minimum ${api.money(api.assemblyMinimumCents)}. Illustrative pricing.`}</small><div id="cs-totals" class="cs-totals"></div><button id="cs-add" class="button blue wide" data-cs="add">${tr("add")} →</button><button class="cs-download" data-cs="download" ${model.length ? "" : "disabled"}>↓ ${tr("download")}</button><p class="cs-muted">${tr("draft")}</p></aside></div><div class="cs-parts"><div class="cs-workhead"><h3>${tr("bill")}</h3><span>${model.length} ${tr("parts")}</span></div>${model.length ? `<div class="cs-bill">${bill(model)}</div><details><summary>${tr("list")}</summary><div class="cs-piece-list">${model.map((b, i) => `<button data-cs="selectpiece" data-value="${b.uid}" aria-pressed="${selected === b.uid}">${i + 1}. ${escape(partName(api.products.find((p) => p.key === b.key)))} · X ${b.x + 1} Y ${b.y + 1} Z ${b.z}</button>`).join("")}</div></details>` : `<p>${tr("empty")}</p>`}</div><p class="cs-notice">${tr("notice")}</p></section><section class="cs-bottom"><div class="wrap"><div><h2>${tr("starter")}</h2><p>${tr("starterText")}</p></div><a class="button" href="#discover">${tr("browse")} →</a></div></section>`;
    totals();
    refresh3D();
  }
  function choose(id, preferred) {
    return (
      api.products.find(
        (p) => p.id === id && p.color === preferred && p.condition === "new",
      ) || api.products.find((p) => p.id === id && p.condition === "new")
    );
  }
  function templates() {
    const layouts = {
      house: [],
      robot: [],
      racer: [],
      tower: [],
      bridge: [],
      bloom: [],
    };
    const b = (k, id, x, y, z, col, r = 0) =>
      layouts[k].push({ key: choose(id, col).key, x, y, z, r, uid: uid() });
    for (let x = 3; x <= 7; x += 2)
      for (let y = 3; y <= 7; y += 2) b("house", "3003", x, y, 0, "green");
    for (let z = 1; z <= 2; z++) {
      b("house", "3001", 3, 7, z, "white");
      b("house", "3003", 7, 7, z, "white");
      b("house", "3004", 3, 3, z, "white", 1);
      b("house", "3004", 8, 3, z, "white", 1);
      b("house", "3004", 3, 5, z, "white", 1);
      b("house", "3004", 8, 5, z, "white", 1);
    }
    for (let y = 3; y <= 7; y += 2) {
      b("house", "3001", 3, y, 3, "red");
      b("house", "3003", 7, y, 3, "red");
    }
    for (let y = 3; y <= 7; y += 2) b("house", "3001", 4, y, 4, "red");
    for (let y = 3; y <= 7; y += 2) b("house", "3003", 5, y, 5, "red");
    b("robot", "3003", 3, 5, 0, "black");
    b("robot", "3003", 7, 5, 0, "black");
    b("robot", "3003", 3, 5, 1, "yellow");
    b("robot", "3003", 7, 5, 1, "yellow");
    b("robot", "3001", 4, 5, 2, "red");
    b("robot", "3001", 4, 5, 3, "red");
    b("robot", "3003", 5, 5, 4, "yellow");
    b("robot", "3004", 4, 5, 4, "white", 1);
    b("robot", "3004", 7, 5, 4, "white", 1);
    b("robot", "3005", 5, 5, 5, "black");
    b("robot", "3005", 6, 5, 5, "black");
    for (let x = 2; x <= 6; x += 4)
      for (let y = 4; y <= 6; y += 2) b("racer", "3001", x, y, 0, "black");
    for (let y = 4; y <= 6; y += 2) {
      b("racer", "3003", 2, y, 1, "red");
      b("racer", "3001", 4, y, 1, "red");
      b("racer", "3003", 8, y, 1, "red");
    }
    b("racer", "3003", 5, 5, 2, "white");
    for (let z = 0; z < 4; z++)
      for (let x = 4; x <= 6; x += 2)
        for (let y = 4; y <= 6; y += 2)
          b("tower", "3003", x, y, z, z % 2 ? "white" : "blue");
    b("tower", "3003", 4, 4, 4, "red");
    b("tower", "3003", 6, 6, 4, "red");
    b("tower", "3005", 4, 4, 5, "red");
    b("tower", "3005", 7, 7, 5, "red");
    for (let z = 0; z < 3; z++) {
      b("bridge", "3003", 2, 5, z, "white");
      b("bridge", "3003", 8, 5, z, "white");
    }
    b("bridge", "3001", 2, 5, 3, "blue");
    b("bridge", "3001", 6, 5, 3, "blue");
    b("bridge", "3001", 4, 5, 4, "red");
    b("bridge", "3003", 2, 5, 4, "blue");
    b("bridge", "3003", 8, 5, 4, "blue");
    for (let x = 4; x <= 6; x += 2)
      for (let y = 4; y <= 6; y += 2) b("bloom", "3003", x, y, 0, "green");
    b("bloom", "3005", 5, 5, 1, "green");
    b("bloom", "3005", 5, 5, 2, "green");
    b("bloom", "3003", 4, 4, 3, "yellow");
    for (let x = 4; x <= 5; x++)
      for (let y = 4; y <= 5; y++)
        b("bloom", "3005", x, y, 4, x === y ? "red" : "yellow");
    return ["house", "robot", "racer", "tower", "bridge", "bloom"].map(
      (id, i) => ({
        id,
        layout: layouts[id],
        difficulty: ["medium", "easy", "easy", "medium", "medium", "easy"][i],
        minutes: [20, 10, 15, 20, 15, 10][i],
      }),
    );
  }
  function renderGallery(filter = "all") {
    const cards = templates().filter(
      (m) => filter === "all" || m.difficulty === filter,
    );
    root.innerHTML = `<section class="cs-gallery-hero"><div class="wrap"><div class="eyebrow">${tr("galleryEyebrow")}</div><h1>${tr("galleryTitle")}</h1><p>${tr("galleryLead")}</p><div class="cs-gallery-filter">${["all", "easy", "medium"].map((f) => `<button data-cs="galleryfilter" data-value="${f}" aria-pressed="${f === filter}">${tr(f)}</button>`).join("")}</div></div></section><section class="wrap cs-gallery"><div class="cs-gallery-grid">${cards.map((m, i) => `<article class="cs-project"><button class="cs-project-image" data-cs="plan" data-value="${m.id}" aria-label="${tr("instructions")} · ${tr(m.id)}">${svg(m.layout, api.products)}<span>0${templates().findIndex((t) => t.id === m.id) + 1}</span></button><div class="cs-project-body"><div class="eyebrow">${tr(m.difficulty)} · ${m.layout.length} ${tr("parts")}</div><h2>${tr(m.id)}</h2><p>${tr(m.id + "Desc")}</p><dl><div><dt>${tr("time")}</dt><dd>${m.minutes} ${tr("minutes")}</dd></div><div><dt>${tr("partsPrice")}</dt><dd>${api.money(price(m.layout))}</dd></div></dl><button class="button blue wide" data-cs="customize" data-value="${m.id}">${tr("customize")} →</button><div class="cs-project-links"><button data-cs="get" data-value="${m.id}">${tr("get")}</button><button data-cs="plan" data-value="${m.id}">${tr("instructions")}</button><button data-cs="comparetemplate" data-value="${m.id}">${ew("compare")}</button></div></div></article>`).join("")}</div><p class="cs-notice">${tr("kitOnly")} ${tr("notice")}</p></section><section class="cs-bottom"><div class="wrap"><div><h2>${tr("studio")}</h2><p>${tr("lead")}</p></div><a class="button" href="#build">${tr("build")} →</a></div></section>`;
    refresh3D();
  }
  let planId = "",
    planLayer = 0;
  function showPlan(id, z = 0) {
    const m = templates().find((m) => m.id === id);
    if (!m) return;
    planId = id;
    planLayer = z;
    const max = Math.max(...m.layout.map((b) => b.z));
    api.openModal(
      tr("plan") + " · " + tr(id),
      `<div class="cs-plan"><p>${tr("planIntro")}</p><div class="cs-plan-art">${svg(
        m.layout.filter((b) => b.z <= z),
        api.products,
        { dim: true, layer: z },
      )}</div><div class="cs-plan-controls"><button class="button outline" data-cs="planprev" ${z === 0 ? "disabled" : ""}>← ${tr("previous")}</button><strong>${tr("step")} ${z + 1}/${max + 1}</strong><button class="button outline" data-cs="plannext" ${z === max ? "disabled" : ""}>${tr("next")} →</button></div><h3>${tr("level")} ${z}</h3><div class="cs-bill">${bill(m.layout.filter((b) => b.z === z))}</div><button class="button blue" data-cs="customize" data-value="${id}">${tr("toStudio")} →</button><p class="cs-notice">${tr("notice")}</p></div>`,
      "plan",
    );
    refresh3D();
  }
  function loadTemplate(id, confirmed = false) {
    const m = templates().find((m) => m.id === id);
    if (!m) return;
    if (model.length && !confirmed) {
      api.openModal(
        tr("preview"),
        `<p>${tr("replace")}</p><div class="cs-confirm"><button class="button outline" data-cs="cancel">${api.language() === "de" ? "Abbrechen" : "Cancel"}</button><button class="button blue" data-cs="confirmtemplate" data-value="${id}">${tr("customize")}</button></div>`,
        "creative-confirm",
      );
      return;
    }
    checkpoint();
    model = clean(m.layout);
    name = tr(id);
    delivery = "kit";
    selected = null;
    tool = "place";
    layer = 0;
    cursor = { x: 1, y: 1 };
    message = "saved";
    save();
    api.closeModal();
    navigate("build");
  }
  function addCreation(layout, label, mode) {
    if (!layout.length) return;
    const result = api.addCreation(
      layout,
      label || tr("namePlaceholder"),
      mode,
    );
    if (result) {
      api.toast(tr("added"));
      api.openCart();
    } else {
      notify("stock");
      api.toast(tr("stock"));
    }
  }
  function download() {
    if (!model.length) return;
    const plan = {
      format: "studstack-build-plan",
      version: 1,
      name: name || tr("namePlaceholder"),
      base: [12, 12],
      layers: 6,
      fulfilment: delivery,
      parts: aggregate(model).map(({ p, q }) => ({
        part: p.id,
        colour: colour(p),
        condition: tr(p.condition),
        quantity: q,
        unitPriceEUR: p.price / 100,
      })),
      placement: model.map(({ key, x, y, z, r }) => ({
        key,
        x,
        y,
        z,
        rotationDegrees: r ? 90 : 0,
      })),
      partsPriceEUR: price(model) / 100,
      assemblyEUR: (delivery === "assembled" ? fee(model) : 0) / 100,
      previewOnly: true,
    };
    const blob = new Blob([JSON.stringify(plan, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = "studstack-build-plan.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    notify("downloaded");
  }
  function updateDrawing() {
    const d = root?.querySelector("#cs-drawing");
    if (d)
      d.innerHTML = svg(model, api.products, {
        interactive: true,
        active: selected,
      });
    const c = root?.querySelector(".cs-coordinate");
    if (c)
      c.textContent =
        "X " + (cursor.x + 1) + " · Y " + (cursor.y + 1) + " · Z " + layer;
    refresh3D();
  }
  function route() {
    if (!api) return;
    const hash = location.hash.slice(1);
    current = ["build", "discover"].includes(hash) ? hash : "shop";
    const main = api.host.querySelector("main:not(#ss-creative)");
    main.hidden = current !== "shop";
    root.hidden = current === "shop";
    api.host.querySelector(".shipping-strip").hidden = current !== "shop";
    api.host.querySelectorAll("[data-cs-route]").forEach((a) => {
      const active = a.dataset.csRoute === current;
      a.classList.toggle("cs-active", active);
      if (active) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    document.title =
      api.brand +
      " — " +
      (current === "build"
        ? tr("build")
        : current === "discover"
          ? tr("discover")
          : tr("shop"));
    if (current === "build") renderBuilder();
    else if (current === "discover") renderGallery();
    if (hash === "ss-catalog")
      main.querySelector("#ss-catalog")?.scrollIntoView();
    else if (["build", "discover", "shop", ""].includes(hash))
      window.scrollTo({ top: 0, behavior: "instant" });
  }
  function navigate(page) {
    const hash = page === "shop" ? "#shop" : "#" + page;
    if (location.hash === hash) {
      route();
      return;
    }
    location.hash = hash;
  }
  function events(e) {
    const link = e.target.closest("[data-cs-route]");
    if (link) {
      e.preventDefault();
      navigate(link.dataset.csRoute);
      return;
    }
    const b = e.target.closest("[data-cs]");
    if (!b) return;
    const a = b.dataset.cs,
      v = b.dataset.value;
    if (a === "savedraft") saveDesign();
    if (a === "drafts") showDesigns();
    if (a === "loaddraft") loadDesign(v);
    if (a === "confirmdraft") loadDesign(v, true);
    if (a === "deletedraft") deleteDesign(v);
    if (a === "confirmdelete") deleteDesign(v, true);
    if (a === "compare")
      window.StudStackExperience?.compare(model, name || tr("namePlaceholder"));
    if (a === "comparetemplate") {
      const m = templates().find((m) => m.id === v);
      window.StudStackExperience?.compare(m.layout, tr(v));
    }
    if (
      e.detail === 0 &&
      [
        "shape",
        "variant",
        "tool",
        "rotate",
        "undo",
        "redo",
        "zoomin",
        "zoomout",
        "zoomreset",
      ].includes(a)
    )
      queueMicrotask(() => {
        if (!b.isConnected)
          root
            ?.querySelector(
              '[data-cs="' +
                a +
                '"]' +
                (v ? '[data-value="' + CSS.escape(v) + '"]' : ""),
            )
            ?.focus({ preventScroll: true });
      });
    if (a === "shape") {
      partId = v;
      selected = null;
      tool = "place";
      ensureVariant();
      renderBuilder();
    }
    if (a === "variant") {
      variant = v;
      const b = tool === "select" && model.find((p) => p.uid === selected);
      if (b) {
        checkpoint();
        b.key = v;
        save();
      }
      renderBuilder();
    }
    if (a === "rotate") {
      if (tool === "select" && selected) changeSelected("rotate");
      else {
        rotation = 1 - rotation;
        renderBuilder();
      }
    }
    if (a === "tool") {
      tool = v;
      renderBuilder();
    }
    if (a === "selectpiece") selectPiece(v);
    if (a === "clear")
      api.openModal(
        tr("clear"),
        `<p>${tr("confirmClear")}</p><div class="cs-confirm"><button class="button outline" data-cs="cancel">${api.language() === "de" ? "Abbrechen" : "Cancel"}</button><button class="button blue" data-cs="confirmclear">${tr("clear")}</button></div>`,
        "creative-confirm",
      );
    if (a === "confirmclear") {
      checkpoint();
      model = [];
      selected = null;
      save();
      api.closeModal();
      renderBuilder();
    }
    if (a === "cancel") api.closeModal();
    if (a === "confirmtemplate") loadTemplate(v, true);
    if (a === "undo" || a === "redo") {
      const from = a === "undo" ? undo : redo,
        to = a === "undo" ? redo : undo;
      if (from.length) {
        to.push({ model: structuredClone(model), name, delivery });
        const s = from.pop();
        model = s.model;
        name = s.name;
        delivery = s.delivery;
        selected = null;
        save();
        renderBuilder();
      }
    }
    if (["move", "up", "down", "remove"].includes(a)) changeSelected(a);
    if (a === "add") addCreation(model, name, delivery);
    if (a === "download") download();
    if (a === "galleryfilter") renderGallery(v);
    if (a === "customize") loadTemplate(v);
    if (a === "get") {
      const m = templates().find((m) => m.id === v);
      addCreation(m.layout, tr(v), "kit");
    }
    if (a === "plan") showPlan(v);
    if (a === "planprev") showPlan(planId, Math.max(0, planLayer - 1));
    if (a === "plannext") {
      const max = Math.max(
        ...templates()
          .find((m) => m.id === planId)
          .layout.map((b) => b.z),
      );
      showPlan(planId, Math.min(max, planLayer + 1));
    }
    if (a.startsWith("zoom")) {
      zoom =
        a === "zoomreset"
          ? 1
          : Math.max(0.8, Math.min(1.5, zoom + (a === "zoomin" ? 0.1 : -0.1)));
      renderBuilder();
    }
  }

  const ew = (k) => window.StudStackExperience?.words()[k] || k;
  function readDesigns() {
    try {
      const arr = JSON.parse(
        localStorage.getItem("studstack-designs-v1") || "[]",
      );
      return Array.isArray(arr)
        ? arr
            .filter(
              (d) =>
                d &&
                typeof d.id === "string" &&
                validate(d.layout, api.products),
            )
            .slice(0, 12)
        : [];
    } catch {
      return [];
    }
  }
  function storeDesigns(list) {
    try {
      localStorage.setItem("studstack-designs-v1", JSON.stringify(list));
      return true;
    } catch {
      api.toast(ew("error"));
      return false;
    }
  }
  function saveDesign() {
    if (!model.length) return;
    const list = readDesigns();
    if (list.length >= 12) {
      api.toast(ew("limit"));
      return;
    }
    list.unshift({
      id: Date.now().toString(36) + "-" + uid(),
      name: (name || tr("namePlaceholder")).slice(0, 60),
      layout: model.map(({ key, x, y, z, r }) => ({ key, x, y, z, r })),
      delivery,
      created: new Date().toISOString(),
    });
    if (storeDesigns(list)) {
      api.toast(ew("saved"));
      renderBuilder();
    }
  }
  function showDesigns() {
    const list = readDesigns();
    api.openModal(
      ew("designs"),
      `<p class="ex-fine">${ew("local")}</p>${list.length ? `<div class="ex-draft-grid">${list.map((d) => `<article class="ex-draft"><div class="ex-draft-thumb" data-design="${escape(d.id)}">${svg(clean(d.layout), api.products)}</div><h3>${escape(String(d.name || "").slice(0, 60))}</h3><p>${d.layout.length} ${tr("parts")}</p><div><button data-cs="loaddraft" data-value="${escape(d.id)}">${ew("load")}</button><button data-cs="deletedraft" data-value="${escape(d.id)}">${ew("remove")}</button></div></article>`).join("")}</div>` : `<p>${ew("empty")}</p>`}`,
      "designs",
    );
    for (const d of list)
      window.StudStack3D?.image(
        api.host.querySelector('[data-design="' + CSS.escape(d.id) + '"]'),
        clean(d.layout),
        api,
        "saved-" + d.id,
      );
  }
  function loadDesign(id, confirmed = false) {
    const d = readDesigns().find((d) => d.id === id);
    if (!d) return;
    if (model.length && !confirmed) {
      api.openModal(
        ew("load"),
        `<p>${ew("restore")}</p><div class="cs-confirm"><button data-cs="cancel" class="button outline">${ew("cancel")}</button><button data-cs="confirmdraft" data-value="${escape(id)}" class="button blue">${ew("load")}</button></div>`,
        "creative-confirm",
      );
      return;
    }
    checkpoint();
    model = clean(d.layout);
    name = String(d.name || "").slice(0, 60);
    delivery = d.delivery === "assembled" ? "assembled" : "kit";
    selected = null;
    tool = "place";
    layer = 0;
    cursor = { x: 1, y: 1 };
    save();
    api.closeModal();
    navigate("build");
  }
  function deleteDesign(id, confirmed = false) {
    if (!confirmed) {
      api.openModal(
        ew("remove"),
        `<p>${ew("deleteConfirm")}</p><div class="cs-confirm"><button data-cs="cancel" class="button outline">${ew("cancel")}</button><button data-cs="confirmdelete" data-value="${escape(id)}" class="button blue">${ew("delete")}</button></div>`,
        "creative-confirm",
      );
      return;
    }
    if (storeDesigns(readDesigns().filter((d) => d.id !== id))) {
      renderBuilder();
      showDesigns();
    }
  }

  function refresh3D() {
    const lib = window.StudStack3D;
    if (!lib || !api) return;
    const context = { ...api, preview: (l) => svg(l, api.products) };
    lib.refresh(context);
    lib.home(context, templates()[0].layout);
    if (current === "build") {
      lib.image(
        root.querySelector(".cs-hero-art"),
        model.length ? model : templates()[1].layout,
        context,
        "studio",
      );
      lib.builder(root.querySelector(".cs-stage"), {
        state: () => ({
          layout: model,
          variant,
          rotation,
          layer,
          cursor,
          selected,
          tool,
          zoom,
        }),
        check: (b) => blocked(b),
        errorText: (k) => tr(k),
        twoDHelp: tr("boardHelp"),
        cursor: (pos) => {
          cursor = pos;
          const el = root.querySelector(".cs-coordinate");
          if (el)
            el.textContent =
              "X " +
              (cursor.x + 1) +
              " · Y " +
              (cursor.y + 1) +
              " · Z " +
              layer;
        },
        place: (pos) => {
          cursor = pos;
          place();
        },
        select: (id) => selectPiece(id),
      });
    }
    if (current === "discover")
      for (const card of root.querySelectorAll(".cs-project")) {
        const id = card.querySelector('[data-cs="plan"]').dataset.value;
        const m = templates().find((m) => m.id === id);
        lib.image(
          card.querySelector(".cs-project-image"),
          m.layout,
          context,
          "gallery-" + id,
        );
      }
    const plan = api.host.querySelector(".cs-plan-art");
    if (plan && planId) {
      const m = templates().find((m) => m.id === planId);
      lib.image(
        plan,
        m.layout.filter((b) => b.z <= planLayer),
        context,
        "plan-" + planId + "-" + planLayer,
        { layer: planLayer },
      );
    }
  }
  window.addEventListener("studstack3d-ready", refresh3D);
  let bound = false,
    restored = false;
  function mount(input) {
    api = input;
    root = document.createElement("main");
    root.id = "ss-creative";
    root.hidden = true;
    api.host.querySelector("main").before(root);
    const links = () =>
      `<a href="#shop" data-cs-route="shop">${tr("shop")}</a><a href="#build" data-cs-route="build">${tr("build")}</a><a href="#discover" data-cs-route="discover">${tr("discover")}</a>`;
    api.host.querySelector(".navlinks").innerHTML = links();
    const tabs = document.createElement("nav");
    tabs.className = "cs-mobile-nav";
    tabs.setAttribute("aria-label", tr("discover"));
    tabs.innerHTML = links();
    api.host.querySelector(".header").append(tabs);
    if (!restored) {
      restored = true;
      try {
        const s = JSON.parse(
          localStorage.getItem("studstack-builder-v1") || "{}",
        );
        if (validate(s.model, api.products)) {
          model = clean(s.model);
          name = String(s.name || "").slice(0, 60);
          delivery = s.delivery === "assembled" ? "assembled" : "kit";
        }
      } catch {}
    }
    if (!bound) {
      bound = true;
      api.host.addEventListener("click", events);
      api.host.addEventListener("click", (e) => {
        if (current !== "build" || !e.target.closest(".cs-canvas")) return;
        const b = e.target.closest("[data-brick]");
        if (tool === "select" && b) {
          selectPiece(b.dataset.brick);
          return;
        }
        if (tool === "place" && b) {
          const base = model.find((p) => p.uid === b.dataset.brick);
          if (base) {
            cursor = { x: base.x, y: base.y };
            place();
            return;
          }
        }
        const cell = e.target.closest("[data-cell-x]");
        if (cell) {
          cursor = {
            x: Number(cell.dataset.cellX),
            y: Number(cell.dataset.cellY),
          };
          if (tool === "place") place();
          else updateDrawing();
        }
      });
      api.host.addEventListener("change", (e) => {
        if (e.target.id === "cs-layer") {
          layer = Number(e.target.value);
          updateDrawing();
        }
        if (e.target.name === "cs-delivery") {
          delivery = e.target.value;
          save();
          totals();
          refresh3D();
        }
      });
      api.host.addEventListener("input", (e) => {
        if (e.target.id === "cs-name") {
          name = e.target.value.slice(0, 60);
          save();
        }
      });
      api.host.addEventListener("keydown", (e) => {
        if (!e.target.matches(".cs-canvas,.ss3d-canvas")) return;
        if (
          [
            "ArrowLeft",
            "ArrowRight",
            "ArrowUp",
            "ArrowDown",
            "Enter",
            " ",
            "r",
            "R",
            "Delete",
          ].includes(e.key)
        )
          e.preventDefault();
        if (e.key === "ArrowLeft") cursor.x = Math.max(0, cursor.x - 1);
        if (e.key === "ArrowRight") cursor.x = Math.min(11, cursor.x + 1);
        if (e.key === "ArrowUp") cursor.y = Math.max(0, cursor.y - 1);
        if (e.key === "ArrowDown") cursor.y = Math.min(11, cursor.y + 1);
        if (e.key === "Enter" || e.key === " ") {
          if (tool === "place") place();
          else changeSelected("move");
        }
        if (e.key.toLowerCase() === "r") {
          if (tool === "select" && selected) changeSelected("rotate");
          else {
            rotation = 1 - rotation;
            renderBuilder();
          }
        }
        if (e.key === "Delete") changeSelected("remove");
        if (e.key.startsWith("Arrow")) updateDrawing();
        if (
          [
            "ArrowLeft",
            "ArrowRight",
            "ArrowUp",
            "ArrowDown",
            "Enter",
            " ",
            "r",
            "R",
            "Delete",
          ].includes(e.key)
        )
          (
            root.querySelector(
              ".ss3d-builder-view:not([hidden]) .ss3d-canvas",
            ) || root.querySelector(".cs-canvas")
          )?.focus({ preventScroll: true });
      });
      window.addEventListener("hashchange", route);
    }
    route();
    refresh3D();
  }
  window.StudStackCreative = {
    mount,
    navigate,
    validate,
    preview: (layout, products, colors) => svg(layout, products, { colors }),
    assemblyFee: (amount, min = 295, rate = 0.2) =>
      Math.max(min, Math.round(amount * rate)),
  };
})();
