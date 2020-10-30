import PostsContextProvider from '../../sections/posts/Posts.List.Context';

import FadeTransition from '@components/FadeTransition';
import NavigationFooter from '@components/Navigation/Navigation.Footer';
import NavigationHeader from '@components/Navigation/Navigation.Header';
import { globalStyles } from '@styles';
import { TLayout, ITAOAThemeUIContext } from '@types';

import { Global } from '@emotion/core';
import styled from '@emotion/styled';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect } from 'react';
import { useColorMode } from 'theme-ui';

const durationQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            transition {
              pageAnimationDurationSeconds
            }
          }
        }
      }
    }
  }
`;

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess we need to create the Desktop and Mobile experiences.
 */
const Layout: React.FC<TLayout> = ({
  children,
  enableGridRow = false,
  gradient = true,
  location
}: TLayout) => {
  const [colorMode] = useColorMode();

  const { pageAnimationDurationSeconds } = useStaticQuery(
    durationQuery
  ).site.edges[0].node.siteMetadata.transition;

  useEffect(() => {
    parent.postMessage({ theme: colorMode }, '*');
  }, [colorMode]);

  return (
    <PostsContextProvider>
      <Container>
        <HeaderTexture />
        <Global styles={globalStyles} />
        <NavigationHeader enableGridRow={enableGridRow} initialArrowUp={false} />
        <FadeTransition
          animatePresenceProps={{ exitBeforeEnter: true }}
          motionKey={location.pathname}
          duration={pageAnimationDurationSeconds}
        >
          {children}
          <NavigationFooter gradient={gradient} />
        </FadeTransition>
      </Container>
    </PostsContextProvider>
  );
};

export default Layout;

const Container = styled.div((p: ITAOAThemeUIContext) => ({
  position: 'relative',
  background: p.theme.colors.background,
  transition: p.theme.colorModeTransition,
  minHeight: '100vh',
  overflow: 'hidden',
  scrollBehavior: 'smooth'
}));

const HeaderTexture = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '250px',
  zIndex: 0,
  pointerEvents: 'none'
});

// Maybe one day
/*
   backgroundImage: "linear-gradient(to bottom, rgba(66, 81, 98, 0.28), " + p.theme.colors.background + "), url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E\")"
 */
