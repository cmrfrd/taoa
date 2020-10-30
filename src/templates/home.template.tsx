import Hero from '../sections/posts/Hero';
import PostsList from '../sections/posts/Posts.List';

import { MediumButton } from '@components/Button';
import Headings from '@components/Headings';
import SEO from '@components/SEO';
import Section from '@components/Section';
import { mediaquery, mediaqueryup } from '@styles/media';
import { Template, TTemplate, ITAOAThemeUIContext } from '@types';

import { css } from '@emotion/core';
import { SerializedStyles } from '@emotion/serialize';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import React from 'react';

const HomePage: Template = ({ location, pageContext }: TTemplate) => {
  const {
    numberOfPosts,
    morePostsText,
    postsHeadingText
  } = pageContext.homePageData.edges[0].node.home;

  const { posts } = pageContext;
  const postsToShow = posts.slice(0, numberOfPosts);

  return (
    <span>
      <SEO pathname={location.pathname} />
      <Hero />
      <Section narrow>
        <Container>
          <PostsHeading>{postsHeadingText}</PostsHeading>
          <PostsList posts={postsToShow} />
          <LinkContainer>
            <Link to={'/posts'}>
              <MediumButton text={morePostsText} />
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

const PostsHeading = styled.h2((p: ITAOAThemeUIContext) => ({
  fontStyle: 'normal',
  fontSize: '30px',
  lineHeight: '1.15',
  color: `${p.theme.colors.primary}`,
  paddingBottom: '20px',

  a: {
    color: `${p.theme.colors.accent}`
  },

  [mediaquery.desktop()]: {
    fontSize: '20px'
  }
}));

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

const LinkContainer = styled.div({
  marginTop: '100px',
  display: 'flex',
  flexDirection: 'row'
});

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
