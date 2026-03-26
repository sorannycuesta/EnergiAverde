/**
 * grafico-area.js — EnergiAVerde / Dashboard / graficos / grafico-area
 * Gráfico de área: Consumo renovable vs convencional a lo largo del tiempo (Nivel 3)
 * Datos: modern-renewable-energy-consumption (renovable)
 *        estimación convencional = renovable × 3.2 (proporción histórica)
 *
 * Depende de: Chart.js (CDN), controlador.js (CHART_BASE, destroyChart, charts)
 */

"use strict";

function renderGraficoArea(eData, yLabels, yFilter) {
  var get = function(col) {
    return eData.map(function(r) { return +(r[col] || 0); });
  };

  var renewVals = get('modern-renewable-energy-consumption').filter(yFilter);
  /* Estimación de energía convencional: proporción histórica aproximada */
  var convVals  = renewVals.map(function(v) { return +(v * 3.2).toFixed(2); });

  destroyChart('area');

  charts.area = new Chart(document.getElementById('chartArea'), {
    type: 'line',
    data: {
      labels: yLabels,
      datasets: [
        {
          label: 'Energía renovable moderna (EJ)',
          data: renewVals,
          borderColor: '#4ade80',
          backgroundColor: 'rgba(74,222,128,0.18)',
          fill: true, tension: 0.4, borderWidth: 2, pointRadius: 1
        },
        {
          label: 'Energía convencional estimada (EJ)',
          data: convVals,
          borderColor: '#657065',
          backgroundColor: 'rgba(101,112,101,0.08)',
          fill: true, tension: 0.4, borderWidth: 2, pointRadius: 1,
          borderDash: [5, 4]
        }
      ]
    },
    options: CHART_BASE
  });
}
