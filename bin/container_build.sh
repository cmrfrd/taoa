#!/bin/sh
set -e
source development.env

npx gatsby build \
    --profile
