import "@testing-library/jest-dom";
import { server } from "./src/shared/services/mock-service-worker/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
