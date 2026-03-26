/**
 * calculadora.js — EnergiAVerde
 * Lógica del formulario de estimación (Nivel 2):
 *  - Lee consumo, tipo de usuario, región y año
 *  - Calcula % renovable usando los datos del dataset
 *  - Actualiza el anillo SVG y el desglose por fuente
 *
 * Depende de: datos-globales.js (RENEWABLES_BY_YEAR)
 */

"use strict";

function calcular() {
  var consumo = +(document.getElementById('inputConsumo')?.value) || 0;
  var tipo    =   document.getElementById('inputTipo')?.value    || 'hogar';
  var region  = +(document.getElementById('inputRegion')?.value) || 1.0;
  var anio    = +(document.getElementById('inputAnio')?.value)   || 2022;

  var emptyState  = document.getElementById('calcEmpty');
  var resultState = document.getElementById('calcResult');

  /* Sin consumo → mostrar estado vacío */
  if (consumo <= 0) {
    if (emptyState)  emptyState.style.display  = 'flex';
    if (resultState) resultState.style.display = 'none';
    return;
  }

  if (emptyState)  emptyState.style.display  = 'none';
  if (resultState) resultState.style.display = 'flex';

  /* Cálculo del porcentaje renovable */
  var ref      = RENEWABLES_BY_YEAR[anio] || RENEWABLES_BY_YEAR[2022];
  var tipoMult = { hogar: 1.0, pequena: 0.95, comunidad: 1.05 }[tipo] || 1.0;
  var pct      = Math.min(100, ref.total * region * tipoMult);
  var pctRound = Math.round(pct * 10) / 10;

  /* ── Anillo SVG ── */
  var circumference = 2 * Math.PI * 55;
  var offset        = circumference * (1 - pct / 100);
  var ringEl        = document.getElementById('ringFill');

  if (ringEl) {
    var color = pct >= 60 ? '#4ade80' : pct >= 30 ? '#fbbf24' : '#f87171';
    ringEl.style.stroke           = color;
    ringEl.style.strokeDasharray  = circumference;
    ringEl.style.strokeDashoffset = offset;

    var pctEl  = document.getElementById('ringPct');
    var unitEl = document.getElementById('ringUnit');
    if (pctEl)  { pctEl.textContent = pctRound + '%'; pctEl.style.color = color; }
    if (unitEl)   unitEl.textContent = 'renovable';
  }

  /* ── Resumen de kWh renovables ── */
  var kwhRenov = (consumo * pct / 100).toFixed(1);
  var summary  = document.getElementById('calcSummary');
  if (summary) {
    summary.innerHTML =
      '<strong style="color:var(--green)">' + kwhRenov + ' kWh</strong> de tus ' +
      '<strong>' + consumo + ' kWh</strong> provienen de fuentes renovables';
  }

  /* ── Desglose por fuente ── */
  var sources = [
    { name: '💧 Hidráulica', val: ref.hydro * region * tipoMult, color: '#38bdf8' },
    { name: '💨 Eólica',     val: ref.wind  * region * tipoMult, color: '#4ade80' },
    { name: '☀️ Solar',      val: ref.solar * region * tipoMult, color: '#fbbf24' },
    { name: '🌿 Bioenergía', val: ref.bio   * region * tipoMult, color: '#86efac' },
    { name: '🌋 Geotérmica', val: ref.geo   * region * tipoMult, color: '#fb923c' }
  ];

  var bRows = document.getElementById('breakdownRows');
  if (bRows) {
    bRows.innerHTML = sources.map(function(s) {
      var v = Math.min(Math.round(s.val * 10) / 10, 100);
      return '<div class="breakdown-row">' +
               '<div class="breakdown-header">' +
                 '<span>' + s.name + '</span>' +
                 '<span style="color:' + s.color + ';font-weight:600">' + v + '%</span>' +
               '</div>' +
               '<div class="breakdown-bar">' +
                 '<div class="breakdown-fill" style="width:' + v + '%;background:' + s.color + '"></div>' +
               '</div>' +
             '</div>';
    }).join('');
  }
}

/* Exponer globalmente (se llama desde atributos oninput/onchange en el HTML) */
window.calcular = calcular;
