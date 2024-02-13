import { useState } from "react";
import type { ManyGamesResponse } from "../lib/interfaces/games";
import { QUERY_LIMIT } from "../lib/constants/query-params.constants";
import Card from "./Card";

const GameList = ({ games }: { games: ManyGamesResponse[] }) => {
  const [filteredGames, setFilteredGames] = useState<ManyGamesResponse[]>(
    games.slice(0, QUERY_LIMIT)
  );

  const handleRender = () => {
    const offset = filteredGames.length;
    setFilteredGames([
      ...filteredGames,
      ...games.slice(offset, offset + QUERY_LIMIT),
    ]);
  };

  return (
    <section className="my-20">
      <div className="grid justify-items-center gap-y-12 grid-cols-1 desktop-high:grid-cols-4 desktop-mid:grid-cols-3">
        {filteredGames.map((game) => (
          <Card key={game.id} data={game} />
        ))}
      </div>
      <div className="flex justify-center my-20">
        {filteredGames.length < games.length ? (
          <button
            className="bg-accent text-primary h-12 w-28 self-center text-lg rounded-lg transition-all duration-150 hover:text-white  hover:bg-dark"
            onClick={handleRender}
          >
            Show more
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default GameList;
