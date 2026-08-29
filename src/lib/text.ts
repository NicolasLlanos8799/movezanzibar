/**
 * Detecta un rango horario tipo "4:30–6 PM" o "10:30 mchana–12 jioni" dentro
 * de un texto y lo separa del resto, para poder envolver solo esa parte en
 * un <span> con whitespace-nowrap — así el horario nunca se corta en dos
 * líneas en celular, aunque el resto de la frase sí pueda envolver.
 */
const TIME_RANGE_PATTERN = /\d{1,2}(?::\d{2})?\s*[A-Za-zÀ-ÿ]*\s*[–-]\s*\d{1,2}(?::\d{2})?\s*[A-Za-zÀ-ÿ]*/;

export function splitTimeRange(text: string): { before: string; time: string; after: string } {
  const match = TIME_RANGE_PATTERN.exec(text);
  if (!match) return { before: text, time: "", after: "" };
  return {
    before: text.slice(0, match.index),
    time: match[0],
    after: text.slice(match.index + match[0].length),
  };
}
