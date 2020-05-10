/* eslint-disable */

module.exports = {
  siteMetadata: {
    siteName: `The Art of Abstraction`,
    title: `Welcome | The Art of Abstraction`,
    name: `Alexander Comerford`,
    siteUrl: `https://theartofabstraction.com`,
    description: ``,
    logo: {
      text: 'T·A·O·A'
    },
    footer: {
      message: 'Made with :heart: and ☕'
    },
    search: {
      placeholder: `Search by title or tags`,
      heading: `Search Articles`
    },
    fourOfour: {
      messages: [
        {
          emoji: '🌵',
          message: 'Oh no! Nothing is here'
        },
        {
          emoji: '📄',
          message: 'No page exists here'
        },
        {
          emoji: '👀',
          message: 'Nothing to see here, folks!'
        },
        {
          emoji: ':walking:',
          message: 'Keep walking, nothing to see here'
        },
        {
          emoji: '🤕',
          message: 'Something is not right... try going somewhere else!'
        },
        {
          emoji: ':world_map:',
          message: 'I think you might be lost. Try a different page!'
        },
        {
          emoji: '😵',
          message: "You just got 404'd, the page your looking for doesn't exist"
        },
        {
          emoji: '🙅',
          message: "Your page isn't here!"
        },
        {
          emoji: '👿',
          message: "Don't freak out! You can go anywhere else, just not here"
        },
        {
          emoji: '🙇',
          message: "So sorry but we can't find you page. Try going somewhere else!"
        },
        {
          emoji: '🚷',
          message: 'No humans allowed! Try a different page'
        },
        {
          emoji: '🤦',
          message: "This is embarrassing. Your page isn't here, but it might be somewhere else!"
        }
      ]
    },
    hero: {
      welcome: `Welcome to`,
      heading: `A tech blog about first principles, system design, and computation`,
      maxWidth: 900
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
    `gatsby-plugin-page-transitions`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
    `gatsby-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-theme-ui`,
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
        display: 'standalone'
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // In your gatsby-transformer-remark plugin array
        plugins: [
          {
            resolve: 'gatsby-remark-emojis',
            options: {
              // Deactivate the plugin globally (default: true)
              active: true,
              // In order to avoid pattern mismatch you can specify
              // an escape character which will be prepended to the
              // actual pattern (e.g. `#:poop:`).
              // Select the size (available size: 16, 24, 32, 64)
              size: 64,
              // Add custom styles
              styles: {
                display: 'inline',
                margin: '0',
                'margin-top': '1px',
                position: 'relative',
                top: '5px',
                width: '25px'
              }
            }
          }
        ]
      }
    },
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
        path: 'content/about',
        name: 'content/about'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: 'content/pages',
        name: 'content/pages'
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
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
        remarkPlugins: [require(`remark-slug`)] // eslint-disable-line global-require
      }
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        displayName: process.env.NODE_ENV === `development`
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Heebo`,
            variants: [`400`, `500`, `600`, `700`]
          }
        ]
      }
    }
  ]
};
