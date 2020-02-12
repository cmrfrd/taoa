#!/bin/bash
IMAGE=cmrfrd.site
docker run \
       -p 8000:8000 \
       --name develop \
       -v $(pwd):/site:z \
       --rm \
       -it $IMAGE \
       develop
