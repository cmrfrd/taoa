#!/bin/bash
IMAGE=cmrfrd.site
docker run \
       -v $(pwd):/site:z \
       -v ~/.ssh:/.ssh:z \
       --net host \
       --rm \
       -w /site \
       -it cmrfrd.site \
       '
       eval `ssh-agent -s`;
       sh
       '
