IMAGE=cmrfrd.site
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
       -it cmrfrd.site \
       '
       eval `ssh-agent -s`;
       ssh-add $SSHKEY;
       gatsby build;
       gh-pages -b master -d public -u alexanderjcomerford@gmail.com;
       git add .
       git commit -m "$COMMITMSG"
       git push origin development
       '
