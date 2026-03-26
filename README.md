# 🌿 EnergiAVerde — Transición Energética Justa

> Aplicativo web interactivo para explorar datos globales de energías renovables (1965–2022).  
> Proyecto individual — Bootcamp de Programación MinTIC Colombia 2026

---

## 🎯 Descripción

**EnergiAVerde** es una aplicación web de una sola página (SPA) que permite visualizar, filtrar
y analizar datos históricos sobre la producción y el consumo de energías renovables a nivel mundial.
El proyecto se enmarca en la línea de investigación de **Transición Energética Justa** del bootcamp.

---

## 🗂️ Estructura del proyecto

```
EnergiAVerde/
│
├── index.html                  ← Página principal (une todos los módulos)
├── estilos-base.css            ← Variables, reset y componentes compartidos
│
├── .vscode/
│   └── settings.json           ← Configuración del editor
│
├── data/
│   ├── datos-globales.js       ← Constantes, estado global y datos demo
│   └── renewable_energy_demo.csv
│
├── Navegador/
│   ├── navegador.css           ← Estilos de la barra de navegación
│   └── navegador.js            ← Nav activa + menú hamburger
│
├── Inicio/
│   ├── inicio.css              ← Estilos de portada, introducción y sección solar
│   └── inicio.js               ← Selector interactivo de 5 fuentes renovables
│
├── Calculadora/
│   ├── calculadora.html        ← Fragmento HTML de la calculadora
│   ├── calculadora.css         ← Estilos del formulario y anillo SVG
│   └── calculadora.js          ← Lógica de estimación de % renovable
│
├── Dashboard/
│   ├── dashboard.html          ← Fragmento HTML del dashboard
│   ├── dashboard.css           ← Estilos del layout y chart-cards
│   ├── controlador.js          ← Orquestador: CHART_BASE y updateDashboard()
│   │
│   ├── documentacion/
│   │   └── carga-documentos.js ← Carga CSV (drag & drop, demo inline)
│   │
│   ├── tabla/
│   │   ├── tabla.html          ← Fragmento HTML de la tabla
│   │   ├── tabla.css           ← Estilos de zona de carga y tabla
│   │   └── tabla.js            ← Render, filtros y exportación CSV
│   │
│   └── graficos/
│       ├── grafico-barras/
│       │   ├── grafico-barras.html
│       │   ├── grafico-barras.css
│       │   └── grafico-barras.js   ← renderGraficoBarras()
│       │
│       ├── grafico-torta/
│       │   ├── grafico-torta.html
│       │   ├── grafico-torta.css
│       │   └── grafico-torta.js    ← renderGraficoTorta()
│       │
│       ├── grafico-lineas/
│       │   ├── grafico-lineas.html
│       │   ├── grafico-lineas.css
│       │   └── grafico-lineas.js   ← renderGraficoLineas()
│       │
│       └── grafico-area/
│           ├── grafico-area.html
│           ├── grafico-area.css
│           └── grafico-area.js     ← renderGraficoArea()
│
└── Feedback/
    ├── feedback.html           ← Fragmento HTML de resultados esperados
    ├── feedback.css            ← Estilos de tarjetas de resultados y CTA
    └── feedback.js             ← Animaciones de entrada al hacer scroll
```

---

## ✅ Cumplimiento de niveles

| Nivel | Requerimiento | Archivo principal | Estado |
|-------|--------------|-------------------|--------|
| 1 | Página informativa sobre energía solar | `Inicio/inicio.css` + `inicio.js` | ✅ |
| 1 | Selector interactivo de 5 fuentes | `Inicio/inicio.js` | ✅ |
| 2 | Carga y visualización tabular del CSV | `Dashboard/tabla/` | ✅ |
| 2 | Drag & drop para CSV externo | `Dashboard/documentacion/carga-documentos.js` | ✅ |
| 2 | Filtros por país, año y búsqueda | `Dashboard/tabla/tabla.js` | ✅ |
| 2 | Exportación CSV filtrado | `Dashboard/tabla/tabla.js` | ✅ |
| 2 | Formulario de estimación de % renovable | `Calculadora/` | ✅ |
| 3 | Gráfico de barras: producción por fuente | `Dashboard/graficos/grafico-barras/` | ✅ |
| 3 | Gráfico de torta: participación en mix | `Dashboard/graficos/grafico-torta/` | ✅ |
| 3 | Gráfico de líneas: capacidad instalada | `Dashboard/graficos/grafico-lineas/` | ✅ |
| 3 | Gráfico de área: renovable vs convencional | `Dashboard/graficos/grafico-area/` | ✅ |

---

## 🛠️ Tecnologías utilizadas

- **HTML5** — Estructura semántica
- **CSS3** — Estilización, animaciones, diseño responsivo
- **JavaScript (ES6+)** — Lógica, interactividad, cálculos
- **[PapaParse](https://www.papaparse.com/)** — Parseo del CSV
- **[Chart.js](https://www.chartjs.org/)** — Gráficas interactivas

---

## 📦 Dataset

**Renewable Energy World Wide 1965–2022**  
Fuente: [Kaggle — belayethossainds](https://www.kaggle.com/datasets/belayethossainds/renewable-energy-world-wide-19652022)

---

## 🚀 Cómo usar

### Opción 1 — Abrir localmente con VS Code + Live Server
1. Abre la carpeta `EnergiAVerde/` en VS Code
2. Instala la extensión **Live Server**
3. Clic derecho en `index.html` → **Open with Live Server**
4. Usa "Datos de demostración" o carga el CSV de Kaggle

### Opción 2 — Ver en GitHub Pages
1. Sube la carpeta a GitHub
2. Ve a **Settings → Pages → Branch: main → Folder: / (root)**
3. GitHub generará automáticamente la URL pública

---

## 📬 Entrega

- **Plataforma:** Moodle — Bootcamp MinTIC Colombia
- **Formato:** Repositorio GitHub
- **Año:** 2026
