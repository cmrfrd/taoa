import React, { useEffect, useState } from 'react';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import { useColorMode } from 'theme-ui';

import NavigationFooter from '@components/Navigation/Navigation.Footer';
import NavigationHeader from '@components/Navigation/Navigation.Header';
import ArticlesContextProvider from '../../sections/articles/Articles.List.Context';

import { globalStyles } from '@styles';

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess we need to create our Desktop and Mobile experiences.
 */
const Layout: React.FC<{}> = ({ children, enableGridRow = false }) => {
    const [colorMode] = useColorMode();

    useEffect(() => {
        parent.postMessage({ theme: colorMode }, '*');
    }, [colorMode]);

    return (
        <ArticlesContextProvider>
            <Container>
                <HeaderTexture />
                <Global styles={globalStyles} />
                <NavigationHeader enableGridRow={enableGridRow} />
                {children}
                <NavigationFooter />
            </Container>
        </ArticlesContextProvider>
    );
}

export default Layout;

const Container = styled.div`
    position: relative;
    background: ${p => p.theme.colors.background};
    transition: ${p => p.theme.colorModeTransition};
    min-height: 100vh;
`;

/* const HeaderGradient = styled.div`
 * position: absolute;
 * top: 0;
 * left: 0;
 * width: 100 %;
 * height: 100px;
 * z - index: 0;
 * pointer - events: none;
 * background: ${ p => p.theme.colors.gradient };
 * transition: ${ p => p.theme.colorModeTransition };
 * `;
 *  */

const HeaderTexture = styled.div(p => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "250px",
    zIndex: 0,
    pointerEvents: "none",
}))

// Maybe one day
/*
   backgroundImage: "linear-gradient(to bottom, rgba(66, 81, 98, 0.28), " + p.theme.colors.background + "), url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E\")"
 */
