(() => {
  const D = window.EGGSTACY;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const byId = Object.fromEntries(D.menu.map((m) => [m.id, m]));
  const cedi = (n) => `GH₵ ${n.toLocaleString()}`;
  const intl = (phone) => "233" + phone.replace(/\D/g, "").replace(/^0/, "");
  const prettyPhone = (p) => p.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");

  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };

  let cart = store.get("eggstacy-cart", {});
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

  /* ---------- MENU ---------- */
  const tabs = $("#tabs");
  const grid = $("#menuGrid");

  tabs.innerHTML = D.categories
    .map((c) => `<button class="tab${c.id === activeCat ? " active" : ""}" role="tab" data-cat="${c.id}">${c.label}</button>`)
    .join("");
  tabs.addEventListener("click", (e) => {
    const b = e.target.closest(".tab");
    if (!b) return;
    activeCat = b.dataset.cat;
    $$(".tab", tabs).forEach((t) => t.classList.toggle("active", t === b));
    renderMenu();
  });
  $("#search").addEventListener("input", (e) => {
    query = e.target.value.trim().toLowerCase();
    renderMenu();
  });

  const media = (m, cls) =>
    m.img
      ? `<img src="${m.img}" alt="${m.name}" loading="lazy" class="${cls || ""}" />`
      : `<span class="${cls ? cls : "item__emoji"}">${m.emoji || "🍳"}</span>`;

  const controls = (m) => {
    const q = cart[m.id] || 0;
    return q
      ? `<div class="qty"><button data-dec="${m.id}" aria-label="Remove one">−</button><span>${q}</span><button data-inc="${m.id}" aria-label="Add one">+</button></div>`
      : `<button class="add" data-inc="${m.id}" aria-label="Add ${m.name}">+</button>`;
  };

  function renderMenu() {
    const items = D.menu.filter(
      (m) =>
        (activeCat === "all" || m.cat === activeCat) &&
        (!query || (m.name + " " + m.desc).toLowerCase().includes(query))
    );
    grid.innerHTML = items.length
      ? items
          .map(
            (m, i) => `
        <article class="item" style="animation-delay:${i * 40}ms">
          <div class="item__img">${media(m)}${m.tag ? `<span class="item__tag">${m.tag}</span>` : ""}</div>
          <div class="item__body">
            <h3>${m.name}</h3>
            <p>${m.desc}</p>
            <div class="item__foot">
              ${m.price != null ? `<span class="price">${cedi(m.price)}</span>` : `<span class="price price--ask">Ask in store</span>`}
              <span data-ctl="${m.id}">${controls(m)}</span>
            </div>
          </div>
        </article>`
          )
          .join("")
      : `<div class="empty">No matches for "${query}". Try "fries" or "cake" 🍳</div>`;
  }

  /* ---------- CART ---------- */
  const drawer = $("#drawer");
  const overlay = $("#overlay");
  const branchSelect = $("#branchSelect");
  const fab = $("#fab");

  branchSelect.innerHTML = D.branches
    .map((b) => `<option value="${b.id}">${b.name} (${b.area})</option>`)
    .join("");
  branchSelect.value = store.get("eggstacy-branch", D.branches[0].id);
  branchSelect.addEventListener("change", () => {
    store.set("eggstacy-branch", branchSelect.value);
    renderCart();
  });
  $("#custName").value = store.get("eggstacy-name", "");
  $("#custName").addEventListener("input", (e) => store.set("eggstacy-name", e.target.value));

  function change(id, delta) {
    const q = Math.max(0, (cart[id] || 0) + delta);
    if (q) cart[id] = q;
    else delete cart[id];
    store.set("eggstacy-cart", cart);
    $$(`[data-ctl="${id}"]`).forEach((el) => (el.innerHTML = controls(byId[id])));
    renderCart();
    if (delta > 0) {
      toast(`${byId[id].name} added 🍳`);
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
    if (inc) change(inc.dataset.inc, 1);
    if (dec) change(dec.dataset.dec, -1);
    if (add) { change(add.dataset.add, 1); openCart(); }
  });

  function totals() {
    let sum = 0, count = 0, unpriced = 0;
    for (const [id, q] of Object.entries(cart)) {
      const m = byId[id];
      if (!m) continue;
      count += q;
      if (m.price != null) sum += m.price * q;
      else unpriced += q;
    }
    return { sum, count, unpriced };
  }

  const branch = () => D.branches.find((b) => b.id === branchSelect.value) || D.branches[0];

  function renderCart() {
    const { sum, count, unpriced } = totals();
    $("#cartCount").textContent = count;
    $("#fabText").textContent = count ? `${count} item${count > 1 ? "s" : ""} · View order` : "Your order";
    fab.classList.toggle("show", count > 0);
    $("#cartTotal").textContent = cedi(sum);
    $("#totalNote").textContent = unpriced ? `+ ${unpriced} item${unpriced > 1 ? "s" : ""} priced at the branch.` : "";
    $("#callBranch").href = `tel:${branch().phone}`;
    $("#callBranch").textContent = `📞 Call ${branch().name} (${prettyPhone(branch().phone)})`;

    const lines = Object.entries(cart).filter(([id]) => byId[id]);
    $("#cartItems").innerHTML = lines.length
      ? lines
          .map(([id, q]) => {
            const m = byId[id];
            return `<div class="line">
              ${m.img ? `<img class="line__thumb" src="${m.img}" alt="" />` : `<span class="line__thumb">${m.emoji || "🍳"}</span>`}
              <div><strong>${m.name}</strong><small>${m.price != null ? cedi(m.price * q) : "Ask in store"}</small></div>
              <div class="qty"><button data-dec="${id}" aria-label="Remove one">−</button><span>${q}</span><button data-inc="${id}" aria-label="Add one">+</button></div>
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
    const { sum, unpriced } = totals();
    const b = branch();
    const name = $("#custName").value.trim();
    const note = $("#custNote").value.trim();
    const lines = Object.entries(cart)
      .filter(([id]) => byId[id])
      .map(([id, q]) => `• ${q} × ${byId[id].name}${byId[id].price != null ? ` (${cedi(byId[id].price * q)})` : ""}`);
    const msg = [
      `Hello Eggstacy ${b.name}! 🍳${name ? ` This is ${name}.` : ""}`,
      `I'd like to order:`,
      ...lines,
      "",
      `Total: ${cedi(sum)}${unpriced ? " + items priced in store" : ""}`,
      ...(note ? [`Note: ${note}`] : []),
    ].join("\n");
    window.open(`https://wa.me/${intl(b.phone)}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  });

  /* ---------- RANDOM PICK ---------- */
  $("#eggBtn").addEventListener("click", (e) => {
    const btn = e.currentTarget;
    btn.classList.remove("shake");
    void btn.offsetWidth;
    btn.classList.add("shake");
    const m = D.menu[Math.floor(Math.random() * D.menu.length)];
    setTimeout(() => {
      $(".egg__shell", btn).textContent = "🍳";
      $("#eggResult").innerHTML = `<div class="pick">
        ${m.img ? `<img src="${m.img}" alt="" />` : `<span class="pick__emoji">${m.emoji}</span>`}
        <div><strong>${m.name}</strong><span class="muted small">${m.desc}</span></div>
        <button class="add" data-inc="${m.id}" aria-label="Add ${m.name}">+</button>
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
