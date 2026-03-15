import { useEffect, useRef } from 'react';

const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    });

    if (!gl) return;

    // ── Resize ──────────────────────────────────────
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Shader sources ───────────────────────────────
    const baseVS = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() {
        v_uv = a_pos * 0.5 + 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    const splatFS = `
      precision highp float;
      uniform sampler2D u_tex;
      uniform vec2 u_point;
      uniform vec3 u_color;
      uniform float u_radius;
      uniform vec2 u_res;
      varying vec2 v_uv;
      void main() {
        vec2 p = v_uv - u_point;
        p.x *= u_res.x / u_res.y;
        float splat = exp(-dot(p, p) / u_radius);
        vec3 base = texture2D(u_tex, v_uv).rgb;
        gl_FragColor = vec4(base + splat * u_color, 1.0);
      }
    `;

    const advectFS = `
      precision highp float;
      uniform sampler2D u_vel;
      uniform sampler2D u_src;
      uniform float u_dt;
      uniform float u_dissipation;
      uniform vec2 u_res;
      varying vec2 v_uv;
      void main() {
        vec2 vel = texture2D(u_vel, v_uv).xy;
        vec2 pos = v_uv - u_dt * vel * (1.0 / u_res);
        gl_FragColor = u_dissipation * texture2D(u_src, pos);
      }
    `;

    const divergenceFS = `
      precision highp float;
      uniform sampler2D u_vel;
      uniform vec2 u_res;
      varying vec2 v_uv;
      void main() {
        vec2 e = 1.0 / u_res;
        float L = texture2D(u_vel, v_uv - vec2(e.x, 0.0)).x;
        float R = texture2D(u_vel, v_uv + vec2(e.x, 0.0)).x;
        float T = texture2D(u_vel, v_uv + vec2(0.0, e.y)).y;
        float B = texture2D(u_vel, v_uv - vec2(0.0, e.y)).y;
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `;

    const pressureFS = `
      precision highp float;
      uniform sampler2D u_pressure;
      uniform sampler2D u_divergence;
      uniform vec2 u_res;
      varying vec2 v_uv;
      void main() {
        vec2 e = 1.0 / u_res;
        float L = texture2D(u_pressure, v_uv - vec2(e.x, 0.0)).x;
        float R = texture2D(u_pressure, v_uv + vec2(e.x, 0.0)).x;
        float T = texture2D(u_pressure, v_uv + vec2(0.0, e.y)).x;
        float B = texture2D(u_pressure, v_uv - vec2(0.0, e.y)).x;
        float div = texture2D(u_divergence, v_uv).x;
        float pressure = (L + R + T + B - div) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `;

    const gradSubtractFS = `
      precision highp float;
      uniform sampler2D u_pressure;
      uniform sampler2D u_vel;
      uniform vec2 u_res;
      varying vec2 v_uv;
      void main() {
        vec2 e = 1.0 / u_res;
        float L = texture2D(u_pressure, v_uv - vec2(e.x, 0.0)).x;
        float R = texture2D(u_pressure, v_uv + vec2(e.x, 0.0)).x;
        float T = texture2D(u_pressure, v_uv + vec2(0.0, e.y)).x;
        float B = texture2D(u_pressure, v_uv - vec2(0.0, e.y)).x;
        vec2 vel = texture2D(u_vel, v_uv).xy;
        vel -= vec2(R - L, T - B) * 0.5;
        gl_FragColor = vec4(vel, 0.0, 1.0);
      }
    `;

    const displayFS = `
      precision highp float;
      uniform sampler2D u_dye;
      varying vec2 v_uv;
      void main() {
        vec3 c = texture2D(u_dye, v_uv).rgb;
        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a * 0.85);
      }
    `;

    // ── Compile helpers ──────────────────────────────
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const program = (vs: string, fs: string) => {
      const p = gl.createProgram()!;
      gl.attachShader(p, compile(gl.VERTEX_SHADER, vs));
      gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(p);
      return p;
    };

    const splatProg      = program(baseVS, splatFS);
    const advectProg     = program(baseVS, advectFS);
    const divergenceProg = program(baseVS, divergenceFS);
    const pressureProg   = program(baseVS, pressureFS);
    const gradSubProg    = program(baseVS, gradSubtractFS);
    const displayProg    = program(baseVS, displayFS);

    // ── Quad ─────────────────────────────────────────
    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const bindQuad = (prog: WebGLProgram) => {
      const loc = gl.getAttribLocation(prog, 'a_pos');
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    };

    // ── FBO helper ───────────────────────────────────
    const SIM = 128;
    const DYE = 512;

    const fbo = (w: number, h: number) => {
      const tex = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.FLOAT, null);
      const fb = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      return { tex, fb, w, h };
    };

    // Check float texture support
    const ext = gl.getExtension('OES_texture_float');
    if (!ext) return;
    gl.getExtension('OES_texture_float_linear');

    let velA = fbo(SIM, SIM), velB = fbo(SIM, SIM);
    let dyeA = fbo(DYE, DYE), dyeB = fbo(DYE, DYE);
    let divFBO = fbo(SIM, SIM);
    let presA = fbo(SIM, SIM), presB = fbo(SIM, SIM);

    // ── Uniform helpers ──────────────────────────────
    const u = (p: WebGLProgram, name: string) => gl.getUniformLocation(p, name);

    // ── Render to fbo ────────────────────────────────
    const draw = (fb: WebGLFramebuffer | null, w: number, h: number) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.viewport(0, 0, w, h);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    // ── Splat ────────────────────────────────────────
    const splat = (x: number, y: number, dx: number, dy: number, color: [number, number, number]) => {
      gl.useProgram(splatProg);
      bindQuad(splatProg);
      gl.uniform1i(u(splatProg, 'u_tex'), 0);
      gl.uniform2f(u(splatProg, 'u_point'), x, y);
      gl.uniform2f(u(splatProg, 'u_res'), SIM, SIM);
      gl.uniform1f(u(splatProg, 'u_radius'), 0.002);
      gl.uniform3f(u(splatProg, 'u_color'), dx * 8, dy * 8, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velA.tex);
      draw(velB.fb, SIM, SIM);
      [velA, velB] = [velB, velA];

      gl.uniform2f(u(splatProg, 'u_res'), DYE, DYE);
      gl.uniform1f(u(splatProg, 'u_radius'), 0.0008);
      gl.uniform3f(u(splatProg, 'u_color'), color[0], color[1], color[2]);
      gl.bindTexture(gl.TEXTURE_2D, dyeA.tex);
      draw(dyeB.fb, DYE, DYE);
      [dyeA, dyeB] = [dyeB, dyeA];
    };

    // ── Mouse tracking ───────────────────────────────
    let lastX = -1, lastY = -1;
    let colorHue = 0;

    const hsvToRgb = (h: number): [number, number, number] => {
      const s = 1, v = 1;
      const i = Math.floor(h * 6);
      const f = h * 6 - i;
      const p = v * (1 - s);
      const q = v * (1 - f * s);
      const t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0: return [v, t, p];
        case 1: return [q, v, p];
        case 2: return [p, v, t];
        case 3: return [p, q, v];
        case 4: return [t, p, v];
        default: return [v, p, q];
      }
    };

    const onMove = (cx: number, cy: number) => {
      const x = cx / canvas.width;
      const y = 1 - cy / canvas.height;
      if (lastX === -1) { lastX = x; lastY = y; return; }
      const dx = x - lastX;
      const dy = y - lastY;
      lastX = x; lastY = y;
      colorHue = (colorHue + 0.007) % 1;
      const color = hsvToRgb(colorHue);
      splat(x, y, dx, dy, color.map(c => c * 12) as [number, number, number]);
    };

    const onLeave = () => { lastX = -1; lastY = -1; };

    window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
    window.addEventListener('touchmove', e => {
      const t = e.touches[0];
      onMove(t.clientX, t.clientY);
    }, { passive: true });
    window.addEventListener('mouseleave', onLeave);

    // ── Simulation step ──────────────────────────────
    const DT = 0.016;

    const step = () => {
      gl.disable(gl.BLEND);

      // Advect velocity
      gl.useProgram(advectProg);
      bindQuad(advectProg);
      gl.uniform1i(u(advectProg, 'u_vel'), 0);
      gl.uniform1i(u(advectProg, 'u_src'), 1);
      gl.uniform1f(u(advectProg, 'u_dt'), DT);
      gl.uniform1f(u(advectProg, 'u_dissipation'), 0.98);
      gl.uniform2f(u(advectProg, 'u_res'), SIM, SIM);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, velA.tex);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, velA.tex);
      draw(velB.fb, SIM, SIM);
      [velA, velB] = [velB, velA];

      // Advect dye
      gl.uniform1f(u(advectProg, 'u_dissipation'), 0.97);
      gl.uniform2f(u(advectProg, 'u_res'), DYE, DYE);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, velA.tex);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, dyeA.tex);
      draw(dyeB.fb, DYE, DYE);
      [dyeA, dyeB] = [dyeB, dyeA];

      // Divergence
      gl.useProgram(divergenceProg);
      bindQuad(divergenceProg);
      gl.uniform1i(u(divergenceProg, 'u_vel'), 0);
      gl.uniform2f(u(divergenceProg, 'u_res'), SIM, SIM);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, velA.tex);
      draw(divFBO.fb, SIM, SIM);

      // Pressure iterations
      gl.useProgram(pressureProg);
      bindQuad(pressureProg);
      gl.uniform1i(u(pressureProg, 'u_pressure'), 0);
      gl.uniform1i(u(pressureProg, 'u_divergence'), 1);
      gl.uniform2f(u(pressureProg, 'u_res'), SIM, SIM);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, divFBO.tex);
      for (let i = 0; i < 20; i++) {
        gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, presA.tex);
        draw(presB.fb, SIM, SIM);
        [presA, presB] = [presB, presA];
      }

      // Gradient subtract
      gl.useProgram(gradSubProg);
      bindQuad(gradSubProg);
      gl.uniform1i(u(gradSubProg, 'u_pressure'), 0);
      gl.uniform1i(u(gradSubProg, 'u_vel'), 1);
      gl.uniform2f(u(gradSubProg, 'u_res'), SIM, SIM);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, presA.tex);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, velA.tex);
      draw(velB.fb, SIM, SIM);
      [velA, velB] = [velB, velA];

      // Display
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(displayProg);
      bindQuad(displayProg);
      gl.uniform1i(u(displayProg, 'u_dye'), 0);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, dyeA.tex);
      draw(null, canvas.width, canvas.height);
    };

    // ── Loop ─────────────────────────────────────────
    let raf: number;
    const loop = () => {
      step();
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', e => onMove(e.clientX, e.clientY));
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

export default FluidBackground;
