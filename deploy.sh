IMAGE=cmrfrd.site
SSHKEY=$1
docker run \
       -v $(pwd):/cmrfrd.github.io/:z \
       -v ~/.ssh:/root/.ssh:z \
       --rm \
       --name deploy \
       -w /cmrfrd.github.io/site \
       -e SSHKEY=$SSHKEY \
       -it cmrfrd.site \
       '
       eval `ssh-agent -s`;
       ssh-add $SSHKEY;
       npm run deploy
       '
