#!/usr/bin/env bash
set -e
source development.env

yes | npx http-server \
    -S \
    -p 9000 \
    -C $(find $CERTS_DIR/ -name "$DOMAIN*" -not -name "*key*") \
    -K $(find $CERTS_DIR/ -name "$DOMAIN*" -name "*key*")
