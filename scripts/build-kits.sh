#!/usr/bin/env bash
# Rebuild everything generated from kits/react: preview site, HTML markup, CSS kit.
# Run from the brandos folder. Installs build-only dependencies into preview/app the first time.
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT=$(pwd)

# Keep the preview app's copy of the components and style in sync with the kit.
rm -rf preview/app/src/components preview/app/src/lib preview/app/src/hooks
cp -r kits/react/src/components kits/react/src/lib kits/react/src/hooks preview/app/src/
cp kits/react/src/styles/style-glass.css preview/app/src/styles/style-glass.css

cd preview/app
[ -d node_modules ] || npm install
npm install --no-save @tailwindcss/cli >/dev/null

echo "Building preview site"
npx vite build --outDir ../dist --emptyOutDir

echo "Rendering component markup for the CSS kit"
npx vite build --ssr scripts/render-markup.tsx --outDir scripts/.ssr --emptyOutDir
cp scripts/run.mjs scripts/.ssr/run.mjs
export BRANDOS_MARKUP_DIR="$ROOT/kits/css/markup"
(cd scripts/.ssr && NODE_PATH="$ROOT/preview/app/node_modules" node run.mjs)

echo "Compiling kits/css/glass-ui.css"
ln -sfn "$ROOT/preview/app/node_modules" "$ROOT/kits/node_modules"
npx @tailwindcss/cli -i "$ROOT/kits/css/src/glass-ui.src.css" -o "$ROOT/kits/css/glass-ui.css" --minify
rm "$ROOT/kits/node_modules"
echo "Done"
