import ArticlesHero from '../sections/articles/Articles.Hero';
import ArticlesList from '../sections/articles/Articles.List';

import { MediumButton } from '@components/Button';
import Headings from '@components/Headings';
import Paginator from '@components/Navigation/Navigation.Paginator';
import SEO from '@components/SEO';
import Section from '@components/Section';
import mediaqueries, { mediaquery, mediaqueryup } from '@styles/media';
import { Template, TTemplate, ITAOAThemeUIContext } from '@types';

import { css } from '@emotion/core';
import { SerializedStyles } from '@emotion/serialize';
import styled from '@emotion/styled';
import * as CSS from 'csstype';
import { Link } from 'gatsby';
import React from 'react';

const HomePage: Template = ({ location, pageContext }: TTemplate) => {
  console.log('home context', pageContext);
  const {
    numberOfArticles,
    moreArticlesText,
    entriesHeadingText
  } = pageContext.homePageData.edges[0].node.home;

  const { articles } = pageContext;
  const articlesToShow = articles.slice(0, numberOfArticles);

  return (
    <span>
      <SEO pathname={location.pathname} />
      <ArticlesHero />
      <Section narrow>
        <Container>
          <EntriesHeading>{entriesHeadingText}</EntriesHeading>
          <ArticlesList articles={articlesToShow} />
          <LinkContainer>
            <Link to={'/articles'}>
              <MediumButton text={moreArticlesText} />
            </Link>
          </LinkContainer>
        </Container>
      </Section>
    </span>
  );
};

export default HomePage;

const Container = styled.div((p: ITAOAThemeUIContext) => ({
  position: 'relative',
  bottom: 0,
  left: 0,
  zIndex: 1,
  width: '100%',
  transition: p.theme.colorModeTransition
}));

const EntriesHeading = styled.h2`
    font-style: normal;
    font-size: 30px;
    line-height: 1.15;
    color: ${p => p.theme.colors.primary};
    padding-bottom: 20px;

    a {
    color: ${p => p.theme.colors.accent};
    }

    ${mediaqueries.desktop`
font-size: 20px
`}

    ${mediaqueries.phablet`
font-size: 14px;
`}

    ${mediaqueries.phone`
font-size: 14px;
`}
`;

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

const LinkContainer = styled.div((p: ITAOAThemeUIContext) => ({
  marginTop: '100px',
  display: 'flex',
  flexDirection: 'row'
}));

const LinkText = styled(Headings.h4)((p: ITAOAThemeUIContext) => ({
  transition: 'color 0.3s ease-in-out',
  '&:hover': {
    color: p.theme.colors.accent
  }
}));

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
