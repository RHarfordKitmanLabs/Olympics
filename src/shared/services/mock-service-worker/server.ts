import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import handlers from "@services/mock-service-worker/index";

const server = setupServer(...handlers);

export { server, http, HttpResponse };
