#!/bin/sh
set -e

pnpm db:deploy
exec node .output/server/index.mjs
