#!/bin/bash
source development.env
docker run \
       -p 8000:8000 \
       --name develop \
       -v $(pwd):/site:z \
       --rm \
       -it $IMAGE_NAME:$TAG \
       develop
