import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";
import AppErrorBoundary from "./components/AppErrorBoundary";

export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let renderError: unknown = null;
    let settled = false;
    let html = "";
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let abortRender: () => void = () => undefined;

    const destination = new PassThrough();
    destination.setEncoding("utf8");
    destination.on("data", (chunk: string) => {
      html += chunk;
    });
    destination.on("end", () => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      if (renderError) reject(renderError);
      else resolve(html);
    });
    destination.on("error", (error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      reject(error);
    });

    timeoutId = setTimeout(() => {
      if (settled) return;
      settled = true;
      abortRender();
      reject(new Error(`Timed out while prerendering ${url}`));
    }, 10000);

    const { pipe, abort } = renderToPipeableStream(
      <StaticRouter location={url}>
        <AppErrorBoundary>
          <App />
        </AppErrorBoundary>
      </StaticRouter>,
      {
        onAllReady() {
          if (renderError) {
            settled = true;
            clearTimeout(timeoutId);
            reject(renderError);
            abort();
            return;
          }
          pipe(destination);
        },
        onShellError(error) {
          if (settled) return;
          settled = true;
          clearTimeout(timeoutId);
          reject(error);
        },
        onError(error) {
          renderError = error;
        },
      }
    );
    abortRender = abort;
  });
}
