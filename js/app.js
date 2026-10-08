(() => {
  const D = window.EGGSTACY;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const byId = Object.fromEntries(D.menu.map((m) => [m.id, m]));
  const cedi = (n) => `GH₵ ${n.toLocaleString()}`;
  const intl = (phone) => "233" + phone.replace(/\D/g, "").replace(/^0/, "");
  const prettyPhone = (p) => p.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
  const sizesOf = (m) => (m.sizes ? Object.keys(m.sizes) : [""]);
  const unit = (m, size) => (m.sizes ? m.sizes[size] : m.price);
  const keyOf = (id, size) => `${id}|${size || ""}`;
  const parseKey = (k) => { const [id, size] = k.split("|"); return { m: byId[id], size }; };
  const fromPrice = (m) => (m.sizes ? Math.min(...Object.values(m.sizes)) : m.price);

  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };

  let cart = store.get("eggstacy-cart-v2", {});
  for (const k of Object.keys(cart)) if (!parseKey(k).m) delete cart[k];
  const sel = {}; // selected size per item
  let activeCat = "all";
  let query = "";

  /* ---------- NAV ---------- */
  const nav = $("#nav");
  const burger = $("#burger");
  const links = $("#navLinks");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  $$("a", links).forEach((a) => a.addEventListener("click", () => {
    links.classList.remove("open");
    burger.setAttribute("aria-expanded", false);
  }));

  /* ---------- OPEN NOW (Accra = GMT) ---------- */
  const ruleFor = (day) => D.hours.find((r) => (r.from <= r.to ? day >= r.from && day <= r.to : day >= r.from || day <= r.to));
  const fmt = (h) => { h = h % 24; const ap = h >= 12 ? "PM" : "AM"; return `${h % 12 || 12}${ap}`; };
  function openStatus(now = new Date()) {
    const day = now.getUTCDay();
    const h = now.getUTCHours() + now.getUTCMinutes() / 60;
    const today = ruleFor(day);
    const yesterday = ruleFor((day + 6) % 7);
    if (yesterday && yesterday.close > 24 && h < yesterday.close - 24) return { open: true, text: `Open now · until ${fmt(yesterday.close)}` };
    if (today && h >= today.open && h < today.close) return { open: true, text: `Open now · until ${fmt(today.close)}` };
    if (today && h < today.open) return { open: false, text: `Closed · opens ${fmt(today.open)}` };
    const tmr = ruleFor((day + 1) % 7);
    return { open: false, text: `Closed · opens ${fmt(tmr.open)} tomorrow` };
  }
  function renderStatus() {
    const s = openStatus();
    $$("[data-status]").forEach((el) => {
      el.textContent = s.text;
      el.classList.toggle("is-open", s.open);
    });
  }
  renderStatus();
  setInterval(renderStatus, 60000);
  $("#hoursList").innerHTML = D.hours.map((r) => `<li><span>${r.days}</span><strong>${r.label}</strong></li>`).join("");

  /* ---------- MENU ---------- */
  const tabs = $("#tabs");
  const grid = $("#menuGrid");

  tabs.innerHTML = D.categories
    .map((c) => `<button class="tab${c.id === activeCat ? " active" : ""}" role="tab" data-cat="${c.id}">${c.label}</button>`)
    .join("");
  tabs.addEventListener("click", (e) => {
    const b = e.target.closest(".tab");
    if (!b) return;
    setCat(b.dataset.cat);
  });
  function setCat(cat) {
    activeCat = cat;
    $$(".tab", tabs).forEach((t) => t.classList.toggle("active", t.dataset.cat === cat));
    renderMenu();
  }
  $("#search").addEventListener("input", (e) => {
    query = e.target.value.trim().toLowerCase();
    if (query && activeCat !== "all") setCat("all");
    else renderMenu();
  });

  const media = (m) =>
    m.img ? `<img src="${m.img}" alt="${m.name}" loading="lazy" />` : `<span class="item__emoji">${m.emoji || "🍳"}</span>`;

  const controls = (key) => {
    const q = cart[key] || 0;
    return q
      ? `<div class="qty"><button data-dec="${key}" aria-label="Remove one">−</button><span>${q}</span><button data-inc="${key}" aria-label="Add one">+</button></div>`
      : `<button class="add" data-inc="${key}" aria-label="Add to order">+</button>`;
  };

  const sizeOf = (m) => sel[m.id] ?? sizesOf(m)[0];

  function itemFoot(m) {
    const size = sizeOf(m);
    const chips = m.sizes
      ? `<div class="sizes" role="radiogroup" aria-label="Size">${sizesOf(m)
          .map((s) => `<button class="size${s === size ? " active" : ""}" role="radio" aria-checked="${s === size}" data-size="${m.id}" data-val="${s}">${s} <b>${m.sizes[s]}</b></button>`)
          .join("")}</div>`
      : "";
    return `${chips}<div class="item__foot">
        <span class="price">${cedi(unit(m, size))}</span>
        ${controls(keyOf(m.id, size))}
      </div>`;
  }

  function renderMenu() {
    const items = D.menu.filter(
      (m) =>
        (activeCat === "all" || m.cat === activeCat) &&
        (!query || (m.name + " " + m.desc + " " + m.cat).toLowerCase().includes(query))
    );
    grid.innerHTML = items.length
      ? items
          .map(
            (m, i) => `
        <article class="item" style="animation-delay:${Math.min(i, 12) * 35}ms">
          <div class="item__img">${media(m)}${m.tag ? `<span class="item__tag">${m.tag}</span>` : ""}</div>
          <div class="item__body">
            <h3>${m.name}</h3>
            <p>${m.desc}</p>
            <div data-foot="${m.id}">${itemFoot(m)}</div>
          </div>
        </article>`
          )
          .join("")
      : `<div class="empty">No matches for "${query}". Try "jollof", "fries" or "shake" 🍳</div>`;
  }

  const refreshItem = (id) => $$(`[data-foot="${id}"]`).forEach((el) => (el.innerHTML = itemFoot(byId[id])));

  /* ---------- COMBOS (promo) ---------- */
  const combos = D.menu.filter((m) => m.cat === "combos");
  $("#comboGrid").innerHTML = combos
    .map(
      (m) => `<article class="combo">
        <img src="${m.img}" alt="${m.name}" loading="lazy" />
        <h3>${m.name.replace(" + ", "<br/>+ ")}</h3>
        <div class="combo__btns">
          ${sizesOf(m)
            .map((s) => `<button class="combo__btn" data-add="${keyOf(m.id, s)}"><span>${s}</span><strong>${cedi(m.sizes[s])}</strong></button>`)
            .join("")}
        </div>
      </article>`
    )
    .join("");

  /* ---------- CART ---------- */
  const drawer = $("#drawer");
  const overlay = $("#overlay");
  const branchSelect = $("#branchSelect");
  const fab = $("#fab");

  branchSelect.innerHTML = D.branches.map((b) => `<option value="${b.id}">${b.name} (${b.area})</option>`).join("");
  const savedBranch = store.get("eggstacy-branch", D.branches[0].id);
  branchSelect.value = D.branches.some((b) => b.id === savedBranch) ? savedBranch : D.branches[0].id;
  branchSelect.addEventListener("change", () => {
    store.set("eggstacy-branch", branchSelect.value);
    renderCart();
  });
  $("#custName").value = store.get("eggstacy-name", "");
  $("#custName").addEventListener("input", (e) => store.set("eggstacy-name", e.target.value));

  function change(key, delta) {
    const { m, size } = parseKey(key);
    if (!m) return;
    const q = Math.max(0, (cart[key] || 0) + delta);
    if (q) cart[key] = q;
    else delete cart[key];
    store.set("eggstacy-cart-v2", cart);
    refreshItem(m.id);
    renderCart();
    if (delta > 0) {
      toast(`${m.name}${size ? ` (${size})` : ""} added 🍳`);
      const cb = $("#cartOpen");
      cb.classList.remove("bump");
      void cb.offsetWidth;
      cb.classList.add("bump");
    }
  }

  document.addEventListener("click", (e) => {
    const inc = e.target.closest("[data-inc]");
    const dec = e.target.closest("[data-dec]");
    const add = e.target.closest("[data-add]");
    const sz = e.target.closest("[data-size]");
    if (inc) change(inc.dataset.inc, 1);
    if (dec) change(dec.dataset.dec, -1);
    if (add) { change(add.dataset.add, 1); openCart(); }
    if (sz) { sel[sz.dataset.size] = sz.dataset.val; refreshItem(sz.dataset.size); }
  });

  function totals() {
    let sum = 0, count = 0;
    for (const [k, q] of Object.entries(cart)) {
      const { m, size } = parseKey(k);
      if (!m) continue;
      count += q;
      sum += (unit(m, size) || 0) * q;
    }
    return { sum, count };
  }

  const branch = () => D.branches.find((b) => b.id === branchSelect.value) || D.branches[0];
  const label = (m, size) => `${m.name}${size ? ` (${size})` : ""}`;

  function renderCart() {
    const { sum, count } = totals();
    $("#cartCount").textContent = count;
    $("#fabText").textContent = count ? `${count} item${count > 1 ? "s" : ""} · ${cedi(sum)}` : "Your order";
    fab.classList.toggle("show", count > 0);
    $("#cartTotal").textContent = cedi(sum);
    $("#callBranch").href = `tel:${branch().phone}`;
    $("#callBranch").textContent = `📞 Call ${branch().name} (${prettyPhone(branch().phone)})`;

    const lines = Object.entries(cart).filter(([k]) => parseKey(k).m);
    $("#cartItems").innerHTML = lines.length
      ? lines
          .map(([k, q]) => {
            const { m, size } = parseKey(k);
            return `<div class="line">
              ${m.img ? `<img class="line__thumb" src="${m.img}" alt="" />` : `<span class="line__thumb">${m.emoji || "🍳"}</span>`}
              <div><strong>${label(m, size)}</strong><small>${cedi(unit(m, size) * q)}</small></div>
              <div class="qty"><button data-dec="${k}" aria-label="Remove one">−</button><span>${q}</span><button data-inc="${k}" aria-label="Add one">+</button></div>
            </div>`;
          })
          .join("")
      : `<div class="drawer__empty"><div>🥚</div>Your order is empty.<br/>Add something tasty from the menu!</div>`;
    $("#sendWhatsApp").disabled = !lines.length;
    $("#sendWhatsApp").style.opacity = lines.length ? 1 : 0.5;
  }

  function openCart() {
    drawer.classList.add("open");
    overlay.classList.add("show");
    drawer.setAttribute("aria-hidden", false);
  }
  function closeCart() {
    drawer.classList.remove("open");
    overlay.classList.remove("show");
    drawer.setAttribute("aria-hidden", true);
  }
  $("#cartOpen").addEventListener("click", openCart);
  fab.addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);
  addEventListener("keydown", (e) => { if (e.key === "Escape") { closeCart(); closeModal(); } });

  $("#sendWhatsApp").addEventListener("click", () => {
    const { sum } = totals();
    const b = branch();
    const name = $("#custName").value.trim();
    const note = $("#custNote").value.trim();
    const lines = Object.entries(cart)
      .filter(([k]) => parseKey(k).m)
      .map(([k, q]) => { const { m, size } = parseKey(k); return `• ${q} × ${label(m, size)}: ${cedi(unit(m, size) * q)}`; });
    const msg = [
      `Hello Eggstacy ${b.name}! 🍳${name ? ` This is ${name}.` : ""}`,
      `I'd like to order:`,
      ...lines,
      "",
      `Total: ${cedi(sum)}`,
      ...(note ? [`Note: ${note}`] : []),
    ].join("\n");
    window.open(`https://wa.me/${intl(b.phone)}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  });

  /* ---------- RANDOM PICK ---------- */
  const pickable = D.menu.filter((m) => !["extras"].includes(m.cat) && m.id !== "water");
  $("#eggBtn").addEventListener("click", (e) => {
    const btn = e.currentTarget;
    btn.classList.remove("shake");
    void btn.offsetWidth;
    btn.classList.add("shake");
    const m = pickable[Math.floor(Math.random() * pickable.length)];
    const size = sizesOf(m)[0];
    setTimeout(() => {
      $(".egg__shell", btn).textContent = "🍳";
      $("#eggResult").innerHTML = `<div class="pick">
        ${m.img ? `<img src="${m.img}" alt="" />` : `<span class="pick__emoji">${m.emoji}</span>`}
        <div><strong>${m.name}</strong><span class="muted small">${m.sizes ? "from " : ""}${cedi(fromPrice(m))}</span></div>
        <button class="add" data-inc="${keyOf(m.id, size)}" aria-label="Add ${m.name}">+</button>
      </div>`;
      burst(e.clientX, e.clientY);
      setTimeout(() => ($(".egg__shell", btn).textContent = "🥚"), 1500);
    }, 600);
  });

  /* ---------- REELS ---------- */
  const modal = $("#modal");
  const modalVideo = $("#modalVideo");
  const reels = $$(".reel");
  const canHover = matchMedia("(hover: hover)").matches;
  reels.forEach((r) => {
    const v = $("video", r);
    if (canHover) {
      r.addEventListener("mouseenter", () => { v.play().catch(() => {}); $(".reel__play", r).style.opacity = 0; });
      r.addEventListener("mouseleave", () => { v.pause(); $(".reel__play", r).style.opacity = 1; });
    }
    r.addEventListener("click", () => {
      v.pause();
      modalVideo.src = r.dataset.src;
      modal.classList.add("show");
      modal.setAttribute("aria-hidden", false);
      modalVideo.play().catch(() => {});
    });
  });
  function closeModal() {
    modalVideo.pause();
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", true);
  }
  $("#modalClose").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  // On touch devices, autoplay reels silently when they scroll into view
  if (!canHover && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      const v = $("video", en.target);
      if (en.isIntersecting) v.play().catch(() => {}); else v.pause();
    }), { threshold: 0.6 });
    reels.forEach((r) => io.observe(r));
  }

  /* ---------- BRANCHES ---------- */
  $("#branches").innerHTML = D.branches
    .map(
      (b) => `<article class="branch reveal">
        <span class="branch__pin">📍</span>
        <h3>${b.name}</h3>
        <span class="area">${b.area}</span>
        <p class="muted">${b.address}</p>
        <p>📞 <a href="tel:${b.phone}">${prettyPhone(b.phone)}</a></p>
        <div class="branch__actions">
          <a class="btn btn--yellow" href="${b.maps}" target="_blank" rel="noopener">Directions</a>
          <a class="btn btn--ghost" href="https://wa.me/${intl(b.phone)}" target="_blank" rel="noopener">WhatsApp</a>
          <a class="btn btn--ghost" href="tel:${b.phone}">Call</a>
        </div>
      </article>`
    )
    .join("");

  /* ---------- EXTRAS ---------- */
  const toastEl = $("#toast");
  let toastT;
  function toast(t) {
    toastEl.textContent = t;
    toastEl.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove("show"), 1600);
  }

  function burst(x, y) {
    const bits = ["🥚", "🍳", "🍟", "🧀", "🔥"];
    for (let i = 0; i < 14; i++) {
      const s = document.createElement("span");
      s.className = "confetti";
      s.textContent = bits[i % bits.length];
      s.style.left = x + "px";
      s.style.top = y + "px";
      s.style.setProperty("--dx", (Math.random() - 0.5) * 400 + "px");
      s.style.setProperty("--rot", (Math.random() - 0.5) * 720 + "deg");
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1500);
    }
  }
  // Easter egg: tap the logo 3 times
  let taps = 0, tapT;
  $("#logoEgg").addEventListener("click", (e) => {
    taps++;
    clearTimeout(tapT);
    tapT = setTimeout(() => (taps = 0), 600);
    if (taps === 3) { burst(e.clientX, e.clientY); toast("You found the golden egg 🥚✨"); taps = 0; }
  });

  // Count-up stats
  const countUp = (el) => {
    const end = +el.dataset.count, start = performance.now(), dur = 1400;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  $$("[data-count]").forEach(countUp);

  // Reveal on scroll
  const reveal = () => {
    if (!("IntersectionObserver" in window)) return $$(".reveal").forEach((el) => el.classList.add("in"));
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    }), { threshold: 0.12 });
    $$(".reveal").forEach((el) => io.observe(el));
  };

  $("#year").textContent = new Date().getFullYear();
  renderMenu();
  renderCart();
  reveal();
})();
