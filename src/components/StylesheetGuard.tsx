"use client";

import { useEffect } from "react";

/**
 * En redes muy inestables (común en Zanzibar/Tanzania) a veces el <link>
 * del CSS que genera Next.js falla en cargar del todo — la conexión se
 * corta a mitad de la descarga — mientras el resto de la página (HTML, y a
 * veces hasta el JS) sí llega. El navegador NO reintenta solo un
 * <link rel="stylesheet"> que falló, así que el usuario se queda viendo la
 * web sin ningún estilo, para siempre, hasta que recargue manualmente.
 *
 * Este componente corre una sola vez, apenas hidrata la página: si para
 * ese momento el CSS ya falló (lo normal, dado que es un archivo chico que
 * ya tuvo tiempo de resolver una cosa u otra), reintenta la carga con un
 * query param nuevo; si el reintento también falla, como último recurso
 * recarga la página completa una sola vez (con una bandera en
 * sessionStorage para no entrar en loop si la red sigue caída).
 */
export function StylesheetGuard() {
  useEffect(() => {
    const RELOAD_KEY = "mz-css-retry-attempted";

    function isBroken(link: HTMLLinkElement) {
      try {
        return !link.sheet || link.sheet.cssRules.length === 0;
      } catch {
        // Bloqueado por CORS = otro origen; no es nuestro caso (mismo
        // origen), pero por las dudas no lo tratamos como error nuestro.
        return false;
      }
    }

    const links = Array.from(
      document.querySelectorAll('link[rel="stylesheet"]')
    ) as HTMLLinkElement[];

    const broken = links.filter(isBroken);
    if (broken.length === 0) return;

    // Ya intentamos reparar esto una vez en esta pestaña: no reintentar en
    // loop si la red sigue caída.
    if (sessionStorage.getItem(RELOAD_KEY)) return;
    sessionStorage.setItem(RELOAD_KEY, "1");

    broken.forEach((link) => {
      link.href = link.href.split("?")[0] + `?retry=${Date.now()}`;
    });

    const timer = window.setTimeout(() => {
      if (links.some(isBroken)) window.location.reload();
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
