IMAGE=cmrfrd.site

if [ $(docker images | grep cmrfrd.site | wc -l) != 1 ]; then
    docker build -t $IMAGE .
fi 

docker run -p 8000:8000 \
       -v /home/comerford/Public/repos/cmrfrd.github.io/site/:/site:z \
       --rm -it $IMAGE $@
