/* STUD & STACK showcase 1.0.0 — local interactions; no payment or inventory API. */
(() => {
  "use strict";
  const host = document.getElementById("ss-app");
  if (!host) return;
  const assetBase = new URL("assets/", document.currentScript.src).href;
  const config = window.StudStackConfig || {};
  const brand = config.brand || "STUD & STACK";
  if (config.accent && /^#[0-9a-f]{6}$/i.test(config.accent))
    host.style.setProperty("--yellow", config.accent);
  const dict = {
    en: {
      skip: "Skip to parts",
      utility: "A little piece of your next big idea.",
      help: "Help & support",
      parts: "Shop parts",
      colours: "Shop by colour",
      about: "Our story",
      search: "Search parts, colours or part number",
      searchlabel: "Search the parts catalogue",
      saved: "Saved parts",
      bag: "Shopping bag",
      free: "A good build starts with the right parts.",
      shippinghint: "Shipping options at checkout",
      eyebrow: "For the builders. The dreamers. The detail people.",
      hero1: "Small parts.",
      hero2: "Big possibilities.",
      lead: "Find that one missing piece. Or the next thousand. Explore a colourful world of bricks, plates and possibilities.",
      shop: "Find your next piece",
      explore: "Explore the collection",
      note: "Every great build",
      notesub: "starts with a little piece.",
      ready: "Ready for your next build",
      lots: "Part numbers, colours & condition",
      pick: "Pick the exact quantity",
      picksub: "One piece or a whole project",
      pack: "Packed with care",
      packsub: "Each lot, neatly organised",
      world: "Made for builders",
      worldsub: "From first ideas to final details",
      categories: "What are you building with?",
      all: "View all parts",
      catalog: "Find your perfect piece.",
      catalogsub: "The right shape. The right colour. Just the right amount.",
      filters: "Filters",
      reset: "Reset all",
      category: "Category",
      color: "Colour",
      condition: "Condition",
      new: "New",
      used: "Used",
      both: "All conditions",
      unitprice: "Price per piece",
      upto: "Up to",
      need: "Building something bigger?",
      needtext:
        "Make a little list. Find all the pieces. Bring your idea to life.",
      helpbutton: "How it works",
      results: "lots found",
      samples: "Illustrative catalogue",
      sort: "Sort by",
      featured: "Featured",
      priceup: "Price: low to high",
      pricedown: "Price: high to low",
      number: "Part number",
      grid: "Grid view",
      list: "List view",
      perpiece: " / piece",
      available: "available",
      add: "Add to bag",
      added: "Added to your bag",
      quantity: "Quantity",
      details: "View part",
      close: "Close",
      favorite: "Save part",
      unfavorite: "Remove saved part",
      clear: "Clear filters",
      noresults: "No pieces found this time.",
      emptytext: "Try another part number or remove a filter.",
      next: "Next page",
      previous: "Previous page",
      bannerlabel: "One piece closer.",
      banner: "Your next idea?\nStart right here.",
      bannertext:
        "A tiny detail. A colourful character. A whole new world. Build it your way, piece by piece.",
      howtitle1: "Find your pieces",
      howtext1:
        "Search by part number or explore shapes and colours. Choose new or used parts.",
      howtitle2: "Make it your own",
      howtext2:
        "Select the quantities you need and collect everything in one organised bag.",
      howtitle3: "Bring it together",
      howtext3:
        "Choose your delivery and explore a simple, considered checkout.",
      footertext:
        "Small pieces. Shared possibilities. An independent parts shop for curious builders.",
      discover: "Discover",
      support: "Customer care",
      delivery: "Delivery & returns",
      faq: "Frequently asked questions",
      payments: "Payment options",
      rights:
        "Independent showcase by BAUVERIS. Sample products, prices and stock. No affiliation with a toy manufacturer.",
      preview: "Payment options shown for presentation only.",
      backtop: "Back to top",
      detail: "Part details",
      size: "Dimensions",
      partnumber: "Part number",
      selectcolor: "Choose a colour",
      selectcondition: "Choose condition",
      stocklabel: "Available quantity",
      pieces: "pieces",
      basket: "Your shopping bag",
      emptybag: "Your next build starts here.",
      emptybagtext: "Add a few pieces and make something great.",
      continue: "Continue exploring",
      remove: "Remove",
      summary: "Order summary",
      subtotal: "Items subtotal",
      shipping: "Delivery",
      calculated: "Calculated at checkout",
      total: "Total",
      checkout: "Continue to checkout",
      cartnote:
        "Illustrative prices. No real orders or payments are processed.",
      items: "pieces",
      addressstep: "Delivery",
      paymentstep: "Payment",
      reviewstep: "Review",
      confirmationstep: "Complete",
      deliverydetails: "Where are we sending your pieces?",
      email: "Email address",
      first: "First name",
      last: "Last name",
      street: "Street and house number",
      postcode: "Postal code",
      city: "City",
      country: "Country",
      chooseDelivery: "Choose delivery",
      standard: "Standard delivery",
      standardtime: "3–5 business days",
      express: "Express delivery",
      expresstime: "1–2 business days",
      collection: "Collect in store",
      collectiontime: "Arrange a collection time",
      freeword: "Free",
      toPayment: "Continue to payment",
      back: "Back",
      paymenttitle: "How would you like to pay?",
      paymentnotice:
        "Preview checkout: choose a payment option to see the complete journey. No payment details are requested, no provider opens, and no money is charged.",
      idealdesc: "Pay through your bank",
      paypaldesc: "Pay with your PayPal account",
      carddesc: "Visa or Mastercard",
      bankdesc: "Manual bank transfer",
      bank: "Bank transfer",
      reviewbutton: "Review your order",
      reviewtitle: "One last look at your build.",
      deliverTo: "Delivery address",
      method: "Payment method",
      edit: "Edit",
      terms:
        "I understand this is a preview checkout. No real order, payment or email will be created.",
      place: "Complete preview order",
      success: "Your next build is taking shape!",
      successtext:
        "The checkout preview is complete. No payment was made, no order was sent and no email was delivered.",
      reference: "Preview reference",
      again: "Explore more pieces",
      print: "Print summary",
      checkstock: "Quantity adjusted to the available sample stock.",
      wishEmpty: "Your saved parts live here.",
      wishEmptytext: "Tap the heart on a part to save it for later.",
      onlysaved: "Saved parts only",
      more: "See all results",
      page: "Page",
      abouttitle: "For people who see possibilities.",
      aboutbody:
        "STUD & STACK is an independent store concept for builders who know that the smallest part can make the biggest difference. Our goal is a simple way to find parts by shape, colour, condition and quantity. This presentation uses a small sample catalogue to illustrate a store designed for a much larger inventory.",
      deliverybody:
        "The checkout illustrates standard delivery, express delivery and collection. Prices and delivery times are examples. In a real store, carrier coverage, return conditions and legal policies would be configured for the business before launch.",
      faq1: "Can I search by part number?",
      faq1a:
        "Yes. Enter a number such as 3001, a part name or a colour in the search field. You can combine search with category, colour, condition and price filters.",
      faq2: "Can I order only a few pieces?",
      faq2a:
        "Choose the exact quantity on each product card or inside the part details. The bag combines identical lots and respects the sample stock limit.",
      faq3: "Will the checkout charge me?",
      faq3a:
        "No. This showcase simulates delivery, payment selection, review and confirmation. There is no payment connection, no real order creation and no email service.",
      faq4: "Is the inventory connected to another marketplace?",
      faq4a:
        "No. These are illustrative products and quantities. A real WooCommerce/Bricqer inventory and order connection would be a separate implementation and test phase.",
      trust: "A thoughtful way to find your parts.",
      deliveryestimate: "Illustrative delivery charge",
      contact: "About this showcase",
      savedmessage: "Saved for your next build",
      removedmessage: "Removed from saved parts",
    },
    de: {
      skip: "Zum Teilekatalog",
      utility: "Ein kleines Teil deiner nächsten großen Idee.",
      help: "Hilfe & Service",
      parts: "Teile entdecken",
      colours: "Nach Farbe suchen",
      about: "Unsere Geschichte",
      search: "Teile, Farben oder Teilenummer suchen",
      searchlabel: "Teilekatalog durchsuchen",
      saved: "Merkliste",
      bag: "Warenkorb",
      free: "Ein guter Bau beginnt mit den richtigen Teilen.",
      shippinghint: "Versandoptionen im Checkout",
      eyebrow: "Für Baumeister. Für Träumer. Für Detailverliebte.",
      hero1: "Kleine Teile.",
      hero2: "Große Ideen.",
      lead: "Finde das eine fehlende Teil. Oder die nächsten tausend. Entdecke Steine, Platten und eine Welt voller Möglichkeiten.",
      shop: "Dein nächstes Teil finden",
      explore: "Die Auswahl entdecken",
      note: "Jedes große Bauprojekt",
      notesub: "beginnt mit einem kleinen Teil.",
      ready: "Bereit für dein nächstes Projekt",
      lots: "Teilenummern, Farben & Zustand",
      pick: "Genau die richtige Menge",
      picksub: "Ein Einzelteil oder ein ganzes Projekt",
      pack: "Mit Sorgfalt verpackt",
      packsub: "Jedes Teilelos übersichtlich sortiert",
      world: "Für Menschen mit Ideen",
      worldsub: "Vom ersten Entwurf bis ins Detail",
      categories: "Womit möchtest du bauen?",
      all: "Alle Teile ansehen",
      catalog: "Finde dein perfektes Teil.",
      catalogsub: "Die richtige Form. Die richtige Farbe. Genau deine Menge.",
      filters: "Filter",
      reset: "Alles zurücksetzen",
      category: "Kategorie",
      color: "Farbe",
      condition: "Zustand",
      new: "Neu",
      used: "Gebraucht",
      both: "Alle Zustände",
      unitprice: "Preis pro Stück",
      upto: "Bis",
      need: "Du planst etwas Größeres?",
      needtext:
        "Stelle deine Liste zusammen. Finde deine Teile. Lass aus deiner Idee etwas entstehen.",
      helpbutton: "So funktioniert es",
      results: "Teilelose gefunden",
      samples: "Beispielkatalog",
      sort: "Sortieren nach",
      featured: "Empfohlen",
      priceup: "Preis aufsteigend",
      pricedown: "Preis absteigend",
      number: "Teilenummer",
      grid: "Rasteransicht",
      list: "Listenansicht",
      perpiece: " / Stück",
      available: "verfügbar",
      add: "In den Warenkorb",
      added: "Zum Warenkorb hinzugefügt",
      quantity: "Menge",
      details: "Teil ansehen",
      close: "Schließen",
      favorite: "Teil merken",
      unfavorite: "Aus Merkliste entfernen",
      clear: "Filter zurücksetzen",
      noresults: "Diesmal keine passenden Teile.",
      emptytext: "Versuche eine andere Teilenummer oder entferne einen Filter.",
      next: "Nächste Seite",
      previous: "Vorherige Seite",
      bannerlabel: "Ein Teil näher dran.",
      banner: "Deine nächste Idee?\nSie beginnt hier.",
      bannertext:
        "Ein kleines Detail. Eine bunte Figur. Eine ganz neue Welt. Baue auf deine Art, Teil für Teil.",
      howtitle1: "Finde deine Teile",
      howtext1:
        "Suche nach Teilenummer oder entdecke Formen und Farben. Wähle neue oder gebrauchte Teile.",
      howtitle2: "Mach es zu deinem Projekt",
      howtext2:
        "Wähle genau deine Mengen und sammle alles in einem übersichtlichen Warenkorb.",
      howtitle3: "Bring alles zusammen",
      howtext3:
        "Wähle den Versand und entdecke einen einfachen, durchdachten Bestellablauf.",
      footertext:
        "Kleine Teile. Gemeinsame Möglichkeiten. Ein unabhängiger Teile-Shop für neugierige Baumeister.",
      discover: "Entdecken",
      support: "Kundenservice",
      delivery: "Versand & Rückgabe",
      faq: "Häufige Fragen",
      payments: "Zahlungsarten",
      rights:
        "Unabhängige Vorschau von BAUVERIS. Beispielprodukte, Preise und Bestände. Keine Verbindung zu einem Spielzeughersteller.",
      preview: "Zahlungsarten dienen ausschließlich der Veranschaulichung.",
      backtop: "Nach oben",
      detail: "Produktdetails",
      size: "Maße",
      partnumber: "Teilenummer",
      selectcolor: "Farbe auswählen",
      selectcondition: "Zustand auswählen",
      stocklabel: "Verfügbare Menge",
      pieces: "Stück",
      basket: "Dein Warenkorb",
      emptybag: "Hier beginnt dein nächstes Projekt.",
      emptybagtext:
        "Lege ein paar Teile hinein und erschaffe etwas Großartiges.",
      continue: "Weiter entdecken",
      remove: "Entfernen",
      summary: "Bestellübersicht",
      subtotal: "Zwischensumme",
      shipping: "Versand",
      calculated: "Berechnung im Checkout",
      total: "Gesamt",
      checkout: "Weiter zur Kasse",
      cartnote:
        "Beispielpreise. Es werden keine echten Bestellungen oder Zahlungen verarbeitet.",
      items: "Teile",
      addressstep: "Lieferung",
      paymentstep: "Zahlung",
      reviewstep: "Prüfen",
      confirmationstep: "Fertig",
      deliverydetails: "Wohin sollen deine Teile gehen?",
      email: "E-Mail-Adresse",
      first: "Vorname",
      last: "Nachname",
      street: "Straße und Hausnummer",
      postcode: "Postleitzahl",
      city: "Stadt",
      country: "Land",
      chooseDelivery: "Versand auswählen",
      standard: "Standardversand",
      standardtime: "3–5 Werktage",
      express: "Expressversand",
      expresstime: "1–2 Werktage",
      collection: "Abholung im Laden",
      collectiontime: "Abholtermin vereinbaren",
      freeword: "Kostenlos",
      toPayment: "Weiter zur Zahlung",
      back: "Zurück",
      paymenttitle: "Wie möchtest du bezahlen?",
      paymentnotice:
        "Vorschau-Checkout: Wähle eine Zahlungsart für den vollständigen Ablauf. Es werden keine Zahlungsdaten abgefragt, keine Anbieter geöffnet und keine Beträge abgebucht.",
      idealdesc: "Bezahlen über deine Bank",
      paypaldesc: "Mit deinem PayPal-Konto bezahlen",
      carddesc: "Visa oder Mastercard",
      bankdesc: "Manuelle Banküberweisung",
      bank: "Überweisung",
      reviewbutton: "Bestellung prüfen",
      reviewtitle: "Ein letzter Blick auf dein Projekt.",
      deliverTo: "Lieferadresse",
      method: "Zahlungsart",
      edit: "Bearbeiten",
      terms:
        "Ich verstehe, dass dies eine Vorschau ist. Es entstehen keine echte Bestellung, Zahlung oder E-Mail.",
      place: "Vorschau-Bestellung abschließen",
      success: "Deine nächste Idee nimmt Form an!",
      successtext:
        "Die Checkout-Vorschau ist abgeschlossen. Es wurde nichts bezahlt, keine Bestellung versendet und keine E-Mail verschickt.",
      reference: "Vorschau-Referenz",
      again: "Weitere Teile entdecken",
      print: "Übersicht drucken",
      checkstock: "Menge an den verfügbaren Beispielbestand angepasst.",
      wishEmpty: "Hier wohnen deine gemerkten Teile.",
      wishEmptytext:
        "Tippe auf das Herz an einem Teil und merke es dir für später.",
      onlysaved: "Nur gemerkte Teile",
      more: "Alle Ergebnisse ansehen",
      page: "Seite",
      abouttitle: "Für Menschen, die Möglichkeiten sehen.",
      aboutbody:
        "STUD & STACK ist ein unabhängiges Shopkonzept für Menschen, die wissen, dass das kleinste Teil den größten Unterschied machen kann. Unser Ziel: Teile einfach nach Form, Farbe, Zustand und Menge finden. Diese Präsentation nutzt einen kleinen Beispielkatalog und veranschaulicht einen Shop für ein wesentlich größeres Sortiment.",
      deliverybody:
        "Der Checkout zeigt Standardversand, Expressversand und Abholung. Preise und Lieferzeiten sind Beispiele. In einem echten Shop werden Versandgebiete, Rückgabebedingungen und Rechtstexte vor dem Start für den Betrieb eingerichtet.",
      faq1: "Kann ich nach Teilenummer suchen?",
      faq1a:
        "Ja. Gib beispielsweise 3001, einen Teilenamen oder eine Farbe in das Suchfeld ein. Suche und Kategorie-, Farb-, Zustands- und Preisfilter lassen sich kombinieren.",
      faq2: "Kann ich nur wenige Teile auswählen?",
      faq2a:
        "Wähle deine genaue Menge auf jeder Produktkarte oder in den Details. Gleiche Teilelose werden im Warenkorb zusammengeführt. Der Beispielbestand wird berücksichtigt.",
      faq3: "Wird im Checkout etwas abgebucht?",
      faq3a:
        "Nein. Diese Vorschau simuliert Lieferung, Zahlungswahl, Prüfung und Bestätigung. Es gibt keine Zahlungsanbindung, keine echte Bestellerstellung und keinen Mailversand.",
      faq4: "Ist der Bestand mit einem Marktplatz verbunden?",
      faq4a:
        "Nein. Produkte und Mengen sind Beispiele. Eine echte WooCommerce-/Bricqer-Anbindung für Bestand und Bestellungen wäre ein eigener Umsetzungs- und Testschritt.",
      trust: "Ein durchdachter Weg zu deinen Bauteilen.",
      deliveryestimate: "Beispiel-Versandkosten",
      contact: "Über diese Vorschau",
      savedmessage: "Für dein nächstes Projekt gemerkt",
      removedmessage: "Aus der Merkliste entfernt",
    },
  };
  const categories = [
    ["bricks", "Bricks", "Steine"],
    ["plates", "Plates", "Platten"],
    ["tiles", "Tiles", "Fliesen"],
    ["slopes", "Slopes", "Schrägsteine"],
    ["technic", "Technic", "Technik"],
    ["special", "Special parts", "Spezialteile"],
  ];
  const colors = [
    ["red", "#d32d28", "Red", "Rot"],
    ["blue", "#1360c4", "Blue", "Blau"],
    ["yellow", "#f4c600", "Yellow", "Gelb"],
    ["green", "#268058", "Green", "Grün"],
    ["white", "#e9e9e5", "White", "Weiß"],
    ["black", "#303239", "Black", "Schwarz"],
    ["sand", "#c2ac85", "Tan", "Beige"],
    ["gray", "#9ba2a9", "Light gray", "Hellgrau"],
    ["orange", "#ef7933", "Orange", "Orange"],
    ["purple", "#7d5aa8", "Violet", "Violett"],
    ["pink", "#df91ae", "Pink", "Rosa"],
    ["teal", "#258f9b", "Turquoise", "Türkis"],
  ];
  const specs = [
    ["3001", "bricks", "Brick", "Stein", 4, 2, 1, 12],
    ["3003", "bricks", "Brick", "Stein", 2, 2, 1, 8],
    ["3004", "bricks", "Brick", "Stein", 2, 1, 1, 6],
    ["3005", "bricks", "Brick", "Stein", 1, 1, 1, 5],
    ["3010", "bricks", "Brick", "Stein", 4, 1, 1, 10],
    ["3009", "bricks", "Brick", "Stein", 6, 1, 1, 15],
    ["3020", "plates", "Plate", "Platte", 4, 2, 0.3, 9],
    ["3022", "plates", "Plate", "Platte", 2, 2, 0.3, 6],
    ["3023", "plates", "Plate", "Platte", 2, 1, 0.3, 4],
    ["3024", "plates", "Plate", "Platte", 1, 1, 0.3, 3],
    ["3710", "plates", "Plate", "Platte", 4, 1, 0.3, 8],
    ["3460", "plates", "Plate", "Platte", 8, 1, 0.3, 12],
    ["3068", "tiles", "Tile", "Fliese", 2, 2, 0.25, 10],
    ["3069", "tiles", "Tile", "Fliese", 2, 1, 0.25, 7],
    ["3070", "tiles", "Tile", "Fliese", 1, 1, 0.25, 5],
    ["2431", "tiles", "Tile", "Fliese", 4, 1, 0.25, 11],
    ["3039", "slopes", "Slope 45°", "Schrägstein 45°", 2, 2, 1, 14],
    ["3040", "slopes", "Slope 45°", "Schrägstein 45°", 2, 1, 1, 10],
    ["3659", "special", "Arch", "Bogen", 4, 1, 1, 28],
    ["4073", "special", "Round plate", "Runde Platte", 1, 1, 0.3, 5],
    ["3700", "technic", "Brick with hole", "Lochstein", 2, 1, 1, 14],
    ["3701", "technic", "Brick with holes", "Lochstein", 4, 1, 1, 22],
    ["3002", "bricks", "Brick", "Stein", 3, 2, 1, 10],
    ["3623", "plates", "Plate", "Platte", 3, 1, 0.3, 7],
  ];
  const products = specs.flatMap((s, i) =>
    [0, 1, 2].map((j) => ({
      key:
        s[0] +
        "-" +
        colors[(i * 2 + j * 4) % colors.length][0] +
        "-" +
        (j === 2 ? "used" : "new"),
      id: s[0],
      category: s[1],
      en: s[2],
      de: s[3],
      nx: s[4],
      ny: s[5],
      h: s[6],
      price: s[7] + (i % 3) * 2 + j * 2,
      stock: 84 + ((i * 173 + j * 61) % 1900),
      color: colors[(i * 2 + j * 4) % colors.length][0],
      condition: j === 2 ? "used" : "new",
      rank: i + j * 25,
    })),
  );
  // Six consistent building colours for each creative-studio shape.
  for (const id of ["3005", "3004", "3003", "3010", "3001"])
    for (const color of ["red", "blue", "yellow", "green", "white", "black"]) {
      if (
        !products.some(
          (p) => p.id === id && p.color === color && p.condition === "new",
        )
      ) {
        const base = products.find((p) => p.id === id);
        products.push({
          ...base,
          key: id + "-" + color + "-new",
          color,
          condition: "new",
          rank: products.length,
          stock: 450,
          price: base.price,
        });
      }
    }
  const byKey = Object.fromEntries(products.map((p) => [p.key, p]));
  const creationDefs = {};
  const assemblyMinimumCents = Number.isInteger(config.assemblyMinimumCents)
    ? Math.max(0, Math.min(10000, config.assemblyMinimumCents))
    : 295;
  const assemblyRate = Number.isFinite(config.assemblyRate)
    ? Math.max(0, Math.min(1, config.assemblyRate))
    : 0.2;
  function registerCreation(raw) {
    if (
      !raw ||
      !Array.isArray(raw.layout) ||
      !raw.layout.length ||
      raw.layout.length > 120
    )
      return null;
    const layout = raw.layout.map((b) => ({
      key: String(b.key),
      x: b.x,
      y: b.y,
      z: b.z,
      r: b.r,
    }));
    if (!window.StudStackCreative?.validate(layout, products)) return null;
    const label = String(raw.name || "My creation").slice(0, 60),
      mode = raw.mode === "assembled" ? "assembled" : "kit",
      parts = {};
    for (const b of layout) parts[b.key] = (parts[b.key] || 0) + 1;
    const amount = Object.entries(parts).reduce(
      (n, [k, q]) => n + byKey[k].price * q,
      0,
    );
    const extra =
      mode === "assembled"
        ? window.StudStackCreative.assemblyFee(
            amount,
            assemblyMinimumCents,
            assemblyRate,
          )
        : 0;
    let hash = 2166136261;
    for (const ch of JSON.stringify({ layout, label, mode }))
      hash = Math.imul(hash ^ ch.charCodeAt(0), 16777619) >>> 0;
    const key = "creation-" + hash.toString(36),
      first = byKey[layout[0].key];
    creationDefs[key] = { layout, name: label, mode };
    byKey[key] = {
      key,
      id: "CREATION",
      custom: true,
      en: label,
      de: label,
      parts,
      extra,
      mode,
      pieceCount: layout.length,
      price: amount + extra,
      stock: 99,
      color: first.color,
      condition: "new",
      category: "special",
      nx: 1,
      ny: 1,
      image:
        "data:image/svg+xml;charset=utf-8," +
        encodeURIComponent(
          window.StudStackCreative.preview(layout, products, colors),
        ),
    };
    return byKey[key];
  }
  function capacity(p, excludeSelf = false) {
    const committed = {};
    for (const [k, q] of Object.entries(cart)) {
      if (excludeSelf && k === p.key) continue;
      const row = byKey[k];
      if (row.custom) {
        for (const [pk, n] of Object.entries(row.parts))
          committed[pk] = (committed[pk] || 0) + n * q;
      } else committed[k] = (committed[k] || 0) + q;
    }
    const req = p.custom ? p.parts : { [p.key]: 1 };
    return Math.max(
      0,
      Math.min(
        p.stock,
        ...Object.entries(req).map(([k, n]) =>
          Math.floor((byKey[k].stock - (committed[k] || 0)) / n),
        ),
      ),
    );
  }
  function creationDescription(p) {
    return (
      p.pieceCount +
      " " +
      t("pieces") +
      " · " +
      (p.mode === "assembled"
        ? (lang === "de" ? "Montiert" : "Assembled") +
          " (+" +
          money(p.extra) +
          ")"
        : lang === "de"
          ? "Bausatz"
          : "Kit")
    );
  }

  const storeKey = "studstack-showcase-v1";
  const safeRead = () => {
    try {
      return JSON.parse(localStorage.getItem(storeKey) || "{}");
    } catch {
      return {};
    }
  };
  const saved = safeRead();
  if (Array.isArray(saved.creations))
    saved.creations.slice(0, 50).forEach(registerCreation);
  let lang =
    saved.lang === "de" ? "de" : config.language === "de" ? "de" : "en";
  let cart = {};
  Object.entries(saved.cart || {}).forEach(([k, v]) => {
    if (byKey[k] && Number.isInteger(v) && v > 0)
      cart[k] = Math.min(v, byKey[k].stock);
  });
  let wishes = new Set(
    (Array.isArray(saved.wishes) ? saved.wishes : []).filter((k) => byKey[k]),
  );
  let filters = {
      q: "",
      category: [],
      color: [],
      condition: [],
      price: 150,
      saved: false,
    },
    page = 1,
    sort = "featured",
    view = "grid",
    activeProduct = null,
    checkoutStep = 0,
    draft = { country: "NL", delivery: "standard", payment: "ideal" },
    successRef = "",
    toastTimer;
  const t = (k) => dict[lang][k] || k;
  const esc = (v) =>
    String(v ?? "").replace(
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
  const money = (c) =>
    new Intl.NumberFormat(lang === "de" ? "de-DE" : "en-IE", {
      style: "currency",
      currency: "EUR",
    }).format(c / 100);
  const colorFor = (p) =>
    colors.find((c) => c[0] === (typeof p === "string" ? p : p.color));
  const colorName = (p) => colorFor(p)[lang === "de" ? 3 : 2];
  const pname = (p) =>
    p.custom ? p[lang] : p[lang] + " " + p.ny + " × " + p.nx;
  const img = (p) =>
    p.custom ? p.image : assetBase + p.id + "-" + p.color + ".svg";
  const cateName = (id) =>
    categories.find((c) => c[0] === id)?.[lang === "de" ? 2 : 1] || id;
  const icon = (name, size = 20) => {
    const d = {
      search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',
      heart:
        '<path d="M20.5 5.5c-2-2-5-1.5-8.5 2-3.5-3.5-6.5-4-8.5-2C-1 10 6 16 12 21c6-5 13-11 8.5-15.5Z"/>',
      bag: '<path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/>',
      arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
      close: '<path d="m6 6 12 12M18 6 6 18"/>',
      box: '<path d="m3 7 9-4 9 4-9 5-9-5Zm0 0v10l9 4 9-4V7M12 12v9M7 5l10 5"/>',
      check: '<path d="m5 12 4 4L19 6"/>',
      truck:
        '<path d="M3 5h11v12H3V5Zm11 5h4l3 4v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
      globe:
        '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
      grid: '<path d="M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7Z"/>',
      list: '<path d="M3 5h18M3 12h18M3 19h18"/>',
      filter: '<path d="M3 6h18M6 12h12M9 18h6"/>',
      up: '<path d="m5 15 7-7 7 7"/>',
      info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>',
      lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    };
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d[name] || d.box}</svg>`;
  };
  const persist = () => {
    try {
      localStorage.setItem(
        storeKey,
        JSON.stringify({
          cart,
          wishes: [...wishes],
          lang,
          creations: Object.keys(cart)
            .filter((k) => creationDefs[k])
            .map((k) => creationDefs[k]),
        }),
      );
    } catch {}
  };
  const brandHTML = () =>
    `<a class="brand" href="#" aria-label="${esc(brand)}"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span>${esc(brand).replace(" & ", "<br>& ")}</span></a>`;
  const searchHTML = (mobile = false) =>
    `<div class="search"><input type="search" data-search placeholder="${t("search")}" aria-label="${t("searchlabel")}" autocomplete="off" value="${esc(filters.q)}"><span class="search-icon">${icon("search", 17)}</span><div class="suggestions" hidden></div></div>`;
  function shell() {
    host.innerHTML = `<a href="#ss-catalog" class="skip">${t("skip")}</a><div class="utility"><div class="wrap"><span class="utility-left">${t("utility")}</span><span class="utility-center">${t("ready")} ↗</span><div class="language"><button data-act="help" data-value="faq">${t("help")}</button> &nbsp;|&nbsp; <button data-act="lang" data-value="en" class="${lang === "en" ? "active" : ""}" aria-pressed="${lang === "en"}">EN</button><button data-act="lang" data-value="de" class="${lang === "de" ? "active" : ""}" aria-pressed="${lang === "de"}">DE</button></div></div></div><header class="header"><div class="wrap mainnav">${brandHTML()}<nav class="navlinks" aria-label="${t("discover")}"><a href="#ss-catalog">${t("parts")}</a><button data-act="colors">${t("colours")}</button><button data-act="help" data-value="about">${t("about")}</button></nav><div class="nav-actions">${searchHTML()}<button class="iconbtn" data-act="wishes" aria-label="${t("saved")}">${icon("heart", 23)}<span class="count" data-wish-count>${wishes.size}</span></button><button class="iconbtn" data-act="cart" aria-label="${t("bag")}">${icon("bag", 23)}<span class="count" data-cart-count>${count()}</span></button></div><div class="mobile-search" style="display:none">${searchHTML(true)}</div></div></header><div class="shipping-strip">${t("free")} &nbsp; <span>${t("shippinghint")} →</span></div><main><section class="hero"><div class="wrap"><div class="hero-copy"><div class="eyebrow">${t("eyebrow")}</div><h1>${t("hero1")}<span>${t("hero2")}</span></h1><p>${t("lead")}</p><a class="button" href="#ss-catalog">${t("shop")} ${icon("arrow", 18)}</a></div><div class="hero-art" aria-label="${lang === "de" ? "Bunte Bausteine in räumlicher Darstellung" : "Colourful dimensional building bricks"}"><div class="orbit"></div><img class="hero-piece hp1" src="${assetBase}3001-red.svg" width="480" height="320" alt=""><img class="hero-piece hp2" src="${assetBase}3003-yellow.svg" width="480" height="320" alt=""><img class="hero-piece hp3" src="${assetBase}3020-blue.svg" width="480" height="320" alt=""><img class="hero-piece hp4" src="${assetBase}3005-green.svg" width="480" height="320" alt=""><span class="floating-id">3001 · 2 × 4 · RED</span><div class="floating-note">${icon("box", 25)}<div><strong>${t("note")}</strong>${t("notesub")}</div></div></div></div><div class="hero-pagination" aria-hidden="true"><i></i><i></i><i></i></div></section><div class="wrap"><div class="trustbar"><div>${icon("search", 26)}<span><strong>${t("ready")}</strong>${t("lots")}</span></div><div>${icon("box", 26)}<span><strong>${t("pick")}</strong>${t("picksub")}</span></div><div>${icon("check", 26)}<span><strong>${t("pack")}</strong>${t("packsub")}</span></div><div>${icon("globe", 26)}<span><strong>${t("world")}</strong>${t("worldsub")}</span></div></div></div><section class="categories wrap"><div class="sectionhead"><h2>${t("categories")}</h2><button class="textlink" data-act="reset">${t("all")} ${icon("arrow", 15)}</button></div><div class="category-grid">${categories.map((c, i) => `<button class="category" data-act="category" data-value="${c[0]}"><span class="catpic"><img src="${img(products.find((p) => p.category === c[0]))}" width="480" height="320" alt=""></span>${c[lang === "de" ? 2 : 1]}</button>`).join("")}</div></section><section class="catalog" id="ss-catalog"><div class="wrap"><div class="sectionhead"><div><div class="eyebrow">${t("explore")}</div><h2>${t("catalog")}</h2><p>${t("catalogsub")}</p></div><span class="chip">${t("samples")} · ${products.length}</span></div><div class="catalog-layout"><aside class="filters" id="ss-filters" aria-label="${t("filters")}"></aside><div><div class="catalogtools"><button class="filter-mobile" data-act="filters">${icon("filter", 16)} ${t("filters")}</button><span class="result-count" id="ss-results" aria-live="polite"></span><div class="toolright"><select id="ss-sort" aria-label="${t("sort")}"><option value="featured">${t("featured")}</option><option value="priceup">${t("priceup")}</option><option value="pricedown">${t("pricedown")}</option><option value="number">${t("number")}</option></select><div class="viewtoggle"><button data-act="view" data-value="grid" aria-label="${t("grid")}" class="${view === "grid" ? "active" : ""}">${icon("grid", 17)}</button><button data-act="view" data-value="list" aria-label="${t("list")}" class="${view === "list" ? "active" : ""}">${icon("list", 17)}</button></div></div></div><div class="activefilters" id="ss-active"></div><div class="products ${view === "list" ? "list" : ""}" id="ss-products"></div><div class="pagination" id="ss-pages"></div></div></div></div></section><section class="inspiration wrap"><div class="build-banner"><div class="build-copy"><div class="eyebrow">${t("bannerlabel")}</div><h2>${t("banner").replace("\n", "<br>")}</h2><p>${t("bannertext")}</p><button class="button yellow" data-act="reset">${t("shop")} ${icon("arrow", 17)}</button></div><div class="build-art"><img src="${assetBase}3001-yellow.svg" width="480" height="320" alt=""><img src="${assetBase}3003-blue.svg" width="480" height="320" alt=""></div></div><div class="how">${[1, 2, 3].map((i) => `<div><span>0${i}</span><h3>${t("howtitle" + i)}</h3><p>${t("howtext" + i)}</p></div>`).join("")}</div></section></main><footer class="footer"><div class="wrap"><div class="footer-grid"><div>${brandHTML()}<p>${t("footertext")}</p></div><div><h3>${t("discover")}</h3><a href="#ss-catalog">${t("parts")}</a><button data-act="colors">${t("colours")}</button><button data-act="wishes">${t("saved")}</button></div><div><h3>${t("support")}</h3><button data-act="help" data-value="delivery">${t("delivery")}</button><button data-act="help" data-value="faq">${t("faq")}</button><button data-act="help" data-value="about">${t("about")}</button></div><div><h3>${t("payments")}</h3><div class="payment-pills"><span>iDEAL</span><span>PayPal</span><span>VISA</span><span>Mastercard</span></div><p>${t("preview")}</p></div></div><div class="footer-bottom">© ${new Date().getFullYear()} ${esc(brand)}<span>${t("rights")}</span></div></div></footer><button class="backtotop" data-act="top" aria-label="${t("backtop")}">${icon("up", 17)}</button><div id="ss-toast" role="status" aria-live="polite"></div><dialog id="ss-dialog" aria-labelledby="ss-modal-title"></dialog>`;
    host.querySelector("#ss-sort").value = sort;
    renderFilters();
    renderCatalog();
    const dlg = dialog();
    dlg.addEventListener("close", () => {
      document.body.classList.remove("ss-lock");
    });
    dlg.addEventListener("click", (e) => {
      if (e.target === dlg) {
        const r = dlg.getBoundingClientRect();
        if (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        )
          dlg.close();
      }
    });
    document.documentElement.lang = lang;
    document.title = brand + " — " + t("hero1") + " " + t("hero2");
    window.StudStackExperience?.mount({
      host,
      products,
      colors,
      assetBase,
      language: () => lang,
      money,
      pname,
      colorName,
      img,
      qtyHTML,
      openProduct,
      openCart,
      openModal,
      toast,
      cartParts: () => {
        const result = {};
        for (const [k, q] of Object.entries(cart)) {
          const p = byKey[k];
          for (const [pk, n] of Object.entries(p.custom ? p.parts : { [k]: 1 }))
            result[pk] = (result[pk] || 0) + n * q;
        }
        return result;
      },
      addMissing: (rows) => {
        if (rows.some((r) => !byKey[r.key] || capacity(byKey[r.key]) < r.q))
          return false;
        for (const r of rows) cart[r.key] = (cart[r.key] || 0) + r.q;
        updateCounts();
        window.StudStackExperience?.added(null);
        return true;
      },
    });

    window.StudStackCreative?.mount({
      host,
      products,
      colors,
      assetBase,
      brand,
      creations: () =>
        Object.entries(creationDefs).map(([key, def]) => ({ key, ...def })),
      assemblyMinimumCents,
      assemblyRate,
      language: () => lang,
      money,
      toast,
      openCart,
      openModal,
      closeModal: () => dialog().close(),
      addCreation: (layout, name, mode) => {
        const p = registerCreation({ layout, name, mode });
        if (!p || capacity(p) < 1) return false;
        add(p, 1);
        return true;
      },
    });
  }
  function renderFilters() {
    const el = host.querySelector("#ss-filters");
    el.innerHTML = `<div class="filtertop"><strong>${t("filters")}</strong><button data-act="reset">${t("reset")}</button><button class="iconbtn filter-close" data-act="filters" aria-label="${t("close")}">${icon("close", 18)}</button></div><div class="filtergroup"><h3>${t("category")}</h3>${categories.map((c) => `<label><input type="checkbox" data-filter="category" value="${c[0]}" ${filters.category.includes(c[0]) ? "checked" : ""}>${c[lang === "de" ? 2 : 1]}<span>${products.filter((p) => p.category === c[0]).length}</span></label>`).join("")}</div><div class="filtergroup"><h3>${t("color")}</h3><div class="colors">${colors.map((c) => `<button class="swatch ${filters.color.includes(c[0]) ? "selected" : ""}" data-act="color" data-value="${c[0]}" style="background:${c[1]}" title="${c[lang === "de" ? 3 : 2]}" aria-label="${c[lang === "de" ? 3 : 2]}" aria-pressed="${filters.color.includes(c[0])}"></button>`).join("")}</div></div><div class="filtergroup"><h3>${t("condition")}</h3>${["new", "used"].map((c) => `<label><input type="checkbox" data-filter="condition" value="${c}" ${filters.condition.includes(c) ? "checked" : ""}>${t(c)}</label>`).join("")}</div><div class="filtergroup"><h3>${t("unitprice")}</h3><input class="pricefilter" type="range" min="3" max="150" step="1" value="${filters.price}" data-price aria-label="${t("unitprice")}"><div>${t("upto")} <b id="ss-range-price">${money(filters.price)}</b></div></div><div class="filter-card">${icon("box", 27)}<h3>${t("need")}</h3><p>${t("needtext")}</p><button class="textlink" data-act="help" data-value="faq">${t("helpbutton")} →</button></div>`;
  }
  function matched() {
    let rows = products.filter(
      (p) =>
        (!filters.category.length || filters.category.includes(p.category)) &&
        (!filters.color.length || filters.color.includes(p.color)) &&
        (!filters.condition.length ||
          filters.condition.includes(p.condition)) &&
        p.price <= filters.price &&
        (!filters.saved || wishes.has(p.key)),
    );
    const q = filters.q.trim().toLocaleLowerCase();
    if (q)
      rows = rows.filter((p) =>
        [
          p.id,
          p.en,
          p.de,
          p.ny + "x" + p.nx,
          p.ny + " x " + p.nx,
          colorFor(p)[2],
          colorFor(p)[3],
          cateName(p.category),
        ]
          .join(" ")
          .toLocaleLowerCase()
          .includes(q.replace("×", "x")),
      );
    rows.sort((a, b) =>
      sort === "priceup"
        ? a.price - b.price
        : sort === "pricedown"
          ? b.price - a.price
          : sort === "number"
            ? Number(a.id) - Number(b.id)
            : a.rank - b.rank,
    );
    return rows;
  }
  function qtyHTML(p, value = 1, context = "card") {
    return `<div class="qty"><button data-act="qtyminus" data-key="${p.key}" data-context="${context}" aria-label="${t("quantity")} −">−</button><input type="number" min="1" max="${p.stock}" step="1" value="${value}" data-qty="${p.key}" data-context="${context}" aria-label="${t("quantity")} ${esc(pname(p))}"><button data-act="qtyplus" data-key="${p.key}" data-context="${context}" aria-label="${t("quantity")} +">+</button></div>`;
  }
  function card(p) {
    return `<article class="product"><div class="product-top"><span class="badge">${t(p.condition)}</span><button class="favorite" data-act="wish" data-key="${p.key}" aria-label="${wishes.has(p.key) ? t("unfavorite") : t("favorite")}" aria-pressed="${wishes.has(p.key)}">${icon("heart", 17)}</button><button class="open-product" data-act="product" data-key="${p.key}" aria-label="${t("details")} ${esc(pname(p))}"><img src="${img(p)}" width="480" height="320" loading="lazy" alt="${esc(pname(p) + " · " + colorName(p))}"></button></div><div class="product-info"><div class="partmeta"><span>${p.id}</span><span>${cateName(p.category)}</span></div><button class="namebutton" data-act="product" data-key="${p.key}"><h3>${esc(pname(p))}</h3></button><div class="colorname"><i class="dot" style="background:${colorFor(p)[1]}"></i>${colorName(p)}</div><div class="price-row"><span class="price">${money(p.price)}<small>${t("perpiece")}</small></span><span class="stock">${p.stock.toLocaleString(lang)} ${t("available")}</span></div><div class="buyrow">${qtyHTML(p)}<button class="button" data-act="add" data-key="${p.key}">${icon("bag", 14)} ${t("add")}</button></div></div></article>`;
  }
  function renderCatalog() {
    let rows = matched();
    const pages = Math.max(1, Math.ceil(rows.length / 12));
    page = Math.min(page, pages);
    host.querySelector("#ss-results").textContent =
      rows.length +
      " " +
      t("results") +
      " · " +
      t("page") +
      " " +
      page +
      "/" +
      pages;
    host.querySelector("#ss-products").className =
      "products" + (view === "list" ? " list" : "");
    host.querySelector("#ss-products").innerHTML = rows.length
      ? rows
          .slice((page - 1) * 12, page * 12)
          .map(card)
          .join("")
      : `<div class="empty">${icon("search", 32)}<h3>${filters.saved ? t("wishEmpty") : t("noresults")}</h3><p>${filters.saved ? t("wishEmptytext") : t("emptytext")}</p><button class="button outline" data-act="reset">${t("clear")}</button></div>`;
    host.querySelector("#ss-pages").innerHTML =
      pages > 1
        ? Array.from(
            { length: pages },
            (_, i) =>
              `<button data-act="page" data-value="${i + 1}" class="${page === i + 1 ? "active" : ""}" aria-label="${t("page")} ${i + 1}" ${page === i + 1 ? 'aria-current="page"' : ""}>${i + 1}</button>`,
          ).join("")
        : "";
    let chips = [];
    if (filters.q) chips.push(["q", filters.q, filters.q]);
    for (const k of ["category", "color", "condition"])
      for (const v of filters[k])
        chips.push([
          k,
          v,
          k === "category" ? cateName(v) : k === "color" ? colorName(v) : t(v),
        ]);
    if (filters.saved) chips.push(["saved", "", t("onlysaved")]);
    host.querySelector("#ss-active").innerHTML = chips
      .map(
        (c) =>
          `<button class="chip" data-act="removefilter" data-filter="${c[0]}" data-value="${esc(c[1])}">${esc(c[2])} ×</button>`,
      )
      .join("");
  }
  const count = () =>
    Object.entries(cart).reduce(
      (n, [k, q]) => n + q * (byKey[k].custom ? byKey[k].pieceCount : 1),
      0,
    );
  const subtotal = () =>
    Object.entries(cart).reduce((a, [k, q]) => a + byKey[k].price * q, 0);
  function shipping() {
    if (draft.delivery === "collection") return 0;
    const domestic = ["NL", "DE", "BE"].includes(draft.country);
    if (draft.delivery === "express") return domestic ? 995 : 1995;
    return domestic
      ? subtotal() >= 3500
        ? 0
        : 495
      : draft.country === "US"
        ? 1795
        : 895;
  }
  function toast(text) {
    clearTimeout(toastTimer);
    host.querySelector("#ss-toast").innerHTML =
      `<div class="toast">${icon("check", 17)}${esc(text)}</div>`;
    toastTimer = setTimeout(() => {
      host.querySelector("#ss-toast").innerHTML = "";
    }, 2400);
  }
  function updateCounts() {
    host
      .querySelectorAll("[data-cart-count]")
      .forEach((e) => (e.textContent = count()));
    host
      .querySelectorAll("[data-wish-count]")
      .forEach((e) => (e.textContent = wishes.size));
    persist();
  }
  function clampQty(value, p) {
    return Math.max(
      1,
      Math.min(p.stock, capacity(p, true) || 1, Math.floor(Number(value) || 1)),
    );
  }
  function add(p, qty) {
    const available = capacity(p);
    if (available < 1) {
      toast(t("checkstock"));
      return;
    }
    cart[p.key] = (cart[p.key] || 0) + Math.min(available, clampQty(qty, p));
    updateCounts();
    toast(t("added"));
    window.StudStackExperience?.added(p);
  }
  const dialog = () => host.querySelector("#ss-dialog");
  function openModal(title, body, kind) {
    const dlg = dialog();
    if (kind !== "product") dlg.classList.remove("ex-expanded");
    dlg.dataset.kind = kind;
    dlg.innerHTML = `<div class="modal-head"><h2 id="ss-modal-title">${esc(title)}</h2><button class="iconbtn" data-act="close" aria-label="${t("close")}">${icon("close", 23)}</button></div><div class="modal-body">${body}</div>`;
    if (!dlg.open) {
      dlg.showModal();
      document.body.classList.add("ss-lock");
    }
    dlg.scrollTop = 0;
  }
  function openProduct(key) {
    activeProduct = byKey[key];
    const p = activeProduct;
    if (window.StudStackExperience) {
      window.StudStackExperience.detail(p);
      return;
    }
    const variants = products.filter((x) => x.id === p.id);
    openModal(
      t("detail"),
      `<div class="product-detail"><div class="detail-art"><img src="${img(p)}" width="480" height="320" alt="${esc(pname(p) + " " + colorName(p))}"></div><div class="detail-info"><div class="eyebrow">${cateName(p.category)} · ${p.id}</div><h3>${esc(pname(p))}</h3><p class="colorname">${colorName(p)} · ${t(p.condition)}</p><div class="price">${money(p.price)}<small>${t("perpiece")}</small></div><strong style="font-size:12px">${t("selectcolor")}</strong><div class="colors">${variants.map((v) => `<button class="swatch ${v.key === p.key ? "selected" : ""}" style="background:${colorFor(v)[1]}" data-act="variant" data-key="${v.key}" title="${colorName(v)} · ${t(v.condition)}" aria-label="${colorName(v)} · ${t(v.condition)}" aria-pressed="${v.key === p.key}"></button>`).join("")}</div><span class="stock">${p.stock.toLocaleString(lang)} ${t("pieces")} ${t("available")}</span><div class="buyrow">${qtyHTML(p, 1, "detail")}<button class="button" data-act="add" data-key="${p.key}" data-context="detail">${icon("bag", 17)} ${t("add")}</button></div><button class="textlink" data-act="wish" data-key="${p.key}">${icon("heart", 16)} ${wishes.has(p.key) ? t("unfavorite") : t("favorite")}</button><dl><dt>${t("partnumber")}</dt><dd>${p.id}</dd><dt>${t("size")}</dt><dd>${p.ny} × ${p.nx}</dd><dt>${t("condition")}</dt><dd>${t(p.condition)}</dd><dt>${t("color")}</dt><dd>${colorName(p)}</dd></dl></div></div>`,
      "product",
    );
  }
  function summaryHTML(checkout = false) {
    return `<div class="summary"><h3>${t("summary")}</h3><div class="sumline"><span>${count()} ${t("items")}</span><span>${money(subtotal())}</span></div><div class="sumline"><span>${t("shipping")}</span><span>${checkout ? (shipping() ? money(shipping()) : t("freeword")) : t("calculated")}</span></div><div class="sumline sumtotal"><span>${t("total")}</span><span>${money(subtotal() + (checkout ? shipping() : 0))}</span></div>${!checkout ? `<button class="button blue wide" data-act="checkout">${t("checkout")} ${icon("arrow", 17)}</button>` : ""}<p class="fineprint">${t("cartnote")}</p></div>`;
  }
  function cartLines(review = false) {
    return Object.entries(cart)
      .map(([key, q]) => {
        const p = byKey[key];
        return `<div class="cartline"><img data-creation-key="${p.custom ? p.key : ""}" src="${img(p)}" width="480" height="320" alt="${esc(pname(p))}"><div><h3>${esc(pname(p))}</h3><small>${p.custom ? esc(creationDescription(p)) : p.id + " · " + colorName(p) + " · " + t(p.condition)}</small>${review ? `<p style="font-size:11px">${q} × ${money(p.price)}</p>` : `<div class="lineactions">${qtyHTML(p, q, "cart")}<button class="remove" data-act="remove" data-key="${key}">${t("remove")}</button></div>`}</div><span class="lineprice">${money(p.price * q)}</span></div>`;
      })
      .join("");
  }
  function openCart() {
    checkoutStep = 0;
    openModal(
      t("basket") + " (" + count() + ")",
      count()
        ? `<div class="cart-layout"><div>${cartLines()}</div>${summaryHTML()}</div><div style="margin-top:20px"><button class="textlink" data-act="close">← ${t("continue")}</button></div>`
        : `<div class="success">${icon("bag", 45)}<h3>${t("emptybag")}</h3><p>${t("emptybagtext")}</p><button class="button blue" data-act="close">${t("shop")}</button></div>`,
      "cart",
    );
  }
  const countries = {
    NL: ["Netherlands", "Niederlande"],
    DE: ["Germany", "Deutschland"],
    BE: ["Belgium", "Belgien"],
    FR: ["France", "Frankreich"],
    GB: ["United Kingdom", "Vereinigtes Königreich"],
    US: ["United States", "USA"],
  };
  const payOptions = [
    ["ideal", "iDEAL", "idealdesc"],
    ["paypal", "PayPal", "paypaldesc"],
    ["card", "Credit / debit card", "carddesc"],
    ["bank", "Bank transfer", "bankdesc"],
  ];
  const payname = () =>
    draft.payment === "bank"
      ? t("bank")
      : draft.payment === "card"
        ? lang === "de"
          ? "Kredit- / Debitkarte"
          : "Credit / debit card"
        : payOptions.find((p) => p[0] === draft.payment)[1];
  function steps() {
    return `<div class="progress-steps">${["addressstep", "paymentstep", "reviewstep"].map((k, i) => `<span class="${checkoutStep === i + 1 ? "active" : ""}"><b>${i + 1}</b>${t(k)}</span>`).join("")}</div>`;
  }
  function deliveryOptions() {
    return `<div class="pay-options">${["standard", "express", "collection"]
      .map((d) => {
        const prior = draft.delivery;
        draft.delivery = d;
        const cost = shipping();
        draft.delivery = prior;
        return `<label class="pay-option"><input type="radio" name="delivery" value="${d}" ${draft.delivery === d ? "checked" : ""}><span><strong>${t(d)}</strong><small>${t(d === "standard" ? "standardtime" : d === "express" ? "expresstime" : "collectiontime")}</small></span><span class="paymark">${cost ? money(cost) : t("freeword")}</span></label>`;
      })
      .join("")}</div>`;
  }
  function field(k, full = false, type = "text", auto = "") {
    return `<label class="${full ? "full" : ""}">${t(k)}<input name="${k}" type="${type}" value="${esc(draft[k] || "")}" required maxlength="${k === "street" ? 120 : 80}" ${auto ? `autocomplete="${auto}"` : ""}></label>`;
  }
  function checkout() {
    if (!count()) {
      openCart();
      return;
    }
    if (!checkoutStep) checkoutStep = 1;
    let content = "";
    if (checkoutStep === 1)
      content = `<form id="ss-address" class="checkout-form"><h3>${t("deliverydetails")}</h3><div class="formgrid">${field("email", true, "email", "email")}${field("first", false, "text", "given-name")}${field("last", false, "text", "family-name")}${field("street", true, "text", "street-address")}${field("postcode", false, "text", "postal-code")}${field("city", false, "text", "address-level2")}<label class="full">${t("country")}<select name="country" autocomplete="country">${Object.entries(
        countries,
      )
        .map(
          ([k, v]) =>
            `<option value="${k}" ${draft.country === k ? "selected" : ""}>${v[lang === "de" ? 1 : 0]}</option>`,
        )
        .join(
          "",
        )}</select></label></div><h3 style="margin-top:26px">${t("chooseDelivery")}</h3><div id="ss-delivery-options">${deliveryOptions()}</div><div class="checkout-controls"><button type="button" class="textlink" data-act="cart">← ${t("basket")}</button><button type="submit" class="button blue">${t("toPayment")} ${icon("arrow", 16)}</button></div></form>`;
    if (checkoutStep === 2)
      content = `<div class="checkout-form"><h3>${t("paymenttitle")}</h3><div class="pay-options">${payOptions.map((p) => `<label class="pay-option"><input type="radio" name="payment" value="${p[0]}" ${draft.payment === p[0] ? "checked" : ""}><span><strong>${p[0] === "bank" ? t("bank") : p[0] === "card" ? (lang === "de" ? "Kredit- / Debitkarte" : p[1]) : p[1]}</strong><small>${t(p[2])}</small></span><span class="paymark">${p[0] === "card" ? "VISA" : p[0] === "bank" ? "IBAN" : p[1]}</span></label>`).join("")}</div><div class="notice">${t("paymentnotice")}</div><div class="checkout-controls"><button class="textlink" data-act="checkoutback">← ${t("back")}</button><button class="button blue" data-act="review">${t("reviewbutton")} ${icon("arrow", 16)}</button></div></div>`;
    if (checkoutStep === 3)
      content = `<div class="checkout-form"><h3>${t("reviewtitle")}</h3><div class="reviewbox"><h3>${t("deliverTo")}</h3>${esc(draft.first)} ${esc(draft.last)}<br>${esc(draft.street)}<br>${esc(draft.postcode)} ${esc(draft.city)}<br>${countries[draft.country][lang === "de" ? 1 : 0]}<br>${esc(draft.email)}<button class="textlink" style="margin:10px 0 0" data-act="editaddress">${t("edit")}</button></div><div class="reviewbox"><h3>${t("shipping")}</h3>${t(draft.delivery)}<br><h3 style="margin-top:14px">${t("method")}</h3>${payname()}</div>${cartLines(true)}<label class="terms"><input type="checkbox" id="ss-preview-consent">${t("terms")}</label><div class="checkout-controls"><button class="textlink" data-act="checkoutback">← ${t("back")}</button><button class="button blue" data-act="place" disabled>${t("place")} ${icon("check", 16)}</button></div></div>`;
    openModal(
      t("checkout"),
      `${steps()}<div class="checkout-layout">${content}<aside id="ss-checkout-summary">${summaryHTML(true)}</aside></div>`,
      "checkout",
    );
  }
  function complete() {
    if (!host.querySelector("#ss-preview-consent")?.checked) return;
    const amount = subtotal() + shipping();
    successRef = "SS-" + String(Date.now()).slice(-6);
    cart = {};
    updateCounts();
    openModal(
      t("confirmationstep"),
      `<div class="success"><div class="success-icon">${icon("check", 35)}</div><div class="eyebrow" style="justify-content:center">${t("reference")} ${successRef}</div><h3>${t("success")}</h3><p>${t("successtext")}</p><div class="summary" style="text-align:left;margin:25px 0"><div class="sumline"><span>${t("total")}</span><strong>${money(amount)}</strong></div><div class="sumline"><span>${t("method")}</span><span>${payname()}</span></div><div class="fineprint">${t("preview")}</div></div><button class="button blue" data-act="close">${t("again")} ${icon("arrow", 17)}</button></div>`,
      "success",
    );
    draft = { country: "NL", delivery: "standard", payment: "ideal" };
    checkoutStep = 0;
  }
  function help(kind) {
    let body = "";
    if (kind === "faq")
      body = `<h3>${t("trust")}</h3>${[1, 2, 3, 4].map((i) => `<details ${i === 1 ? "open" : ""}><summary>${t("faq" + i)}</summary><p>${t("faq" + i + "a")}</p></details>`).join("")}`;
    if (kind === "about")
      body = `<div class="eyebrow">${esc(brand)}</div><h3>${t("abouttitle")}</h3><p>${t("aboutbody")}</p><h3>${t("helpbutton")}</h3>${[1, 2, 3].map((i) => `<p><strong>0${i} · ${t("howtitle" + i)}</strong><br>${t("howtext" + i)}</p>`).join("")}`;
    if (kind === "delivery")
      body = `<h3>${t("delivery")}</h3><p>${t("deliverybody")}</p><h3>${t("chooseDelivery")}</h3><p>${t("standard")} · ${t("standardtime")}<br>${t("express")} · ${t("expresstime")}<br>${t("collection")} · ${t("collectiontime")}</p><div class="notice">${t("cartnote")}</div>`;
    openModal(
      kind === "about" ? t("about") : t(kind),
      `<div class="help-content">${body}</div>`,
      "help",
    );
  }
  function scrollCatalog() {
    if (location.hash !== "#ss-catalog") location.hash = "#ss-catalog";
    host
      .querySelector("#ss-catalog")
      .scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }
  function reset() {
    filters = {
      q: "",
      category: [],
      color: [],
      condition: [],
      price: 150,
      saved: false,
    };
    page = 1;
    host.querySelectorAll("[data-search]").forEach((e) => (e.value = ""));
    renderFilters();
    renderCatalog();
    scrollCatalog();
  }
  host.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (!b) return;
    const a = b.dataset.act,
      v = b.dataset.value,
      k = b.dataset.key;
    if (a === "lang") {
      const kind = dialog().open ? dialog().dataset.kind : null;
      dialog().close();
      lang = v;
      persist();
      shell();
      if (kind === "cart") openCart();
      else if (kind === "product" && activeProduct)
        openProduct(activeProduct.key);
      else if (kind === "checkout") checkout();
      return;
    }
    if (a === "close") {
      dialog().close();
      return;
    }
    if (a === "top") {
      window.scrollTo({
        top: 0,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
      return;
    }
    if (a === "category") {
      filters.category = [v];
      page = 1;
      renderFilters();
      renderCatalog();
      scrollCatalog();
    }
    if (a === "reset") reset();
    if (a === "colors") {
      scrollCatalog();
      host.querySelector("#ss-filters").classList.add("open");
      host.querySelector(".swatch")?.focus();
    }
    if (a === "color") {
      filters.color = filters.color.includes(v)
        ? filters.color.filter((c) => c !== v)
        : [...filters.color, v];
      page = 1;
      renderFilters();
      renderCatalog();
    }
    if (a === "removefilter") {
      const f = b.dataset.filter;
      if (f === "q") {
        filters.q = "";
        host.querySelectorAll("[data-search]").forEach((e) => (e.value = ""));
      } else if (f === "saved") filters.saved = false;
      else filters[f] = filters[f].filter((x) => x !== v);
      page = 1;
      renderFilters();
      renderCatalog();
    }
    if (a === "page") {
      page = Number(v);
      renderCatalog();
      scrollCatalog();
    }
    if (a === "view") {
      view = v;
      renderCatalog();
      host
        .querySelectorAll("[data-act=view]")
        .forEach((x) => x.classList.toggle("active", x.dataset.value === view));
    }
    if (a === "filters")
      host.querySelector("#ss-filters").classList.toggle("open");
    if (a === "product" || a === "variant") {
      host.querySelectorAll(".suggestions").forEach((s) => (s.hidden = true));
      openProduct(k);
    }
    if (a === "wish") {
      wishes.has(k) ? wishes.delete(k) : wishes.add(k);
      updateCounts();
      renderCatalog();
      toast(wishes.has(k) ? t("savedmessage") : t("removedmessage"));
      if (dialog().open && dialog().dataset.kind === "product") openProduct(k);
    }
    if (a === "wishes") {
      filters.saved = !filters.saved;
      page = 1;
      renderCatalog();
      scrollCatalog();
    }
    if (a === "qtyminus" || a === "qtyplus") {
      const p = byKey[k],
        ctx = b.dataset.context,
        container = b.closest(".qty"),
        inp = container.querySelector("input");
      inp.value = clampQty(Number(inp.value) + (a === "qtyplus" ? 1 : -1), p);
      if (ctx === "cart") {
        cart[k] = Number(inp.value);
        updateCounts();
        openCart();
      }
    }
    if (a === "add") {
      const p = byKey[k];
      const parent = b.closest(".buyrow");
      add(p, parent.querySelector("input").value);
    }
    if (a === "cart") openCart();
    if (a === "remove") {
      delete cart[k];
      updateCounts();
      openCart();
    }
    if (a === "checkout") {
      checkoutStep = 1;
      checkout();
    }
    if (a === "checkoutback") {
      checkoutStep = Math.max(1, checkoutStep - 1);
      checkout();
    }
    if (a === "review") {
      checkoutStep = 3;
      checkout();
    }
    if (a === "editaddress") {
      checkoutStep = 1;
      checkout();
    }
    if (a === "place") complete();
    if (a === "help") help(v);
  });
  host.addEventListener("change", (e) => {
    const el = e.target;
    if (el.matches("[data-filter]")) {
      const f = el.dataset.filter;
      filters[f] = el.checked
        ? [...filters[f], el.value]
        : filters[f].filter((x) => x !== el.value);
      page = 1;
      renderCatalog();
    }
    if (el.id === "ss-sort") {
      sort = el.value;
      page = 1;
      renderCatalog();
    }
    if (el.matches("[data-qty]")) {
      const p = byKey[el.dataset.qty];
      el.value = clampQty(el.value, p);
      if (el.dataset.context === "cart") {
        cart[p.key] = Number(el.value);
        updateCounts();
        openCart();
      }
    }
    if (el.name === "country" || el.name === "delivery") {
      readDraft();
      host.querySelector("#ss-delivery-options").innerHTML = deliveryOptions();
      host.querySelector("#ss-checkout-summary").innerHTML = summaryHTML(true);
    }
    if (el.name === "payment") draft.payment = el.value;
    if (el.id === "ss-preview-consent")
      host.querySelector("[data-act=place]").disabled = !el.checked;
  });
  host.addEventListener("input", (e) => {
    const el = e.target;
    if (el.matches("[data-qty]") && el.value !== "") {
      const p = byKey[el.dataset.qty];
      el.value = clampQty(el.value, p);
      if (el.dataset.context === "cart") {
        cart[p.key] = Number(el.value);
        updateCounts();
        const row = el.closest(".cartline");
        if (row)
          row.querySelector(".lineprice").textContent = money(
            p.price * cart[p.key],
          );
        const summary = host.querySelector(".cart-layout .summary");
        if (summary) summary.outerHTML = summaryHTML();
        const title = host.querySelector("#ss-modal-title");
        if (title) title.textContent = t("basket") + " (" + count() + ")";
      }
    }
    if (el.matches("[data-search]")) {
      filters.q = el.value;
      page = 1;
      renderCatalog();
      host.querySelectorAll("[data-search]").forEach((s) => {
        if (s !== el) s.value = el.value;
      });
      const box = el.parentElement.querySelector(".suggestions");
      const matches = matched().slice(0, 5);
      box.hidden = el.value.trim().length < 2;
      box.innerHTML = matches.length
        ? matches
            .map(
              (p) =>
                `<button data-act="product" data-key="${p.key}"><img src="${img(p)}" width="480" height="320" alt=""><span><strong>${esc(pname(p))}</strong><small>${p.id} · ${colorName(p)} · ${money(p.price)}</small></span></button>`,
            )
            .join("")
        : `<p style="padding:10px;font-size:12px">${t("noresults")}</p>`;
    }
    if (el.matches("[data-price]")) {
      filters.price = Number(el.value);
      page = 1;
      host.querySelector("#ss-range-price").textContent = money(filters.price);
      renderCatalog();
    }
  });
  function readDraft() {
    const f = host.querySelector("#ss-address");
    if (!f) return;
    new FormData(f).forEach((v, k) => (draft[k] = String(v).trim()));
  }
  host.addEventListener("submit", (e) => {
    if (e.target.id === "ss-address") {
      e.preventDefault();
      if (!e.target.reportValidity()) return;
      readDraft();
      checkoutStep = 2;
      checkout();
    }
  });
  host.addEventListener("keydown", (e) => {
    if (e.target.matches("[data-search]") && e.key === "Enter") {
      e.preventDefault();
      host.querySelectorAll(".suggestions").forEach((s) => (s.hidden = true));
      scrollCatalog();
    }
    if (e.key === "Escape") {
      host.querySelectorAll(".suggestions").forEach((s) => (s.hidden = true));
      host.querySelector("#ss-filters")?.classList.remove("open");
    }
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search"))
      host.querySelectorAll(".suggestions").forEach((s) => (s.hidden = true));
  });
  shell();
})();
