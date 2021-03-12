#!/usr/bin/env bash
set -e
source development.env
podman build \
-t $IMAGE_NAME:$TAG \
-f docker/Dockerfile.develop $BUILD_DIR
