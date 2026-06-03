// src/features/landfills/utils/printer.ts

export function printHtmlInIframe(htmlContent: string, title?: string): void {
  const originalTitle = document.title;
  if (title) {
    document.title = title;
  }

  const iframe = document.createElement("iframe");

  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    console.error("No se pudo acceder al documento del iframe de impresión");
    if (title) {
      document.title = originalTitle;
    }
    document.body.removeChild(iframe);
    return;
  }

  doc.open();
  doc.write(htmlContent);
  doc.close();

  if (title && iframe.contentWindow?.document) {
    iframe.contentWindow.document.title = title;
  }

  iframe.onload = () => {
    setTimeout(() => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch (e) {
        console.error("Error al invocar la impresión nativa", e);
      } finally {
        setTimeout(() => {
          if (title) {
            document.title = originalTitle;
          }
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 1000);
      }
    }, 500);
  };
}
