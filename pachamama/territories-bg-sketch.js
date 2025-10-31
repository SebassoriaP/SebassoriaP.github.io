// territories-bg-sketch.js
// Fondo animado eco-verde para el panel de mapas/territorios.

new p5((p) => {
  let w = 0, h = 0;
  let t = 0;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function size() {
    const el = document.getElementById('territories-bg');
    if (!el) return { w: 0, h: 0 };
    return { w: el.clientWidth, h: el.clientHeight };
  }

  p.setup = () => {
    const s = size();
    w = s.w; h = s.h;
    const c = p.createCanvas(w || 1, h || 1);
    c.parent('territories-bg');
    p.noStroke();
    if (reduceMotion) p.noLoop();
  };

  p.windowResized = () => {
    const s = size();
    w = s.w; h = s.h;
    p.resizeCanvas(w, h);
  };

  p.draw = () => {
    if (!w || !h) return;
    if (!reduceMotion) t += 0.005;

    // Paleta bosque → hoja (verde oscuro → verde brillante)
    const c1 = p.color(8, 28, 14);
    const c2 = p.color(163, 230, 53);

    // Ondas verticales con ruido perlin + leve parallax horizontal
    const stepY = 3;
    const nScaleY = 0.004;
    const nTime = 0.6;

    for (let y = 0; y < h; y += stepY) {
      const n = p.noise(y * nScaleY, t * nTime);
      const k = p.constrain(n * 0.85 + 0.15, 0, 1);
      const col = p.lerpColor(c1, c2, k);
      p.fill(col);
      // desplazamiento horizontal sutil para “corriente”
      const drift = (p.noise(t * 0.3, y * 0.002) - 0.5) * 18;
      p.rect(drift, y, w + 36, stepY);
    }

    // Velo muy suave para texto/contraste
    p.fill(0, 50);
    p.rect(0, 0, w, h);

    // Semillas de luz suaves (cantan con el tema)
    if (!reduceMotion) {
      p.blendMode(p.SCREEN);
      const dots = 28;
      for (let i = 0; i < dots; i++) {
        const ax = ((i * 131.7) % w);
        const ny = p.noise(i * 0.17, t * 0.9) * h;
        const puls = 0.5 + 0.5 * Math.sin(t * 1.6 + i);
        const r = 1 + 2.2 * puls;
        p.fill(180, 255, 140, 50 + 70 * puls);
        p.circle(ax, ny, r);
      }
      p.blendMode(p.BLEND);
    }
  };
});
