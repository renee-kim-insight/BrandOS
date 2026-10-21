---
name: brand-intake
description: Turn a client's brand material (brand guide PDF, PowerPoint deck, website URL, logo files, screenshots, or a few colours and a font) into a confirmed brand.json for BrandOS. Use when someone shares brand material or asks to set up a brand, before any theming or app changes.
---

# Brand intake

Goal: a `brand.json` that a person has confirmed, with every value traceable to their material.

## 1. Collect the material

Ask what they have. Any of these work, and more than one is better:

- Brand guidelines PDF (best)
- A branded PowerPoint template or deck (its theme holds exact colours and fonts)
- The client's website URL
- Logo files (ask for SVG; PNG is a fallback)
- Screenshots, or simply "our blue is #0055A4 and we use Avenir"

## 2. Extract

If the person already has a brand pack, stop here: intake is done. Go to brand-apply and install with `--pack`.

If a person can do the checking themselves, the quickest route is `brandos studio`: a local dashboard that reads every source (guides, links, token files, CSS, Tailwind configs, font files), lets them fix values with a live preview, and exports a brand pack. No AI is needed for that path.


Put the material in `brand-source/` in the app's root (licensed font files in `brand-source/fonts/`), then run:

```
brandos extract "brand-source/<guide>.pptx"
```

This does the whole first pass automatically:

- reads colours, fonts, text and images from the source;
- picks the brand name, primary, secondary, accents, neutral and danger colours, skipping shades of colours already chosen;
- finds licensed font files in `brand-source/` by the family name stored inside each file. The body font is the one the guide names for text; a heading font is the one the guide names for headlines, or else any other family whose files are in `brand-source/` (serif and slab faces first). Until files are added, a free stand-in of the same style is used (Bitter for slab, Source Serif 4 for serif, Geist for sans);
- writes `brand.json` (never replacing an existing one unless `--force`), plus `brand-extract/extract-report.md`, `brand-text.txt` and `assets/`;
- generates the theme in `brand-out/` and runs every contrast check.

With several sources, run it on the best one (guide PDF, then template deck, then website), and run the others with `--no-theme --brand brand-extract/<name>.json` to compare.

To add or change a heading font later, drop its files into `brand-source/fonts/` and run `brandos extract --force`, or set `fonts.display` in `brand.json` and run `brandos theme`. Headings use the body font by default, even when a heading font exists; set `typography.headings` to `"display"` in brand.json to use the heading font for page titles and section headings.

Then **read** `extract-report.md` and `brand-text.txt` yourself. The extractor finds candidates; you understand the guide. Look for:

- Which colour the guide calls primary or main, and which are secondary or accent
- Colours given as CMYK or Pantone only: use the guide's own hex or RGB if it lists one, otherwise the extractor's conversion, and note it
- Named typefaces, and whether headlines and body use different ones
- Logo rules: minimum size, clear space, versions for dark backgrounds
- Tone of voice: the guide's own words, summarised in one sentence, plus its do and don't lists
- Anything that affects UI: corner style ("rounded", "sharp"), photography or illustration rules

For images and screenshots, look at them directly and read off colours and type.

When sources disagree (the website uses a slightly different blue than the PDF), prefer the official guide and mention the difference.

## 3. Ask only what you cannot decide

Present a short summary, then ask about real ambiguities only. Typical questions:

- "Your guide lists five colours. Which one should buttons and links use?"
- "The guide uses Avenir Next. Do you have a web licence and the .woff2 files? If not, I'll use Nunito Sans, the closest free match."
- "Is there an SVG version of the logo, and one for dark backgrounds?"
- "Rounded or sharp corners?" (only if the guide doesn't say)

Do not ask about things the material already answers.

## 4. Fonts

- On Google Fonts: `"source": "google"`.
- Licensed fonts with web files supplied: `"source": "self-hosted"`, list the `.woff2` paths in `files`, and always set a `fallback`.
- Licensed fonts without web files: `"source": "self-hosted"` with a `fallback`, and tell the person the fallback will show until the files are added.

## 5. Correct brand.json

`brand.json` already exists from step 2. Change only what the guide or the person says differently (following `brand/brand.schema.json`), add `voice` and `logo` from what you read, then:

```
brandos validate brand.json
```

## 6. Confirm

Show the person a plain summary: name, primary colour, secondary and accent colours, fonts, corner style, logo files, and any assumptions. Ask them to confirm. Only then move on to the `brand-apply` skill.
