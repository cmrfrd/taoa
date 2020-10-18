#!/bin/bash
set -e
source development.env

npx gh-pages \
    -b master \
    -d public \
    -u $USER_EMAIL \
    -m "$@"
