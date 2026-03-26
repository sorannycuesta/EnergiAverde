/**
 * grafico-barras.js — EnergiAVerde / Dashboard / graficos / grafico-barras
 * Gráfico de barras: Producción de energía por fuente renovable (Nivel 3)
 * Datos: wind-generation, solar-energy-consumption, hydropower-consumption,
 *        biofuel-production, installed-geothermal-capacity
 *
 * Depende de: Chart.js (CDN), controlador.js (CHART_BASE, destroyChart, charts)
 */

"use strict";

function renderGraficoBarras(eData, entity) {
  var last      = eData[eData.length - 1];
  var yearLabel = last.Year || last.year;

  destroyChart('bar');

  charts.bar = new Chart(document.getElementById('chartBar'), {
    type: 'bar',
    data: {
      labels: ['Eólica', 'Solar', 'Hidroeléctrica', 'Biocombustible', 'Geotérmica'],
      datasets: [{
        label: 'Producción / Consumo',
        data: [
          last['wind-generation']               || 0,
          last['solar-energy-consumption']      || 0,
          last['hydropower-consumption']        || 0,
          last['biofuel-production']            || 0,
          last['installed-geothermal-capacity'] || 0
        ],
        backgroundColor: [
          'rgba(74,222,128,0.75)',
          'rgba(251,191,36,0.75)',
          'rgba(56,189,248,0.75)',
          'rgba(134,239,172,0.75)',
          'rgba(249,115,22,0.75)'
        ],
        borderColor: ['#4ade80','#fbbf24','#38bdf8','#86efac','#f97316'],
        borderWidth: 1,
        borderRadius: 6
      }]
    },
    options: Object.assign({}, CHART_BASE, {
      plugins: Object.assign({}, CHART_BASE.plugins, {
        title: {
          display: true,
          text: entity + ' — Año ' + yearLabel,
          color: '#e4ede4',
          font: { family: "'Syne'", size: 12 }
        }
      })
    })
  });
}
