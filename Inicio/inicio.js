/**
 * inicio.js — EnergiAVerde
 * Lógica de la sección de Inicio (Nivel 1):
 *  - Selector interactivo de las 5 fuentes renovables
 */

"use strict";

function initEnergySelector() {
  var grid   = document.getElementById('typesGrid');
  var detail = document.getElementById('typeDetail');

  if (!grid || !detail) return;

  grid.addEventListener('click', function(e) {
    var btn = e.target.closest('.type-btn');
    if (!btn) return;

    /* Desactivar todos, activar el pulsado */
    grid.querySelectorAll('.type-btn').forEach(function(b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');

    var type = btn.dataset.type;
    var info = ENERGY_TYPES[type];   /* viene de datos-globales.js */
    if (!info) return;

    document.getElementById('detailTitle').textContent = info.icon + ' ' + info.name;
    document.getElementById('detailDesc').textContent  = info.desc;
    document.getElementById('detailTags').innerHTML    = info.tags.join(' ');

    /* Reiniciar animación fadeUp */
    detail.style.animation = 'none';
    void detail.offsetWidth;
    detail.style.animation = '';
  });
}

document.addEventListener('DOMContentLoaded', initEnergySelector);
