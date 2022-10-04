#!/usr/bin/env bash
set -e
source development.env

[ -d $CERTS_DIR ] && \
  echo "Directory $CERTS_DIR exists. Certificates already generated" && \
  exit 0

mkdir -p $CERTS_DIR

CAROOT=$CERTS_DIR mkcert -install
cd $CERTS_DIR
CAROOT=$(pwd) mkcert $DOMAIN
cd ..

chmod ugo+r -R $CERTS_DIR

echo "Certificates generated. Be sure to add them to your browsers CA list"
