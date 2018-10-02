IMAGE=cmrfrd.site
SSHKEY=$1
docker run \
       -v $(pwd):/site:z \
       -v ~/.ssh:/root/.ssh:z \
       --rm \
       --name deploy \
       -w /site \
       -e SSHKEY=$SSHKEY \
       -it cmrfrd.site \
       '
       eval `ssh-agent -s`;
       ssh-add $SSHKEY;
       gh-pages -b master -d . -u alexanderjcomerford@gmail.com;
       '
