#!/usr/bin/env sh
set -e

POSTS_DIR=content/posts
STATIC_DIR=static

echo "Creating static dir symlinks in posts directories ... "
for post_dir in $(find ${POSTS_DIR} -maxdepth 1 -type d -not -path ${POSTS_DIR}); do

  POST_STATIC_DIR=${post_dir}/${STATIC_DIR}

  echo "Creating and linking static dir for post $(basename ${post_dir}) ..."

  # create link <post_dir>/static/ -> /static/<>
  [[ -h ${POST_STATIC_DIR} ]] && echo "-> ${STATIC_DIR} link exists ..."
  [[ ! -h ${POST_STATIC_DIR} ]] && ln -rs ${STATIC_DIR} ${POST_STATIC_DIR}

done
