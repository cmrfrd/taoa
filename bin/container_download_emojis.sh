#!/bin/sh

if ! command -v node &> /dev/null
then
    echo "node could not be found"
    exit
fi

# Get the emoji directory from the default gatsby config
EMOJI_DIR=$(echo 'require("./gatsby-config").siteMetadata.emojiDir;' |
              node -i |
              awk '{a[NR]=$2} END{print a[NR-1] }' |
              tr -d \')

# Configure static/emoji/fileext dir
STATIC_DIR=static
EMOJI_DST_DIR=$STATIC_DIR/$EMOJI_DIR
EMOJI_SRC_DIR=png

## Make static directory and emoji dir
mkdir -p $STATIC_DIR
mkdir -p $EMOJI_DST_DIR

if [[ ! -e $dir ]]; then

  ## Clone emoji project into temp direcotry
  tmp=$(mktemp -d)
  git clone https://github.com/joypixels/emoji-assets.git $tmp

  ## Copy into static emoji dir
  cp -r $tmp/$EMOJI_SRC_DIR $EMOJI_DST_DIR

  rm -r $tmp

elif [[ ! -d $EMOJI_DST_DIR ]]; then
  echo "$EMOJI_DST_DIR already exists but is not a directory"
else
  echo "Emojis already exist in directory $EMOJI_DST_DIR"
fi
