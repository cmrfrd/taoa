#!/bin/sh
set -e
source development.env

## Output sitename to CNAME
(node > static/CNAME) <<- EOM
const url = require('url');
const gconf = require('./gatsby-config.js');
console.log(url.parse(gconf.siteMetadata.siteUrl).hostname);
EOM

## Build site
npx gatsby build
