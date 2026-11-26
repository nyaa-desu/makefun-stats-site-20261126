// StatAtlas views: one template per page. Each view returns plain HTML;
// main.js inserts it, then draws the canvases named in data-chart.
// All copy is written for a visitor looking up a number, with the source
// and year attached to every figure.

import {
  HEADLINES, GDP_SERIES, GDP_FACTS, POPULATION_SERIES, POPULATION_FACTS,
  AGE_BANDS, STATES, UNEMPLOYMENT_SERIES, LABOUR_FACTS, CPI_SERIES,
  PRICES_FACTS, SECTOR_SHARES, TRADE, TRADE_FACTS, RELEASES, SOURCES,
} from './data.js';

export const NAV = [
  { id: 'overview', label: 'Overview', path: '#/' },
  { id: 'population', label: 'Population', path: '#/population' },
  { id: 'economy', label: 'Economy', path: '#/economy' },
  { id: 'labour', label: 'Labour', path: '#/labour' },
  { id: 'prices', label: 'Prices', path: '#/prices' },
  { id: 'trade', label: 'Trade', path: '#/trade' },
  { id: 'sources', label: 'Sources', path: '#/sources' },
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

function pageHead(title, lede) {
  return `<p class="kicker">United States</p>
  <h1 tabindex="-1">${esc(title)}</h1>
  <p class="lede">${lede}</p>`;
}

function factGrid(facts) {
  return `<div class="fact-grid">${facts.map((f) => `
    <article class="fact">
      <h3>${esc(f.label)}</h3>
      <p class="fact-value">${esc(f.value)}</p>
      <p class="fact-note">${esc(f.note)}</p>
      <p class="fact-source">${esc(f.source)}</p>
    </article>`).join('')}</div>`;
}

function explainer(title, paragraphs) {
  return `<section class="explainer" aria-label="${esc(title)}">
    <h2>${esc(title)}</h2>
    ${paragraphs.map((p) => `<p>${p}</p>`).join('')}
  </section>`;
}

function sourceLine(text) {
  return `<p class="source-line">Source: ${esc(text)}</p>`;
}

function chartCard(id, title, caption, height) {
  return `<figure class="chart-card">
    <figcaption><h2>${esc(title)}</h2><p>${esc(caption)}</p></figcaption>
    <canvas id="${id}" style="height:${height}px" role="img" aria-label="${esc(title)} chart"></canvas>
  </figure>`;
}

// ---- Overview -----------------------------------------------------------

export function viewOverview() {
  const cards = HEADLINES.map((f) => `
    <article class="stat-card" data-search="${esc(f.label + ' ' + f.value + ' ' + f.note + ' ' + f.keywords)}">
      <h3>${esc(f.label)}</h3>
      <p class="stat-value">${esc(f.value)}</p>
      <p class="stat-change">${esc(f.change)}</p>
      <p class="stat-note">${esc(f.note)}</p>
      <p class="stat-source">${esc(f.source)}</p>
    </article>`).join('');

  const topics = [
    { path: '#/population', title: 'Population', text: '340.1 million people, a record median age of 39.1, and every state ranked.', figure: '340.1m people' },
    { path: '#/economy', title: 'Economy', text: 'A $30.86 trillion economy, ten years of growth, and what it is made of.', figure: '$30.86tn GDP' },
    { path: '#/labour', title: 'Labour', text: '4.1% unemployment, 170.7 million in the labour force, and $36.86 an hour.', figure: '4.1% unemployed' },
    { path: '#/prices', title: 'Prices', text: 'Inflation at 2.6% in 2025 after the 8.0% peak of 2022, and what a dollar buys.', figure: '2.6% inflation' },
    { path: '#/trade', title: 'Trade', text: '$3.19 trillion sold abroad, $4.11 trillion bought in, and a $918 billion gap.', figure: '$918bn deficit' },
    { path: '#/sources', title: 'Sources', text: 'Every figure traced to the agency that published it, and the release it came from.', figure: '6 agencies' },
  ].map((t) => `
    <a class="topic-card" href="${t.path}" data-search="${esc(t.title + ' ' + t.text + ' ' + t.figure)}">
      <span class="topic-figure">${esc(t.figure)}</span>
      <h3>${esc(t.title)}</h3>
      <p>${esc(t.text)}</p>
      <span class="topic-link">Open ${esc(t.title)} &rarr;</span>
    </a>`).join('');

  const releases = RELEASES.map((r) => `
    <li data-search="${esc(r.title + ' ' + r.agency + ' ' + r.detail)}">
      <span class="release-date">${esc(r.date)}</span>
      <div><strong>${esc(r.title)}</strong> &mdash; ${esc(r.agency)}
      <p>${esc(r.detail)}</p></div>
    </li>`).join('');

  return `
  <section class="hero">
    <p class="kicker">StatAtlas &middot; Updated 26 November 2026</p>
    <h1 tabindex="-1">The United States in numbers</h1>
    <p class="lede">One page for every headline figure, each with its source and year,
    drawn from the agencies that publish them &mdash; the Census Bureau, the
    Bureau of Economic Analysis, the Bureau of Labor Statistics and the CDC.
    Nothing here is fetched live: every number is printed on the page, so the
    site works with no network at all.</p>
    <label class="search-box">
      <span class="visually-hidden">Search the headline figures</span>
      <input id="figure-search" type="search" placeholder="Search the figures &mdash; try &ldquo;inflation&rdquo;" autocomplete="off">
    </label>
    <p class="search-hint" id="search-count" aria-live="polite"></p>
  </section>
  <section class="chart-section">
    ${chartCard('gdp-chart', 'Gross domestic product, 2016-2025',
      'Nominal GDP in trillions of dollars. Switch between the full decade and the last five years.',
      200)}
    <div class="toggle" role="group" aria-label="Chart range">
      <button type="button" data-range="10" class="toggle-btn active" aria-pressed="true">10 years</button>
      <button type="button" data-range="5" class="toggle-btn" aria-pressed="false">5 years</button>
    </div>
  </section>
  <section aria-label="Headline figures">
    <div class="stat-row">${cards}</div>
  </section>
  <section aria-label="Topics">
    <h2 class="section-title">Explore by topic</h2>
    <div class="topic-grid">${topics}</div>
  </section>
  <section aria-label="Latest releases">
    <h2 class="section-title">Latest releases</h2>
    <ul class="releases">${releases}</ul>
  </section>
  ${sourceLine('Figures: U.S. Census Bureau, Bureau of Economic Analysis, Bureau of Labor Statistics, CDC / NCHS, World Bank. See the Sources page for the release behind each number.')}`;
}

// ---- Population ---------------------------------------------------------

function stateRows() {
  const total = STATES.reduce((s, x) => s + x.pop2024, 0);
  return [...STATES]
    .sort((a, b) => b.pop2024 - a.pop2024)
    .map((s, i) => {
      const change = ((s.pop2024 - s.pop2023) / s.pop2023) * 100;
      const share = (s.pop2024 / total) * 100;
      return `<tr>
        <td>${i + 1}</td><td>${esc(s.name)}</td>
        <td class="num">${s.pop2024.toLocaleString('en-US')}</td>
        <td class="num">${share.toFixed(2)}%</td>
        <td class="num">${change >= 0 ? '+' : ''}${change.toFixed(2)}%</td>
      </tr>`;
    }).join('');
}

export function viewPopulation() {
  return `
  ${pageHead('Population', '340.1 million people lived in the United States on 1 July 2024 &mdash; up 3.3 million in a year, the fastest growth since 2001. Net international migration supplied 2.8 million of the increase, 84% of it.')}
  ${factGrid(POPULATION_FACTS)}
  <section class="chart-section">
    ${chartCard('population-chart', 'Resident population, 2016-2024',
      'Millions of people on 1 July each year. The axis starts at 300 million so a decade of growth is visible at all.',
      260)}
    ${sourceLine('U.S. Census Bureau, Vintage 2024 population estimates. Axis floor 300 million, disclosed here rather than on the chart.')}
  </section>
  <section class="chart-section">
    ${chartCard('age-chart', 'Who lives here, by age',
      'Millions of people in each age band, 2024.',
      260)}
    ${sourceLine('U.S. Census Bureau, American Community Survey 1-year estimates, 2024. Bands grouped from the published 5-year figures; they sum to 340.1 million.')}
  </section>
  <section aria-label="States">
    <h2 class="section-title">Every state, ranked</h2>
    <p class="section-intro">Resident population on 1 July 2024, with each state&rsquo;s share of the
    country and its change on 2023. Click a column heading to sort; type to filter.</p>
    <label class="table-filter">
      <span class="visually-hidden">Filter states</span>
      <input id="state-filter" type="search" placeholder="Filter states &mdash; try &ldquo;Texas&rdquo;" autocomplete="off">
    </label>
    <div class="table-wrap">
    <table class="data-table" id="state-table">
      <thead><tr>
        <th><button type="button" data-sort="rank">Rank</button></th>
        <th><button type="button" data-sort="name">State</button></th>
        <th><button type="button" data-sort="pop">Population, 2024</button></th>
        <th><button type="button" data-sort="share">Share</button></th>
        <th><button type="button" data-sort="change">Change on 2023</button></th>
      </tr></thead>
      <tbody>${stateRows()}</tbody>
    </table>
    </div>
    <p class="table-count" id="state-count" aria-live="polite">51 areas listed: the 50 states and the District of Columbia.</p>
    ${sourceLine('U.S. Census Bureau, Vintage 2024 population estimates, 1 July 2024.')}
  </section>
  ${explainer('How to read these numbers', [
    '<strong>Resident population</strong> counts everyone usually living in the United States, citizen or not. It is an estimate for 1 July each year, built up from the 2020 census by adding births and migrants and subtracting deaths.',
    '<strong>Growth of 0.98%</strong> sounds small, but it is 3.3 million people &mdash; more than the whole population of Iowa. Four-fifths of it came from net international migration, which is why the growth rate jumped from the record low of 0.2% in 2021.',
    '<strong>Median age 39.1</strong> means half the country is older and half younger. It rises almost every year because people live longer and have fewer children: the under-18 share has fallen from 25.0% in 2004 to 21.5% now.',
  ])}`;
}

// ---- Economy ------------------------------------------------------------

export function viewEconomy() {
  const rows = GDP_SERIES.map((g) => `<tr>
    <td>${g.year}</td>
    <td class="num">$${g.nominal.toLocaleString('en-US', { maximumFractionDigits: 1 })}bn</td>
    <td class="num">${g.realGrowth >= 0 ? '+' : ''}${g.realGrowth.toFixed(1)}%</td>
  </tr>`).join('');
  return `
  ${pageHead('Economy', 'The United States produced $30.86 trillion of goods and services in 2025 &mdash; the world&rsquo;s largest economy. Real output grew 2.3% on the year, after 3.0% in 2024.')}
  ${factGrid(GDP_FACTS)}
  <section class="chart-section">
    ${chartCard('gdp-full-chart', 'Gross domestic product, 2016-2025',
      'Nominal GDP in trillions of dollars. The dip in 2020 is the pandemic recession; the jump in 2021 is the rebound.',
      280)}
    ${sourceLine('Bureau of Economic Analysis, NIPA Table 1.1.5, 2026 annual-update vintage.')}
  </section>
  <section class="chart-section two-col">
    ${chartCard('sector-chart', 'What the economy is made of',
      'Each sector&rsquo;s share of GDP, latest available year.',
      320)}
    <div class="side-notes">
      <h2>Reading the donut</h2>
      <ul class="key-list">
        ${SECTOR_SHARES.map((s) => `<li><span class="swatch" style="background:${s.colour}"></span>
          <strong>${esc(s.sector)} &mdash; ${s.share}%</strong><br>${esc(s.note)}</li>`).join('')}
      </ul>
      ${sourceLine('World Bank, World Development Indicators (latest available year, 2021). Shares sum to 100% including taxes less subsidies.')}
    </div>
  </section>
  <section aria-label="GDP by year">
    <h2 class="section-title">GDP by year</h2>
    <div class="table-wrap narrow">
    <table class="data-table">
      <thead><tr><th>Year</th><th>Nominal GDP</th><th>Real growth</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    </div>
    ${sourceLine('Bureau of Economic Analysis, NIPA Tables 1.1.5 and 1.1.6, 2026 annual-update vintage.')}
  </section>
  ${explainer('How to read these numbers', [
    '<strong>Nominal GDP</strong> is the value of everything produced, at the prices of the year it was produced. <strong>Real growth</strong> strips out price rises, so it measures how much more was actually made: 2.3% real growth in 2025 on 5.0% nominal growth means prices rose about 2.6%.',
    '<strong>GDP per person</strong> divides the total by the population. It is an average, not a typical income: it includes everything from a chief executive&rsquo;s pay to a pensioner&rsquo;s rent, and says nothing about how the total is shared out. For typical household income, see the Prices and Population pages.',
    'Figures are revised. The 2026 annual update lifted 2024 nominal GDP from $29,298.0 billion to $29,381.0 billion and real growth from 2.8% to 3.0%. A GDP number copied from an old article will not match today&rsquo;s BEA tables, and neither is wrong &mdash; they are different vintages of the same estimate.',
  ])}`;
}

// ---- Labour -------------------------------------------------------------

export function viewLabour() {
  return `
  ${pageHead('Labour', '4.1% of the labour force was unemployed in October 2026 &mdash; 7.1 million people. Employers added 165,000 payroll jobs that month, well above the recent average of 48,000.')}
  ${factGrid(LABOUR_FACTS)}
  <section class="chart-section">
    ${chartCard('unemployment-chart', 'Unemployment rate, 2016-2025',
      'Annual average, percent of the labour force. The 2020 spike is the pandemic; the 2025 figure is an 11-month average.',
      260)}
    ${sourceLine('Bureau of Labor Statistics, Current Population Survey, series LNU04000000. 2025 excludes October, which was not collected.')}
  </section>
  ${explainer('How to read these numbers', [
    '<strong>The unemployment rate</strong> is the share of the labour force that has no job but is available for work and has looked for one in the last four weeks. People who have stopped looking are not counted &mdash; they leave the labour force instead, which is why the participation rate matters alongside it.',
    '<strong>61.9% participation</strong> means about three in five adults are working or looking for work. The rest are retired, studying, caring for family, or ill. The rate has drifted down as the population ages.',
    '<strong>Payroll jobs</strong> come from a separate survey of employers, so the two surveys can disagree in a single month. The household survey counts people; the payroll survey counts jobs. A person with two jobs is one employed person and two payroll jobs.',
  ])}`;
}

// ---- Prices -------------------------------------------------------------

export function viewPrices() {
  return `
  ${pageHead('Prices', 'Consumer prices rose 2.6% in 2025 on the annual average &mdash; down from 2.9% in 2024 and the 8.0% peak of 2022. The latest reading, September 2026, was 3.7% higher than a year earlier.')}
  ${factGrid(PRICES_FACTS)}
  <section class="chart-section">
    ${chartCard('cpi-chart', 'Consumer price inflation, 2016-2025',
      'Annual-average change in the Consumer Price Index for All Urban Consumers (CPI-U), percent.',
      260)}
    ${sourceLine('Bureau of Labor Statistics, CPI-U, U.S. city average, all items. 2025 average from 11 months; no October 2025 index was published.')}
  </section>
  ${explainer('How to read these numbers', [
    '<strong>The CPI</strong> tracks what a typical urban household buys &mdash; food, rent, transport, health care &mdash; and compares the cost with the year before. The annual average compares the average of one year&rsquo;s monthly prices with the average of the year before, which smooths out single-month jumps.',
    '<strong>2.6% inflation</strong> means prices on average were 2.6% higher than the year before, not that everything rose 2.6%. Some things rose faster, some fell. The index level, 321.9 on a 1982-84 base of 100, says prices have more than tripled since the early 1980s.',
    '<strong>Core inflation</strong> leaves out food and energy, whose prices swing with harvests and oil. It ran at 2.9% in 2025, a touch above the headline rate, which is why the Federal Reserve watches it closely.',
  ])}`;
}

// ---- Trade --------------------------------------------------------------

export function viewTrade() {
  const t = TRADE;
  return `
  ${pageHead('Trade', 'The United States sold $3,191.6 billion of goods and services abroad in 2024 and bought $4,110.0 billion &mdash; a deficit of $918.4 billion, up $133.5 billion on 2023.')}
  ${factGrid(TRADE_FACTS)}
  <section class="chart-section">
    ${chartCard('trade-chart', 'Exports against imports, 2024',
      'Billions of dollars. Exports in teal, imports in amber — the gap between each pair is the balance.',
      300)}
    ${sourceLine('Bureau of Economic Analysis and U.S. Census Bureau, U.S. International Trade in Goods and Services, December and Annual 2024 (February 2025), balance-of-payments basis.')}
  </section>
  <section aria-label="Trade by year">
    <h2 class="section-title">Two years side by side</h2>
    <div class="table-wrap narrow">
    <table class="data-table">
      <thead><tr><th></th><th>${t.previous.year}</th><th>${t.year}</th><th>Change</th></tr></thead>
      <tbody>
        <tr><td>Exports, goods and services</td><td class="num">$${t.previous.exportsTotal.toLocaleString('en-US')}bn</td><td class="num">$${t.exportsTotal.toLocaleString('en-US')}bn</td><td class="num">+3.9%</td></tr>
        <tr><td>Imports, goods and services</td><td class="num">$${t.previous.importsTotal.toLocaleString('en-US')}bn</td><td class="num">$${t.importsTotal.toLocaleString('en-US')}bn</td><td class="num">+6.6%</td></tr>
        <tr><td>Balance</td><td class="num">&minus;$${t.previous.deficitTotal.toLocaleString('en-US')}bn</td><td class="num">&minus;$${t.deficitTotal.toLocaleString('en-US')}bn</td><td class="num">&minus;$133.5bn</td></tr>
      </tbody>
    </table>
    </div>
    ${sourceLine('Bureau of Economic Analysis, Annual 2024 Press Highlights.')}
  </section>
  ${explainer('How to read these numbers', [
    '<strong>A trade deficit</strong> means the country buys more from the rest of the world than it sells. It is not a bill that comes due: the gap is matched by money flowing in the other way, as foreigners buy American assets, from Treasury bonds to companies.',
    '<strong>Goods and services behave differently.</strong> The United States runs a large deficit on goods &mdash; $1,211.7 billion in 2024, the biggest on record &mdash; and a large surplus on services, $293.4 billion, from travel, finance, software and royalties. The two partly cancel.',
    '<strong>Balance-of-payments basis</strong> is the BEA&rsquo;s headline measure. The Census Bureau also publishes a goods-only figure on a slightly different basis ($1,202.2 billion deficit on its count); the two differ by coverage and timing, not by error.',
  ])}`;
}

// ---- Sources ------------------------------------------------------------

export function viewSources() {
  return `
  ${pageHead('Sources', 'Every figure on this site comes from one of six publishers. This page names the release behind each number, so any figure can be checked at its source.')}
  <div class="source-list">
    ${SOURCES.map((s) => `
    <article class="source-card">
      <h2>${esc(s.publisher)}</h2>
      <p><strong>Covers:</strong> ${esc(s.covers)}</p>
      <p><strong>Releases used:</strong> ${esc(s.releases)}</p>
    </article>`).join('')}
  </div>
  ${explainer('How we handle the numbers', [
    'Figures are shown as published, with the year and the release named next to them. Where an agency revised a figure after first publication, we use the latest vintage and say so &mdash; for example the BEA&rsquo;s 2026 annual update of GDP.',
    'Where a figure rests on fewer months than a full year &mdash; the 2025 unemployment average and CPI average both miss October 2025, which was not collected &mdash; the gap is stated on the page, not hidden in a footnote.',
    'Nothing on this site is fetched from the agencies at run time. The figures were read from their releases and printed here, so the site works offline and every number is exactly the one we checked.',
  ])}
  <p class="source-line">StatAtlas is an independent reference site. It is not affiliated with, or endorsed by, any of the agencies above.</p>`;
}
