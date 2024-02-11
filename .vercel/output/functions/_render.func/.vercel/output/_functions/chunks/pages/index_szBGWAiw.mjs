/* empty css                         */
import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, i as renderComponent } from '../astro_S4RBUwsA.mjs';
import { $ as $$Picture, a as getGames, b as $$Layout } from './_id__hOywIFfL.mjs';

const $$Astro$2 = createAstro();
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Card;
  const data = Astro2.props.data;
  return renderTemplate`${maybeRenderHead()}<article class="w-64 h-80 text-white bg-slate-950 rounded-md shadow-lg transition-all duration-150 hover:drop-shadow-glow hover:scale-105"> <a${addAttribute(`games/${data.id}`, "href")}> <div class="grid grid-rows-auto h-full"> <header> ${renderComponent($$result, "Picture", $$Picture, { "class": "size-fit rounded-t-md", "src": data.thumbnail, "alt": data.short_description, "width": "280", "height": "280", "loading": "lazy" })} </header> <div class="grid gap-y-4 px-3"> <h3 class="text-xl font-bold"> ${data.title} </h3> <section class="grid"> <p>By: ${data.developer}</p> </section> <footer class="self-end pb-2"> <p class="bg-slate-900 w-fit p-2 rounded-3xl text-sm">${data.genre}</p> </footer> </div> </div> </a> </article>`;
}, "C:/Users/Jeremy Camus/workspace/astro/free-games-finder/src/components/Card.astro", void 0);

var QueryParams = /* @__PURE__ */ ((QueryParams2) => {
  QueryParams2["CATEGORY"] = "category";
  QueryParams2["SORTBY"] = "sort-by";
  QueryParams2["TAG"] = "tag";
  return QueryParams2;
})(QueryParams || {});

const $$Astro$1 = createAstro();
const $$Filter = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Filter;
  return renderTemplate`${maybeRenderHead()}<form method="post" class="flex flex-row gap-x-28 justify-center w-full"> <label class="flex flex-row items-center gap-x-4">
Categories:
<select${addAttribute(QueryParams.CATEGORY, "name")} class="bg-slate-950 w-64 h-12 p-2 rounded-lg hover:cursor-pointer hover:text-gray-300"> <option value="">Any</option> <option value="mmo">MMO</option> <option value="mmorpg">MMORPG</option> <option value="shooter">Shooter</option> <option value="strategy">Strategy</option> <option value="moba">Moba</option> <option value="card">Card Games</option> <option value="racing">Racing</option> <option value="sports">Sports</option> <option value="social">Social</option> <option value="fighting">Fighting</option> <option value="mmofps">MMOFPS</option> <option value="action-rpg">Action RPG</option> <option value="sandbox">Sandbox</option> <option value="open-world">Open World</option> <option value="survival">Survival</option> <option value="battle-royale">Battle Royale</option> <option value="mmotps">MMOTPS</option> <option value="anime">Anime</option> <option value="pvp">PvP</option> <option value="pve">PvE</option> <option value="pixel">Pixel</option> <option value="mmorts">MMORTS</option> <option value="fantasy">Fantasy</option> <option value="sci-fi">Sci-Fi</option> <option value="action">Action</option> <option value="voxel">Voxel</option> <option value="zombie">Zombie</option> <option value="turn-based">Turn-Based</option> <option value="first-person">First Person View</option> <option value="third-Person">Third Person View</option> <option value="top-down">Top-Down View</option> <option value="3d">3D Graphics</option> <option value="2d">2D Graphics</option> <option value="tank">Tank</option> <option value="space">Space</option> <option value="sailing">Sailing</option> <option value="side-scroller">Side Scroller</option> <option value="superhero">Superhero</option> <option value="permadeath">Permadeath</option> </select> </label> <label class="flex flex-row items-center gap-x-4">
Sort By:
<select${addAttribute(QueryParams.SORTBY, "name")} class="bg-slate-950 w-64 h-12 p-2 rounded-lg hover:cursor-pointer hover:text-gray-300"> <option value="relevance">Relevance</option> <option value="popularity">Popularity</option> <option value="release-date">Release date</option> <option value="alphabetical">Alphabetical</option> </select> </label> <button type="submit" class="bg-slate-950 h-12 w-28 self-center text-lg rounded-lg hover:bg-slate-900">Filter</button> </form>`;
}, "C:/Users/Jeremy Camus/workspace/astro/free-games-finder/src/components/Filter.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const category = Astro2.url.searchParams.get(QueryParams.CATEGORY);
  const sortBy = Astro2.url.searchParams.get(QueryParams.SORTBY);
  const tag = Astro2.url.searchParams.get(QueryParams.TAG);
  const games = await getGames({
    "sort-by": sortBy ?? "relevance",
    category,
    tag
  });
  if (Astro2.request.method === "POST") {
    const data = await Astro2.request.formData();
    const category2 = data.get(QueryParams.CATEGORY);
    const sortBy2 = data.get(QueryParams.SORTBY);
    const querySegments = [];
    if (typeof category2 === "string" && category2 !== "") {
      querySegments.push(`category=${category2}`);
    }
    if (typeof sortBy2 === "string") {
      querySegments.push(`sort-by=${sortBy2}`);
    }
    return Astro2.redirect(`/?${querySegments.join("&")}`);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Free Games Finder" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<header class="text-8xl text-center mt-8 text-white font-bold"> <h1>Free Games Finder</h1> </header> <main> <section class="grid justify-items-center my-20 text-white"> ${renderComponent($$result2, "Filter", $$Filter, {})} </section> <section class="grid justify-items-center gap-y-12 my-20 grid-cols-1 desktop-high:grid-cols-4 desktop-mid:grid-cols-3"> ${games.map((game) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { "data": game })}`)} </section> </main> ` })}`;
}, "C:/Users/Jeremy Camus/workspace/astro/free-games-finder/src/pages/index.astro", void 0);

const $$file = "C:/Users/Jeremy Camus/workspace/astro/free-games-finder/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
