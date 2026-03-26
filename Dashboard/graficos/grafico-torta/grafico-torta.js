/**
 * grafico-torta.js — EnergiAVerde / Dashboard / graficos / grafico-torta
 * Gráfico de dona: Participación de cada fuente en el mix eléctrico (Nivel 3)
 * Datos: share-electricity-wind, share-electricity-solar,
 *        share-electricity-hydro, share-electricity-renewables
 *
 * Depende de: Chart.js (CDN), controlador.js (destroyChart, charts)
 */

"use strict";

function renderGraficoTorta(eData, entity) {
  var last      = eData[eData.length - 1];
  var yearLabel = last.Year || last.year;

  var sw = last['share-electricity-wind']       || 0;
  var ss = last['share-electricity-solar']      || 0;
  var sh = last['share-electricity-hydro']      || 0;
  var sr = last['share-electricity-renewables'] || 0;
  var so = Math.max(0, sr - sw - ss - sh);   /* otras renovables */
  var sc = Math.max(0, 100 - sr);            /* convencional     */

  destroyChart('pie');

  charts.pie = new Chart(document.getElementById('chartPie'), {
    type: 'doughnut',
    data: {
      labels: ['Eólica', 'Solar', 'Hidráulica', 'Otras renovables', 'Convencional'],
      datasets: [{
        data: [sw, ss, sh, so, sc],
        backgroundColor: [
          'rgba(74,222,128,0.8)',
          'rgba(251,191,36,0.8)',
          'rgba(56,189,248,0.8)',
          'rgba(134,239,172,0.7)',
          'rgba(50,50,50,0.6)'
        ],
        borderColor: '#0f180f',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#96a896',
            font: { family: "'DM Sans'", size: 11 },
            padding: 10
          }
        },
        title: {
          display: true,
          text: entity + ' — Año ' + yearLabel,
          color: '#e4ede4',
          font: { family: "'Syne'", size: 12 }
        }
      }
    }
  });
}
