#!/usr/bin/env bash
set -e
source development.env
EMAIL=alexanderjcomerford@gmail.com
SSHKEY=$1
COMMITMSG={$2:-Updatesite}
docker run \
       -v $(pwd):/site:z \
       -v ~/.ssh:/.ssh:z \
       --rm \
       --name deploy \
       -w /site \
       -e SSHKEY=$SSHKEY \
       -e COMMITMSG=$COMMITMSG \
       -e EMAIL=$EMAIL \
       -it $IMAGE_NAME:$TAG \
       '
       eval `ssh-agent -s`;
       ssh-add $SSHKEY;
       gatsby build;
       gh-pages -b master -d public -u $EMAIL;
       git config --global user.email "$EMAIL"
       git config --global user.name "cmrfrd"
       git add .
       git commit -m "$COMMITMSG"
       git push origin development
       '
