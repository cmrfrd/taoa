#!/usr/bin/env bash
set -e
source development.env

## Publish github pages
npx gh-pages \
    -b master \
    -d public \
    -u $USER_EMAIL \
    -m "$@"
