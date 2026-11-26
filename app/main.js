// StatAtlas main: hash routing, live search, chart drawing, the sortable
// state table, and keyboard focus on route change. No network calls: all
// content comes from data.js, rendered from the views in views.js.

import {
  HEADLINES, GDP_SERIES, POPULATION_SERIES, AGE_BANDS, STATES,
  UNEMPLOYMENT_SERIES, CPI_SERIES, SECTOR_SHARES, TRADE,
} from './data.js';
import { NAV, viewOverview, viewPopulation, viewEconomy, viewLabour, viewPrices, viewTrade, viewSources } from './views.js';
import { drawLine, drawBars, drawDonut, drawGroupedBars } from './charts.js';

const VIEWS = {
  overview: viewOverview,
  population: viewPopulation,
  economy: viewEconomy,
  labour: viewLabour,
  prices: viewPrices,
  trade: viewTrade,
  sources: viewSources,
};

const viewEl = document.getElementById('view');
const navEl = document.getElementById('nav');

// The GDP chart keeps its range in module state so the toggle survives
// a re-render of the same page.
let gdpRange = 10;

function routeFromHash() {
  const hash = location.hash.replace(/^#\/?/, '').split('/')[0];
  return VIEWS[hash] ? hash : 'overview';
}

function renderNav(route) {
  navEl.innerHTML = NAV.map((n) => {
    const current = n.id === route ? ' aria-current="page"' : '';
    return `<a href="${n.path}"${current}>${n.label}</a>`;
  }).join('');
}

function drawOverviewCharts() {
  const canvas = document.getElementById('gdp-chart');
  if (!canvas) return;
  const series = GDP_SERIES.slice(-gdpRange);
  drawLine(canvas, series.map((g) => ({ label: g.year, value: g.nominal / 1000 })), {
    formatY: (v) => '$' + v.toFixed(0) + 'tn',
    formatValue: (v) => '$' + v.toFixed(2) + 'tn',
    labelStep: gdpRange > 5 ? 1 : 1,
  });
}

function drawPopulationCharts() {
  const pop = document.getElementById('population-chart');
  if (pop) {
    drawLine(pop, POPULATION_SERIES.map((p) => ({ label: p.year, value: p.pop })), {
      floor: 300,
      formatY: (v) => v.toFixed(0) + 'm',
      formatValue: (v) => v.toFixed(1) + 'm',
      labelStep: 1,
    });
  }
  const age = document.getElementById('age-chart');
  if (age) {
    drawBars(age, AGE_BANDS.map((a) => ({ label: a.band, value: a.pop })), {
      formatY: (v) => v.toFixed(0) + 'm',
      formatValue: (v) => v.toFixed(1) + 'm',
    });
  }
}

function drawEconomyCharts() {
  const gdp = document.getElementById('gdp-full-chart');
  if (gdp) {
    drawLine(gdp, GDP_SERIES.map((g) => ({ label: g.year, value: g.nominal / 1000 })), {
      formatY: (v) => '$' + v.toFixed(0) + 'tn',
      formatValue: (v) => '$' + v.toFixed(2) + 'tn',
      labelStep: 1,
    });
  }
  const donut = document.getElementById('sector-chart');
  if (donut) {
    drawDonut(donut, SECTOR_SHARES, '77%\nservices');
  }
}

function drawLabourCharts() {
  const canvas = document.getElementById('unemployment-chart');
  if (!canvas) return;
  drawLine(canvas, UNEMPLOYMENT_SERIES.map((u) => ({ label: u.year, value: u.rate })), {
    formatY: (v) => v.toFixed(0) + '%',
    formatValue: (v) => v.toFixed(1) + '%',
    labelStep: 1,
    colour: '#b45309',
  });
}

function drawPricesCharts() {
  const canvas = document.getElementById('cpi-chart');
  if (!canvas) return;
  drawLine(canvas, CPI_SERIES.map((c) => ({ label: c.year, value: c.rate })), {
    formatY: (v) => v.toFixed(0) + '%',
    formatValue: (v) => v.toFixed(1) + '%',
    labelStep: 1,
    colour: '#7c3aed',
  });
}

function drawTradeCharts() {
  const canvas = document.getElementById('trade-chart');
  if (!canvas) return;
  drawGroupedBars(canvas, [
    { label: 'Goods', exports: TRADE.goodsExports, imports: TRADE.goodsImports },
    { label: 'Services', exports: TRADE.servicesExports, imports: TRADE.servicesImports },
    { label: 'Total', exports: TRADE.exportsTotal, imports: TRADE.importsTotal },
  ], [
    { key: 'exports', name: 'Exports', colour: '#0e7c7b' },
    { key: 'imports', name: 'Imports', colour: '#e8a317' },
  ], {
    formatY: (v) => '$' + (v / 1000).toFixed(1) + 'tn',
    formatValue: (v) => '$' + v.toLocaleString('en-US', { maximumFractionDigits: 0 }) + 'bn',
  });
}

const DRAWERS = {
  overview: drawOverviewCharts,
  population: drawPopulationCharts,
  economy: drawEconomyCharts,
  labour: drawLabourCharts,
  prices: drawPricesCharts,
  trade: drawTradeCharts,
  sources: () => {},
};

// Live search on the Overview page: hide every headline card, topic card
// and release that does not mention the query, and count what is left.
function wireOverviewSearch() {
  const input = document.getElementById('figure-search');
  if (!input) return;
  const count = document.getElementById('search-count');
  const items = [...document.querySelectorAll('[data-search]')];
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    for (const el of items) {
      const hit = !q || el.dataset.search.toLowerCase().includes(q);
      el.classList.toggle('hidden', !hit);
      if (hit) shown += 1;
    }
    count.textContent = q
      ? (shown === 0 ? `No figures match "${input.value}".` : `${shown} of ${items.length} items match "${input.value}".`)
      : '';
  });
}

// GDP range toggle on the Overview page.
function wireGdpToggle() {
  const buttons = [...document.querySelectorAll('.toggle-btn')];
  if (!buttons.length) return;
  for (const btn of buttons) {
    btn.addEventListener('click', () => {
      gdpRange = Number(btn.dataset.range);
      for (const b of buttons) {
        const active = b === btn;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', String(active));
      }
      drawOverviewCharts();
    });
  }
}

// State table: column sorting and text filtering, rendered from STATES.
// Rank is the population rank (1 = largest) and stays fixed no matter how
// the table is sorted; the row number never pretends to be the rank.
const STATE_RANK = new Map(
  [...STATES].sort((a, b) => b.pop2024 - a.pop2024).map((s, i) => [s.name, i + 1]),
);
let stateSort = { key: 'pop', dir: -1 };
function stateRowsHTML(rows) {
  const total = STATES.reduce((s, x) => s + x.pop2024, 0);
  return rows.map((s) => {
    const change = ((s.pop2024 - s.pop2023) / s.pop2023) * 100;
    const share = (s.pop2024 / total) * 100;
    return `<tr>
      <td>${STATE_RANK.get(s.name)}</td><td>${s.name}</td>
      <td class="num">${s.pop2024.toLocaleString('en-US')}</td>
      <td class="num">${share.toFixed(2)}%</td>
      <td class="num">${change >= 0 ? '+' : ''}${change.toFixed(2)}%</td>
    </tr>`;
  }).join('');
}

function sortStates(key, dir) {
  const rows = [...STATES];
  const val = (s) => (key === 'name' ? s.name
    : key === 'pop' ? s.pop2024
    : key === 'share' ? s.pop2024
    : (s.pop2024 - s.pop2023) / s.pop2023);
  rows.sort((a, b) => {
    const va = val(a);
    const vb = val(b);
    return (va < vb ? -1 : va > vb ? 1 : 0) * dir;
  });
  return rows;
}

function wireStateTable() {
  const table = document.getElementById('state-table');
  const filter = document.getElementById('state-filter');
  const count = document.getElementById('state-count');
  if (!table) return;
  const tbody = table.querySelector('tbody');
  const render = () => {
    const q = (filter?.value ?? '').trim().toLowerCase();
    let rows = sortStates(stateSort.key, stateSort.dir);
    if (q) rows = rows.filter((s) => s.name.toLowerCase().includes(q));
    tbody.innerHTML = stateRowsHTML(rows);
    if (count) {
      count.textContent = q
        ? `${rows.length} of 51 areas match "${filter.value}".`
        : '51 areas listed: the 50 states and the District of Columbia.';
    }
  };
  table.querySelectorAll('[data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sort;
      if (stateSort.key === key) stateSort.dir *= -1;
      else stateSort = { key, dir: key === 'name' ? 1 : -1 };
      table.querySelectorAll('[data-sort]').forEach((b) => b.removeAttribute('aria-sort'));
      btn.setAttribute('aria-sort', stateSort.dir === 1 ? 'ascending' : 'descending');
      render();
    });
  });
  filter?.addEventListener('input', render);
}

function render(focusHeading = true) {
  const route = routeFromHash();
  renderNav(route);
  viewEl.innerHTML = VIEWS[route]();
  DRAWERS[route]();
  wireOverviewSearch();
  wireGdpToggle();
  wireStateTable();
  // Move keyboard focus to the new page's heading when the route changes,
  // so keyboard and screen-reader users land on the new content. The first
  // load skips this: focusing on load would paint a focus ring in
  // screenshots and steal focus from the address bar.
  if (focusHeading) {
    const heading = viewEl.querySelector('h1');
    if (heading) heading.focus({ preventScroll: true });
  }
  document.title = `${NAV.find((n) => n.id === route).label} — StatAtlas`;
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', () => render(true));
window.addEventListener('resize', () => {
  const route = routeFromHash();
  DRAWERS[route]();
});
render(false);
