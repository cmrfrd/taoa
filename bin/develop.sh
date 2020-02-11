#!/bin/bash
IMAGE=cmrfrd.site
docker run \
       -p 9000:8000 \
       --name develop \
       -v $(pwd):/site:z \
       --rm \
       -it $IMAGE \
       develop
