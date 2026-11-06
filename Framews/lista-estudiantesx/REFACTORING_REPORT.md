# REFACTORING_REPORT

Proyecto: `lista-estudiantesx` (carpeta `lista-1`) · Fecha: 2026-11-06

## 9.1 Resumen general

**Estado inicial.** Aplicación mínima (3 componentes reales) generada con la plantilla de Vite. Al ejecutar las validaciones *antes* de tocar nada:

- `pnpm build` **fallaba**: `TS7016` (el `.jsx` importado desde TSX no tenía tipos).
- `pnpm lint` **fallaba** por completo: `typescript-eslint does not support TS 7.0`.
- `pnpm audit`: 1 vulnerabilidad moderada (transitiva, dev).
- `index.html` estaba **corrupto**: `<rp(v0.2026.10.21.08.25.stable_02)!doctype html>` y su cierre equivalente.
- En móvil (375 px) había **desbordamiento horizontal** (scrollWidth 693 px).

**Tecnologías detectadas.** React 19.3.1 · Vite 8.3.5 · `@vitejs/plugin-react` · TypeScript 7.0.2 (→ 6.0.3) · ESLint 10 + typescript-eslint 8.72 · pnpm 10 (lockfile v9) · Node 22 · CSS plano. SPA con CSR; sin router, sin gestor de estado, sin capa HTTP, sin variables de entorno, sin tests.

**Objetivos.** Corregir errores de build/lint, arquitectura limpia, alias absolutos, eliminar código muerto, mejorar a11y/SEO/responsive y documentar, sin cambiar la funcionalidad existente.

**Resultado.** `pnpm build` ✅ y `pnpm lint` ✅ (exit 0). Alias `@/` configurado y verificado en TypeScript, Vite (build y dev) y ESLint. Funcionalidad y aspecto de escritorio preservados (verificado por captura).

## 9.2 Problemas identificados

| Área | Problema |
|---|---|
| Errores | Build roto (TS7016); lint roto (TS 7 vs typescript-eslint); `index.html` con doctype corrupto |
| Malas prácticas | Mezcla `.jsx`/`.tsx` (componente sin tipos, prop `student` implícita `any`); array de datos recreado en cada render dentro de `App`; variable `Students` en PascalCase; `document.getElementById("root")!` (non-null assertion); import comentado; extensión `.tsx`/`.jsx` en imports; `<>` innecesarios; `<br />` usados como maquetación |
| Arquitectura | Carpetas `Components/common` y `CSS` en PascalCase/mayúsculas; datos y tipos mezclados en la vista; sin separación de componentes (formulario dentro de `App`) |
| Código muerto | `base.tsx`, `App.css`, `CSS/index.css` (su import ya estaba comentado), `hero.png`, `react.svg`, `vite.svg`, `public/icons.svg`: demo de Vite sin ningún import desde la app (verificado con `grep`) |
| Importaciones/config | Sin alias; imports relativos; `strict` no declarado explícitamente; ESLint aplicaba globales de navegador a `vite.config.ts` |
| Rendimiento | Sin problemas relevantes (bundle ≈ 220 kB, dominado por React). Ver 9.6 |
| Accesibilidad | `lang="en"` con contenido en español; botones "Eliminar" idénticos sin contexto; `ul` con `list-style:none` pierde semántica en Safari/VoiceOver |
| SEO | `<title>` genérico (`lista-estudiantesx`); sin meta description |
| Responsive | Formulario desbordaba en móvil (693 px de scroll en viewport de 375 px) |
| Seguridad | `.gitignore` no excluía `.env*`; `pnpm audit`: minimatch (moderada, transitiva de eslint, dev) |
| Contenido | Erratas visibles: "Estuduantes", "Comericio", "Ingenieria"; identificador `carrer` |

## 9.3 Reorganización de carpetas

**Antes**
```
src/
├── App.tsx  base.tsx  App.css  main.tsx
├── assets/ (hero.png, react.svg, vite.svg)
├── Components/common/Estudiante.jsx
└── CSS/ (index.css, styles.css)
public/ (favicon.svg, icons.svg)
```
**Después**
```
src/
├── App.tsx
├── main.tsx
├── components/ (StudentForm.tsx, StudentItem.tsx)
├── constants/  (students.ts)
├── styles/     (global.css)
└── types/      (student.ts)
public/ (favicon.svg)
```
**Justificación.** Carpetas en minúscula (convención habitual y compatible con sistemas de archivos sensibles a mayúsculas), separadas por responsabilidad; se mantiene `App.tsx`/`main.tsx` en la raíz de `src`, como en cualquier SPA de Vite. No se crearon `pages`, `hooks`, `services`, `routes`, `utils`, `lib` ni `config`: no hay contenido para ellos y serían capas sin valor.

## 9.4 Importaciones y alias

- **Alias implementado:** `@/*` → `src/*` (un único alias; cubre `components`, `constants`, `types`, `styles`, etc. sin crear alias por carpeta, lo que evita mantener N entradas en varios archivos).
- **Fuente única de verdad:** `tsconfig.app.json` (`paths`). Vite lo consume con `resolve.tsconfigPaths: true` → sin duplicar configuración.
- **ESLint:** no necesita resolver alias (no usa `eslint-plugin-import`); en su lugar se añadió `no-restricted-imports` que **prohíbe `./*` y `../*`** en `src/`, haciendo cumplir la regla.
- **Archivos de configuración modificados:** `tsconfig.app.json`, `vite.config.ts`, `eslint.config.js`.
- **Imports migrados:** los 3 imports internos de `App.tsx` y los 2 de `main.tsx`; los nuevos archivos nacen con `@/`. Se quitaron las extensiones `.tsx`/`.jsx`.
- **Exports:** componentes con `export default` (convención existente, coherente en los 3); datos y tipos con exports con nombre. Los imports de tipos usan `import type` (exigido por `verbatimModuleSyntax`).
- **Excepciones justificadas:** ninguna dentro de `src/`. Referencias que quedan en `index.html` (`/src/main.tsx`, `/favicon.svg`) son rutas absolutas desde la raíz de Vite, no relativas.
- **Verificación:** `grep` de imports relativos en `src` → 0 resultados; prueba negativa: un import `../constants/students` es rechazado por ESLint; un `@/nope/missing` es rechazado por `tsc` (TS2307); el build de producción y el dev server (HTTP 200 en `/` y `/src/main.tsx`, imports resueltos a rutas reales) resuelven los alias. *No existe* Jest/Vitest en el proyecto, por lo que no hubo nada que configurar allí.

## 9.5 Cambios realizados

**Creados:** `src/types/student.ts`, `src/constants/students.ts`, `src/components/StudentForm.tsx`.
**Movidos/renombrados:** `src/Components/common/Estudiante.jsx` → `src/components/StudentItem.tsx` (convertido a TS); `src/CSS/styles.css` → `src/styles/global.css`.
**Modificados:** `src/App.tsx`, `src/main.tsx`, `index.html`, `tsconfig.json`, `tsconfig.app.json`, `vite.config.ts`, `eslint.config.js`, `package.json`, `pnpm-lock.yaml`, `.gitignore`, `README.md`, `src/styles/global.css` (contenido).
**Eliminados:** `src/base.tsx`, `src/App.css`, `src/CSS/index.css`, `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`, `public/icons.svg` (+ carpetas vacías `Components/`, `CSS/`, `assets/`).
**Funcionalidades afectadas:** ninguna. Cambios visibles de contenido: las 3 erratas corregidas; en móvil el formulario pasa a columna.

## 9.6 Mejoras técnicas

- **Malas prácticas:** componente tipado (`StudentItemProps`, `Student`); datos fuera del render como `readonly Student[]` constante de módulo; eliminados fragmentos y `<div>` envoltorios innecesarios; `{"--"}` literal → texto; `#root` comprobado explícitamente en vez de `!`; `strict: true` explícito en `tsconfig.app.json`.
- **Arquitectura:** `StudentForm` extraído de `App`; tipos y datos separados de la vista.
- **Rendimiento:** no se añadió `memo`/`useMemo`/`lazy`: con 3 elementos estáticos no aportarían beneficio medible y restarían legibilidad. Al mover los datos fuera del componente se evita recrear el array en cada render. Tamaño de build: JS 220.73 → 220.64 kB, CSS 0.54 → 0.64 kB (diferencia irrelevante; no se midió Lighthouse ni Core Web Vitals, por lo que no se declara ninguna puntuación). No hay imágenes ni fuentes propias que optimizar tras retirar los assets de demo.
- **Seguridad:** `.gitignore` excluye `.env`, `.env.*` (salvo `.env.example`). Revisión manual: no hay secretos, ni variables `VITE_*`, ni `dangerouslySetInnerHTML`, ni peticiones externas, ni almacenamiento de datos; no se encontró superficie XSS/CSRF.
- **SEO:** `<title>` descriptivo, `meta description`, `lang="es"`, un solo `h1` con `h2` jerárquico, `main` semántico.
- **Accesibilidad:** `lang="es"`; `aria-label="Eliminar a {nombre}"` en cada botón (el texto visible no cambia); `role="list"` en la lista; labels ya asociadas con `htmlFor` (se mantienen); se retiraron los `<br />` que generaban nodos vacíos en el formulario.
- **Responsive:** `@media (max-width: 600px)` convierte el formulario en columna. Medido en Chromium (Playwright): scrollWidth/clientWidth = **693/375 → 375/375**. En escritorio (1280 px) el diseño es el mismo (el `gap` pasó de 10 px a 20 px para compensar los `<br />` eliminados; comparado visualmente con captura).
- **Mantenibilidad:** README específico del proyecto; regla de lint que protege el uso de alias.

## 9.7 Dependencias

| Cambio | Detalle | Justificación |
|---|---|---|
| Modificada | `typescript` `~7.0.2` → `~6.0.3` | Única forma verificada de que `eslint` funcione: `typescript-eslint` 8.72.1 (la última disponible) declara `typescript >=4.8.4 <6.1.0`. Es un **downgrade deliberado**; puede revertirse cuando typescript-eslint soporte TS ≥ 7.1 |
| Agregadas / eliminadas | Ninguna | — |

El resto de versiones no se tocó. El lockfile se regeneró solo para reflejar el cambio de TypeScript (`pnpm install --frozen-lockfile` posterior: "Already up to date").

## 9.8 Pruebas y validaciones

| Comando | Antes | Después |
|---|---|---|
| `pnpm install --frozen-lockfile` | OK | OK |
| `pnpm build` (`tsc -b && vite build`) | ❌ TS7016 | ✅ exit 0 (19 módulos) |
| `pnpm lint` | ❌ crash typescript-eslint/TS 7 | ✅ exit 0, 0 avisos |
| `pnpm audit` | 1 moderada | 1 moderada (sin cambio, ver 9.9) |
| Prueba negativa lint (import relativo) | — | ✅ rechazado por `no-restricted-imports` |
| Prueba negativa tsc (alias inexistente) | — | ✅ TS2307 |
| Dev server (`vite`) + `curl` | — | ✅ `/` → 200, `/src/main.tsx` → 200, alias resueltos |
| Render en Chromium (Playwright), 1280 px y 375 px | — | ✅ sin errores ni avisos de consola; mismo texto salvo erratas; sin desbordamiento |

**Validaciones no ejecutadas (no existen en el proyecto):** tests unitarios/integración/E2E, Prettier, hidratación (no hay SSR), Lighthouse/Core Web Vitals.

## 9.9 Problemas pendientes

1. **"Agregar" y "Eliminar" no hacen nada** (ya era así). Además, "Agregar" es un `submit` nativo y recarga la página. No se implementó para respetar "no inventar funcionalidades". Para resolverlo hace falta decidir el comportamiento: pasar `STUDENTS` a estado (`useState`), manejar `onSubmit` con `preventDefault`, validar campos vacíos y filtrar al eliminar.
2. **Vulnerabilidad moderada de `minimatch`** (GHSA-g3hv-75wg-m249, vía `eslint`, solo dev, no llega al bundle). Se corrige cuando ESLint actualice su dependencia; forzar un `override` a minimatch ≥ 11 cambia una major que ESLint no declara, así que no se hizo.
3. **Contraste de los bordes de `input` (`#ccc`)** queda por debajo de 3:1 (WCAG 1.4.11). Corregirlo cambia el diseño visual; se dejó sin tocar.
4. **SEO avanzado no aplicado:** Open Graph, Twitter Cards, canonical, `sitemap.xml`, `robots.txt` requieren la URL pública de despliegue, que no se conoce; y es una SPA de una sola vista.
5. Los estilos globales usan selectores de elemento (`input`, `button`, `li`…) que afectarán a cualquier componente futuro; migrar a CSS Modules sería lo recomendable al crecer.
6. Sin tests: se recomienda añadir Vitest + Testing Library cuando exista lógica (agregar/eliminar).

## 9.10 Justificación técnica (cambios relevantes)

| Qué | Por qué / problema | Beneficio |
|---|---|---|
| `Estudiante.jsx` → `StudentItem.tsx` tipado | Rompía el build (TS7016) y su prop era `any` implícito | Build funcional y tipado de extremo a extremo |
| `typescript` → 6.0.3 | typescript-eslint no soporta TS 7 → lint inutilizable | Lint operativo |
| Reparar `index.html` | Doctype corrupto; HTML inválido (los navegadores lo toleran, pero el modo de renderizado no se midió) | HTML válido, `lang="es"`, title y description correctos |
| Alias `@/` en tsconfig + `resolve.tsconfigPaths` + regla ESLint | Imports relativos y sin alias | Imports estables al mover archivos; configuración sin duplicar; cumplimiento automático |
| Eliminar demo de Vite | ~7 archivos sin uso (assets y CSS) | Menos peso y confusión |
| Datos a `constants/` + tipo `Student` | Array recreado en cada render, mezclado con la vista | Separación de responsabilidades |
| `StudentForm` extraído | `App` mezclaba formulario, lista y datos | Componentes pequeños y reutilizables |
| Media query del formulario | Desbordamiento horizontal en móvil | Usable en 375 px |
| `aria-label`, `role="list"`, `lang="es"` | Accesibilidad | Lectores de pantalla distinguen cada botón y la lista |
| `.gitignore` con `.env*` | Riesgo de subir secretos a futuro | Prevención |
| Corregir erratas (`Estudiantes`, `Comercio`, `Ingeniería`, `career`) | Errores de contenido/nomenclatura | Contenido correcto; nomenclatura consistente |
