#!/usr/bin/env bash
set -e

# Clean all images in current directory for metadata
mogrify -strip \
        $(find . -type f \
               -not -path "./node_modules/*" \
               -not -path "./cache/*" \
               -not -path "./public/*" \
               -regextype egrep -regex '.*\.(jpg|png)')
