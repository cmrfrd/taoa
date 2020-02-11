#!/bin/bash
IMAGE=cmrfrd.site
docker run \
       -v $(pwd):/site:z \
       -v ~/.ssh:/.ssh:z \
       --rm \
       --name deploy \
       -w /site \
       -it cmrfrd.site \
       '
       eval `ssh-agent -s`;
       sh
       '
