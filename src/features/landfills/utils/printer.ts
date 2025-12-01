// src/features/landfills/utils/printer.ts

/**
 * Imprime un string HTML utilizando un iframe invisible.
 * Esto permite una impresión "pixel-perfect" vectorial aislada de los estilos de la APP.
 */
export function printHtmlInIframe(htmlContent: string): void {
  // 1. Crear un iframe oculto
  const iframe = document.createElement("iframe");

  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";

  document.body.appendChild(iframe);

  // 2. Escribir el contenido en el documento del iframe
  const doc = iframe.contentWindow?.document;
  if (!doc) {
    console.error("No se pudo acceder al documento del iframe de impresión");
    document.body.removeChild(iframe);
    return;
  }

  doc.open();
  doc.write(htmlContent);
  doc.close();

  // 3. Esperar a que cargue (imágenes, estilos) y lanzar impresión
  iframe.onload = () => {
    setTimeout(() => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch (e) {
        console.error("Error al invocar la impresión nativa", e);
      } finally {
        // 4. Limpieza: Eliminar el iframe un segundo después de lanzar el diálogo
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 1000);
      }
    }, 500);
  };
}
