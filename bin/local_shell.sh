#!/bin/bash
set -e
source development.env
./bin/local_build_image.sh
docker run \
       -u $(id -u ${USER}):$(id -g ${USER}) \
       -w /work \
       -v $(pwd):/work/:Z \
       -v ~/.ssh:/.ssh:Z \
       -v ~/.gitconfig:/etc/gitconfig:Z \
       --net host \
       --rm \
       -it $IMAGE_NAME:$TAG \
       '
       eval `ssh-agent -s`;
       sh
       '
