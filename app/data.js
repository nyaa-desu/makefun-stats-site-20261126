// StatAtlas data: every figure on this site, with its source and year.
// All figures were checked against the publishing agency's own release
// (Census Bureau, BEA, BLS, NCHS, World Bank). No figure here is estimated
// by us; where a number is grouped or rounded, the note says so.

export const META = {
  siteName: 'StatAtlas',
  tagline: 'The United States in numbers',
  updated: '26 November 2026',
  country: 'United States of America',
};

// Headline figures shown on the Overview page. Each one carries the value
// as printed, the unit, the change against the previous period, and the
// agency and year that published it.
export const HEADLINES = [
  {
    id: 'population',
    label: 'Resident population',
    value: '340.1 million',
    change: '+0.98% on 2023',
    note: 'Fastest annual growth since 2001, driven by net international migration of 2.8 million.',
    source: 'U.S. Census Bureau, Vintage 2024 estimates, 1 July 2024',
    keywords: 'population people residents census growth migration',
  },
  {
    id: 'gdp',
    label: 'Gross domestic product',
    value: '$30.86 trillion',
    change: '+2.3% real growth in 2025',
    note: 'Nominal GDP, current dollars. Real GDP grew 3.0% in 2024 and 2.3% in 2025.',
    source: 'Bureau of Economic Analysis, NIPA Table 1.1.5, 2025',
    keywords: 'gdp economy output growth bea dollars trillion',
  },
  {
    id: 'unemployment',
    label: 'Unemployment rate',
    value: '4.1%',
    change: 'October 2026, seasonally adjusted',
    note: '7.1 million people unemployed. The rate has sat between 4.1% and 4.3% since March 2026.',
    source: 'Bureau of Labor Statistics, Employment Situation, October 2026',
    keywords: 'unemployment jobs labour labor bls workers hiring',
  },
  {
    id: 'inflation',
    label: 'Consumer price inflation',
    value: '2.6%',
    change: 'Annual average CPI-U, 2025',
    note: 'Down from 2.9% in 2024 and 8.0% in 2022. The 2025 average rests on 11 months: no October index was published.',
    source: 'Bureau of Labor Statistics, CPI-U, 2025',
    keywords: 'inflation prices cpi cost of living bls',
  },
  {
    id: 'income',
    label: 'Median household income',
    value: '$81,604',
    change: '+2.0% in real terms on 2023',
    note: 'American Community Survey 1-year estimate. The CPS figure for 2024 is $83,730; the two surveys differ by design.',
    source: 'U.S. Census Bureau, ACS 1-year estimates, 2024',
    keywords: 'income household earnings money wages median',
  },
];

// Nominal GDP, billions of current dollars (BEA NIPA Table 1.1.5,
// 2026 annual-update vintage), with annual real growth in percent.
export const GDP_SERIES = [
  { year: 2016, nominal: 18804.9, realGrowth: 1.8 },
  { year: 2017, nominal: 19612.1, realGrowth: 2.5 },
  { year: 2018, nominal: 20656.5, realGrowth: 3.0 },
  { year: 2019, nominal: 21540.0, realGrowth: 2.6 },
  { year: 2020, nominal: 21375.3, realGrowth: -2.1 },
  { year: 2021, nominal: 23745.8, realGrowth: 6.3 },
  { year: 2022, nominal: 26059.7, realGrowth: 2.4 },
  { year: 2023, nominal: 27825.9, realGrowth: 2.9 },
  { year: 2024, nominal: 29381.0, realGrowth: 3.0 },
  { year: 2025, nominal: 30861.3, realGrowth: 2.3 },
];

export const GDP_FACTS = [
  { label: 'GDP per person', value: '$90,300', note: '2025 nominal GDP divided by the 1 July 2025 population of 341.8 million.', source: 'BEA; Census Bureau, Vintage 2025' },
  { label: 'Largest economy', value: 'No. 1 in the world', note: 'Ahead of China on nominal GDP in 2025 (World Bank / IMF).', source: 'World Bank, World Development Indicators, 2025' },
  { label: 'Personal consumption', value: '68.1% of GDP', note: 'Household spending is the largest single component of demand.', source: 'BEA, NIPA Table 1.1.10, Q4 2024' },
  { label: 'Real GDP, Q3 2026', value: '+3.4% annualised', note: 'Advance estimate for the third quarter of 2026.', source: 'BEA, 29 October 2026' },
];

// Resident population, millions, 1 July each year (Census Bureau).
// 2016-2019 are the earlier vintage; 2020-2024 are Vintage 2024.
export const POPULATION_SERIES = [
  { year: 2016, pop: 323.1 },
  { year: 2017, pop: 325.1 },
  { year: 2018, pop: 327.2 },
  { year: 2019, pop: 328.2 },
  { year: 2020, pop: 331.5 },
  { year: 2021, pop: 331.6 },
  { year: 2022, pop: 332.1 },
  { year: 2023, pop: 336.8 },
  { year: 2024, pop: 340.1 },
];

// Age bands, millions, 2024 (Census Bureau ACS 1-year estimates, grouped
// from the published 5-year bands; the 18-34 band is the sum of its parts).
export const AGE_BANDS = [
  { band: '0-17', pop: 72.9, share: 21.4 },
  { band: '18-34', pop: 77.4, share: 22.8 },
  { band: '35-54', pop: 86.8, share: 25.5 },
  { band: '55-64', pop: 41.7, share: 12.3 },
  { band: '65-74', pop: 35.6, share: 10.5 },
  { band: '75+', pop: 25.7, share: 7.5 },
];

export const POPULATION_FACTS = [
  { label: 'Median age', value: '39.1 years', note: 'A record high, up from 38.5 in 2020. Maine is oldest at 44.8; Utah youngest at 32.4.', source: 'Census Bureau, Vintage 2024' },
  { label: 'Under 18', value: '73.1 million', note: '21.5% of the population, down 0.2% on 2023.', source: 'Census Bureau, Vintage 2024' },
  { label: 'Aged 65 and over', value: '61.2 million', note: '18.0% of the population, up 3.1% on 2023. The 65+ share was 12.4% in 2004.', source: 'Census Bureau, Vintage 2024' },
  { label: 'Women', value: '50.5%', note: 'Women outnumber men by 3.4 million.', source: 'Census Bureau, Vintage 2024' },
  { label: 'Life expectancy', value: '79.0 years', note: 'At birth, 2024: 81.4 for women, 76.5 for men. Up 0.6 year on 2023.', source: 'CDC / NCHS Data Brief 548, Jan 2026' },
  { label: 'Most populous state', value: 'California, 39.4m', note: 'Texas added the most people in 2023-24: +562,941.', source: 'Census Bureau, Vintage 2024' },
];

// States and the District of Columbia: resident population, 1 July 2023
// and 1 July 2024 (Census Bureau, Vintage 2024 estimates).
export const STATES = [
  { name: 'Alabama', pop2024: 5157699, pop2023: 5117673 },
  { name: 'Alaska', pop2024: 740133, pop2023: 736510 },
  { name: 'Arizona', pop2024: 7582384, pop2023: 7473027 },
  { name: 'Arkansas', pop2024: 3088354, pop2023: 3069463 },
  { name: 'California', pop2024: 39431263, pop2023: 39198693 },
  { name: 'Colorado', pop2024: 5957493, pop2023: 5901339 },
  { name: 'Connecticut', pop2024: 3675069, pop2023: 3643023 },
  { name: 'Delaware', pop2024: 1051917, pop2023: 1036423 },
  { name: 'District of Columbia', pop2024: 702250, pop2023: 687324 },
  { name: 'Florida', pop2024: 23372215, pop2023: 22904868 },
  { name: 'Georgia', pop2024: 11180878, pop2023: 11064432 },
  { name: 'Hawaii', pop2024: 1446146, pop2023: 1441387 },
  { name: 'Idaho', pop2024: 2001619, pop2023: 1971122 },
  { name: 'Illinois', pop2024: 12710158, pop2023: 12642259 },
  { name: 'Indiana', pop2024: 6924275, pop2023: 6880131 },
  { name: 'Iowa', pop2024: 3241488, pop2023: 3218414 },
  { name: 'Kansas', pop2024: 2970606, pop2023: 2951500 },
  { name: 'Kentucky', pop2024: 4588372, pop2023: 4550595 },
  { name: 'Louisiana', pop2024: 4597740, pop2023: 4588071 },
  { name: 'Maine', pop2024: 1405012, pop2023: 1399646 },
  { name: 'Maryland', pop2024: 6263220, pop2023: 6217062 },
  { name: 'Massachusetts', pop2024: 7136171, pop2023: 7066568 },
  { name: 'Michigan', pop2024: 10140459, pop2023: 10083356 },
  { name: 'Minnesota', pop2024: 5793151, pop2023: 5753048 },
  { name: 'Mississippi', pop2024: 2943045, pop2023: 2943172 },
  { name: 'Missouri', pop2024: 6245466, pop2023: 6208038 },
  { name: 'Montana', pop2024: 1137233, pop2023: 1131302 },
  { name: 'Nebraska', pop2024: 2005465, pop2023: 1987864 },
  { name: 'Nevada', pop2024: 3267467, pop2023: 3214363 },
  { name: 'New Hampshire', pop2024: 1409032, pop2023: 1402199 },
  { name: 'New Jersey', pop2024: 9500851, pop2023: 9379642 },
  { name: 'New Mexico', pop2024: 2130256, pop2023: 2121164 },
  { name: 'New York', pop2024: 19867248, pop2023: 19737367 },
  { name: 'North Carolina', pop2024: 11046024, pop2023: 10881189 },
  { name: 'North Dakota', pop2024: 796568, pop2023: 789047 },
  { name: 'Ohio', pop2024: 11883304, pop2023: 11824034 },
  { name: 'Oklahoma', pop2024: 4095393, pop2023: 4063882 },
  { name: 'Oregon', pop2024: 4272371, pop2023: 4253653 },
  { name: 'Pennsylvania', pop2024: 13078751, pop2023: 13017721 },
  { name: 'Rhode Island', pop2024: 1112308, pop2023: 1103429 },
  { name: 'South Carolina', pop2024: 5478831, pop2023: 5387830 },
  { name: 'South Dakota', pop2024: 924669, pop2023: 918305 },
  { name: 'Tennessee', pop2024: 7227750, pop2023: 7148304 },
  { name: 'Texas', pop2024: 31290831, pop2023: 30727890 },
  { name: 'Utah', pop2024: 3503613, pop2023: 3443222 },
  { name: 'Vermont', pop2024: 648493, pop2023: 648708 },
  { name: 'Virginia', pop2024: 8811195, pop2023: 8734685 },
  { name: 'Washington', pop2024: 7958180, pop2023: 7857320 },
  { name: 'West Virginia', pop2024: 1769979, pop2023: 1770495 },
  { name: 'Wisconsin', pop2024: 5960975, pop2023: 5930405 },
  { name: 'Wyoming', pop2024: 587618, pop2023: 585067 },
];

// Unemployment rate, annual average, percent (BLS, Current Population
// Survey; 2025 is an 11-month average - no October index was collected).
export const UNEMPLOYMENT_SERIES = [
  { year: 2016, rate: 4.9 },
  { year: 2017, rate: 4.4 },
  { year: 2018, rate: 3.9 },
  { year: 2019, rate: 3.7 },
  { year: 2020, rate: 8.1 },
  { year: 2021, rate: 5.3 },
  { year: 2022, rate: 3.6 },
  { year: 2023, rate: 3.6 },
  { year: 2024, rate: 4.0 },
  { year: 2025, rate: 4.3 },
];

export const LABOUR_FACTS = [
  { label: 'Labour force', value: '170.7 million', note: 'Civilian labour force, October 2026. Participation rate 61.9%.', source: 'BLS, Employment Situation, Oct 2026' },
  { label: 'People in work', value: '163.6 million', note: 'Employed, October 2026. Employment-population ratio 59.3%.', source: 'BLS, Employment Situation, Oct 2026' },
  { label: 'Payroll jobs added', value: '+165,000', note: 'Nonfarm payrolls, October 2026, against a 12-month average of +48,000 a month.', source: 'BLS, Employment Situation, Oct 2026' },
  { label: 'Average hourly earnings', value: '$36.86', note: 'Private nonfarm, November 2026.', source: 'BLS, Employment Situation, Nov 2026' },
  { label: 'Long-term unemployed', value: '1.9 million', note: 'Out of work for 27 weeks or more, November 2026 - about a quarter of all unemployed.', source: 'BLS, Employment Situation, Nov 2026' },
  { label: 'Teen unemployment', value: '16.3%', note: 'November 2026, the highest of any age group.', source: 'BLS, Employment Situation, Nov 2026' },
];

// CPI-U inflation, annual-average change, percent (BLS). The 2025 figure
// compares the 11-month average (no October) with the 2024 average.
export const CPI_SERIES = [
  { year: 2016, rate: 1.3 },
  { year: 2017, rate: 2.1 },
  { year: 2018, rate: 2.4 },
  { year: 2019, rate: 1.8 },
  { year: 2020, rate: 1.2 },
  { year: 2021, rate: 4.7 },
  { year: 2022, rate: 8.0 },
  { year: 2023, rate: 4.1 },
  { year: 2024, rate: 2.9 },
  { year: 2025, rate: 2.6 },
];

export const PRICES_FACTS = [
  { label: 'CPI-U index, 2025', value: '321.9', note: 'Annual average, 1982-84 = 100. It was 313.7 in 2024.', source: 'BLS, CPI-U' },
  { label: 'December to December, 2025', value: '+2.7%', note: 'The year-end measure of inflation, against +2.6% on the annual average.', source: 'BLS, CPI-U' },
  { label: 'Latest reading', value: '+3.7% year on year', note: 'CPI-U, September 2026. No October 2026 comparison exists for the affected series.', source: 'BLS, CPI news release, Sep 2026' },
  { label: 'Core inflation, 2025', value: '2.9%', note: 'All items less food and energy, annual average.', source: 'BLS, CPI-U' },
  { label: 'What $1 in 2024 buys', value: '$1.03 in 2025', note: 'Prices rose 2.6% on the year, so a dollar from 2024 needed about three more cents in 2025.', source: 'BLS, CPI-U' },
];

// Value added by sector as a share of GDP (World Bank, World Development
// Indicators). The remainder after the three sectors is taxes less
// subsidies on products.
export const SECTOR_SHARES = [
  { sector: 'Services', share: 77.6, colour: '#0e7c7b', note: 'Finance, health, retail, professional services and the rest.' },
  { sector: 'Industry', share: 17.9, colour: '#e8a317', note: 'Manufacturing, construction, mining and utilities.' },
  { sector: 'Agriculture', share: 1.0, colour: '#7a9e3f', note: 'Farming, forestry and fishing.' },
  { sector: 'Taxes less subsidies', share: 3.5, colour: '#94a3b8', note: 'The part of GDP no sector claims.' },
];

// International trade in goods and services, billions of dollars, BOP
// basis (BEA / Census Bureau, annual trade release, February 2025).
export const TRADE = {
  year: 2024,
  exportsTotal: 3191.6,
  importsTotal: 4110.0,
  deficitTotal: 918.4,
  goodsExports: 2083.8,
  goodsImports: 3295.6,
  goodsDeficit: 1211.7,
  servicesExports: 1107.8,
  servicesImports: 814.4,
  servicesSurplus: 293.4,
  previous: { year: 2023, exportsTotal: 3071.8, importsTotal: 3856.7, deficitTotal: 784.9 },
};

export const TRADE_FACTS = [
  { label: 'Goods deficit', value: '$1,211.7 billion', note: 'The largest goods deficit on record in 2024.', source: 'BEA / Census Bureau, Feb 2025' },
  { label: 'Services surplus', value: '$293.4 billion', note: 'The United States is the world\u2019s largest exporter of services.', source: 'BEA / Census Bureau, Feb 2025' },
  { label: 'Goods deficit with China', value: '$295.4 billion', note: '$143.5bn of goods exports against $438.9bn of imports, 2024.', source: 'U.S. Census Bureau, Dec 2024' },
  { label: 'Goods deficit with Mexico', value: '$171.8 billion', note: 'The largest bilateral goods deficit with Mexico on record.', source: 'BEA / Census Bureau, Feb 2025' },
  { label: 'Exports as a share of GDP', value: '10.9%', note: 'Exports of goods and services, 2024 estimate.', source: 'CIA World Factbook, 2024' },
  { label: 'Trade in 2025', value: 'Deficit $932.0bn', note: 'Goods and services deficit barely moved in 2025, while the goods deficit grew to $1,259.6bn.', source: 'BEA, U.S. International Transactions, Jun 2026' },
];

// The newest releases we track, so a visitor can see what changed and when.
export const RELEASES = [
  { date: '17 Nov 2026', title: 'Employment Situation, October and November 2026', agency: 'Bureau of Labor Statistics', detail: 'Unemployment 4.6% in November, the highest since September 2021; 64,000 payroll jobs added.' },
  { date: '29 Oct 2026', title: 'GDP, third quarter 2026 (advance)', agency: 'Bureau of Economic Analysis', detail: 'Real GDP grew 3.4% annualised; current-dollar GDP rose 5.6%.' },
  { date: '15 Sep 2026', title: 'Income in the United States, 2025', agency: 'U.S. Census Bureau', detail: 'Real median household income $87,460, up 2.6% and the highest on record.' },
  { date: '24 Jun 2026', title: 'U.S. International Transactions, 2025', agency: 'Bureau of Economic Analysis', detail: 'Goods and services deficit $932.0 billion; goods deficit $1,259.6 billion.' },
  { date: '29 Jan 2026', title: 'Mortality in the United States, 2024', agency: 'CDC / National Center for Health Statistics', detail: 'Life expectancy 79.0 years, up 0.6 year on 2023.' },
  { date: '19 Dec 2024', title: 'Vintage 2024 population estimates', agency: 'U.S. Census Bureau', detail: 'Population 340.1 million on 1 July 2024, up 0.98% - the fastest growth since 2001.' },
];

// Where every number comes from, for the Sources page.
export const SOURCES = [
  { publisher: 'U.S. Census Bureau', covers: 'Population, age structure, median age, state populations, median household income (ACS)', releases: 'Vintage 2024 population estimates (Dec 2024); ACS 1-year estimates 2024 (Sep 2025); Income in the United States 2025 (Sep 2026)' },
  { publisher: 'Bureau of Economic Analysis', covers: 'GDP, real growth, GDP per person, trade in goods and services', releases: 'NIPA Tables 1.1.5 / 1.1.6, 2026 annual update (Sep 2026); GDP Q3 2026 advance (Oct 2026); U.S. International Trade, annual 2024 (Feb 2025)' },
  { publisher: 'Bureau of Labor Statistics', covers: 'Unemployment, payroll jobs, earnings, labour force, consumer prices', releases: 'Employment Situation, Oct 2026 (Nov 2026) and Nov 2026 (Nov 2026); CPI-U annual averages (2025)' },
  { publisher: 'CDC / National Center for Health Statistics', covers: 'Life expectancy at birth, by sex', releases: 'Mortality in the United States, 2023 (NCHS Data Brief 521); Mortality in the United States, 2024 (NCHS Data Brief 548, Jan 2026)' },
  { publisher: 'World Bank', covers: 'Sector shares of GDP, world GDP ranking', releases: 'World Development Indicators, latest available year (2021 for sector shares; 2025 for GDP)' },
  { publisher: 'CIA World Factbook', covers: 'Exports as a share of GDP', releases: 'United States country profile, 2024 estimate' },
];
