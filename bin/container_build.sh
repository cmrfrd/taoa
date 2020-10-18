#!/bin/sh
set -e
source development.env

## Output sitename to CNAME
node -e "console.log(require('./gatsby-config.js').siteMetadata.siteUrl)" > static/CNAME

## Build site
npx gatsby build
