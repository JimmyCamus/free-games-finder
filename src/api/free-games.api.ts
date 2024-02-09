import { API_URL } from "../lib/constants/api.constants";
import type { ManyGamesResponse } from "../lib/interfaces/games";

type GameSearch = {
  category?: string;
  "sort-by"?: string;
  tag?: string;
  id?: string;
};

type GameSearchParams = "category" | "sort-by" | "tag" | "id";

export const getGames = async (
  params: GameSearch = {}
): Promise<ManyGamesResponse[]> => {
  const querySegments: string[] = [];

  for (let param in params) {
    querySegments.push(`${param}=${params[param as GameSearchParams]}`);
  }

  const url = `${API_URL}&${querySegments.join("&")}`;

  let data: ManyGamesResponse[];

  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }

  return data;
};
