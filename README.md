# Outland Ledger — Tracker TBC 70

Dashboard en **Next.js 16 / React 19 / TypeScript** para registrar el progreso de un paladín Retribution nivel 70, cliente **WoW 3.3.5a**, contenido **Vanilla + TBC**.

## Arranque

Necesitás Node.js 20.9+ (recomendado Node 22) y npm.

```bash
npm install
npm run dev
```

Abrí **http://localhost:3000**.

Para compilar producción:

```bash
npm run build
npm start
```

## Funcionalidades de la v1

- **Dashboard:** métricas, objetivos principales, oro para monturas y caps de hit/expertise.
- **Equipo:** 16 slots precargados con tu equipo actual, objetivos editables, fuentes y botón para equipar una mejora conseguida.
- **Mazmorras y raids:** recorridos TBC + clásicos, prioridad, contador de runs, última run, objetivos de loot y checks.
- **Monturas:** lo que ya tenés y lo que falta, compras, intentos, estado individual, formulario para agregar nuevas.
- **Objetivos:** checklist del plan, filtros y objetivos personalizados.
- **Oro y badges:** totales editables, sumar/restar, objetivo de ahorro y lista de compras.
- **Configuración:** editar estadísticas manualmente, exportar/importar JSON y resetear.

### Almacenamiento

**Limitación de verificación de esta entrega:** se revisó la sintaxis TypeScript/TSX y la integridad de los datos de ejemplo, pero no se pudo ejecutar `npm install` ni `next build` porque el entorno de construcción no tiene acceso al registro npm. El build debe verificarse después de instalar dependencias en tu PC.

Los cambios se guardan en `localStorage`, con clave `outland-ledger-v1`. **No se sincronizan entre navegadores, cuentas ni dispositivos.** Exportá regularmente tu backup JSON desde Configuración. La importación reemplaza todos los datos actuales previa confirmación.

### Datos iniciales importantes

- Hit: 121; Expertise: 0; AP: 1540; Strength: 537; Agility: 177; crit melee: 21.71%.
- Equipo: 16 slots tomados de la conversación, incluyendo **Ragesteel Breastplate** y **Hard Khorium Battlefists**.
- El bonus de set Ragesteel está marcado como **inactivo** (prueba confirmada por el usuario).
- Oro y badges comienzan en **0 como campos por completar**, porque no se conocieron sus importes exactos.
- Las monturas raciales de la Alianza, Kurenai, Sha'tari Skyguard y un draco ala abisal están precargados como conseguidos. Las colecciones completadas se muestran como **grupos** y se conserva la cantidad conocida en el campo `amount`; para las raciales no se inventó el recuento.
- Los cinco colores restantes del draco ala abisal se anotan como entradas genéricas para que se actualicen cuando se conozca el color ya obtenido.
- La lista de drops es **una lista inicial de objetivos**, no una base exhaustiva de todo el loot de cada boss. Las mejoras están sujetas a comparación de stats y a la configuración concreta del servidor.
- **Amani War Bear** aparece como no disponible por la retirada en 3.0.2 (salvo customización del servidor).

## Dónde editar los datos precargados

`src/lib/model.ts`, función `seedState()`. La plantilla se utiliza solo si no hay progreso guardado. Para volver a cargarla, Configuración → Restaurar datos iniciales.

## Stack

- Next.js App Router, React Client Component para el tracker.
- TypeScript estricto.
- CSS propio, responsive, sin Tailwind ni base de datos.
- Iconos `lucide-react`.

## Próximas mejoras sugeridas

- Base de datos opcional SQLite/PostgreSQL + autenticación para sincronización entre dispositivos.
- Inventario de loot por boss con IDs de Wowhead y reglas de recomendación por stats.
- Historial detallado de cada run, en vez de contador simple.
- Vista de gemas/enchants por slot y simulador de cambios de hit/expertise.
- Trackers de raids con bosses individuales y calendario de lockouts.

No es una aplicación oficial de Blizzard ni se conecta con el cliente o servidor de WoW.
