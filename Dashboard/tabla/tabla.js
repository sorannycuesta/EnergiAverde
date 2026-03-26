/**
 * tabla.js — EnergiAVerde / Dashboard / tabla
 * Lógica de la tabla interactiva (Nivel 2):
 *  - Renderiza las filas del dataset
 *  - Filtros por país, año y texto
 *  - Exportación a CSV filtrado
 *
 * Depende de: datos-globales.js (allData, filtered, SHOW_COLS, COL_LABELS)
 */

"use strict";

/* Rellena el select de países/regiones */
function populateEntityFilter() {
  var sel = document.getElementById('filterEntity');
  if (!sel) return;

  var entities = [];
  var seen     = {};
  allData.forEach(function(r) {
    var name = r.Entity || r.entity;
    if (name && !seen[name]) { seen[name] = true; entities.push(name); }
  });
  entities.sort();

  sel.innerHTML = '<option value="">Todos los países</option>';
  entities.forEach(function(name) {
    var o = document.createElement('option');
    o.value = name; o.textContent = name;
    sel.appendChild(o);
  });
}

/* Renderiza hasta 500 filas en la tabla */
function renderTable(data) {
  var thead = document.getElementById('tableHead');
  var tbody = document.getElementById('tableBody');
  var count = document.getElementById('tableCount');
  if (!thead || !tbody) return;

  /* Solo mostrar columnas presentes en los datos */
  var cols = SHOW_COLS.filter(function(c) {
    return data.length > 0 && c in data[0];
  });

  thead.innerHTML = '<tr>' + cols.map(function(c) {
    return '<th>' + (COL_LABELS[c] || c) + '</th>';
  }).join('') + '</tr>';

  var rows = data.slice(0, 500);
  tbody.innerHTML = rows.map(function(row) {
    return '<tr>' + cols.map(function(c) {
      var v = row[c];
      if (v === null || v === undefined || v === '') return '<td>—</td>';
      if (typeof v === 'number') {
        return '<td>' + v.toLocaleString('es-CO', { maximumFractionDigits: 2 }) + '</td>';
      }
      return '<td>' + v + '</td>';
    }).join('') + '</tr>';
  }).join('');

  if (count) {
    count.textContent =
      'Mostrando ' + Math.min(500, data.length).toLocaleString() +
      ' de ' + data.length.toLocaleString() + ' filas';
  }
}

/* Aplica filtros sobre allData y actualiza la tabla */
function applyFilters() {
  var entity = document.getElementById('filterEntity')?.value  || '';
  var yFrom  = +(document.getElementById('filterYearFrom')?.value) || 1965;
  var yTo    = +(document.getElementById('filterYearTo')?.value)   || 2022;
  var search = (document.getElementById('filterSearch')?.value || '').toLowerCase();

  filtered = allData.filter(function(r) {
    var e = r.Entity || r.entity || '';
    var y = +(r.Year  || r.year  || 0);
    if (entity && e !== entity) return false;
    if (y && (y < yFrom || y > yTo)) return false;
    if (search && !Object.values(r).some(function(v) {
      return String(v).toLowerCase().includes(search);
    })) return false;
    return true;
  });

  renderTable(filtered);
}

/* Exporta el filtrado actual a un archivo CSV */
function exportCSV() {
  if (!filtered.length) {
    alert('No hay datos para exportar. Carga el dataset primero.');
    return;
  }
  var csv = Papa.unparse(filtered);
  var a   = document.createElement('a');
  a.href  = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = 'energia_renovable_filtrado.csv';
  a.click();
  URL.revokeObjectURL(a.href);
}

/* Exponer globalmente (usadas desde atributos onchange/onclick en el HTML) */
window.applyFilters = applyFilters;
window.exportCSV    = exportCSV;
