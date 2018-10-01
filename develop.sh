IMAGE=cmrfrd.site
docker run \
       -p 8000:8000 \
       --name develop \
       -v $(pwd):/cmrfrd.github.io/:z \
       --rm \
       -it $IMAGE \
       develop
