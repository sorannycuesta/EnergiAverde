/**
 * navegador.js — EnergiAVerde
 * Lógica de la barra de navegación:
 *  - Resaltado del enlace activo al hacer scroll
 *  - Menú hamburger para móviles
 */

"use strict";

function initNav() {
  var links    = document.querySelectorAll('.nav-links a[href^="#"]');
  var sections = document.querySelectorAll('section[id]');

  /* Observador de intersección — resalta el enlace de la sección visible */
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        links.forEach(function(a) {
          a.classList.toggle('active',
            a.getAttribute('href') === '#' + e.target.id
          );
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(function(s) { obs.observe(s); });

  /* Hamburger — abrir/cerrar en móvil */
  var ham = document.getElementById('navHamburger');
  var nav = document.getElementById('navLinks');

  if (ham && nav) {
    ham.addEventListener('click', function() {
      nav.classList.toggle('open');
    });

    /* Cerrar el menú al hacer clic en un enlace */
    nav.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        nav.classList.remove('open');
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', initNav);
