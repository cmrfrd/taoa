import ArticlesHero from '../sections/articles/Articles.Hero';
import ArticlesList from '../sections/articles/Articles.List';

import Paginator from '@components/Navigation/Navigation.Paginator';
import SEO from '@components/SEO';
import Headings from '@components/Headings';
import Section from '@components/Section';
import { Template, TTemplate, ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import * as CSS from 'csstype';
import { Link, graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import mediaqueries, { mediaquery, mediaqueryup } from '@styles/media';
import { SerializedStyles } from '@emotion/serialize';
import { css } from '@emotion/core';

const numberOfArticlesQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            home {
              numberOfArticles
            }
          }
        }
      }
    }
  }
`;

const HomePage: Template = ({ location, pageContext }: TTemplate) => {
  const results = useStaticQuery(numberOfArticlesQuery);
  const { numberOfArticles } = results.site.edges[0].node.siteMetadata.home;

  const { articles } = pageContext;
  const articlesToShow = articles.slice(0, numberOfArticles);

  return (
    <span>
      <SEO pathname={location.pathname} />
      <ArticlesHero />
      <Section narrow>
        <ArticlesList articles={articlesToShow} />
        <LinkThingy>
          <Headings.h4>Thingy</Headings.h4>
        </LinkThingy>
      </Section>
      <ArticlesGradient />
    </span>
  );
};

export default HomePage;

const paginationItemMixin = (p: ITAOAThemeUIContext): SerializedStyles => css`
  line-height: 1;
  color: ${p.theme.colors.primary};
  padding: 0;
  width: 6.8rem;
  height: 6.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-variant-numeric: tabular-nums;

  ${mediaqueryup.desktop()} {
    display: block;
    width: auto;
    height: auto;
    padding: 2rem;

    &:first-of-type {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  }
`;

const LinkThingy = styled(Link)((p: ITAOAThemeUIContext) => ({}));

const Text = styled(Headings.h6)(
  (p: ITAOAThemeUIContext) => `
    font-family: ${p.theme.fonts.serif};
    transition: ${p.theme.colorModeTransition};
    font-size: 26px;

    ${mediaquery.desktop_large()} {
        font-size: 26px;
    };

    ${mediaquery.desktop()} {
        font-size: 26px;
    };

    ${mediaquery.tablet()} {
        font-size: 18px;
    };

    ${mediaquery.phablet()} {
        font-size: 18px;
    };

                   &::before {
                                content: ' ';
                                position: absolute;
                                width: 100%;
                                height: 3px;
                                bottom: 25%;
                                left: 0;
                                background-color: ${p.theme.colors.primary};
                                visibility: visible;
                                        -webkit-transform: scaleX(1);
                                transform: scaleX(1);
                                        -webkit-transition: all 0.25s ease-in-out 0s;
                                transition: all 0.25s ease-in-out 0s;
                            }

                   &:hover:before {
                       height: 3px';
                       color: ${p.theme.colors.grey};
                       visibility: none;
                              -webkit-transform: scaleX(0);
                       transform: scaleX(0);
                   }
    `
);

const ArticlesGradient = styled.div((p: ITAOAThemeUIContext) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '590px',
  zIndex: 0,
  pointerEvents: 'none',
  background: p.theme.colors.gradient as CSS.ColorProperty,
  transition: p.theme.colorModeTransition
}));

interface IArticlesPaginator extends ITAOAThemeUIContext {
  show: boolean;
}

const ArticlesPaginator = styled.div<{ show: boolean }>((p: IArticlesPaginator) => ({
  ...(p.show && { marginTop: '95px' })
}));
