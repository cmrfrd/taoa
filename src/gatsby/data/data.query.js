/* eslint-disable */

// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-transformer-sharp/src/fragments.js

module.exports.local = {
  posts: `{
    posts: allPost(
      sort: { fields: [date, title], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          id
          slug
          title
          date(formatString: "MMMM Do, YYYY")
          dateForSEO: date
          timeToRead
          canonical_url
          excerpt
          parent {
            ... on Mdx {
              id
              fileAbsolutePath
              frontmatter {
                author
                secret
              }
            }
          }
          body
          hero {
            full: childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
            regular: childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
            narrow: childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
            seo: childImageSharp {
              gatsbyImageData(layout: FIXED)
            }
          }
        }
      }
    }
  }`,
  about: `{
    about: aboutYaml {
      name
      about {
        title {
          author
          authors
          about
        }
        about
      }
    }
  }`,
  search: `{
    search: allSearchYaml {
      edges {
        node {
          search {
            heading
            pageLength
            placeholder
          }
        }
      }
    }
  }`,
  post: `{
    post: allPostYaml {
      edges {
        node {
          post {
            nextPostText
          }
        }
      }
    }
  }`,
  notFound: `{
    notFound: allNotFoundYaml {
      edges {
        node {
          name
          messages {
            emoji
            message
          }
        }
      }
    }
  }`,
  authors: `{
  authors: allAuthor {
    edges {
      node {
        id
        name
        bio
        featured
        pgp_keyid
        github
        email
        twitter
        slug
        avatar {
          small: childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, width: 50)
          }
          medium: childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 100)
          }
          large: childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 328)
          }
        }
      }
    }
  }
}`
};
