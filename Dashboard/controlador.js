/**
 * controlador.js — EnergiAVerde / Dashboard
 * Controlador principal del Dashboard (Nivel 3):
 *  - Configura la base común de Chart.js
 *  - Gestiona el ciclo de vida de las 4 gráficas
 *  - Llama a cada módulo de gráfico según la entidad seleccionada
 *
 * Depende de: datos-globales.js, grafico-barras.js, grafico-torta.js,
 *             grafico-lineas.js, grafico-area.js
 */

"use strict";

/* ── Objeto para guardar instancias de Chart.js ── */
var charts = {};

/* ── Configuración base compartida por todas las gráficas ── */
var CHART_BASE = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#96a896',
        font: { family: "'DM Sans'", size: 11 },
        padding: 12
      }
    }
  },
  scales: {
    x: {
      ticks: { color: '#657065', font: { size: 10 } },
      grid:  { color: 'rgba(30,46,30,0.4)' }
    },
    y: {
      ticks: { color: '#657065', font: { size: 10 } },
      grid:  { color: 'rgba(30,46,30,0.4)' }
    }
  }
};

/* Destruye una gráfica existente antes de redibujarla */
function destroyChart(id) {
  if (charts[id]) {
    charts[id].destroy();
    delete charts[id];
  }
}

/* Rellena el select de entidades del dashboard */
function initDashboardEntities() {
  var sel = document.getElementById('dashEntity');
  if (!sel || !allData.length) return;

  var entities = [];
  var seen     = {};
  allData.forEach(function(r) {
    var name = r.Entity || r.entity;
    if (name && !seen[name]) { seen[name] = true; entities.push(name); }
  });
  entities.sort();

  sel.innerHTML = '';
  entities.forEach(function(name) {
    var o = document.createElement('option');
    o.value = name; o.textContent = name;
    sel.appendChild(o);
  });

  /* Priorizar "World" si existe */
  sel.value = entities.indexOf('World') >= 0 ? 'World' : entities[0];
}

/* Actualiza las 4 gráficas según la entidad seleccionada */
function updateDashboard() {
  var entity = (document.getElementById('dashEntity') || {}).value || 'World';
  var src    = allData.length ? allData : generateInlineDemo();

  /* Filtrar y ordenar por año */
  var eData = src.filter(function(r) {
    return (r.Entity || r.entity) === entity;
  }).sort(function(a, b) {
    return (+(a.Year || a.year)) - (+(b.Year || b.year));
  });

  if (!eData.length) return;

  var years = eData.map(function(r) { return r.Year || r.year; });

  /* Decimación: máximo ~18 etiquetas en el eje X */
  var step    = Math.max(1, Math.floor(years.length / 18));
  var yLabels = years.filter(function(_, i) { return i % step === 0; });
  var yFilter = function(_, i)              { return i % step === 0; };

  /* Llamar a cada módulo de gráfico */
  if (typeof renderGraficoBarras  === 'function') renderGraficoBarras(eData, entity);
  if (typeof renderGraficoTorta   === 'function') renderGraficoTorta(eData, entity);
  if (typeof renderGraficoLineas  === 'function') renderGraficoLineas(eData, yLabels, yFilter);
  if (typeof renderGraficoArea    === 'function') renderGraficoArea(eData, yLabels, yFilter);
}

/* Exponer globalmente (llamado desde onchange en el HTML) */
window.updateDashboard = updateDashboard;
