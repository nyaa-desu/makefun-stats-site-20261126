# StatAtlas — The United States in numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/nyaa-desu/makefun-stats-site-20261126/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/nyaa-desu/makefun-stats-site-20261126/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

A national statistics site for the United States, built for the
[make.fun](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
"Make the best national statistics site" bounty. Seven pages, real figures
with their source and year on every number, charts drawn in plain Canvas 2D,
and no network requests anywhere: the site works fully offline.

## What it covers

| Page | Contents |
| --- | --- |
| Overview | Live figure search, 5 headline stat cards, GDP line chart with 10y/5y toggle, topic cards, latest releases |
| Population | 340.1 million people, age bands, median age 39.1, and a sortable + filterable table of all 50 states + DC |
| Economy | $30.86 trillion GDP, ten-year series, sector donut (services 77.6%), GDP by year |
| Labour | 4.1% unemployment, labour force 170.7 million, payrolls and earnings |
| Prices | CPI inflation 2016–2025, index level, core inflation, what a dollar buys |
| Trade | Exports vs imports as grouped bars, goods vs services, two-year comparison |
| Sources | The release behind every figure |

Every page ends with a plain-language "How to read these numbers" explainer.

## Figures and sources

- **Population** — U.S. Census Bureau, Vintage 2024 estimates (1 July 2024)
- **Economy** — Bureau of Economic Analysis, NIPA Tables 1.1.5 / 1.1.6, 2026 annual update
- **Labour** — Bureau of Labor Statistics, Employment Situation, October–November 2026
- **Prices** — Bureau of Labor Statistics, CPI-U annual averages
- **Trade** — BEA / U.S. Census Bureau, U.S. International Trade, annual 2024
- **Sectors** — World Bank, World Development Indicators
- **Life expectancy** — CDC / National Center for Health Statistics, Data Brief 548

Figures are printed on the page as published. Where an agency revised a
figure, the latest vintage is used and the revision is noted; where a series
rests on fewer than 12 months (the 2025 unemployment and CPI averages miss
October 2025), the gap is stated on the page.

## Run it

```sh
node serve.ts        # serves app/ at http://localhost:8080
```

or serve `app/` with any static server. Open `app/index.html` in desktop
Chrome or on a phone; hash routes (`#/economy`, …) switch pages.

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
to the output directory and writes `dossier.json` with the vendored
`vendor/makefun-frontend.ts` library.

## Screenshots

`shots.json` lists the four screenshots in `screenshots/`: the Overview
(cover), the Economy page, the Population page, and the Overview on a phone.
Each is a real render of the site in headless Chromium.

## License

MIT — see [LICENSE](LICENSE).
