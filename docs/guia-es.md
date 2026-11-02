> Guía original de la plantilla. Las rutas a `scripts/new-project.sh` y `../../scripts/lighthouse.sh` son del repositorio interno de Revolution505.

# contable-astro — Despacho contable (Astro 5 + Tailwind 4)

Sitio de 1 página para contadores y despachos fiscales: hero para PyMEs y personas físicas, servicios
(contabilidad mensual, declaraciones SAT, nómina/IMSS, constitución de empresas, auditoría/regularización,
opinión de cumplimiento), "a quién atendemos" (RESICO, actividad empresarial, personas morales), planes con
precio "desde" (`TODO-CLIENTE` → se muestra "A cotizar"), calendario de obligaciones fiscales **de referencia**
(periodicidades, sin fechas que caduquen, con aviso), proceso de alta en 4 pasos, testimonios, FAQ (schema
FAQPage), ubicación (mapa click-to-load), formulario PHP (régimen fiscal, tipo de servicio, nº de empleados)
con honeypot + tiempo mínimo + rate limit, WhatsApp flotante y por plan, GA4 con eventos, JSON-LD
`AccountingService`, sitemap, robots y 404 real.

Contenido de ejemplo **ficticio** (Balance Fiscal Querétaro). Los testimonios están marcados `example: true`
en `site.ts` y, mientras exista alguno, la página muestra "Testimonios de ejemplo (sitio demo)".

Paleta: verde petróleo (`#0f5c56` / `#0f766e`) + dorado decorativo; textos AA verificados por Lighthouse.

Medido (26-oct-2026, mobile, Lighthouse 12, build servido con PHP local):
**Performance 99 · Accessibility 100 · Best Practices 100 · SEO 100**.
Playwright: **20/20** (desktop 1280 + mobile 360). Capturas en `shots/`.

## Convertir en sitio de cliente en < 1 día
1. `bash scripts/new-project.sh contable-astro <slug>` (desde la raíz de r505-studio).
2. Edita **solo** `src/config/site.ts` y busca `TODO-CLIENTE`:
   - Identidad: `name`, `legalName`, `url`, `title`, `description`, `themeColor`.
   - Contacto: teléfono, WhatsApp (solo dígitos), correo, dirección, `geo`, `mapQuery`, `hours`, `areaServed`.
   - `hero.stats`: solo cifras que el cliente pueda sostener (años, clientes). Si no hay dato, quita la tarjeta.
   - `services` / `audiences`: quita los que el despacho no ofrezca (íconos disponibles en el tipo `IconName`).
   - `plans[].price`: pon el precio "desde" confirmado por el cliente (p. ej. `'$1,200'`); se muestra
     "Desde $1,200 al mes + IVA". Mientras diga `TODO-CLIENTE` se muestra "A cotizar".
   - `obligations`: revisa con el contador que el texto general aplique a su cartera. **No agregues fechas
     exactas** salvo que el cliente se comprometa a mantenerlas; deja `obligationsNote`.
   - `testimonials`: reemplaza por testimonios reales **con permiso escrito** y pon `example: false`
     (el aviso de "ejemplo" desaparece solo). Si no hay, elimina la sección en `src/pages/index.astro`.
   - `faq`, `form.regimenOptions`, `form.serviceOptions`, `form.employeeOptions`.
3. Colores: variables `--color-brand-*` / `--color-accent-*` en `src/styles/global.css` (verifica AA) y los
   del degradado en `scripts/og.mjs`. Favicon en `public/favicon.svg`.
4. Imagen social: `npm run og` (genera `public/og.png` desde site.ts) o reemplázala por una de 1200×630.
5. Fotos (opcional, p. ej. equipo u oficina): en `src/assets/` y con `<Image>` de `astro:assets`.
6. `.env.local`: `PUBLIC_GA4_ID`, opcional `PUBLIC_ADS_ID` + `PUBLIC_ADS_LEAD_LABEL`.
7. Calidad: `npm run check && npm run build && npm test`, Lighthouse (abajo), revisa `shots/`.

## Comandos
| Comando | Qué hace |
|---|---|
| `npm run dev` | Desarrollo en http://localhost:4321 (el formulario PHP no corre aquí) |
| `npm run check` | TypeScript estricto + diagnósticos Astro |
| `npm run build` | Build estático a `dist/` |
| `npm run preview:php` | Sirve `dist/` con PHP como Hostinger (formulario + 404 real) en :8792 |
| `npm test` | Playwright smoke (desktop 1280 + mobile 360) + capturas en `shots/` |
| `bash ../../scripts/lighthouse.sh http://127.0.0.1:8792/` | Lighthouse mobile → `reports/` |

Para probar el formulario sin enviar correo: `LEAD_DRY_RUN=1 npm run preview:php`.

## Formulario
Campos: nombre, teléfono, correo (opcional), servicio, régimen fiscal, nº de empleados (los tres selects son
obligatorios) y mensaje. `public/api/lead.php` incluye `regimen` y `employees` en el correo vía
`$extraFields`; agrega ahí cualquier campo nuevo. El aviso bajo el botón pide no enviar contraseñas ni e.firma.

## Eventos GA4
| Evento | Cuándo | Parámetros |
|---|---|---|
| `generate_lead` | Formulario enviado con éxito | `service`, `regimen`, `employees`, `source` |
| `whatsapp_click` | Click en cualquier `https://wa.me/…` (incluye botones de cada plan) | `location` (sección: `hero`, `plans`, `cta`, `float`…) |
| `phone_click` | Click en `tel:` | `location` |
| `email_click` | Click en `mailto:` | `location` |

**Verificar:** GA4 → Admin → DebugView, abre el sitio con la extensión "Google Analytics Debugger" y haz
cada acción. Luego marca `generate_lead` (y opcional `whatsapp_click`) como **evento clave**.

---

# HANDOFF (copiar a `clients/<slug>/HANDOFF.md` y completar)

## Cómo editar contenido
Todo el texto está en `src/config/site.ts`. Cambiar → `npm run build` → subir `dist/`.
Precios: `plans[].price`. Calendario: `obligations` (texto general, sin fechas exactas).

## Credenciales que crea el cliente (no se guardan aquí)
- Acceso al hosting/panel (Hostinger hPanel) y al dominio.
- Buzón `no-reply@<dominio>` para enviar leads (mismo dominio → SPF/DKIM correctos).
- Propiedad GA4 (el cliente es dueño; nos da acceso de Editor).

## Deploy (Hostinger)
1. `npm run build`.
2. Subir el **contenido** de `dist/` a `public_html/` (incluye `.htaccess` y `api/lead.php`).
3. Copiar `lead-config.example.php` → `lead-config.php`, llenar `to`/`from` y subirlo al directorio
   **padre** de `public_html/` (no accesible por web).
4. Probar: enviar formulario real, abrir `/no-existe` (debe dar 404), `/sitemap-index.xml`, `/robots.txt`.
5. Activar SSL y descomentar el bloque "Forzar HTTPS" en `.htaccess`.

## Responsabilidad del contenido fiscal
El despacho valida los textos de servicios, regímenes y calendario. El sitio no da asesoría fiscal; el
calendario es de referencia y remite al calendario oficial del SAT.

## Backups
Código en git (repo del proyecto). El sitio es estático: el respaldo es el propio `dist/` + repo.

## Mantenimiento mensual R505 (upsell)
Hosting administrado + SSL + monitoreo de disponibilidad + cambios de contenido menores (p. ej. ajustes de
precios o FAQ en temporada de declaración anual) + reporte mensual de GA4 (leads, clics a WhatsApp).
Precio: ver `docs/pricing.md` (lo define Christian).
