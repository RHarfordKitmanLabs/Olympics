import axios from "axios";
import type { AthleteType } from "@types";

export const GET_ATHLETES_URL = "/api/athletes";

const getAthletes = async (): Promise<AthleteType[]> => {
  const { data } = await axios.get<AthleteType[]>(GET_ATHLETES_URL);

  return data;
};

export default getAthletes;
