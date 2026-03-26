/**
 * feedback.js — EnergiAVerde / Feedback
 * Interactividad de la sección de resultados:
 *  - Animación de entrada de las tarjetas al hacer scroll
 */

"use strict";

function initFeedbackAnimations() {
  var cards = document.querySelectorAll('.result-card');
  if (!cards.length) return;

  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(function(card) {
    /* Estado inicial: invisible y desplazado hacia abajo */
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    obs.observe(card);
  });
}

document.addEventListener('DOMContentLoaded', initFeedbackAnimations);
