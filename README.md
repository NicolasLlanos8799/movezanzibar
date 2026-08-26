# Move Zanzibar — sitio oficial (v2 · informativo)

One-page en **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + lucide-react**.
Bilingüe **inglés / swahili**. Enfoque exclusivamente informativo y de impacto
social — sin CTAs de reserva ni lenguaje comercial (la única excepción es el
panel de donación por transferencia bancaria, ver abajo).

## ⚠️ Antes de publicar — dato bloqueante

El panel de donación (`src/lib/site.ts` → `DONATION.bank`) tiene **datos
bancarios de ejemplo** (`"TBD — ..."`). El sitio compila y se ve bien así a
propósito, para que puedas revisar el diseño, pero esos valores son
placeholders reales — no publiques el sitio sin reemplazarlos por los datos
de la cuenta real de Ndimu/Move Zanzibar.

## Arrancar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build       # build de producción
```

> El build necesita conexión la primera vez: `next/font/google` descarga
> Montserrat, Inter y Caveat y las auto-hospeda (cero requests a Google en
> producción).

## Identidad visual

Fiel al logotipo real (`public/brand/logo.png`): círculo naranja mandarina
con trazo manuscrito blanco y dos hojas orgánicas.

| Token | Valor | Uso |
|---|---|---|
| `brand` | `#E04F16` | Primario — botones, acentos clave, planes de donación seleccionados |
| `turquoise` | `#00AEC7` | Secundario, deliberadamente moderado — líneas finas, un ícono, nunca fondos de sección completos |
| `charcoal` | `#1A1A1A` | Texto, sección de contacto |
| `cloud` | `#F8F9FA` | Fondo alterno de sección |

Tipografía en tres niveles: **Caveat** solo como acento manuscrito de una
palabra o frase corta (eco directo del logo — nunca en títulos completos ni
párrafos), **Montserrat** para el resto de titulares y subtítulos, **Inter**
para el cuerpo de texto.

Sin sombras "neubrutalistas": bordes finos, esquinas redondeadas y sombras
suaves (`shadow-card`, `shadow-photo` en `globals.css`) — tono editorial,
no de landing de producto.

## Estructura

```
src/
  app/
    layout.tsx        Fuentes (next/font), metadata, favicon/OG del logo real
    page.tsx           Hero → Who We Are → Founder → Our Work → Donate → Contact
    globals.css        Tokens de color/tipografía/sombra
  components/
    LanguageProvider    Contexto EN/SW + persistencia + <html lang>
    Navbar               Logo real, 4 anclas (Who We Are, Our Work, Support, Contact)
    Hero                 Foto real de portada, lista para video (SITE.heroVideoUrl)
    WhoWeAre             Dos columnas: misión + foto real
    Founder              Sección dedicada a Ndimu, el fundador
    YouthCommunity       Programa Juvenil + Comunidad, cada bloque con su propia foto
    Donate               ⭐ 3 planes fijos + monto libre, panel de transferencia bancaria
    Contact               Cierre informativo: email, ubicación, redes — sin formulario
    Footer
    ui/                  Button, Kicker, Reveal
  lib/
    content.ts          ⭐ Todo el copy, EN y SW
    site.ts              ⭐ Email, redes, ubicación, video del Hero, datos de donación
public/
  images/
    hero.jpg              Acróbatas en cuerdas aéreas, Jambiani
    who-we-are.jpg         Pirámide humana / handstand
    founder.JPEG            Retrato de Ndimu
    youth.jpg     Entrenamiento en la playa (Youth Program)
    community-life.jpg     Niños escuchando en comunidad (Community / Saturday Club)
    youth-community.jpg    Sin usar actualmente — foto de reserva
    og.jpg                 Imagen Open Graph, generada del logo real
  brand/logo.png          Logo oficial
  favicon.ico, icon-*.png Generados a partir del logo real
```

## Donación (`src/components/Donate.tsx`)

Por decisión del cliente, **no hay pasarela de pago** — es transferencia
bancaria directa a la cuenta que usa el centro, sin comisión de plataforma.
El visitante elige uno de 3 planes fijos o un monto libre; al elegir, se
muestra una frase de "esto es lo que financia" (para que la persona sienta
el impacto concreto de su aporte) y luego los datos de la cuenta con botón
de copiar por campo.

- **Montos y datos bancarios** → `DONATION` en `src/lib/site.ts`. Los 3
  montos (`$5 / $30 / $500`) son ideas de punto de partida, no cifras
  auditadas — ajústalos si tienes mejor referencia de costos reales.
- **Justificación de cada plan** (qué financia) → `donate.tierJustifications`
  en `src/lib/content.ts`, en ambos idiomas. Hoy son estimaciones razonables
  basadas en lo que ya sabemos del centro (comida, clases de inglés,
  equipo, mantenimiento) — no cifras confirmadas por Ndimu. Edítalas si
  tienes datos más precisos.
- **Datos bancarios** → placeholders `"TBD — ..."`, ver advertencia arriba.

## Contenido factual — fuentes

El copy de las secciones **Founder** y **Youth Program & Community** está
basado en información real aportada por el cliente, con las siguientes
fuentes: doogreporter.com/en/move-zanzibar ·
urbanbeatcontenidos.es/de-la-calle-al-escenario-en-zanzibar ·
movezanzibar.org · instagram.com/movezanzibar · instagram.com/ndimu_ ·
TripAdvisor (Move Zanzibar Community Center, Jambiani).

Nada del texto biográfico o histórico fue inventado. Si cambia algún dato
(nombre completo del fundador, el nombre "Saturday Club", etc.), edítalo
directamente en `src/lib/content.ts` (`founder`, `youth`).

## Qué personalizar

1. **`src/lib/site.ts`** — email, redes sociales, ubicación, `url` del
   dominio, y `DONATION.bank` (ver advertencia arriba). Cuando tengas el
   show reel, agrega la ruta/URL en `heroVideoUrl` y el Hero pasa de foto a
   video automáticamente.
2. **`src/lib/content.ts`** — cualquier ajuste de copy en inglés o swahili.
3. **Fotos** — todas las de `public/images/` ya son fotos reales que subiste.
   Para reemplazarlas, usa el mismo nombre de archivo o actualiza la ruta en
   el componente correspondiente.

## Despliegue

Vercel detecta Next.js sin configuración: `git push` y listo.
