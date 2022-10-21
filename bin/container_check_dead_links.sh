#!/usr/bin/env bash
set -e

function check_link {
  if curl --connect-timeout 5 --max-time 10 --retry 5 --retry-delay 1 --retry-max-time 40 --output /dev/null "$1"; then
    exit 0;
  else
    echo "Link is DEAD: $1";
    exit 1;
  fi
}
export -f check_link

## Iterate through files not recognized by gitignore
## and search for urls. For every url found, check the
## response status
echo "Checking for dead links ..."
git ls-files |\
  grep -v -E .*\.md |\
  parallel --will-cite 'test -f {} && echo {}' |\
  xargs cat |\
  grep -Eo "(http|https)://[a-zA-Z0-9./?=_%:-]*" |\
  parallel --will-cite --halt-on-error 2 -I{} "check_link {}"
echo "No dead links :)"
