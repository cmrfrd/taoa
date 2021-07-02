#!/usr/bin/env bash
set -e
source development.env

npx gatsby develop \
    --verbose \
    --inspect \
    --https \
    --key-file $(find $CERTS_DIR/ -name "$DOMAIN*" -name "*key*") \
    --cert-file $(find $CERTS_DIR/ -name "$DOMAIN*" -not -name "*key*") \
    --ca-file $(find $CERTS_DIR/ -name "*CA*" -not -name "*key*")
