/* eslint-disable */

// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-transformer-sharp/src/fragments.js

const GatsbyFluid_withWebp = `
  base64
  aspectRatio
  src
  srcSet
  srcWebp
  srcSetWebp
  sizes
`;

module.exports.local = {
  articles: `{
    articles: allArticle(
      sort: { fields: [date, title], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          id
          slug
          secret
          title
          author
          date(formatString: "MMMM Do, YYYY")
          dateForSEO: date
          timeToRead
          excerpt
          canonical_url
          secret
          slug
          subscription
          canonical_url
          id
          excerpt
          body
          hero {
            full: childImageSharp {
              fluid(maxWidth: 944, quality: 100) {
                ${GatsbyFluid_withWebp}
              }
            }
            regular: childImageSharp {
              fluid(maxWidth: 653, quality: 100) {
                ${GatsbyFluid_withWebp}
              }
            }
            narrow: childImageSharp {
              fluid(maxWidth: 457, quality: 100) {
                ${GatsbyFluid_withWebp}
              }
            }
            seo: childImageSharp {
              fixed(width: 1200, quality: 100) {
                src
              }
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
  authors: `{
    authors: allAuthor {
      edges {
        node {
          id
          name
          bio
          featured
          social {
            url
          }
          slug
          avatar {
            small: childImageSharp {
              fluid(maxWidth: 50, quality: 100) {
                ${GatsbyFluid_withWebp}
              }
            }
            medium: childImageSharp {
              fluid(maxWidth: 100, quality: 100) {
                ${GatsbyFluid_withWebp}
              }
            }
            large: childImageSharp {
              fluid(maxWidth: 328, quality: 100) {
                ${GatsbyFluid_withWebp}
              }
            }
          }
        }
      }
    }
  }`,
};

// module.exports.contentful = {
//   articles: `{
//     articles: allContentfulPost(sort: {fields: [date, title], order: DESC}, limit: 1000) {
//       edges {
//         node {
//           body {
//             childMdx {
//               body
//               timeToRead
//             }
//           }
//           excerpt
//           title
//           slug
//           secret
//           date(formatString: "MMMM Do, YYYY")
//           dateForSEO: date
//           hero {
//             full: fluid(maxWidth: 944, quality: 100) {
//               ${GatsbyFluid_withWebp}
//             }
//             regular: fluid(maxWidth: 653, quality: 100) {
//               ${GatsbyFluid_withWebp}
//             }
//             narrow: fluid(maxWidth: 457, quality: 100) {
//               ${GatsbyFluid_withWebp}
//             }
//             seo: fixed(width: 1200, quality: 100) {
//               src
//             }
//           }
//           id
//           author {
//             name
//           }
//         }
//       }
//     }
//   }
//   `,
//   authors: `{
//     authors: allContentfulAuthor {
//       edges {
//         node {
//           fields {
//             authorsPage
//             slug
//           }
//           bio
//           id
//           name
//           social
//           featured
//         }
//       }
//     }
//   }`,
// };