import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import OlympicResults from "@views/OlympicResults/OlympicResults";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("@services/mock-service-worker/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(<OlympicResults />);
});
