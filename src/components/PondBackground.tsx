import { useEffect, useRef } from 'react';

const PondBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // ── Water simulation buffers (2D wave equation) ──
    let cols = Math.ceil(W / 3) + 2;
    let rows = Math.ceil(H / 3) + 2;
    let cur = new Float32Array(cols * rows);
    let prv = new Float32Array(cols * rows);
    const DAMP = 0.986;

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
      cols = Math.ceil(W / 3) + 2; rows = Math.ceil(H / 3) + 2;
      cur = new Float32Array(cols * rows);
      prv = new Float32Array(cols * rows);
    };
    window.addEventListener('resize', resize);

    const wDrop = (cx: number, cy: number, r: number, str: number) => {
      const gx = Math.floor(cx / 3), gy = Math.floor(cy / 3), gr = Math.floor(r / 3);
      for (let y = gy - gr; y <= gy + gr; y++) {
        for (let x = gx - gr; x <= gx + gr; x++) {
          if (x < 1 || x >= cols - 1 || y < 1 || y >= rows - 1) continue;
          const d = Math.hypot(x - gx, y - gy);
          if (d <= gr) prv[y * cols + x] += str * Math.cos((d / gr) * Math.PI * 0.5);
        }
      }
    };

    const wSimulate = () => {
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const i = y * cols + x;
          cur[i] = ((prv[(y-1)*cols+x] + prv[(y+1)*cols+x] + prv[y*cols+x-1] + prv[y*cols+x+1]) / 2 - cur[i]) * DAMP;
        }
      }
      [cur, prv] = [prv, cur];
    };

    const wHeight = (px: number, py: number) => {
      const gx = Math.min(cols - 2, Math.max(1, Math.floor(px / 3)));
      const gy = Math.min(rows - 2, Math.max(1, Math.floor(py / 3)));
      return prv[gy * cols + gx];
    };

    // ── Input ──────────────────────────────────────
    let lx = -1, ly = -1;
    const onMove = (x: number, y: number) => {
      if (lx !== -1) {
        const spd = Math.hypot(x - lx, y - ly);
        if (spd > 3) wDrop(x, y, 18, Math.min(spd * 1.2, 80));
      }
      lx = x; ly = y;
    };
    window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
    window.addEventListener('touchmove', e => { const t = e.touches[0]; onMove(t.clientX, t.clientY); }, { passive: true });
    window.addEventListener('mouseleave', () => { lx = -1; ly = -1; });

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    // ── FISH ───────────────────────────────────────
    interface Fish { x: number; y: number; vx: number; vy: number; sz: number; col: string; tail: number; timer: number; interval: number; depth: number; schoolId: number; }
    const fishCols = ['#ff6b6b','#ff8e53','#ffd93d','#6bcb77','#4d96ff','#c77dff','#ff6eb4','#00b4d8','#f72585','#e63946','#06d6a0','#118ab2'];
    const mkFish = (schoolId = -1): Fish => ({
      x: rnd(0, W), y: rnd(0, H), vx: rnd(-1.2, 1.2), vy: rnd(-1.2, 1.2),
      sz: rnd(10, 22), col: fishCols[Math.floor(rnd(0, fishCols.length))],
      tail: rnd(0, Math.PI * 2), timer: 0, interval: rnd(60, 220), depth: Math.random(), schoolId,
    });
    const fish: Fish[] = Array.from({ length: 20 }, (_, i) => mkFish(i < 9 ? Math.floor(i / 3) : -1));

    const drawFish = (f: Fish) => {
      const a = Math.atan2(f.vy, f.vx);
      const op = 0.45 + f.depth * 0.5;
      const s = f.sz * (0.65 + f.depth * 0.45);
      ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(a); ctx.globalAlpha = op;
      ctx.beginPath(); ctx.ellipse(0, 0, s, s * 0.4, 0, 0, Math.PI * 2);
      ctx.fillStyle = f.col; ctx.fill();
      const tw = Math.sin(f.tail) * 0.45;
      ctx.beginPath(); ctx.moveTo(-s * 0.7, 0);
      ctx.lineTo(-s * 1.45, (-s * 0.5 + tw * s * 0.7)); ctx.lineTo(-s * 1.45, (s * 0.5 + tw * s * 0.7));
      ctx.closePath(); ctx.fillStyle = f.col; ctx.fill();
      ctx.beginPath(); ctx.moveTo(s * 0.1, -s * 0.4);
      ctx.quadraticCurveTo(s * 0.35, -s * 0.85, s * 0.55, -s * 0.38);
      ctx.fillStyle = f.col + 'cc'; ctx.fill();
      ctx.beginPath(); ctx.arc(s * 0.48, -s * 0.1, s * 0.1, 0, Math.PI * 2);
      ctx.fillStyle = '#fff'; ctx.fill();
      ctx.beginPath(); ctx.arc(s * 0.5, -s * 0.1, s * 0.055, 0, Math.PI * 2);
      ctx.fillStyle = '#111'; ctx.fill();
      ctx.globalAlpha = op * 0.2;
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath(); ctx.arc(i * s * 0.28, 0, s * 0.2, Math.PI * 0.2, Math.PI * 0.8);
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.stroke();
      }
      ctx.restore();
    };

    const updFish = (f: Fish, dt: number) => {
      f.tail += 0.1 + Math.hypot(f.vx, f.vy) * 0.06;
      f.timer += dt;
      if (f.timer > f.interval) {
        if (f.schoolId >= 0) {
          const leader = fish[f.schoolId * 3];
          const toLeaderA = Math.atan2(leader.y - f.y, leader.x - f.x);
          const curA = Math.atan2(f.vy, f.vx);
          const diff = toLeaderA - curA;
          const na = curA + diff * 0.3 + rnd(-0.3, 0.3);
          const spd = rnd(0.5, 1.5);
          f.vx = Math.cos(na) * spd; f.vy = Math.sin(na) * spd;
        } else {
          const na = Math.atan2(f.vy, f.vx) + rnd(-1.0, 1.0);
          const spd = rnd(0.3, 1.5);
          f.vx = Math.cos(na) * spd; f.vy = Math.sin(na) * spd;
        }
        f.timer = 0; f.interval = rnd(60, 220);
      }
      const m = 80;
      if (f.x < m) f.vx += 0.06; if (f.x > W - m) f.vx -= 0.06;
      if (f.y < m) f.vy += 0.06; if (f.y > H - m) f.vy -= 0.06;
      const spd = Math.hypot(f.vx, f.vy);
      if (spd > 2.2) { f.vx = f.vx / spd * 2.2; f.vy = f.vy / spd * 2.2; }
      if (spd < 0.25) { f.vx *= 1.1; f.vy *= 1.1; }
      f.x += f.vx; f.y += f.vy;
    };

    // ── JELLYFISH ──────────────────────────────────
    interface Jelly { x: number; y: number; vx: number; vy: number; r: number; phase: number; col: string; tentacles: number[]; }
    const jellyMk = (): Jelly => ({
      x: rnd(0, W), y: rnd(0, H), vx: rnd(-0.3, 0.3), vy: rnd(-0.2, 0.15),
      r: rnd(15, 35), phase: rnd(0, Math.PI * 2),
      col: ['#c77dff','#e0aaff','#ff99c8','#90e0ef','#48cae4'][Math.floor(rnd(0, 5))],
      tentacles: Array.from({ length: 6 }, () => rnd(20, 55)),
    });
    const jellies: Jelly[] = Array.from({ length: 6 }, jellyMk);

    const drawJelly = (j: Jelly, t: number) => {
      const pulse = Math.sin(t * 0.002 + j.phase) * 0.15 + 0.85;
      const r = j.r * pulse;
      ctx.save(); ctx.translate(j.x, j.y); ctx.globalAlpha = 0.5;
      const grad = ctx.createRadialGradient(0, -r * 0.2, 0, 0, 0, r);
      grad.addColorStop(0, j.col + 'ff'); grad.addColorStop(0.6, j.col + '99'); grad.addColorStop(1, j.col + '22');
      ctx.beginPath(); ctx.arc(0, 0, r, Math.PI, 0);
      ctx.quadraticCurveTo(r * 0.8, r * 0.3, 0, r * 0.2);
      ctx.quadraticCurveTo(-r * 0.8, r * 0.3, -r, 0);
      ctx.fillStyle = grad; ctx.fill();
      ctx.globalAlpha = 0.3;
      j.tentacles.forEach((len, i) => {
        const tx = (i / (j.tentacles.length - 1) - 0.5) * r * 1.4;
        const sway = Math.sin(t * 0.0015 + j.phase + i * 0.8) * 12;
        ctx.beginPath(); ctx.moveTo(tx, r * 0.15);
        ctx.quadraticCurveTo(tx + sway, r * 0.15 + len * 0.5, tx + sway * 0.5, r * 0.15 + len);
        ctx.strokeStyle = j.col; ctx.lineWidth = 1.5; ctx.stroke();
      });
      ctx.restore();
    };

    const updJelly = (j: Jelly, t: number) => {
      j.vy = Math.sin(t * 0.001 + j.phase) * 0.3 - 0.1;
      j.x += j.vx; j.y += j.vy;
      if (j.x < -60) j.x = W + 60; if (j.x > W + 60) j.x = -60;
      if (j.y < -80) j.y = H + 80; if (j.y > H + 80) j.y = -80;
    };

    // ── TURTLE ─────────────────────────────────────
    interface Turtle { x: number; y: number; vx: number; vy: number; phase: number; flipper: number; }
    const turtles: Turtle[] = Array.from({ length: 2 }, () => ({
      x: rnd(0, W), y: rnd(H * 0.2, H * 0.8), vx: rnd(-0.5, 0.5) || 0.3,
      vy: rnd(-0.2, 0.2), phase: rnd(0, Math.PI * 2), flipper: 0,
    }));

    const drawTurtle = (tr: Turtle, t: number) => {
      const a = Math.atan2(tr.vy, tr.vx);
      const fp = Math.sin(t * 0.003 + tr.phase) * 0.4;
      ctx.save(); ctx.translate(tr.x, tr.y); ctx.rotate(a); ctx.globalAlpha = 0.55;
      // Shell
      ctx.beginPath(); ctx.ellipse(0, 0, 22, 16, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#2d6a4f'; ctx.fill();
      ctx.beginPath(); ctx.ellipse(0, 0, 18, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#40916c'; ctx.fill();
      // Shell pattern
      ctx.globalAlpha = 0.25;
      ctx.strokeStyle = '#1b4332'; ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath(); ctx.ellipse(0, 0, 6 + i * 5, 4 + i * 3, 0, 0, Math.PI * 2); ctx.stroke();
      }
      ctx.globalAlpha = 0.55;
      // Head
      ctx.beginPath(); ctx.ellipse(22, 0, 8, 6, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#52b788'; ctx.fill();
      ctx.beginPath(); ctx.arc(26, -2, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#111'; ctx.fill();
      // Flippers
      [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([fx, fy], idx) => {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(fx * 10, fy * 16, 6, 12, (idx < 2 ? -0.4 : 0.4) + fp * fy * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = '#52b788'; ctx.fill();
        ctx.restore();
      });
      ctx.restore();
    };

    const updTurtle = (tr: Turtle) => {
      tr.flipper += 0.05;
      const m = 100;
      if (tr.x < m) tr.vx += 0.01; if (tr.x > W - m) tr.vx -= 0.01;
      if (tr.y < m) tr.vy += 0.01; if (tr.y > H - m) tr.vy -= 0.01;
      const spd = Math.hypot(tr.vx, tr.vy);
      if (spd > 0.8) { tr.vx = tr.vx / spd * 0.8; tr.vy = tr.vy / spd * 0.8; }
      tr.x += tr.vx; tr.y += tr.vy;
    };

    // ── STINGRAY ───────────────────────────────────
    interface Ray { x: number; y: number; vx: number; vy: number; phase: number; sz: number; }
    const rays: Ray[] = Array.from({ length: 2 }, () => ({
      x: rnd(0, W), y: rnd(H * 0.3, H * 0.9), vx: rnd(-0.6, 0.6) || 0.4,
      vy: rnd(-0.1, 0.1), phase: rnd(0, Math.PI * 2), sz: rnd(30, 50),
    }));

    const drawRay = (r: Ray, t: number) => {
      const a = Math.atan2(r.vy, r.vx);
      const wave = Math.sin(t * 0.002 + r.phase) * 0.25;
      ctx.save(); ctx.translate(r.x, r.y); ctx.rotate(a); ctx.globalAlpha = 0.4;
      ctx.beginPath();
      ctx.moveTo(r.sz, 0);
      ctx.quadraticCurveTo(0, -r.sz * 0.7 + wave * r.sz, -r.sz, 0);
      ctx.quadraticCurveTo(0,  r.sz * 0.7 + wave * r.sz, r.sz, 0);
      ctx.fillStyle = '#5c4a7a'; ctx.fill();
      ctx.beginPath(); ctx.moveTo(-r.sz, 0);
      ctx.quadraticCurveTo(-r.sz * 1.5, wave * 10, -r.sz * 2.8, wave * 15);
      ctx.strokeStyle = '#5c4a7a'; ctx.lineWidth = 3; ctx.stroke();
      ctx.beginPath(); ctx.arc(r.sz * 0.4, -r.sz * 0.15, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#222'; ctx.fill();
      ctx.restore();
    };

    const updRay = (r: Ray) => {
      const m = 100;
      if (r.x < m) r.vx += 0.008; if (r.x > W - m) r.vx -= 0.008;
      if (r.y < m) r.vy += 0.008; if (r.y > H - m) r.vy -= 0.008;
      r.x += r.vx; r.y += r.vy;
    };

    // ── SEAHORSE ───────────────────────────────────
    interface Seahorse { x: number; y: number; phase: number; col: string; }
    const seahorses: Seahorse[] = Array.from({ length: 3 }, () => ({
      x: rnd(50, W - 50), y: rnd(H * 0.2, H * 0.8),
      phase: rnd(0, Math.PI * 2),
      col: ['#f4a261','#e76f51','#457b9d'][Math.floor(rnd(0, 3))],
    }));

    const drawSeahorse = (s: Seahorse, t: number) => {
      const bob = Math.sin(t * 0.0018 + s.phase) * 6;
      const sway = Math.sin(t * 0.0012 + s.phase) * 4;
      ctx.save(); ctx.translate(s.x + sway, s.y + bob); ctx.globalAlpha = 0.55;
      // Body segments
      ctx.strokeStyle = s.col; ctx.lineWidth = 4; ctx.lineCap = 'round';
      const segments = 7;
      for (let i = 0; i < segments; i++) {
        const sy = i * 8;
        const curve = Math.sin(i * 0.5 + t * 0.001 + s.phase) * 3;
        ctx.beginPath(); ctx.moveTo(curve, sy); ctx.lineTo(curve + 2, sy + 7);
        ctx.stroke();
      }
      // Head
      ctx.beginPath(); ctx.ellipse(3, -5, 7, 5, -0.3, 0, Math.PI * 2);
      ctx.fillStyle = s.col; ctx.fill();
      // Snout
      ctx.beginPath(); ctx.moveTo(8, -7); ctx.lineTo(18, -10);
      ctx.lineWidth = 2; ctx.stroke();
      // Crown
      ctx.beginPath(); ctx.arc(3, -9, 4, 0, Math.PI * 2);
      ctx.strokeStyle = s.col; ctx.lineWidth = 2; ctx.stroke();
      // Eye
      ctx.beginPath(); ctx.arc(7, -7, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#111'; ctx.fill();
      // Fin
      ctx.globalAlpha = 0.3;
      ctx.beginPath(); ctx.ellipse(-5, 16, 4, 10, 0.4, 0, Math.PI * 2);
      ctx.fillStyle = s.col; ctx.fill();
      ctx.restore();
    };

    // ── OCTOPUS ────────────────────────────────────
    interface Octopus { x: number; y: number; vx: number; vy: number; phase: number; col: string; }
    const octopi: Octopus[] = Array.from({ length: 2 }, () => ({
      x: rnd(100, W - 100), y: rnd(100, H - 100), vx: rnd(-0.4, 0.4) || 0.2,
      vy: rnd(-0.3, 0.3), phase: rnd(0, Math.PI * 2),
      col: ['#9d4edd','#c77dff'][Math.floor(rnd(0, 2))],
    }));

    const drawOctopus = (o: Octopus, t: number) => {
      ctx.save(); ctx.translate(o.x, o.y); ctx.globalAlpha = 0.5;
      // Head
      ctx.beginPath(); ctx.ellipse(0, 0, 18, 14, 0, 0, Math.PI * 2);
      ctx.fillStyle = o.col; ctx.fill();
      // Eyes
      [-7, 7].forEach(ex => {
        ctx.beginPath(); ctx.arc(ex, -3, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(ex, -3, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#1a1a2e'; ctx.fill();
      });
      // Tentacles
      ctx.globalAlpha = 0.4;
      for (let i = 0; i < 8; i++) {
        const baseA = (i / 8) * Math.PI * 2;
        const wave = Math.sin(t * 0.002 + o.phase + i * 0.8) * 15;
        const len = 30 + Math.random() * 10;
        ctx.beginPath();
        ctx.moveTo(Math.cos(baseA) * 16, Math.sin(baseA) * 12);
        ctx.quadraticCurveTo(
          Math.cos(baseA) * len * 0.6 + wave * 0.5,
          Math.sin(baseA) * len * 0.6 + wave * 0.5,
          Math.cos(baseA) * len + wave, Math.sin(baseA) * len + wave
        );
        ctx.strokeStyle = o.col; ctx.lineWidth = 3 - i * 0.2; ctx.lineCap = 'round'; ctx.stroke();
      }
      ctx.restore();
    };

    const updOctopus = (o: Octopus) => {
      const m = 100;
      if (o.x < m) o.vx += 0.01; if (o.x > W - m) o.vx -= 0.01;
      if (o.y < m) o.vy += 0.01; if (o.y > H - m) o.vy -= 0.01;
      o.x += o.vx; o.y += o.vy;
    };

    // ── STARFISH ───────────────────────────────────
    interface Starfish { x: number; y: number; angle: number; col: string; sz: number; }
    const starfish: Starfish[] = Array.from({ length: 5 }, () => ({
      x: rnd(50, W - 50), y: rnd(H * 0.6, H - 30),
      angle: rnd(0, Math.PI * 2), col: ['#e63946','#f4a261','#e9c46a'][Math.floor(rnd(0, 3))],
      sz: rnd(12, 22),
    }));

    const drawStarfish = (s: Starfish, t: number) => {
      ctx.save(); ctx.translate(s.x, s.y);
      ctx.rotate(s.angle + t * 0.0003); ctx.globalAlpha = 0.55;
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
        const r = i % 2 === 0 ? s.sz : s.sz * 0.45;
        i === 0 ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r) : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      ctx.closePath(); ctx.fillStyle = s.col; ctx.fill();
      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.stroke();
      ctx.restore();
    };

    // ── BUBBLES ────────────────────────────────────
    interface Bubble { x: number; y: number; r: number; vy: number; wobble: number; ws: number; }
    const bubbles: Bubble[] = Array.from({ length: 30 }, () => ({
      x: rnd(0, W), y: rnd(0, H), r: rnd(2, 7), vy: rnd(0.15, 0.5),
      wobble: rnd(0, Math.PI * 2), ws: rnd(0.02, 0.04),
    }));

    const drawBubble = (b: Bubble) => {
      const bx = b.x + Math.sin(b.wobble) * 5;
      ctx.save(); ctx.globalAlpha = 0.2;
      ctx.beginPath(); ctx.arc(bx, b.y, b.r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.9)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.globalAlpha = 0.35;
      ctx.beginPath(); ctx.arc(bx - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.28, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.fill();
      ctx.restore();
    };

    // ── SEAWEED ────────────────────────────────────
    interface Weed { x: number; h: number; segs: number; phase: number; col: string; }
    const weeds: Weed[] = Array.from({ length: 14 }, () => ({
      x: rnd(0, W), h: rnd(50, 130), segs: Math.floor(rnd(5, 10)),
      phase: rnd(0, Math.PI * 2), col: `hsl(${rnd(120, 160)},${rnd(40, 65)}%,${rnd(22, 38)}%)`,
    }));

    const drawWeed = (w: Weed, t: number) => {
      const segH = w.h / w.segs;
      ctx.save(); ctx.globalAlpha = 0.38;
      ctx.strokeStyle = w.col; ctx.lineWidth = 3; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(w.x, H);
      for (let i = 1; i <= w.segs; i++) {
        const sw = Math.sin(t * 0.001 + w.phase + i * 0.6) * (i * 4);
        ctx.lineTo(w.x + sw, H - i * segH);
      }
      ctx.stroke(); ctx.restore();
    };

    // ── LILY PADS ──────────────────────────────────
    interface Lily { x: number; y: number; r: number; angle: number; bob: number; hasFlower: boolean; }
    const lilies: Lily[] = Array.from({ length: 7 }, () => ({
      x: rnd(50, W - 50), y: rnd(50, H - 50), r: rnd(18, 32),
      angle: rnd(0, Math.PI * 2), bob: rnd(0, Math.PI * 2), hasFlower: Math.random() > 0.5,
    }));

    const drawLily = (l: Lily, t: number) => {
      const b = Math.sin(t * 0.0009 + l.bob) * 3;
      ctx.save(); ctx.translate(l.x, l.y + b); ctx.rotate(l.angle); ctx.globalAlpha = 0.45;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, l.r, 0.4, Math.PI * 2 - 0.4); ctx.closePath();
      ctx.fillStyle = '#2d6a4f'; ctx.fill();
      ctx.strokeStyle = '#1b4332'; ctx.lineWidth = 1; ctx.stroke();
      if (l.hasFlower) {
        ctx.globalAlpha = 0.75;
        for (let p = 0; p < 6; p++) {
          const pa = (p / 6) * Math.PI * 2;
          ctx.beginPath(); ctx.ellipse(Math.cos(pa) * 7, Math.sin(pa) * 7, 5, 3, pa, 0, Math.PI * 2);
          ctx.fillStyle = ['#ff99c8','#ffb3c1','#ffc8dd'][p % 3]; ctx.fill();
        }
        ctx.beginPath(); ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffd166'; ctx.fill();
      }
      ctx.restore();
    };

    // ── CRABS ──────────────────────────────────────
    interface Crab { x: number; vx: number; phase: number; }
    const crabs: Crab[] = Array.from({ length: 6 }, () => ({
      x: rnd(0, W), vx: rnd(-0.35, 0.35) || 0.2, phase: rnd(0, Math.PI * 2),
    }));

    const drawCrab = (c: Crab, t: number) => {
      const y = H - 20; const wk = Math.sin(t * 0.003 + c.phase) * 2;
      ctx.save(); ctx.translate(c.x, y + wk); ctx.globalAlpha = 0.55;
      ctx.beginPath(); ctx.ellipse(0, 0, 11, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#e07a5f'; ctx.fill();
      for (let i = -1; i <= 1; i += 2) {
        for (let j = 0; j < 3; j++) {
          ctx.beginPath(); ctx.moveTo(i * 9, j * 3 - 3);
          ctx.lineTo(i * 17, j * 4 - 7 + Math.sin(t * 0.006 + j + c.phase) * 3);
          ctx.strokeStyle = '#c1440e'; ctx.lineWidth = 1.5; ctx.stroke();
        }
      }
      ctx.beginPath(); ctx.arc(-17, -6, 4, 0, Math.PI * 2);
      ctx.arc(17, -6, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#c1440e'; ctx.fill();
      ctx.restore();
    };

    // ── WATER SURFACE RIPPLE LAYER ─────────────────
    const drawWaterDistortion = () => {
      const step = 3;
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const h = prv[y * cols + x];
          if (Math.abs(h) < 0.5) continue;
          const dx = prv[y * cols + x + 1] - prv[y * cols + x - 1];
          const dy = prv[(y + 1) * cols + x] - prv[(y - 1) * cols + x];
          const px = x * step, py = y * step;
          const alpha = Math.min(0.18, Math.abs(h) * 0.008 + (dx * dx + dy * dy) * 0.003);
          if (alpha < 0.005) continue;
          const t = (px / W) * 0.6 + (py / H) * 0.4;
          const r = t < 0.5 ? 96 + (t/0.5)*(129-96) : 129+((t-0.5)/0.5)*(192-129);
          const g = t < 0.5 ? 165 + (t/0.5)*(140-165) : 140+((t-0.5)/0.5)*(132-140);
          const b = t < 0.5 ? 250 + (t/0.5)*(248-250) : 248+((t-0.5)/0.5)*(252-248);
          const light = 1 + h * 0.025 - (dx*dx+dy*dy)*0.0008;
          const spec = Math.pow(Math.max(0, dx*0.4+dy*0.4), 2.5) * 40;
          ctx.fillStyle = `rgba(${Math.min(255,r*light+spec)},${Math.min(255,g*light+spec)},${Math.min(255,b*light+spec)},${alpha})`;
          ctx.fillRect(px - 1, py - 1, step + 1, step + 1);
        }
      }
    };

    // ── LIGHT RAYS ─────────────────────────────────
    const drawRays = (t: number) => {
      for (let i = 0; i < 6; i++) {
        const x = (W / 6) * i + W / 12;
        const sw = Math.sin(t * 0.0004 + i * 1.4) * 50;
        const al = 0.025 + Math.sin(t * 0.0006 + i) * 0.01;
        const gr = ctx.createLinearGradient(x + sw, 0, x + sw * 0.4, H * 0.75);
        gr.addColorStop(0, `rgba(255,255,255,${al})`); gr.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.save(); ctx.beginPath();
        ctx.moveTo(x+sw-25, 0); ctx.lineTo(x+sw+25, 0);
        ctx.lineTo(x+sw*0.4+90, H*0.75); ctx.lineTo(x+sw*0.4-90, H*0.75);
        ctx.closePath(); ctx.fillStyle = gr; ctx.fill(); ctx.restore();
      }
    };

    // ── CAUSTICS ───────────────────────────────────
    const drawCaustics = (t: number) => {
      ctx.save(); ctx.globalAlpha = 0.045;
      for (let i = 0; i < 10; i++) {
        const cx = (W / 10) * i + Math.sin(t * 0.001 + i) * 70;
        const cy = H * 0.55 + Math.cos(t * 0.0008 + i * 0.7) * 100;
        const gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, 70 + Math.sin(t * 0.001 + i) * 20);
        gr.addColorStop(0, 'rgba(255,255,255,0.9)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath(); ctx.arc(cx, cy, 70, 0, Math.PI * 2); ctx.fillStyle = gr; ctx.fill();
      }
      ctx.restore();
    };

    // ── BG ─────────────────────────────────────────
    const drawBG = () => {
      const gr = ctx.createLinearGradient(0, 0, W, H);
      gr.addColorStop(0, '#60a5fa'); gr.addColorStop(0.4, '#818cf8'); gr.addColorStop(1, '#c084fc');
      ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
    };

    // ── MAIN LOOP ──────────────────────────────────
    let raf: number;
    const loop = (t: number) => {
      wSimulate();
      drawBG();
      drawRays(t);
      drawCaustics(t);
      weeds.forEach(w => drawWeed(w, t));
      lilies.forEach(l => drawLily(l, t));
      starfish.forEach(s => drawStarfish(s, t));
      crabs.forEach(c => { c.x += c.vx; if (c.x < -30) c.x = W+30; if (c.x > W+30) c.x = -30; drawCrab(c, t); });
      seahorses.forEach(s => drawSeahorse(s, t));
      rays.forEach(r => { updRay(r); drawRay(r, t); });
      octopi.forEach(o => { updOctopus(o); drawOctopus(o, t); });
      jellies.forEach(j => { updJelly(j, t); drawJelly(j, t); });
      fish.forEach(f => { updFish(f, 16); drawFish(f); });
      bubbles.forEach(b => { b.y -= b.vy; b.wobble += b.ws; if (b.y < -20) { b.y = H + 10; b.x = rnd(0, W); } drawBubble(b); });
      drawWaterDistortion();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', e => onMove(e.clientX, e.clientY));
      window.removeEventListener('touchmove', e => { const t = e.touches[0]; onMove(t.clientX, t.clientY); });
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', top: 0, left: 0,
      width: '100vw', height: '100vh',
      pointerEvents: 'none', zIndex: 0,
    }} />
  );
};

export default PondBackground;
