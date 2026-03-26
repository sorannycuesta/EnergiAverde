/**
 * grafico-lineas.js — EnergiAVerde / Dashboard / graficos / grafico-lineas
 * Gráfico de líneas: Tendencia de capacidad instalada a lo largo del tiempo (Nivel 3)
 * Datos: cumulative-installed-wind-energy-capacity-gigawatts,
 *        installed-solar-PV-capacity, installed-geothermal-capacity
 *
 * Depende de: Chart.js (CDN), controlador.js (CHART_BASE, destroyChart, charts)
 */

"use strict";

function renderGraficoLineas(eData, yLabels, yFilter) {
  var get = function(col) {
    return eData.map(function(r) { return +(r[col] || 0); });
  };

  destroyChart('line');

  charts.line = new Chart(document.getElementById('chartLine'), {
    type: 'line',
    data: {
      labels: yLabels,
      datasets: [
        {
          label: 'Eólica acum. (GW)',
          data: get('cumulative-installed-wind-energy-capacity-gigawatts').filter(yFilter),
          borderColor: '#4ade80',
          backgroundColor: 'rgba(74,222,128,0.06)',
          tension: 0.4, borderWidth: 2, pointRadius: 2
        },
        {
          label: 'Solar PV (GW)',
          data: get('installed-solar-PV-capacity').filter(yFilter),
          borderColor: '#fbbf24',
          backgroundColor: 'rgba(251,191,36,0.06)',
          tension: 0.4, borderWidth: 2, pointRadius: 2
        },
        {
          label: 'Geotérmica (GW)',
          data: get('installed-geothermal-capacity').filter(yFilter),
          borderColor: '#f97316',
          backgroundColor: 'rgba(249,115,22,0.06)',
          tension: 0.4, borderWidth: 2, pointRadius: 2
        }
      ]
    },
    options: CHART_BASE
  });
}
