#!/bin/env bash
docker build \
       -t gats \
       -f Dockerfile .
docker run \
       -v $(pwd):/mnt \
       -w /mnt \
       --net host \
       --entrypoint bash \
       -it gats
