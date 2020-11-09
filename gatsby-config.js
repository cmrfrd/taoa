/* eslint-disable */

module.exports = {
  siteMetadata: {
    siteName: `The Art of Abstraction`,
    title: `T·A·O·A`,
    name: `Alexander Comerford`,
    siteUrl: `https://taoa.io`,
    description: ``,
    emojiDir: 'emojis',
    git: {
      user: process.env.USER_NAME,
      repo: process.env.REPO_NAME
    },
    transition: {
      scrollTimeoutMilliseconds: 300,
      pageAnimationDurationSeconds: 0.3,
      gridRowAnimationDurationSeconds: 0.3
    },
    logo: {
      text: 'T·A·O·A'
    },
    footer: {
      message: [' Made with', ' :heart:', ' and ☕'],
      link: '/ambiguity.txt',
      linkIndex: 1
    },
    social: [
      {
        name: `twitter`,
        url: `https://https://twitter.com/alexjcomerford`
      },
      {
        name: `github`,
        url: `https://github.com/cmrfrd`
      },
      {
        name: `instagram`,
        url: `https://www.instagram.com/cmrfrd/`
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/ajcomerford`
      }
    ]
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-theme-ui`,
    `gatsby-source-local-git`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: 'content/posts',
        name: 'content/posts'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: 'content/authors',
        name: 'content/authors'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: 'content/components',
        name: 'content/components'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: 'content/pages/home',
        name: 'content/pages/home'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: 'content/pages/about',
        name: 'content/pages/about'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: 'content/pages/search',
        name: 'content/pages/search'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: 'content/pages/post',
        name: 'content/pages/post'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: 'content/pages/not_found',
        name: 'content/pages/not_found'
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-126839741-1',
        head: false,
        anonymize: false,
        respectDNT: true,
        defer: true
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'The Art of Abstraction',
        short_name: 'T·A·O·A',
        start_url: '/',
        display: 'standalone',
        icon: 'content/favicons/favicon-32x32.png',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        cache_busting_mode: 'none',
        display: 'minimal-ui'
      }
    },
    {
      resolve: 'gatsby-plugin-offline'
    },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        disable: false,
        devMode: true,
        analyzerMode: 'server',
        analyzerPort: '7000'
      }
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        allExtensions: true
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-emojis',
            options: {
              active: true,
              size: 64,
              styles: {
                display: 'inline',
                margin: '0',
                'margin-top': '1px',
                position: 'relative',
                top: '5px',
                width: '25px'
              }
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 10000,
              linkImagesToOriginal: false,
              quality: 80,
              withWebp: true
            }
          },
          {
            resolve: `@raae/gatsby-remark-oembed`,
            options: {
              providers: {
                include: ['Instagram']
              }
            }
          },
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: 680,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              urlOverrides: [
                {
                  id: 'youtube',
                  embedURL: videoId => `https://www.youtube-nocookie.com/embed/${videoId}`
                }
              ] //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
            }
          },
          { resolve: `gatsby-remark-copy-linked-files` },
          { resolve: `gatsby-remark-numbered-footnotes` },
          { resolve: `gatsby-remark-smartypants` },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noreferrer' // eslint-disable-line unicorn/prevent-abbreviations
            }
          }
        ],
        remarkPlugins: [require(`remark-slug`), require('remark-emoji')] // eslint-disable-line global-require
      }
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        sourceMap: true,
        autoLabel: process.env.NODE_ENV !== 'production',
        labelFormat: `[local]`,
        cssPropOptimization: true
      }
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: `Heebo`,
              variants: [`300`, `400`, `500`, `600`],
              strategy: 'selfHosted'
            }
          ]
        },
        formats: ['woff2', 'woff'],
        useMinify: true,
        usePreload: true,
        usePreconnect: false
      }
    },
    {
      resolve: 'gatsby-plugin-brotli',
      options: {
        extensions: ['css', 'html', 'js', 'svg'],
        path: 'brotli'
      }
    }
  ]
};
