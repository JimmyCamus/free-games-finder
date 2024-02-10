/* empty css                         */
import { A as AstroError, c as InvalidImageService, d as ExpectedImageOptions, E as ExpectedImage, e as createAstro, f as createComponent, g as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, h as addAttribute, s as spreadAttributes, i as renderComponent, j as renderHead, k as renderSlot } from '../astro_S4RBUwsA.mjs';
import { i as isESMImportedImage, a as isLocalService, b as isRemoteImage, D as DEFAULT_HASH_PROPS } from '../astro/assets-service_6TTkEre4.mjs';

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../astro/assets-service_6TTkEre4.mjs'
    ).then(n => n.g).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default ?? await options.src : options.src
  };
  const originalPath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : resolvedOptions.src;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions, propsToHash, originalPath);
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalPath),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$6 = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "C:/Users/Jeremy Camus/workspace/astro/free-games-finder/node_modules/.pnpm/astro@4.3.5_typescript@5.3.3/node_modules/astro/components/Image.astro", void 0);

const $$Astro$5 = createAstro();
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({ ...props, format, widths: props.widths, densities: props.densities })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(props.src) && specialFormatsFallback.includes(props.src.format)) {
    resultFallbackFormat = props.src.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionalAttributes = {};
  if (props.sizes) {
    sourceAdditionalAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "C:/Users/Jeremy Camus/workspace/astro/free-games-finder/node_modules/.pnpm/astro@4.3.5_typescript@5.3.3/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":["freetogame.com"],"remotePatterns":[{"protocol":"https"}]};
					new URL("file:///C:/Users/Jeremy%20Camus/workspace/astro/free-games-finder/.vercel/output/static/");
					const getImage = async (options) => await getImage$1(options, imageConfig);

const $$Astro$4 = createAstro();
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "C:/Users/Jeremy Camus/workspace/astro/free-games-finder/node_modules/.pnpm/astro@4.3.5_typescript@5.3.3/node_modules/astro/components/ViewTransitions.astro", void 0);

const $$Astro$3 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}<meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="flex justify-center"> <div class="fixed top-0 z-[-2] h-full w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div> <div class="w-3/4"> ${renderSlot($$result, $$slots["default"])} </div>  </body> </html>`;
}, "C:/Users/Jeremy Camus/workspace/astro/free-games-finder/src/layouts/Layout.astro", void 0);

const API_URL = await "https://www.freetogame.com/api/game";

const getGames = async (params = {}) => {
  const querySegments = [];
  for (let param in params) {
    querySegments.push(`${param}=${params[param]}`);
  }
  const url = `${API_URL}s?platform=pc&${querySegments.join("&")}`;
  let data;
  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
  return data;
};
const getGame = async (id) => {
  const url = `${API_URL}?id=${id}`;
  let data;
  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
  return data;
};

const $$Astro$2 = createAstro();
const $$Section = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Section;
  const { title, styles } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(`${styles}`, "class")}> <h2 class="text-xl">${title}</h2> <div class="w-full h-[2px] opacity-20 my-4 bg-white"></div> ${renderSlot($$result, $$slots["default"])} </section>`;
}, "C:/Users/Jeremy Camus/workspace/astro/free-games-finder/src/components/Section.astro", void 0);

const $$Astro$1 = createAstro();
const $$Information = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Information;
  const { title, value } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<p> <span class="opacity-65">${title}:</span> <br> ${value} </p>`;
}, "C:/Users/Jeremy Camus/workspace/astro/free-games-finder/src/components/Information.astro", void 0);

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  let data;
  if (id) {
    data = await getGame(id);
  }
  return renderTemplate`${data ? renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": data.title }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="text-white py-28"><div class="fixed top-14 left-32 text-4xl"><a href="/">←</a></div><div class="flex flex-row justify-evenly"><header class="flex flex-col justify-center items-center gap-y-16 h-full"><div class="w-[300px] h-[125px]">${renderComponent($$result2, "Image", $$Image, { "class": "size-fit rounded-t-md", "src": data.thumbnail, "alt": data.short_description, "width": "400", "height": "400", "loading": "lazy", "format": "webp", "quality": "max" })}</div><a class="flex items-center justify-center w-32 h-8 text-lg bg-slate-800 rounded-md transition-all duration-150 hover:bg-slate-700"${addAttribute(data.game_url, "href")} target="_blank">
PLAY NOW
</a></header><section class="flex flex-col items-center w-3/5"><header><h1 class="text-5xl font-bold mb-7">${data.title}<span${addAttribute(`${data.status === "Live" ? "text-green-600" : "text-red-500"}`, "class")}>
&bull;
</span></h1></header><main><section class="flex flex-row justify-between mt-5">${data.screenshots.slice(0, 3).map((screenShot) => renderTemplate`<div class="w-[250px] h-[150px]">${renderComponent($$result2, "Image", $$Image, { "class": "object-cover rounded-sm", "src": screenShot.image, "alt": `screen shot of the game`, "width": "250", "height": "100" })}</div>`)}</section><div class="w-full h-[2px] opacity-20 my-4 bg-white"></div>${renderComponent($$result2, "Section", $$Section, { "title": `About ${data.title}` }, { "default": ($$result3) => renderTemplate`<p class="text-md text-pretty">${data.description}</p>` })}<div class="w-full h-[2px] opacity-20 my-4 bg-white"></div>${renderComponent($$result2, "Section", $$Section, { "title": "Additional Information" }, { "default": ($$result3) => renderTemplate`<div class="h-44 grid grid-cols-3 place-items-center justify-items-start gap-y-3">${renderComponent($$result3, "GameInformation", $$Information, { "title": "Title", "value": data.title })}${renderComponent($$result3, "GameInformation", $$Information, { "title": "Developer", "value": data.developer })}${renderComponent($$result3, "GameInformation", $$Information, { "title": "Publisher", "value": data.publisher })}${renderComponent($$result3, "GameInformation", $$Information, { "title": "Release date", "value": data.release_date })}${renderComponent($$result3, "GameInformation", $$Information, { "title": "Genre", "value": data.genre })}${renderComponent($$result3, "GameInformation", $$Information, { "title": "Platform", "value": data.platform })}</div>` })}<div class="w-full h-[2px] opacity-20 my-4 bg-white"></div>${renderComponent($$result2, "Section", $$Section, { "title": "Minimum System Requirements" }, { "default": ($$result3) => renderTemplate`<div class="h-44 grid grid-cols-2 justify-items-start gap-y-5 gap-x-20">${renderComponent($$result3, "GameInformation", $$Information, { "title": "Graphics", "value": data.minimum_system_requirements.graphics })}${renderComponent($$result3, "GameInformation", $$Information, { "title": "Processor", "value": data.minimum_system_requirements.processor })}${renderComponent($$result3, "GameInformation", $$Information, { "title": "Memory", "value": data.minimum_system_requirements.memory })}${renderComponent($$result3, "GameInformation", $$Information, { "title": "Storage", "value": data.minimum_system_requirements.storage })}${renderComponent($$result3, "GameInformation", $$Information, { "title": "OS", "value": data.minimum_system_requirements.os })}</div>` })}</main></section></div></div>` })}` : renderTemplate`<div></div>`}`;
}, "C:/Users/Jeremy Camus/workspace/astro/free-games-finder/src/pages/games/[id].astro", void 0);

const $$file = "C:/Users/Jeremy Camus/workspace/astro/free-games-finder/src/pages/games/[id].astro";
const $$url = "/games/[id]";

const _id_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Picture as $, _id_ as _, getGames as a, $$Layout as b, getConfiguredImageService as g, imageConfig as i };
