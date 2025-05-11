```
 _____  _    ___    _
|_   _|/ \  / _ \  / \
  | | / _ \| | | |/ _ \
  | |/ ___ \ |_| / ___ \
  |_/_/   \_\___/_/   \_\
```

# The Art of Abstraction

By: Alex Comerford (alex@taoa.io)

This repo contains the source code, posts, and configuration for `taoa.io` or `TheArtofAbstraction.com`.

## About

The Art of Abstraction (TAOA) is a blog. To learn more about its mission read the about or the first post.

Posts for TAOA are written in org mode, exported to mdx, then become viewable in a gatsby web app. Local development is done via containers.

## Running locally

Scripts to setup and interact with the rest of the code in this repo are located in the `bin/` directory. Scripts
prefixed with `local` are meant to be run on the developers local machine, scripts prefixed with `container` are
meant to be run inside of `the_art_of_abstraction` container.

To run this app locally there is some setup that needs to be done

1. Get an active shell in `the_art_of_abstraction` docker container.

``` shell
$ ./bin/local_shell.sh
```

Once inside the container, use `yarn` to download all the necessary js based dependencies.

```shell
$ yarn install
```

Once the necessary dependencies are installed, download emojis and generate dev
TLS certificates (don't forget to add the root CA signature to your browser!)

``` shell
$ ./bin/local_create_static_symlinks.sh
$ ./bin/container_download_emojis.sh
$ ./bin/container_generate_certs.sh
```

After this setup, the site can be developed upon with the command

```shell
$ ./bin/container_develop.sh
```

This will run the website in development mode where you can test, edit, and view the website
in the browser at `https://localhost:8000`

## Releasing

This repo uses [semantic-release](https://github.com/semantic-release/semantic-release) for the release process and is triggered by release tags and commit messages.

To run a release from inside the container run

```
$ ./bin/container_release.sh
```

When this command is run the following checks are run

1. `semantic-release` checks commits if a release should be triggered
2. If release is triggered, generate an updated `CHANGELOG.md`
3. Build the latest static build of the site
4. Publish the site to github pages

## Contributing

If you would like to help contribute to future posts or help build the site, reach out to my email `alex@taoa.io` or submit a PR!!!
