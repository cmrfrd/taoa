#!/usr/bin/env bash
set -e
source development.env
./bin/local_build_image.sh
podman run \
       -u $(id -u):$(id -g) \
       --userns keep-id \
       -w /home/node/work/ \
       -v $(pwd):/home/node/work/ \
       -v ~/.ssh:/home/node/.ssh \
       -v ~/.gitconfig:/etc/gitconfig \
       --net host \
       --rm \
       -it $IMAGE_NAME:$TAG \
       sh -c \
       '
       eval `ssh-agent -s`;
       sh -l
       '
