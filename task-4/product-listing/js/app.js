// ── STATE ─────────────────────────────────────────────────────────
const state = {
  category:  'all',
  priceMin:  0,
  priceMax:  1000,
  minRating: 0,
  sort:      'default',
};

// ── HELPERS ───────────────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function renderStars(rating) {
  let html = '<div class="stars">';
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      html += '<span class="star filled">★</span>';
    } else if (rating >= i - 0.5) {
      html += '<span class="star half">★</span>';
    } else {
      html += '<span class="star">★</span>';
    }
  }
  html += '</div>';
  return html;
}

function formatPrice(p) {
  return '₹' + p.toLocaleString('en-IN');
}

// ── FILTER + SORT ─────────────────────────────────────────────────
function getFiltered() {
  let list = [...PRODUCTS];

  if (state.category !== 'all') {
    list = list.filter(p => p.category === state.category);
  }

  list = list.filter(p => p.price >= state.priceMin && p.price <= state.priceMax);

  if (state.minRating > 0) {
    list = list.filter(p => p.rating >= state.minRating);
  }

  switch (state.sort) {
    case 'rating-desc': list.sort((a, b) => b.rating - a.rating); break;
    case 'rating-asc':  list.sort((a, b) => a.rating - b.rating); break;
    case 'price-asc':   list.sort((a, b) => a.price  - b.price);  break;
    case 'price-desc':  list.sort((a, b) => b.price  - a.price);  break;
    default: break;
  }

  return list;
}

// ── RENDER ────────────────────────────────────────────────────────
function render() {
  const grid   = $('#product-grid');
  const empty  = $('#empty-state');
  const count  = $('#result-count');
  const list   = getFiltered();

  count.textContent = `${list.length} product${list.length !== 1 ? 's' : ''}`;

  if (!list.length) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';

  grid.innerHTML = list.map(p => `
    <div class="card">
      <div class="card-img-placeholder">${p.emoji}</div>
      <div class="card-body">
        <p class="card-category">${p.category}</p>
        <h2 class="card-name">${p.name}</h2>
        <p class="card-desc">${p.desc}</p>
        <div class="card-footer">
          <span class="card-price">${formatPrice(p.price)}</span>
          <div class="card-rating">
            ${renderStars(p.rating)}
            <span class="rating-num">${p.rating} (${p.reviews.toLocaleString()})</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// ── CATEGORY ──────────────────────────────────────────────────────
$$('input[name="category"]').forEach(input => {
  input.addEventListener('change', () => {
    state.category = input.value;
    render();
  });
});

// ── PRICE SLIDER ─────────────────────────────────────────────────
const slider    = $('#price-slider');
const priceMin  = $('#price-min');
const priceMax  = $('#price-max');
const sliderVal = $('#slider-val');

slider.addEventListener('input', () => {
  state.priceMax = Number(slider.value);
  priceMax.value = slider.value;
  sliderVal.textContent = '₹' + Number(slider.value).toLocaleString('en-IN');
  render();
});

priceMin.addEventListener('input', () => {
  state.priceMin = Number(priceMin.value) || 0;
  render();
});

priceMax.addEventListener('input', () => {
  const val = Number(priceMax.value) || 1000;
  state.priceMax = val;
  slider.value = val;
  sliderVal.textContent = '₹' + val.toLocaleString('en-IN');
  render();
});

// ── RATING BUTTONS ────────────────────────────────────────────────
$$('.rating-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.rating-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.minRating = Number(btn.dataset.rating);
    render();
  });
});

// ── SORT (desktop) ────────────────────────────────────────────────
$$('input[name="sort"]').forEach(input => {
  input.addEventListener('change', () => {
    state.sort = input.value;
    render();
  });
});

// ── SORT (mobile) ─────────────────────────────────────────────────
const mobileSort = $('#mobile-sort');
if (mobileSort) {
  mobileSort.addEventListener('change', () => {
    state.sort = mobileSort.value;
    // sync desktop radio
    const radio = $(`input[name="sort"][value="${state.sort}"]`);
    if (radio) radio.checked = true;
    render();
  });
}

// ── RESET ─────────────────────────────────────────────────────────
$('#reset-btn').addEventListener('click', () => {
  state.category  = 'all';
  state.priceMin  = 0;
  state.priceMax  = 1000;
  state.minRating = 0;
  state.sort      = 'default';

  // Reset UI
  $('input[name="category"][value="all"]').checked = true;
  $('input[name="sort"][value="default"]').checked = true;
  slider.value    = 1000;
  priceMin.value  = 0;
  priceMax.value  = 1000;
  sliderVal.textContent = '₹1000';

  $$('.rating-btn').forEach(b => b.classList.remove('active'));
  $('.rating-btn[data-rating="0"]').classList.add('active');

  if (mobileSort) mobileSort.value = 'default';

  render();
});

// ── MOBILE DRAWER ─────────────────────────────────────────────────
const drawer  = $('#filter-drawer');
const overlay = $('#drawer-overlay');
const openBtn = $('#mobile-filter-btn');
const closeBtn = $('#drawer-close');
const drawerBody = $('#drawer-body');

function openDrawer() {
  // Clone sidebar filters into drawer
  const panel = $('.filters-panel');
  drawerBody.innerHTML = panel ? panel.innerHTML : '';

  // Re-bind events inside drawer
  drawerBody.querySelectorAll('input[name="category"]').forEach(input => {
    input.checked = input.value === state.category;
    input.addEventListener('change', () => {
      state.category = input.value;
      // sync sidebar
      const sidebarInput = $(`input[name="category"][value="${input.value}"]`);
      if (sidebarInput) sidebarInput.checked = true;
      render();
    });
  });

  drawerBody.querySelectorAll('input[name="sort"]').forEach(input => {
    input.checked = input.value === state.sort;
    input.addEventListener('change', () => {
      state.sort = input.value;
      const sidebarInput = $(`input[name="sort"][value="${input.value}"]`);
      if (sidebarInput) sidebarInput.checked = true;
      if (mobileSort) mobileSort.value = input.value;
      render();
    });
  });

  drawerBody.querySelectorAll('.rating-btn').forEach(btn => {
    if (Number(btn.dataset.rating) === state.minRating) btn.classList.add('active');
    else btn.classList.remove('active');

    btn.addEventListener('click', () => {
      drawerBody.querySelectorAll('.rating-btn').forEach(b => b.classList.remove('active'));
      $$('.rating-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sideBtn = $(`.rating-btn[data-rating="${btn.dataset.rating}"]`);
      if (sideBtn) sideBtn.classList.add('active');
      state.minRating = Number(btn.dataset.rating);
      render();
    });
  });

  const drawerReset = drawerBody.querySelector('.reset-btn');
  if (drawerReset) drawerReset.addEventListener('click', () => $('#reset-btn').click());

  drawer.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (openBtn) openBtn.addEventListener('click', openDrawer);
if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
if (overlay) overlay.addEventListener('click', closeDrawer);

// ── INIT ──────────────────────────────────────────────────────────
render();
