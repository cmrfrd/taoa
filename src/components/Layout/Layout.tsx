import ArticlesContextProvider from '../../sections/articles/Articles.List.Context';

import NavigationFooter from '@components/Navigation/Navigation.Footer';
import NavigationHeader from '@components/Navigation/Navigation.Header';
import { globalStyles } from '@styles';

import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import PageTransition from 'gatsby-plugin-page-transitions';
import React, { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import { useColorMode } from 'theme-ui';

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess we need to create our Desktop and Mobile experiences.
 */
const Layout: React.FC<{}> = ({ children, location, enableGridRow = false, gradient = true }) => {
  const [colorMode] = useColorMode();
  const [arrowUp, setArrowUp] = useState<boolean>(false);

  const defaultStyle = {
    transition: 'all 250ms cubic-bezier(0.47, 0, 0.75, 0.72)'
  };
  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 0 },
    exiting: { opacity: 0 },
    exited: { opacity: 1 }
  };

  useEffect(() => {
    parent.postMessage({ theme: colorMode }, '*');
  }, [colorMode]);

  return (
    <ArticlesContextProvider>
      <Container>
        <HeaderTexture />
        <Global styles={globalStyles} />
        <NavigationHeader
          enableGridRow={enableGridRow}
          initialArrowUp={location.state ? location.state.arrowUp : false}
        />
        <PageTransition transitionTime={250}>
          <Transition timeout={250}>
            {state => {
              return (
                <div
                  style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                  }}
                >
                  {children}
                  <NavigationFooter gradient={gradient} />
                </div>
              );
            }}
          </Transition>
        </PageTransition>
      </Container>
    </ArticlesContextProvider>
  );
};

export default Layout;

const Container = styled.div`
  position: relative;
  background: ${p => p.theme.colors.background};
  transition: ${p => p.theme.colorModeTransition};
  min-height: 100vh;
  overflow: hidden;
`;

const HeaderTexture = styled.div(p => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '250px',
  zIndex: 0,
  pointerEvents: 'none'
}));

// Maybe one day
/*
   backgroundImage: "linear-gradient(to bottom, rgba(66, 81, 98, 0.28), " + p.theme.colors.background + "), url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E\")"
 */
