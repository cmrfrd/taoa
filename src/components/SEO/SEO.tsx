/**
 * This react helmt code is adapted from
 * https://themeteorchef.com/tutorials/reusable-seo-with-react-helmet.
 *
 * A great tutorial explaining how to setup a robust version of an
 * SEO friendly react-helmet instance.
 *
 *
 * Use the Helmt on pages to generate SEO and meta content!
 *
 * Usage:
 * <SEO
 *   title={title}
 *   description={description}
 *   image={image}
 * />
 *
 */

import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

interface IHelmetProps {
  title?: string;
  description?: string;
  pathname: string;
  image?: string;
  url?: string;
  canonicalUrl?: string;
  published?: string;
  timeToRead?: number;
  children?: React.ReactNode;
}

const seoQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            description
            social {
              url
            }
            siteUrl
            title
          }
        }
      }
    }
  }
`;

const themeUIDarkModeWorkaroundScript = [
  {
    type: 'text/javascript',
    innerHTML: `
    (function() {
      try {
        var mode = localStorage.getItem('theme-ui-color-mode');
        if (!mode) {
          localStorage.setItem('theme-ui-color-mode', 'light');
        }
      } catch (e) {}
    })();
  `
  }
];

const SEO: React.FC<IHelmetProps> = ({
  title,
  description,
  children,
  url,
  image,
  published,
  timeToRead,
  canonicalUrl
}: IHelmetProps) => {
  const results = useStaticQuery(seoQuery);
  const site = results.allSite.edges[0].node.siteMetadata;
  const twitter = site.social.find((option: any) => option.name === 'twitter') || {};

  const fullURL = (path: string): string => (path ? `${site.siteUrl}${path}` : '');

  const metaTags = [
    { charset: 'utf-8' },
    {
      'http-equiv': 'X-UA-Compatible',
      content: 'IE=edge'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      name: 'theme-color',
      content: '#fff'
    },
    { itemprop: 'name', content: title || site.title },
    { itemprop: 'description', content: description || site.description },
    { itemprop: 'image', content: fullURL(image) },
    { name: 'description', content: description || site.description },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: site.name },
    { name: 'twitter:title', content: title || site.title },
    { name: 'twitter:description', content: description || site.description },
    { name: 'twitter:creator', content: twitter.url },
    {
      name: 'twitter:image',
      content: fullURL(image)
    },

    { property: 'og:title', content: title || site.title },
    { property: 'og:url', content: url },
    { property: 'og:image', content: fullURL(image) },
    { property: 'og:description', content: description || site.description },
    { property: 'og:site_name', content: site.name }
  ];

  if (published) {
    metaTags.push({ name: 'post:published_time', content: published });
  }

  return (
    <Helmet
      title={title || site.title}
      htmlAttributes={{ lang: 'en' }}
      script={themeUIDarkModeWorkaroundScript}
      meta={metaTags}
    >
      <link rel="canonical" href={canonicalUrl} />
      {children}
    </Helmet>
  );
};

export default SEO;
