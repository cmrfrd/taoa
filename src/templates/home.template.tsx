import Hero from '../sections/posts/Hero';
import PostsList from '../sections/posts/Posts.List';

import { MediumButton } from '@components/Button';
import Headings from '@components/Headings';
import LoadingContainer from '@components/Loading';
import SEO from '@components/SEO';
import Section from '@components/Section';
import { mediaquery, mediaqueryup } from '@styles/media';
import { Template, TTemplate, ITAOAThemeUIContext } from '@types';

import { css } from '@emotion/react';
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
    <LoadingContainer>
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
    </LoadingContainer>
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

const PostsHeading = styled(Headings.h2)((p: ITAOAThemeUIContext) => ({
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
  },

  [mediaquery.phablet()]: {
    padding: '0 10px'
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
  flexDirection: 'row',
  [mediaquery.phablet()]: {
    position: 'relative',
    display: 'block',
    textAlign: 'center'
  }
});
