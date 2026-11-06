# Lista de estudiantes

Aplicación SPA hecha con React 19, TypeScript y Vite que muestra una lista de estudiantes con su carrera.

## Requisitos

- Node.js `^20.19.0` o `>=22.12.0` (requisito de Vite 8)
- [pnpm](https://pnpm.io/)

## Scripts

| Comando        | Descripción                                   |
| -------------- | --------------------------------------------- |
| `pnpm dev`     | Servidor de desarrollo                        |
| `pnpm build`   | Verificación de tipos (`tsc -b`) y build      |
| `pnpm lint`    | ESLint                                        |
| `pnpm preview` | Sirve el build de producción                  |

## Estructura

```
src/
├── components/   Componentes reutilizables (StudentForm, StudentItem)
├── constants/    Datos y constantes (STUDENTS)
├── styles/       Estilos globales
├── types/        Tipos de TypeScript
├── App.tsx       Composición de la página
└── main.tsx      Punto de entrada
```

## Importaciones absolutas

Todos los imports internos usan el alias `@/` (equivale a `src/`), declarado **una sola vez** en `tsconfig.app.json` (`paths`). Vite lo resuelve con `resolve.tsconfigPaths`, y ESLint rechaza las rutas relativas (`./`, `../`) mediante `no-restricted-imports`.

```ts
import StudentItem from "@/components/StudentItem";
```

> Nota: `typescript` está fijado a `~6.0.3` porque `typescript-eslint` aún no soporta TypeScript 7.x.
