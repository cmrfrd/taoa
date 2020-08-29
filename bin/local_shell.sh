#!/bin/sh
source ./constants.env
./bin/local_build_image.sh
docker run \
       -v $(pwd):/site:z \
       -v ~/.ssh:/.ssh:z \
       --net host \
       --rm \
       -w /site \
       -it $IMAGE_NAME:$TAG \
       '
       eval `ssh-agent -s`;
       sh
       '
