import { http, HttpResponse } from "msw";
import { GET_ATHLETES_URL } from "@shared/services/api/athletes/get";
import mockAthleteData from "@services/api/athletes/mock-athlete-data";

const handler = http.get(GET_ATHLETES_URL, () =>
  HttpResponse.json(mockAthleteData)
);

export default handler;
