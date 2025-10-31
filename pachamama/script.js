// map-sketch.js

const EARTH_TEXTURE = 'https://sgiomatec.github.io/ear0xuu2.jpg';

// Centro aproximado de Ecuador
const ECUADOR = { latDeg: 1, lonDeg: -13 };

new p5((p) => {
  let tex;
  let cw, ch, radius;

  p.preload = () => {
    tex = p.loadImage(EARTH_TEXTURE, () => {}, () => {
      console.warn('No se pudo cargar la textura (CORS). Prueba con una imagen local.');
    });
  };

  p.setup = () => {
    const container = document.getElementById('sketch-map');
    const rect = container.getBoundingClientRect();
    cw = rect.width;
    ch = rect.height;

    const canvas = p.createCanvas(cw, ch, p.WEBGL);
    canvas.parent('sketch-map');

    p.setAttributes('antialias', true);
    p.angleMode(p.RADIANS);
    p.noStroke();

    radius = Math.min(cw, ch) * 0.45; // tamaño del globo
  };

  p.windowResized = () => {
    const container = document.getElementById('sketch-map');
    const rect = container.getBoundingClientRect();
    cw = rect.width;
    ch = rect.height;
    p.resizeCanvas(cw, ch);
    radius = Math.min(cw, ch) * 0.35;
  };

  p.draw = () => {
    p.background(240);

    // Luces suaves
    p.ambientLight(45);
    //Los primeros valores son los colores de la esfera RGB y los otros son las luces
    p.directionalLight(255, 255, 255, 0, 0, -1);

    p.orbitControl();


    p.push();

    const initialRotY = p.radians(235);
    p.rotateY(initialRotY);



    if (tex) p.texture(tex);
    p.sphere(radius, 64, 48);

    // Marcador visible en Ecuador
    const lat = p.radians(ECUADOR.latDeg);
    const lon = p.radians(ECUADOR.lonDeg);

    // Convención estándar
    const x = radius * Math.cos(lat) * Math.cos(lon);
    const y = radius * Math.sin(lat);
    const z = radius * Math.cos(lat) * Math.sin(lon);

    // Saca el marcador un poco fuera de la superficie (para que no se “hunda”)
    const lift = 1.02; // >1
    const X = x * lift, Y = y * lift, Z = z * lift;

    // Tamaño del marcador relativo al radio
    const dotSize = Math.max(6, radius * 0.06);

    // Línea desde el centro al marcador (para ubicarlo mejor)
    p.push();
    p.stroke(30, 30, 30, 180);
    p.strokeWeight(2);
    p.line(0, 0, 0, X, Y, Z);
    p.pop();

    // Esfera “brillante” (emissive) para que contraste con la textura
    p.push();
    p.noStroke();
    p.emissiveMaterial(255, 200, 0);
    p.translate(X, Y, Z);
    p.sphere(dotSize, 16, 12);
    p.pop();

    p.pop();

    

  };
}, 'sketch-map');

// === Accordion de comunidades ===
(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.card [aria-controls]').forEach(btn => {
    const panelId = btn.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    if (!panel) return;

    // Estado inicial
    btn.setAttribute('aria-expanded', 'false');
    panel.hidden = true;
    panel.dataset.open = 'false';

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      // Alternar estados
      btn.setAttribute('aria-expanded', String(!isOpen));
      panel.hidden = isOpen;             
      panel.dataset.open = String(!isOpen);

      if (prefersReduced) return;        
      panel.getBoundingClientRect();     
    });
  });
})();
