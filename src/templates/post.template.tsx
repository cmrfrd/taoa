import PostHero from '../sections/post/Post.Hero';
import PostsNext from '../sections/post/Post.Next';
import PostSEO from '../sections/post/Post.SEO';
import PostShare from '../sections/post/Post.Share';

import Headings from '@components/Headings';
import LoadingContainer from '@components/Loading';
import MDX from '@components/MDX';
import Section from '@components/Section';
import { mediaquery } from '@styles/media';
import { Template, TTemplate, ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useRef } from 'react';

import 'katex/dist/katex.min.css';

const postQuery = graphql`
  {
    site {
      siteMetadata {
        siteName
      }
    }
  }
`;

/**
 * Post page layout. Every post's content comes from MDX
 * and suggests next posts, comments, and how to email subscribe
 */
const Post: Template = props => {

  const { children, pageContext, location } = props;
  const contentSectionRef = useRef<HTMLElement>(null);

  const { post, authors, next, postPageData } = pageContext;
  const { nextPostText } = postPageData.edges[0].node.post;
  const { siteName } = useStaticQuery(postQuery).site.siteMetadata;

  return (
    <LoadingContainer>
      <PostSEO post={post} authors={authors} location={location} />
      <PostHero post={post} authors={authors} />
      <PostBody ref={contentSectionRef}>
        <MDX content={post.body}>
          {children}
          <PostShare />
        </MDX>
      </PostBody>
      {next.length > 0 && (
        <NextPost narrow>
          <FooterNext>
            {nextPostText} {siteName}
          </FooterNext>
          <PostsNext posts={next} />
          <FooterSpacer />
        </NextPost>
      )}
    </LoadingContainer>
  );
};

export default Post;

const PostBody = styled.article({
  position: 'relative',
  padding: '110px 0 35px',
  transition: 'background 0.2s linear',

  [mediaquery.desktop()]: {
    padding: '110px 0 35px'
  },

  [mediaquery.tablet()]: {
    padding: '110px 10px 80px'
  },

  [mediaquery.phablet()]: {
    padding: '110px 0'
  }
});

const NextPost = styled(Section)({
  display: 'block'
});

const FooterNext = styled(Headings.h6)((p: ITAOAThemeUIContext) => ({
  position: 'relative',
  opacity: 0.25,
  marginTop: '30px',
  marginBottom: '60px',
  fontWeight: 400,
  color: `${p.theme.colors.primary}`,
  padding: 0,

  [mediaquery.tablet()]: {
    marginBottom: '40px'
  },

  [mediaquery.phone()]: {
    textAlign: 'center',
    fontSize: '12px'
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    background: `${p.theme.colors.grey}`,
    width: `calc(100% - 400px)`,
    height: '1.25px',
    right: 0,
    top: '10px',

    [mediaquery.tablet()]: {
      height: '1px',
      width: `calc(100% - 370px)`
    },

    [mediaquery.phablet()]: {
      width: `calc(100% - 300px)`
    },

    [mediaquery.phone_large()]: {
      width: '0'
    }
  }
}));

const FooterSpacer = styled.div({
  marginBottom: '65px'
});
