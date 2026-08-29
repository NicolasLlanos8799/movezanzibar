/**
 * El equipo usa fotos con extensión en mayúsculas (.JPEG, .PNG) tal como
 * salen de la cámara — regla del proyecto: nunca renombrar/convertir la
 * extensión de una imagen existente. Next.js solo declara el tipo para
 * imports estáticos en minúsculas (*.jpg, *.png, ver
 * node_modules/next/image-types/global.d.ts), así que agregamos acá las
 * variantes en mayúsculas que realmente usamos, para poder importar esas
 * imágenes de forma estática (necesario para el placeholder="blur").
 */
declare module "*.JPEG" {
  const content: import("next/dist/shared/lib/image-external").StaticImageData;
  export default content;
}

declare module "*.PNG" {
  const content: import("next/dist/shared/lib/image-external").StaticImageData;
  export default content;
}
