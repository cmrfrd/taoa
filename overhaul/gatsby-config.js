/* eslint-disable */

module.exports = {
  siteMetadata: {
    siteName: `The Art of Abstraction`,
    title: `Welcome | The Art of Abstraction`,
    name: `Alexander Comerford`,
    siteUrl: `https://theartofabstraction.com`,
    description: ``,
    hero: {
      welcome: `Welcome to`,
      heading: `An <b>engineering blog</b> about first principles and creating new systems`,
      maxWidth: 900,
    },
    social: [
      {
        name: `twitter`,
        url: `blu`,
      },
      {
        name: `github`,
        url: `https://github.com/cmrfrd`,
      },
      {
        name: `instagram`,
        url: `doo`,
      },
      {
        name: `linkedin`,
        url: `poo`,
      },
    ],
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: "content/posts",
        name: "content/posts",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: "content/authors",
        name: "content/authors",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: "content/about",
        name: "content/about",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: "content/pages",
        name: "content/pages",
      },
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
              withWebp: true,
            },
          },
          {
            resolve: `@raae/gatsby-remark-oembed`,
            options: {
              providers: {
                include: ["Instagram"]
              }
            }
          },
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 680,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              urlOverrides: [
                {
                  id: 'youtube',
                  embedURL: (videoId) => `https://www.youtube-nocookie.com/embed/${videoId}`,
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
              rel: 'noreferrer', // eslint-disable-line unicorn/prevent-abbreviations
            },
          },
        ],
        remarkPlugins: [require(`remark-slug`)], // eslint-disable-line global-require
      },
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        displayName: process.env.NODE_ENV === `development`,
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Heebo`,
            variants: [`400`, `500`, `600`, `700`]
          },
        ],
      },
    },
  ],
};
