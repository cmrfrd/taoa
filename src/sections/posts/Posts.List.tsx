import { GridLayoutContext } from './Posts.List.Context';

import FadeTransition from '@components/FadeTransition';
import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';
import mediaqueries, { mediaquery } from '@styles/media';
import { IPost, ITAOAThemeUIContext } from '@types';

import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Link, graphql, useStaticQuery } from 'gatsby';
import React, { useContext } from 'react';

/**
 * Tiles
 * [LONG], [SHORT]
 * [SHORT], [LONG]
 * [SHORT], [LONG]
 *
 * or ------------
 *
 * Rows
 * [LONG]
 * [LONG]
 * [LONG]
 */

interface IPostsListProps {
  posts: IPost[];
  alwaysShowAllDetails?: boolean;
  currentPage: number;
}

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            transition {
              gridRowAnimationDurationSeconds
            }
          }
        }
      }
    }
  }
`;

const PostsList: React.FC<IPostsListProps> = ({
  posts,
  alwaysShowAllDetails,
  currentPage,
  searching
}: IPostsListProps) => {
  if (!posts) return null;

  const { gridLayout } = useContext(GridLayoutContext);
  const { gridRowAnimationDurationSeconds } = useStaticQuery(
    siteQuery
  ).allSite.edges[0].node.siteMetadata.transition;

  /*
   * Three transitions are here for three possible interactions that
   * can affect the visibility of the posts.
   * 1. Change from grid layout to row layout
   * 2. Change of page
   * 3. Searching for an post
   */
  return (
    <PostsListContainer alwaysShowAllDetails={alwaysShowAllDetails}>
      <FadeTransition
        animatePresenceProps={{ initial: false, exitBeforeEnter: true }}
        motionKey={currentPage}
        duration={gridRowAnimationDurationSeconds}
      >
        <FadeTransition
          animatePresenceProps={{ exitBeforeEnter: true }}
          motionKey={gridLayout}
          duration={gridRowAnimationDurationSeconds}
        >
          <FadeTransition
            animatePresenceProps={{ exitBeforeEnter: true }}
            motionKey={searching}
            duration={gridRowAnimationDurationSeconds}
            motionProps={{
              animate: searching ? 'exit' : 'enter'
            }}
          >
            <ListLayoutContainer key={gridLayout} gridLayout={gridLayout} posts={posts} />
          </FadeTransition>
        </FadeTransition>
      </FadeTransition>
    </PostsListContainer>
  );
};

export default PostsList;

interface IListLayoutContainerProps {
  posts: any;
  gridLayout: any;
}

const ListLayoutContainer: React.FC<IListLayoutContainerProps> = ({
  posts,
  gridLayout,
  ...props
}: IListLayoutContainerProps) => {
  return (
    <List gridLayout={gridLayout} reverse={true}>
      {[...posts].map((ap: IPost, index: number) => (
        <ListItem key={index} post={ap} narrow={true} gridLayout={gridLayout} />
      ))}
    </List>
  );
};

interface IPostsListItemProps {
  post: IPost;
  narrow?: boolean;
  gridLayout: string;
}

const ListItem: React.FC<IPostsListItemProps> = ({
  post,
  narrow,
  gridLayout
}: IPostsListItemProps) => {
  if (!post) return null;

  const hasOverflow = narrow && post.title.length > 35;
  const imageSource = narrow ? post.hero.narrow : post.hero.regular;
  const hasHeroImage =
    imageSource && Object.keys(imageSource).length !== 0 && imageSource.constructor === Object;

  return (
    <PostLink to={post.slug} data-a11y="false">
      <Item gridLayout={gridLayout}>
        <ImageContainer narrow={narrow} gridLayout={gridLayout}>
          {hasHeroImage ? <Image src={imageSource} /> : <ImagePlaceholder />}
        </ImageContainer>
        <div>
          <Title hasOverflow={hasOverflow} gridLayout={gridLayout}>
            {post.title}
          </Title>
          <Excerpt narrow={narrow} hasOverflow={hasOverflow} gridLayout={gridLayout}>
            {post.excerpt}
          </Excerpt>
          <MetaData>
            {post.date} · {post.timeToRead} min read
          </MetaData>
        </div>
      </Item>
    </PostLink>
  );
};

const wide = '1fr';
const narrow = '1fr';

const limitToTwoLines = css`
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;

  ${mediaqueries.phablet`
                       -webkit-line-clamp: 3;
`}
`;

const showDetails = css`
  p {
    display: -webkit-box;
  }

  h2 {
    margin-bottom: 10px;
  }
`;

const PostsListContainer = styled.div<{ alwaysShowAllDetails?: boolean }>`
  transition: opacity 0.25s;
  padding-top: 20px;
  min-height: 300px;
  ${p => p.alwaysShowAllDetails && showDetails}
`;

const listTile = p => css`
  position: relative;
  display: grid;
  grid-template-columns: ${narrow} ${narrow};
  grid-template-rows: 2;
  column-gap: 60px;

  &:not(:last-child) {
    margin-bottom: 75px;
  }

  ${mediaqueries.desktop_medium`
grid-template-columns: 1fr 1fr;
`}

  ${mediaqueries.tablet`
grid-template-columns: 1fr;

                  &:not(:last-child) {
                      margin-bottom: 0;
                  }
`}
`;

const listItemRow = p => css`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 500px;
  grid-column-gap: 120px;
  grid-template-rows: 1;
  align-items: center;
  position: relative;
  margin-bottom: 20px;

  ${mediaqueries.desktop`
grid-column-gap: 24px;
grid-template-columns: 1fr 380px;
`}

  ${mediaqueries.tablet`
grid-template-columns: 1fr;
`}

  @media (max-width: 540px) {
    background: ${p.theme.colors.card};
  }

  ${mediaqueries.phablet`
box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
border-bottom-right-radius: 5px;
border-bottom-left-radius: 5px;
`}
`;

const listItemTile = p => css`
  position: relative;

  ${mediaqueries.tablet`
margin-bottom: 60px;
`}

  @media (max-width: 540px) {
    background: ${p.theme.colors.card};
  }

  ${mediaqueries.phablet`
margin-bottom: 40px;
box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
border-bottom-right-radius: 5px;
border-bottom-left-radius: 5px;
`}
`;

// If only 1 post, dont create 2 rows.
const listRow = p => css`
  display: grid;
  grid-template-rows: '1fr 1fr';
`;

const List = styled.div<{
  reverse: boolean;
  gridLayout: string;
}>`
  justify-content: ${p => (p.gridLayout === 'tiles' ? 'space-between' : 'none')};
  ${p => (p.gridLayout === 'tiles' ? listTile : listRow)}
`;

const Item = styled.div<{ gridLayout: string }>`
  ${p => (p.gridLayout === 'rows' ? listItemRow : listItemTile)}
`;

const ImageContainer = styled.div<{ narrow: boolean; gridLayout: string }>`
  background: ${p => p.theme.colors.invPrimary};
  position: relative;
  height: '200px';
  width: '100%';
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, ${p => (p.narrow ? 0.22 : 0.3)}),
    0 18px 36px -18px rgba(0, 0, 0, ${p => (p.narrow ? 0.25 : 0.33)});
  margin-bottom: ${p => (p.gridLayout === 'tiles' ? '30px' : 0)};
  transition: transform 0.3s var(--ease-out-quad), box-shadow 0.3s var(--ease-out-quad);

  & > div {
    height: 100%;
  }

  ${mediaqueries.tablet`
height: 200px;
margin-bottom: 35px;
`}

  ${mediaqueries.phablet`
overflow: hidden;
margin-bottom: 0;
box-shadow: none;
border-top-right-radius: 5px;
border-top-left-radius: 5px;
`}
`;

const Title = styled(Headings.h2)`
  font-size: 21px;
  font-family: ${p => p.theme.fonts.serif};
  margin-bottom: ${p => (p.hasOverflow && p.gridLayout === 'tiles' ? '35px' : '10px')};
  transition: color 0.3s ease-in-out;
  ${limitToTwoLines};

  ${mediaqueries.desktop`
margin-bottom: 15px;
`}

  ${mediaqueries.tablet`
font-size: 24px;
`}

  ${mediaqueries.phablet`
font-size: 22px;
padding: 15px 20px 0;
margin-bottom: 10px;
             -webkit-line-clamp: 3;
`}
`;

interface IExcerptProps extends ITAOAThemeUIContext {
  hasOverflow: boolean;
  narrow: boolean;
  gridLayout: string;
}

//    ${limitToTwoLines};
const Excerpt = styled.p((p: IExcerptProps) => ({
  fontSize: '16px',
  marginBottom: '10px',
  color: `${p.theme.colors.grey}`,
  display: p.hasOverflow && p.gridLayout === 'tiles' ? 'none' : 'box',
  maxWidth: p.narrow ? '415px' : '515px',

  [mediaquery.desktop()]: {
    display: '-webkit-box'
  },

  [mediaquery.phablet()]: {
    marginBottom: '15px'
  },

  [mediaquery.phablet()]: {
    maxWidth: '100%',
    padding: '0 20px',
    marginBottom: '10px',
    WebkitLineClamp: 3
  }
}));

const MetaData = styled.div((p: ITAOAThemeUIContext) => ({
  fontWeight: 600,
  fontSize: '16px',
  color: `${p.theme.colors.grey}`,
  opacity: 0.33,

  [mediaquery.phablet()]: {
    maxWidth: '100%',
    padding: '0 20px 20px'
  }
}));

const PostLink = styled(Link)((p: ITAOAThemeUIContext) => ({
  position: 'relative',
  display: 'block',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  paddingBottom: '30px',
  borderRadius: '5px',
  zIndex: 1,
  transition: 'transform 0.33s var(--ease-out-quart)',

  [`&:hover ${ImageContainer}, &:focus ${ImageContainer}`]: {
    transform: 'translateY(-1px)',
    boxShadow: '0 50px 80px -20px rgba(0, 0, 0, 0.27), 0 30px 50px -30px rgba(0, 0, 0, 0.3)'
  },

  [`&:hover h2, &:focus h2`]: {
    color: `${p.theme.colors.accent}`
  },

  [`&[data-a11y='true']:focus::after`]: {
    content: ' ',
    position: 'absolute',
    left: '-1.5%',
    top: '-2%',
    width: '103%',
    height: '104%',
    border: `3px solid ${p.theme.colors.accent}`,
    background: `rgba(255, 255, 255, 0.01)`,
    borderRadius: `5px`
  },

  [mediaquery.phablet()]: {
    [`&:hover ${ImageContainer}`]: {
      transform: 'none',
      boxShadow: 'initial'
    },

    '&:active': {
      transform: 'scale(0.97) translateY(3px)'
    }
  }
}));

/* const PostLink = styled(Link)`
 *   position: relative;
 *   display: block;
 *   width: 100%;
 *   height: 100%;
 *   top: 0;
 *   left: 0;
 *   padding-bottom: 30px;
 *   border-radius: 5px;
 *   z-index: 1;
 *   transition: transform 0.33s var(--ease-out-quart);
 *   -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
 *
 *   &:hover ${ImageContainer}, &:focus ${ImageContainer} {
 *     transform: translateY(-1px);
 *     box-shadow: 0 50px 80px -20px rgba(0, 0, 0, 0.27), 0 30px 50px -30px rgba(0, 0, 0, 0.3);
 *   }
 *
 *   &: hover h2;
 *   &:focus h2 {
 *     color: ${p => p.theme.colors.accent};
 *   }
 *
 *   &[data-a11y='true']:focus::after {
 *     content: ' ';
 *     position: absolute;
 *     left: -1.5%;
 *     top: -2%;
 *     width: 103%;
 *     height: 104%;
 *     border: 3px solid ${p => p.theme.colors.accent};
 *     background: rgba(255, 255, 255, 0.01);
 *     border-radius: 5px;
 *   }
 *
 *   ${mediaqueries.phablet`
 *                    &:hover ${ImageContainer} {
 *                        transform: none;
 *                        box-shadow: initial;
 *                    }
 *
 *                    &:active {
 *                        transform: scale(0.97) translateY(3px);
 *                    }
 * `}
 * `; */
