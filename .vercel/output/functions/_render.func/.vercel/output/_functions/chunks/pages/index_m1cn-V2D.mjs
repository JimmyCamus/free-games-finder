/* empty css                         */
import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, i as renderComponent } from '../astro_S4RBUwsA.mjs';
import { $ as $$Picture, a as getGames, b as $$Layout } from './_id__1dwm7AZm.mjs';

const $$Astro$1 = createAstro();
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Card;
  const data = Astro2.props.data;
  return renderTemplate`${maybeRenderHead()}<article class="w-64 h-80 text-white bg-slate-950 rounded-md shadow-lg transition-all duration-150 hover:drop-shadow-glow hover:scale-105"> <a${addAttribute(`games/${data.id}`, "href")}> <div class="grid grid-rows-auto h-full"> <header> ${renderComponent($$result, "Picture", $$Picture, { "class": "size-fit rounded-t-md", "src": data.thumbnail, "alt": data.short_description, "width": "280", "height": "280", "loading": "lazy", "pictureAttributes": { style: "background-color: red;" } })} </header> <div class="grid gap-y-4 px-3"> <h3 class="text-xl font-bold"> ${data.title} </h3> <section class="grid"> <p>By: ${data.developer}</p> </section> <footer class="self-end pb-2"> <p class="bg-slate-900 w-fit p-2 rounded-3xl text-sm">${data.genre}</p> </footer> </div> </div> </a> </article>`;
}, "C:/Users/Jeremy Camus/workspace/astro/free-games-finder/src/components/Card.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const games = await getGames({ "sort-by": "relevance" });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Free Games Finder" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <section class="grid justify-items-center gap-y-12 my-20 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1"> ${games.map((game) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { "data": game })}`)} </section> </main> ` })}`;
}, "C:/Users/Jeremy Camus/workspace/astro/free-games-finder/src/pages/index.astro", void 0);

const $$file = "C:/Users/Jeremy Camus/workspace/astro/free-games-finder/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
