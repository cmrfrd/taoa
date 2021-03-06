/* eslint-disable */

module.exports = {
  flags: {
    PRESERVE_WEBPACK_CACHE: true
    // FAST_DEV: true,
    // DEV_SSR: true,
    // PARALLEL_SOURCING: true
  },
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
        url: `https://twitter.com/alexjcomerford`
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
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-theme-ui`,
    `gatsby-source-local-git`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'The Art of Abstraction',
        short_name: 'T·A·O·A',
        start_url: '/',
        display: 'standalone',
        icon: 'static/favicons/favicon-32x32.png',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        cache_busting_mode: 'none',
        display: 'minimal-ui',
        icon_options: {
          purpose: `any maskable`
        },
        icons: [
          {
            src: `/favicons/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`
          },
          {
            src: `/favicons/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`
          }
        ]
      }
    },
    // {
    //   resolve: 'gatsby-plugin-purgecss',
    //   options: {
    //     printRejected: true,
    //     develop: true,
    //     printSummary: true,
    //     ignore: ['katex/', 'react-medium-image-zoom/']
    //   }
    // },
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
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: 'UA-126839741-1',
    //     head: false,
    //     anonymize: false,
    //     respectDNT: true,
    //     defer: true
    //   }
    // },
    {
      resolve: 'gatsby-plugin-offline'
    },
    // {
    //   resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
    //   options: {
    //     disable: false,
    //     devMode: true,
    //     analyzerMode: 'server',
    //     analyzerPort: '7000'
    //   }
    // },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        allExtensions: true
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              throwOnError: true
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve('./src/templates/post.template.tsx')
        },
        remarkPlugins: [
          require('remark-math'),
          // require('remark-html-katex'),
          require(`remark-slug`),
          require('remark-emoji')
        ], // eslint-disable-line global-require
        rehypePlugins: [require('rehype-katex')],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-emojis',
            options: {
              active: true,
              size: 64
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
          }
          // {
          //   resolve: `@raae/gatsby-remark-oembed`,
          //   options: {
          //     providers: {
          //       include: ['Instagram']
          //     }
          //   }
          // },
          // {
          //   resolve: 'gatsby-remark-embed-video',
          //   options: {
          //     width: 680,
          //     ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
          //     height: 400, // Optional: Overrides optional.ratio
          //     related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
          //     noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
          //     urlOverrides: [
          //       {
          //         id: 'youtube',
          //         embedURL: videoId => `https://www.youtube-nocookie.com/embed/${videoId}`
          //       }
          //     ] //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
          //   }
          // },
          // { resolve: `gatsby-remark-copy-linked-files` },
          // { resolve: `gatsby-remark-numbered-footnotes` },
          // { resolve: `gatsby-remark-smartypants` },
          // {
          //   resolve: 'gatsby-remark-external-links',
          //   options: {
          //     target: '_blank',
          //     rel: 'noreferrer' // eslint-disable-line unicorn/prevent-abbreviations
          //   }
          // }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        sourceMap: true,
        autoLabel: 'dev-only',
        labelFormat: `[local]`,
        cssPropOptimization: true
      }
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google2: [
            {
              family: `Heebo`,
              axes: `wght@300;400;500;600`,
              strategy: 'selfHosted'
            }
          ]
        },
        fontDisplay: 'block',
        formats: ['woff2'],
        useMinify: true,
        usePreload: true,
        usePreconnect: true
      }
    },
    {
      resolve: 'gatsby-plugin-brotli',
      options: {
        extensions: ['css', 'html', 'js', 'svg'],
        path: 'brotli'
      }
    }
    // {
    //   resolve: `gatsby-plugin-csp`,
    //   options: {
    //     disableOnDev: true,
    //     reportOnly: false, // Changes header to Content-Security-Policy-Report-Only for csp testing purposes
    //     mergeScriptHashes: true, // you can disable scripts sha256 hashes
    //     mergeStyleHashes: true, // you can disable styles sha256 hashes
    //     mergeDefaultDirectives: true,
    //     directives: {
    //       'script-src': "'self' www.google-analytics.com",
    //       'style-src': "'self' 'unsafe-inline'",
    //       'img-src': "'self' data: www.google-analytics.com"
    //       // you can add your directives or override defaults
    //     }
    //   }
    // }
  ]
};
