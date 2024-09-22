import { setupWorker } from "msw/browser";
import handlers from "@services/mock-service-worker/index";

export const worker = setupWorker(...handlers);
