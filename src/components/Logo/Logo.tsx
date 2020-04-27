import useStickyOnScrolled from '@components/UseStickyScroll';
import { mediaquery } from '@styles/media';
import { Icon } from '@types';
import { ITAOAThemeUIContext } from '@types';
import { theme } from '@utils';

import { css } from '@emotion/core';
import styled from '@emotion/styled';
import * as CSS from 'csstype';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { useColorMode } from 'theme-ui';

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            logo {
              text
            }
          }
        }
      }
    }
  }
`;

/** Logo is simply the acronym of the site in a nice font
 */
const Logo: Icon = () => {
  const { text } = useStaticQuery(siteQuery).allSite.edges[0].node.siteMetadata.logo;

  const [colorMode] = useColorMode();
  const stickyHeader = useStickyOnScrolled();
  const tcolors = colorMode === 'dark' ? theme.colors.modes.dark : theme.colors;

  const logoHov = css({
    '&:hover': {
      background: stickyHeader ? tcolors.tintBackground : tcolors.background
    }
  });

  return (
    <LogoContainer>
      <LogoFont css={logoHov}>{text}</LogoFont>
    </LogoContainer>
  );
};

export default Logo;

const LogoContainer = styled.div({
  '.Logo__Mobile': {
    display: 'none'
  },

  [mediaquery.tablet()]: {
    '.Logo__Desktop': {
      display: 'none'
    },

    '.Logo__Mobile': {
      display: 'block'
    }
  }
});

const LogoFont = styled.h1((p: ITAOAThemeUIContext) => ({
  fontFamily: p.theme.fonts.heebo,
  transition: p.theme.colorModeTransition,
  color: p.theme.colors.background,
  background: p.theme.colors.invbackground as CSS.ColorProperty,
  padding: '5px 10px 3px 10px',

  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '38px',

  '&:hover': {
    color: p.theme.colors.invbackground as CSS.ColorProperty,
    background: `${
      p.stickyHeader ? p.theme.colors.tintBackground : p.theme.colors.background
    }` as CSS.ColorProperty
  },

  [mediaquery.desktop()]: {
    verticleAlign: 'middle',
    fontSize: '34px'
  },

  [mediaquery.tablet()]: {
    verticleAlign: 'middle',
    fontSize: '28px'
  },

  [mediaquery.phablet()]: {
    fontSize: '26px',
    verticleAlign: 'middle',
    '-webkit-line-clamp': 3,
    padding: '3px 7px 1px 7px'
  },

  [mediaquery.phone()]: {
    padding: '3px 7px 1px 7px'
  }
}));
