import { API_URL } from "../lib/constants/api.constants";
import type {
  ManyGamesResponse,
  OneGameResponse,
} from "../lib/interfaces/games";

type GameSearch = {
  category?: string;
  "sort-by"?: string;
  tag?: string;
};

type GameSearchParams = "category" | "sort-by" | "tag";

export const getGames = async (
  params: GameSearch = {}
): Promise<ManyGamesResponse[]> => {
  const querySegments: string[] = [];

  for (let param in params) {
    querySegments.push(`${param}=${params[param as GameSearchParams]}`);
  }

  const url = `${API_URL}s?platform=pc&${querySegments.join("&")}`;

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

export const getGame = async (
  id: string
): Promise<OneGameResponse | undefined> => {
  const url = `${API_URL}?id=${id}`;

  let data: OneGameResponse;

  try {
    const response = await fetch(url);
    data = await response.json();
    if (!response.ok) {
      return;
    }
  } catch (error) {
    console.error("Error:", error);
    return;
  }

  return data;
};
