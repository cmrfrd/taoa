```
 _____  _    ___    _
|_   _|/ \  / _ \  / \
  | | / _ \| | | |/ _ \
  | |/ ___ \ |_| / ___ \
  |_/_/   \_\___/_/   \_\
```

# The Art of Abstraction

By: Alex Comerford (alexanderjcomerford@gmail.com)

This repo contains the source code, articles, and configuration for `TheArtofAbstraction.com`.

## About

The Art of Abstraction (TAOA) is a tech blog. To learn more about its mission read the about or the first post.

Posts for TAOA are written in org mode, exported to mdx, then become viewable in a gatsby web app. Local development is done via `docker`.

## Running locally

Scripts to setup and interact with the rest of the code in this repo are located in the `bin/` directory. Scripts
prefixed with `local` are meant to be run on the developers local machine, scripts prefixed with `container` are
meant to be run inside of `the_art_of_abstraction` container.

To run this app locally there is some setup that needs to be done

1. Get an active shell in `the_art_of_abstraction` docker container.

``` shell
$ ./bin/local_shell.sh
```

Once inside the container, download emojis and generate TLS certificates (don't forget to add the root CA signature to your browser!)

``` shell
$ ./bin/container_download_emojis.sh
$ ./bin/container_generate_certs.sh
```

This will run the website in development mode where you can test, edit, and view the website
in the browser at `https://localhost:8000`

## Contributing

If you would like to help contribute to future articles or help build the site, reach out my email or submit a PR.
