/* Hallmark · behaviour layer
 * Cart with silent success (drawer opens, no toast), 8-state aware controls,
 * localStorage persistence, order hand-off for checkout.
 */

import { PRODUCTS, imgUrl, money } from './products.js';

const BAG_KEY = 'wara.bag.v1';

const byId = (id) => PRODUCTS.find((p) => p.id === id);

/* ------------------------------------------------------------------- state */
let bag = load();

function load() {
  try {
    const raw = localStorage.getItem(BAG_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((line) => byId(line.id) && line.qty > 0)
      : [];
  } catch {
    return [];
  }
}

function save() {
  try {
    localStorage.setItem(BAG_KEY, JSON.stringify(bag));
  } catch {
    /* storage unavailable: the bag still works for this visit */
  }
}

function bagCount() {
  return bag.reduce((n, line) => n + line.qty, 0);
}

function bagTotal() {
  return bag.reduce((sum, line) => sum + byId(line.id).price * line.qty, 0);
}

/* ------------------------------------------------------------------ markup */
function productMarkup(p) {
  const notes = p.notes.length
    ? `<ul class="notes">${p.notes.slice(0, 4).map((n) => `<li>${n}</li>`).join('')}</ul>`
    : '';
  const flag = p.cat === 'gift' ? '<span class="product__flag">Gift set</span>' : '';
  return `
    <article class="product" id="${p.id}" data-id="${p.id}">
      <a class="product__frame" href="shop.html#${p.id}" aria-label="See ${p.name} in the shop">
        ${flag}
        <img src="${imgUrl(p)}" alt="${p.name} by Wara Fragrance" loading="lazy" width="900" height="900">
      </a>
      <div class="product__head">
        <h3 class="product__name"><a href="shop.html#${p.id}">${p.name}</a></h3>
        <span class="product__price num">${money(p.price)}</span>
      </div>
      <p class="product__family">${p.family}</p>
      <p class="product__family">${p.blurb}</p>
      ${notes}
      <div class="product__foot">
        <button class="btn btn--quiet btn--sm" type="button" data-add="${p.id}">Add to bag</button>
        <span class="note">${p.cat === 'unisex' ? 'Unisex' : p.cat === 'her' ? 'For her' : p.cat === 'him' ? 'For him' : 'Gift'}</span>
      </div>
    </article>`;
}

function renderGrid(el, list) {
  el.innerHTML = list.map(productMarkup).join('');
}

/* --------------------------------------------------------------- cart drawer */
function drawerMarkup() {
  return `
  <div class="cart-backdrop" id="cart-backdrop" data-open="false"></div>
  <aside class="cart" id="cart" data-open="false" role="dialog" aria-modal="true" aria-labelledby="cart-title" aria-hidden="true">
    <div class="cart__head">
      <h2 id="cart-title">Your bag</h2>
      <button class="iconbtn" type="button" data-cart-close aria-label="Close bag">
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
      </button>
    </div>
    <div class="cart__body" id="cart-body"></div>
    <div class="cart__foot" id="cart-foot" hidden>
      <div class="cart__row"><span>Subtotal</span><span class="cart__total num" id="cart-subtotal"></span></div>
      <p class="note" style="margin:8px 0 0">Prices are the house's listed USD prices. Delivery is arranged after the order is confirmed.</p>
      <div class="cart__actions">
        <a class="btn" id="cart-checkout" href="#" data-state="default">Send order</a>
        <button class="btn btn--quiet" type="button" data-cart-close>Keep looking</button>
      </div>
    </div>
  </aside>`;
}

function cartBodyMarkup() {
  if (!bag.length) {
    return `<p class="cart__empty">Your bag is empty. Every scent in the house sits between $25 and $46.</p>`;
  }
  return bag
    .map((line) => {
      const p = byId(line.id);
      return `
      <div class="line-item">
        <img class="line-item__img" src="${imgUrl(p, '&width=140')}" alt="" width="64" height="64">
        <div>
          <p class="line-item__name">${p.name}</p>
          <p class="line-item__meta">${p.family} · ${money(p.price)}</p>
          <div class="line-item__qty">
            <button class="qtybtn" type="button" data-step="-1" data-id="${p.id}" aria-label="One fewer ${p.name}">−</button>
            <span class="num" aria-live="polite">${line.qty}</span>
            <button class="qtybtn" type="button" data-step="1" data-id="${p.id}" aria-label="One more ${p.name}">+</button>
            <button class="btn btn--ghost btn--sm" type="button" data-remove="${p.id}">Remove</button>
          </div>
        </div>
        <span class="line-item__price num">${money(p.price * line.qty)}</span>
      </div>`;
    })
    .join('');
}

function syncCart() {
  const count = bagCount();
  document.querySelectorAll('[data-cart-count]').forEach((el) => {
    el.textContent = count;
    el.closest('.iconbtn')?.setAttribute('aria-label', `Bag, ${count} item${count === 1 ? '' : 's'}`);
  });

  const body = document.getElementById('cart-body');
  const foot = document.getElementById('cart-foot');
  if (body) body.innerHTML = cartBodyMarkup();
  if (foot) foot.hidden = bag.length === 0;
  const sub = document.getElementById('cart-subtotal');
  if (sub) sub.textContent = money(bagTotal());

  const link = document.getElementById('cart-checkout');
  if (link) link.href = '#';
}

function openCart(open) {
  const drawer = document.getElementById('cart');
  const back = document.getElementById('cart-backdrop');
  if (!drawer || !back) return;
  drawer.dataset.open = String(open);
  drawer.setAttribute('aria-hidden', String(!open));
  back.dataset.open = String(open);
  if (open) {
    drawer.querySelector('[data-cart-close]')?.focus();
  } else {
    document.querySelector('[data-cart-open]')?.focus();
  }
}

function addToBag(id) {
  const line = bag.find((l) => l.id === id);
  if (line) line.qty += 1;
  else bag.push({ id, qty: 1 });
  save();
  syncCart();
}

/* ------------------------------------------------------------------- wiring */
function initCart() {
  document.body.insertAdjacentHTML('beforeend', drawerMarkup());
  syncCart();

  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add]');
    if (add) {
      addToBag(add.getAttribute('data-add'));
      openCart(true);
      return;
    }
    if (e.target.closest('[data-cart-open]')) {
      openCart(true);
      return;
    }
    if (e.target.closest('[data-cart-close]') || e.target.id === 'cart-backdrop') {
      openCart(false);
      return;
    }
    const step = e.target.closest('[data-step]');
    if (step) {
      const id = step.getAttribute('data-id');
      const dir = Number(step.getAttribute('data-step'));
      const line = bag.find((l) => l.id === id);
      if (!line) return;
      line.qty += dir;
      if (line.qty < 1) bag = bag.filter((l) => l.id !== id);
      save();
      syncCart();
      return;
    }
    const remove = e.target.closest('[data-remove]');
    if (remove) {
      bag = bag.filter((l) => l.id !== remove.getAttribute('data-remove'));
      save();
      syncCart();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') openCart(false);
  });
}

function initGrids() {
  document.querySelectorAll('[data-products]').forEach((el) => {
    const mode = el.getAttribute('data-products');
    if (mode === 'featured') {
      const ids = ['moonbeam-smoky', 'moonbeam-blush', 'sidra'];
      renderGrid(el, ids.map(byId));
    } else if (mode === 'gifts') {
      renderGrid(el, PRODUCTS.filter((p) => p.cat === 'gift'));
    } else {
      renderGrid(el, PRODUCTS);
    }
  });
}

function initFilters() {
  const bar = document.querySelector('[data-filter-root]');
  const grid = document.querySelector('[data-shop-grid]');
  if (!bar || !grid) return;

  const chips = Array.from(bar.querySelectorAll('[data-filter]'));
  const search = document.getElementById('shop-search');
  const count = document.getElementById('shop-count');
  /* deep link: shop.html#gift opens on the gift packs */
  let activeCat = location.hash === '#gift' ? 'gift' : 'all';
  let query = '';

  if (activeCat !== 'all') {
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.getAttribute('data-filter') === activeCat)));
  }

  function paint() {
    const list = PRODUCTS.filter((p) => {
      const catOk = activeCat === 'all' || p.cat === activeCat;
      const hay = `${p.name} ${p.family} ${p.notes.join(' ')}`.toLowerCase();
      const qOk = !query || hay.includes(query);
      return catOk && qOk;
    });
    renderGrid(grid, list);
    if (count) {
      count.textContent = list.length
        ? `${list.length} ${list.length === 1 ? 'scent' : 'scents'}`
        : 'Nothing matches that yet.';
    }
    const empty = document.getElementById('shop-empty');
    if (empty) empty.hidden = list.length > 0;
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      activeCat = chip.getAttribute('data-filter');
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      paint();
    });
  });

  if (search) {
    search.addEventListener('input', () => {
      query = search.value.trim().toLowerCase();
      paint();
    });
  }

  paint();
}

function initMenu() {
  const btn = document.querySelector('[data-menu-toggle]');
  const panel = document.getElementById('mobile-menu');
  if (!btn || !panel) return;
  btn.addEventListener('click', () => {
    const open = panel.dataset.open !== 'true';
    panel.dataset.open = String(open);
    btn.setAttribute('aria-expanded', String(open));
  });
}

function initYear() {
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

function init() {
  initCart();
  initGrids();
  initFilters();
  initMenu();
  initYear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
