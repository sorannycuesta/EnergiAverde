/**
 * carga-documentos.js — EnergiAVerde / Dashboard / documentacion
 * Lógica de carga del dataset CSV (Nivel 2):
 *  - Carga por archivo (input + drag & drop)
 *  - Datos de demostración inline (sin servidor)
 *  - Dispara la tabla y el dashboard al cargar
 *
 * Depende de: datos-globales.js, tabla.js, controlador.js
 */

"use strict";

function initCSVLoader() {
  var zone      = document.getElementById('uploadZone');
  var fileInput = document.getElementById('csvFile');
  var demoBtn   = document.getElementById('demoDataBtn');

  if (!zone) return;

  /* Clic en la zona → abrir selector de archivos */
  zone.addEventListener('click', function() {
    if (fileInput) fileInput.click();
  });

  /* Selección desde el input file */
  if (fileInput) {
    fileInput.addEventListener('change', function(e) {
      var file = e.target.files[0];
      if (file) parseCSVFile(file);
    });
  }

  /* Drag & Drop */
  zone.addEventListener('dragover', function(e) {
    e.preventDefault();
    zone.classList.add('drag-over');
  });
  zone.addEventListener('dragleave', function() {
    zone.classList.remove('drag-over');
  });
  zone.addEventListener('drop', function(e) {
    e.preventDefault();
    zone.classList.remove('drag-over');
    var file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) parseCSVFile(file);
  });

  /* Botón "Usar datos de demostración" */
  if (demoBtn) {
    demoBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      loadDemoData();
    });
  }
}

/* Parsea un archivo CSV real subido por el usuario */
function parseCSVFile(file) {
  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    complete: function(res) {
      if (res.data && res.data.length > 0) {
        allData = res.data;         /* variable global en datos-globales.js */
        onDataLoaded();
      } else {
        alert('El archivo CSV está vacío o no tiene el formato correcto.');
      }
    },
    error: function(err) {
      alert('Error al leer el CSV: ' + err.message);
    }
  });
}

/* Carga datos de demostración generados en memoria (funciona offline) */
function loadDemoData() {
  allData = generateInlineDemo();  /* función en datos-globales.js */
  onDataLoaded();
}

/* Se ejecuta después de cargar cualquier fuente de datos */
function onDataLoaded() {
  filtered = allData.slice();      /* copia del arreglo global */

  /* Tabla */
  if (typeof populateEntityFilter === 'function') populateEntityFilter();
  if (typeof renderTable          === 'function') renderTable(filtered);

  /* Mostrar tabla, ocultar zona de carga */
  var tableSection = document.getElementById('tableSection');
  var uploadZone   = document.getElementById('uploadZone');
  var datosLoaded  = document.getElementById('datosLoaded');

  if (tableSection) tableSection.style.display = 'block';
  if (uploadZone)   { uploadZone.style.display = 'none'; uploadZone.classList.add('loaded'); }
  if (datosLoaded)  datosLoaded.style.display  = 'block';

  /* Dashboard */
  if (typeof initDashboardEntities === 'function') initDashboardEntities();
  if (typeof updateDashboard       === 'function') updateDashboard();
}

/* Exponer globalmente */
window.loadDemoData = loadDemoData;

document.addEventListener('DOMContentLoaded', function() {
  initCSVLoader();
  /* Pre-cargar datos demo en el dashboard desde el inicio */
  allData = generateInlineDemo();
  if (typeof initDashboardEntities === 'function') initDashboardEntities();
  if (typeof updateDashboard       === 'function') updateDashboard();
});
