// StatAtlas charts: small, dependency-free Canvas 2D drawings.
// Every chart is drawn from data.js at render time, sized to its element,
// and redrawn when its page is revisited or its controls change.

const INK = '#1b2a4a';
const GRID = '#d9dee6';
const MUTED = '#5b6b82';
const TEAL = '#0e7c7b';
const AMBER = '#e8a317';

// Fit a canvas to its displayed size and the screen's pixel density so
// lines stay crisp on retina screens and in screenshots.
export function fitCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w: rect.width, h: rect.height };
}

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step)));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const size = nice * mag;
  const start = Math.ceil(min / size) * size;
  const ticks = [];
  for (let v = start; v <= max + size * 0.001; v += size) ticks.push(v);
  return { ticks, size };
}

function drawAxes(ctx, box, yTicks, formatY, labels, stepX) {
  ctx.font = '11px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = MUTED;
  ctx.strokeStyle = GRID;
  ctx.lineWidth = 1;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (const t of yTicks) {
    const y = box.y + box.h - ((t - box.min) / (box.max - box.min)) * box.h;
    ctx.beginPath();
    ctx.moveTo(box.x, y);
    ctx.lineTo(box.x + box.w, y);
    ctx.stroke();
    ctx.fillText(formatY(t), box.x - 8, y);
  }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  labels.forEach((label, i) => {
    if (i % stepX !== 0) return;
    const x = box.x + (i / Math.max(1, labels.length - 1)) * box.w;
    ctx.fillText(String(label), x, box.y + box.h + 8);
  });
}

// A line chart with a filled area under the line. Pass floor to start the
// axis above zero (for a series that barely moves, such as population);
// the floor is always disclosed in the page's source line, never on the
// canvas where it would collide with the grid labels.
export function drawLine(canvas, points, opts) {
  const { ctx, w, h } = fitCanvas(canvas);
  const padL = opts.padLeft ?? 52;
  const padR = 12;
  const padT = 10;
  const padB = 26;
  const box = { x: padL, y: padT, w: w - padL - padR, h: h - padT - padB };
  const values = points.map((p) => p.value);
  const lo = opts.floor ?? Math.min(...values);
  const hi = Math.max(...values);
  const top = hi + (hi - lo) * 0.08;
  const { ticks } = niceTicks(lo, top, 4);
  box.min = Math.min(lo, ticks[0]);
  box.max = Math.max(top, ticks[ticks.length - 1]);
  const xAt = (i) => box.x + (i / Math.max(1, points.length - 1)) * box.w;
  const yAt = (v) => box.y + box.h - ((v - box.min) / (box.max - box.min)) * box.h;

  drawAxes(ctx, box, ticks, opts.formatY, points.map((p) => p.label), opts.labelStep ?? 1);

  ctx.beginPath();
  points.forEach((p, i) => {
    if (i === 0) ctx.moveTo(xAt(i), yAt(p.value));
    else ctx.lineTo(xAt(i), yAt(p.value));
  });
  ctx.strokeStyle = opts.colour ?? TEAL;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.stroke();

  ctx.lineTo(xAt(points.length - 1), box.y + box.h);
  ctx.lineTo(xAt(0), box.y + box.h);
  ctx.closePath();
  ctx.fillStyle = (opts.colour ?? TEAL) + '22';
  ctx.fill();

  const last = points[points.length - 1];
  ctx.beginPath();
  ctx.arc(xAt(points.length - 1), yAt(last.value), 4, 0, Math.PI * 2);
  ctx.fillStyle = opts.colour ?? TEAL;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(xAt(points.length - 1), yAt(last.value), 7, 0, Math.PI * 2);
  ctx.strokeStyle = opts.colour ?? TEAL;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.font = '600 12px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = INK;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillText(opts.formatValue(last.value), xAt(points.length - 1) - 10, yAt(last.value) - 8);
}

// Vertical bars, one per category, with the value printed above each bar.
export function drawBars(canvas, items, opts) {
  const { ctx, w, h } = fitCanvas(canvas);
  const padL = 44;
  const padR = 8;
  const padT = 22;
  const padB = 26;
  const box = { x: padL, y: padT, w: w - padL - padR, h: h - padT - padB };
  const max = Math.max(...items.map((i) => i.value)) * 1.12;
  const { ticks } = niceTicks(0, max, 4);
  const top = Math.max(max, ticks[ticks.length - 1]);
  drawAxes(ctx, { ...box, min: 0, max: top }, ticks, opts.formatY, items.map((i) => i.label), 1);

  const slot = box.w / items.length;
  const barW = Math.min(64, slot * 0.62);
  ctx.font = '600 12px system-ui, -apple-system, sans-serif';
  items.forEach((item, i) => {
    const x = box.x + i * slot + (slot - barW) / 2;
    const bh = (item.value / top) * box.h;
    const y = box.y + box.h - bh;
    ctx.fillStyle = item.colour ?? opts.colour ?? TEAL;
    ctx.beginPath();
    ctx.roundRect(x, y, barW, bh, [4, 4, 0, 0]);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(opts.formatValue(item.value), x + barW / 2, y - 5);
  });
}

// A donut with a centre label. The centre names the biggest slice, not
// the total, so the chart says something at a glance.
export function drawDonut(canvas, slices, centreText) {
  const { ctx, w, h } = fitCanvas(canvas);
  const cx = w / 2;
  const cy = h / 2;
  const outer = Math.min(w, h) / 2 - 14;
  const inner = outer * 0.62;
  const total = slices.reduce((s, x) => s + x.share, 0);
  let angle = -Math.PI / 2;
  for (const s of slices) {
    const sweep = (s.share / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, outer, angle, angle + sweep);
    ctx.closePath();
    ctx.fillStyle = s.colour;
    ctx.fill();
    angle += sweep;
  }
  ctx.beginPath();
  ctx.arc(cx, cy, inner, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.fillStyle = INK;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const [big, small] = centreText.split('\n');
  ctx.font = '700 22px system-ui, -apple-system, sans-serif';
  ctx.fillText(big, cx, cy - 10);
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = MUTED;
  ctx.fillText(small, cx, cy + 12);
}

// Grouped bars: each category holds one bar per series (exports teal,
// imports amber), with a legend drawn above the chart.
export function drawGroupedBars(canvas, groups, series, opts) {
  const { ctx, w, h } = fitCanvas(canvas);
  const padL = 52;
  const padR = 8;
  const padT = 30;
  const padB = 26;
  const box = { x: padL, y: padT, w: w - padL - padR, h: h - padT - padB };
  const max = Math.max(...groups.flatMap((g) => series.map((s) => g[s.key]))) * 1.12;
  const { ticks } = niceTicks(0, max, 4);
  const top = Math.max(max, ticks[ticks.length - 1]);
  drawAxes(ctx, { ...box, min: 0, max: top }, ticks, opts.formatY, groups.map((g) => g.label), 1);

  ctx.font = '12px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  let lx = box.x;
  for (const s of series) {
    ctx.fillStyle = s.colour;
    ctx.fillRect(lx, 8, 12, 12);
    ctx.fillStyle = INK;
    ctx.fillText(s.name, lx + 17, 14);
    lx += 17 + ctx.measureText(s.name).width + 22;
  }

  const slot = box.w / groups.length;
  const barW = Math.min(46, (slot * 0.7) / series.length);
  const groupW = barW * series.length + 6 * (series.length - 1);
  ctx.font = '600 11px system-ui, -apple-system, sans-serif';
  groups.forEach((g, i) => {
    const gx = box.x + i * slot + (slot - groupW) / 2;
    series.forEach((s, j) => {
      const v = g[s.key];
      const bh = (v / top) * box.h;
      const x = gx + j * (barW + 6);
      const y = box.y + box.h - bh;
      ctx.fillStyle = s.colour;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, bh, [3, 3, 0, 0]);
      ctx.fill();
      ctx.fillStyle = INK;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(opts.formatValue(v), x + barW / 2, y - 4);
    });
  });
}
