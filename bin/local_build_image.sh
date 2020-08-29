#!/bin/bash
source ./constants.env
docker build -t $IMAGE_NAME:$TAG -f docker/Dockerfile.develop $BUILD_DIR
