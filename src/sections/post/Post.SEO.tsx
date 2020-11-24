import React from 'react';

import SEO from '@components/SEO';

import { IPost, IAuthor } from '@types';
import { graphql, useStaticQuery } from 'gatsby';

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
            siteUrl
          }
        }
      }
    }
  }
`;

interface PostSEOProps {
  post: IPost;
  authors: IAuthor[];
  location: Location;
}

const PostSEO: React.FC<PostSEOProps> = ({ post, authors, location }) => {
  const results = useStaticQuery(siteQuery);
  const name = results.allSite.edges[0].node.siteMetadata.name;
  const siteUrl = results.allSite.edges[0].node.siteMetadata.siteUrl;

  const authorsData = authors.map(author => ({
    '@type': 'Person',
    name: author.name
  }));

  /**
   * For some reason `location.href` is undefined here when using `yarn build`.
   * That is why I am using static query `allSite` to get needed fields: name & siteUrl.
   */
  let microdata = `{
    "@context": "https://schema.org",
    "@type": "Post",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${siteUrl + location.pathname}"
    },
    "headline": "${post.title}",
    "image": "${siteUrl + post.hero.seo.src}",
    "datePublished": "${post.dateForSEO}",
    "dateModified": "${post.dateForSEO}",
    "author": ${JSON.stringify(authorsData)},
    "description": "${post.excerpt.replace(/"/g, '\\"')}",
    "publisher": {
      "@type": "Organization",
      "name": "${name}",
      "logo": {
        "@type": "ImageObject",
        "url": "${siteUrl}/icons/icon-512x512.png"
      }
    }
  }
`.replace(/"[^"]+"|(\s)/gm, function (matched, group1) {
    if (!group1) {
      return matched;
    } else {
      return '';
    }
  });
  /**
   * See here for the explanation of the regex above:
   * https://stackoverflow.com/a/23667311
   */

  return (
    <SEO
      title={post.title}
      description={post.excerpt}
      image={post.hero.seo.src}
      timeToRead={post.timeToRead}
      published={post.date}
      pathname={location.href}
      canonicalUrl={post.canonicalUrl}
    >
      <script type="application/ld+json">{microdata}</script>
    </SEO>
  );
};

export default PostSEO;
