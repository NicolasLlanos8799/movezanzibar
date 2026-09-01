# Videos del show (Saturdays Show)

Clips cortos (~10 segundos) del show en vivo de los sábados.

## Cómo preparar un clip

1. Elige el fragmento más interesante del video original (máx. ~10s: un
   truco, un salto, el fuego, un momento de baile).
2. Recórtalo con ffmpeg (gratis, `brew install ffmpeg` en Mac) — por ejemplo,
   el segundo 32 al 42 de un video:

   ```
   ffmpeg -i original.mp4 -ss 00:00:32 -to 00:00:42 -vf "scale=1280:-2" -c:v libx264 -crf 26 -preset veryfast -c:a aac -b:a 96k clip-1.mp4
   ```

   `scale=1280:-2` lo limita a 1280px de ancho (de sobra para el tamaño en
   el que se muestra en la web) y mantiene el peso bajo — clave porque
   mucha gente visita el sitio desde Tanzania con internet lento.

3. Genera una miniatura (poster) del mismo clip, para que se vea una foto
   fija en vez de cargar el video antes de que alguien toque play:

   ```
   ffmpeg -i clip-1.mp4 -ss 00:00:01 -vframes 1 clip-1-poster.jpg
   ```

4. Copia `clip-1.mp4` a esta carpeta (`public/videos/show/`) y
   `clip-1-poster.jpg` a `public/images/show/`.
5. Agrega el clip a `src/lib/showMedia.ts` (ver las instrucciones dentro de
   ese archivo) — con eso ya aparece en la sección "Saturdays Show" del sitio.

Ningún video se descarga a menos que alguien toque play: en la grilla solo
se ve la miniatura (poster), liviana.
