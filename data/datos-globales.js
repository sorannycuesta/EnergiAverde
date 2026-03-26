/**
 * datos-globales.js
 * EnergiAVerde — Transición Energética Justa · Bootcamp MinTIC 2025
 * ─────────────────────────────────────────────────────────────────
 * Constantes y datos compartidos entre todos los módulos del proyecto.
 * Este archivo debe cargarse PRIMERO en cualquier página que lo necesite.
 */

"use strict";

/* ── Estado global compartido ── */
var allData  = [];
var filtered = [];

/* ── Columnas a mostrar en la tabla ── */
var SHOW_COLS = [
  'Entity','Year',
  'wind-generation','solar-energy-consumption','hydropower-consumption',
  'biofuel-production','installed-geothermal-capacity',
  'share-electricity-renewables','share-electricity-wind',
  'share-electricity-solar','share-electricity-hydro',
  'cumulative-installed-wind-energy-capacity-gigawatts',
  'installed-solar-PV-capacity','modern-renewable-energy-consumption'
];

/* ── Etiquetas en español para las columnas ── */
var COL_LABELS = {
  'Entity'                                          : 'País / Región',
  'Year'                                            : 'Año',
  'wind-generation'                                 : 'Eólica (TWh)',
  'solar-energy-consumption'                        : 'Solar (TWh)',
  'hydropower-consumption'                          : 'Hidro (TWh)',
  'biofuel-production'                              : 'Biocomb. (PJ)',
  'installed-geothermal-capacity'                   : 'Geotérmica GW',
  'share-electricity-renewables'                    : '% Renov. total',
  'share-electricity-wind'                          : '% Eólica',
  'share-electricity-solar'                         : '% Solar',
  'share-electricity-hydro'                         : '% Hidro',
  'cumulative-installed-wind-energy-capacity-gigawatts': 'Cap. Eólica acum. GW',
  'installed-solar-PV-capacity'                     : 'Cap. Solar PV GW',
  'modern-renewable-energy-consumption'             : 'Renov. moderna EJ'
};

/* ── Porcentajes globales por año de referencia (del dataset) ── */
var RENEWABLES_BY_YEAR = {
  2022: { total:29.9, hydro:15.6, wind:7.2,  solar:3.3,  bio:2.4, geo:0.5 },
  2020: { total:29.0, hydro:16.2, wind:6.5,  solar:3.1,  bio:2.2, geo:0.5 },
  2015: { total:23.6, hydro:16.6, wind:3.7,  solar:0.9,  bio:1.9, geo:0.5 },
  2010: { total:22.4, hydro:16.4, wind:2.0,  solar:0.06, bio:1.5, geo:0.5 },
  2000: { total:20.8, hydro:19.1, wind:0.54, solar:0.01, bio:0.7, geo:0.5 }
};

/* ── Información de cada fuente de energía renovable ── */
var ENERGY_TYPES = {
  solar: {
    icon: '☀️',
    name: 'Energía Solar',
    desc: 'Los paneles fotovoltaicos convierten la luz solar en electricidad mediante el efecto fotoeléctrico. Es la tecnología renovable de más rápido crecimiento: la capacidad instalada pasó de 1.4 GW en 2000 a más de 1,000 GW en 2022, con una caída de costos superior al 90%. Colombia tiene alta irradiación solar (4.5 kWh/m²/día promedio), especialmente en La Guajira y la Costa Caribe.',
    tags: [
      '<span class="chip amber">1,050+ GW instalados (2022)</span>',
      '<span class="chip">Costo -90% desde 2010</span>',
      '<span class="chip teal">Colombia: potencial enorme en Guajira</span>'
    ]
  },
  wind: {
    icon: '💨',
    name: 'Energía Eólica',
    desc: 'Los aerogeneradores transforman la energía cinética del viento en electricidad. Existen dos modalidades: onshore (en tierra) y offshore (mar adentro). La eólica representa ya el 7.2% de la electricidad mundial. Colombia cuenta con vientos constantes de 9-11 m/s en La Guajira, lo que la convierte en uno de los mejores recursos eólicos de América Latina.',
    tags: [
      '<span class="chip">900+ GW acumulados (2022)</span>',
      '<span class="chip teal">7.2% del mix eléctrico mundial</span>',
      '<span class="chip amber">Guajira: vientos 9-11 m/s</span>'
    ]
  },
  hydro: {
    icon: '💧',
    name: 'Energía Hidroeléctrica',
    desc: 'La fuente renovable más madura y con mayor capacidad instalada en el mundo. Colombia obtiene más del 67% de su electricidad de centrales hidroeléctricas. Sin embargo, el cambio climático y la variabilidad hídrica subrayan la necesidad de diversificar la matriz con otras renovables para garantizar la resiliencia del sistema eléctrico nacional.',
    tags: [
      '<span class="chip sky">15.6% del mix eléctrico mundial</span>',
      '<span class="chip amber">Colombia: 67%+ de su electricidad</span>',
      '<span class="chip">4,380+ TWh globales (2022)</span>'
    ]
  },
  geo: {
    icon: '🌋',
    name: 'Energía Geotérmica',
    desc: 'Extrae el calor del interior de la Tierra para generar vapor que mueve turbinas. Es una de las pocas renovables que produce energía de base (disponible el 90%+ del tiempo, sin depender del sol ni el viento). Colombia tiene potencial geotérmico en zonas volcánicas del macizo colombiano, aunque aún no está aprovechado.',
    tags: [
      '<span class="chip">+90% de disponibilidad continua</span>',
      '<span class="chip teal">15 GW instalados globalmente</span>',
      '<span class="chip amber">Cero emisiones de CO₂ en operación</span>'
    ]
  },
  bio: {
    icon: '🌿',
    name: 'Biocombustibles y Bioenergía',
    desc: 'Energía producida a partir de biomasa orgánica: bagazo de caña de azúcar, residuos agrícolas, cultivos energéticos y biodigestores. Colombia tiene amplia disponibilidad de materia prima debido a su vocación agropecuaria y biodiversidad. La bioenergía puede ser especialmente relevante para zonas rurales sin acceso a la red eléctrica nacional.',
    tags: [
      '<span class="chip">2.4% del mix eléctrico mundial</span>',
      '<span class="chip amber">Colombia: bagazo y aceite de palma</span>',
      '<span class="chip teal">Relevante para zonas rurales</span>'
    ]
  }
};

/* ── Generador de datos de demostración (funciona sin servidor) ── */
function generateInlineDemo() {
  var entities = [
    { name:'World',         b:{ w:2100, s:1200, h:4380, bio:960,  geo:15,   sr:29.9, sw:7.2,  ss:3.3,  sh:15.6, cw:900,  spv:1050, mr:46   } },
    { name:'Colombia',      b:{ w:1.2,  s:2.2,  h:57,   bio:6,    geo:0,    sr:70.5, sw:0.8,  ss:1.2,  sh:67.5, cw:0.5,  spv:1.8,  mr:2.6  } },
    { name:'Brazil',        b:{ w:90,   s:25,   h:430,  bio:220,  geo:0.06, sr:87,   sw:13.5, ss:3,    sh:66,   cw:24,   spv:24,   mr:19.5 } },
    { name:'Germany',       b:{ w:135,  s:62,   h:17.5, bio:49.5, geo:0.04, sr:47,   sw:27,   ss:11.4, sh:3.5,  cw:66,   spv:66.6, mr:4.8  } },
    { name:'China',         b:{ w:762,  s:425,  h:1350, bio:88,   geo:0.5,  sr:31.6, sw:9,    ss:4.8,  sh:15.8, cw:365,  spv:392,  mr:60.5 } },
    { name:'United States', b:{ w:434,  s:186,  h:260,  bio:260,  geo:3.8,  sr:22,   sw:10.2, ss:4,    sh:6.2,  cw:141,  spv:142,  mr:15.2 } }
  ];

  var rows = [];
  entities.forEach(function(ent) {
    var name = ent.name;
    var b    = ent.b;
    for (var y = 2000; y <= 2022; y++) {
      var t = (y - 2000) / 22;
      var n = function() { return 0.93 + Math.random() * 0.14; };
      rows.push({
        Entity: name, Year: y,
        'wind-generation'                                    : +(b.w   * Math.pow(t + 0.05, 2.5) * n()).toFixed(2),
        'solar-energy-consumption'                           : +(b.s   * Math.pow(t + 0.02, 4)   * n()).toFixed(2),
        'hydropower-consumption'                             : +(b.h   * (0.7 + 0.3 * t)         * n()).toFixed(2),
        'biofuel-production'                                 : +(b.bio * (0.4 + 0.6 * t)         * n()).toFixed(2),
        'installed-geothermal-capacity'                      : +(b.geo * (0.6 + 0.4 * t)         * n()).toFixed(3),
        'share-electricity-renewables'                       : +(b.sr  * (0.75 + 0.25 * t)       * n()).toFixed(2),
        'share-electricity-wind'                             : +(b.sw  * Math.pow(t + 0.05, 2)   * n()).toFixed(2),
        'share-electricity-solar'                            : +(b.ss  * Math.pow(t + 0.02, 3.5) * n()).toFixed(2),
        'share-electricity-hydro'                            : +(b.sh  * (0.7 + 0.3 * t)         * n()).toFixed(2),
        'cumulative-installed-wind-energy-capacity-gigawatts': +(b.cw  * Math.pow(t + 0.03, 2.2) * n()).toFixed(2),
        'installed-solar-PV-capacity'                        : +(b.spv * Math.pow(t + 0.02, 4)   * n()).toFixed(2),
        'modern-renewable-energy-consumption'                : +(b.mr  * (0.45 + 0.55 * t)       * n()).toFixed(3)
      });
    }
  });
  return rows;
}
