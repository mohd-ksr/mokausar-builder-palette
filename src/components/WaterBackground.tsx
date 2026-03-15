import { useEffect, useRef } from 'react';

const WaterBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let current: Float32Array;
    let previous: Float32Array;
    let cols: number;
    let rows: number;

    const DAMPING = 0.985;

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      cols = Math.ceil(width / 2) + 2;
      rows = Math.ceil(height / 2) + 2;
      current = new Float32Array(cols * rows);
      previous = new Float32Array(cols * rows);
    };

    init();
    window.addEventListener('resize', init);

    const drop = (cx: number, cy: number, radius: number, strength: number) => {
      const gx = Math.floor(cx / 2);
      const gy = Math.floor(cy / 2);
      const r = Math.floor(radius / 2);
      for (let y = gy - r; y <= gy + r; y++) {
        for (let x = gx - r; x <= gx + r; x++) {
          if (x < 1 || x >= cols - 1 || y < 1 || y >= rows - 1) continue;
          const dist = Math.sqrt((x - gx) ** 2 + (y - gy) ** 2);
          if (dist <= r) {
            previous[y * cols + x] += strength * (1 - dist / r);
          }
        }
      }
    };

    let lastMouseX = -1, lastMouseY = -1;

    const onMove = (x: number, y: number) => {
      if (lastMouseX !== -1) {
        const dx = x - lastMouseX;
        const dy = y - lastMouseY;
        const speed = Math.sqrt(dx * dx + dy * dy);
        if (speed > 2) {
          drop(x, y, 12, Math.min(speed * 0.8, 60));
        }
      }
      lastMouseX = x;
      lastMouseY = y;
    };

    const onLeave = () => { lastMouseX = -1; lastMouseY = -1; };

    const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      onMove(t.clientX, t.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('mouseleave', onLeave);

    const simulate = () => {
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const idx = y * cols + x;
          const val =
            (current[(y - 1) * cols + x] +
              current[(y + 1) * cols + x] +
              current[y * cols + (x - 1)] +
              current[y * cols + (x + 1)]) / 2 -
            previous[idx];
          previous[idx] = val * DAMPING;
        }
      }
      const tmp = previous;
      previous = current;
      current = tmp;
    };

    const render = () => {
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const idx = y * cols + x;
          const dx = current[idx + 1] - current[idx - 1];
          const dy = current[(y + 1) * cols + x] - current[(y - 1) * cols + x];

          const offsetX = Math.round(dx * 0.4);
          const offsetY = Math.round(dy * 0.4);

          for (let py = 0; py < 2; py++) {
            for (let px = 0; px < 2; px++) {
              const screenX = x * 2 + px;
              const screenY = y * 2 + py;
              if (screenX >= width || screenY >= height) continue;

              const pixIdx = (screenY * width + screenX) * 4;

              const srcX = Math.max(0, Math.min(width - 1, screenX + offsetX));
              const srcY = Math.max(0, Math.min(height - 1, screenY + offsetY));

              // Match gradient: #60a5fa (96,165,250) → #818cf8 (129,140,248) → #c084fc (192,132,252)
              // Diagonal interpolation matching CSS gradient-to-br (135deg)
              const t = (srcX / width) * 0.6 + (srcY / height) * 0.4;

              // Find the base color section and replace:
              const baseR = t < 0.5
                ? 6 + (t / 0.5) * (4 - 6)
                : 4 + ((t - 0.5) / 0.5) * (8 - 4);
              const baseG = t < 0.5
                ? 78 + (t / 0.5) * (95 - 78)
                : 95 + ((t - 0.5) / 0.5) * (148 - 95);
              const baseB = t < 0.5
                ? 59 + (t / 0.5) * (70 - 59)
                : 70 + ((t - 0.5) / 0.5) * (178 - 70);
                
              const h = current[idx];
              const light = Math.max(0, Math.min(1, 1 + h * 0.012 - (dx * dx + dy * dy) * 0.001));
              const specular = Math.max(0, dx * 0.3 + dy * 0.3);
              const spec = Math.pow(Math.max(0, specular), 3) * 55;

              data[pixIdx] = Math.min(255, baseR * light + spec);
              data[pixIdx + 1] = Math.min(255, baseG * light + spec);
              data[pixIdx + 2] = Math.min(255, baseB * light + spec);

              // Softer blend with the gradient background
              data[pixIdx + 3] = Math.abs(h) > 0.3
                ? Math.min(140, Math.abs(h) * 2.5 + (dx * dx + dy * dy) * 6)
                : 0;
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    let raf: number;
    const loop = () => {
      simulate();
      render();
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default WaterBackground;