import type { ManyGamesResponse } from "../lib/interfaces/games";

const Card = ({ data }: { data: ManyGamesResponse }) => {
  return (
    <article className="w-64 h-80 text-white bg-dark rounded-md shadow-lg transition-all duration-150 hover:drop-shadow-glow hover:scale-105">
      <a href={`games/${data.id}`}>
        <div className="grid grid-rows-auto h-full">
          <header>
            <img
              className="size-fit rounded-t-md"
              src={data.thumbnail}
              alt={data.short_description}
              width="280"
              height="280"
              loading="lazy"
            />
          </header>
          <div className="grid gap-y-4 px-3">
            <h2 className="text-xl font-bold">{data.title}</h2>
            <section className="grid">
              <p>By: {data.developer}</p>
            </section>
            <footer className="self-end pb-2">
              <p className="border-2 border-secondary w-fit p-2 rounded-3xl text-sm">
                {data.genre}
              </p>
            </footer>
          </div>
        </div>
      </a>
    </article>
  );
};

export default Card;
