#!/usr/bin/env bash
set -e
source development.env
docker build \
-t $IMAGE_NAME:$TAG \
-f docker/Dockerfile.develop $BUILD_DIR
