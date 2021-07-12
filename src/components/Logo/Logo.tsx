import useStickyOnScrolled from '@components/UseStickyScroll';
import { mediaquery } from '@styles/media';
import { Icon } from '@types';
import { ITAOAThemeUIContext } from '@types';
import { theme } from '@utils';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as CSS from 'csstype';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { useColorMode } from 'theme-ui';

const logoTextQuery = graphql`
  {
    allComponentsYaml {
      edges {
        node {
          components {
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
const Logo: React.FC<Icon> = () => {
  const { text } = useStaticQuery(logoTextQuery).allComponentsYaml.edges[0].node.components.logo;

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
  padding: '4px 8px 2px 8px',

  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '30px',

  '&:hover': {
    color: p.theme.colors.invbackground as CSS.ColorProperty,
    background: `${
      p.stickyHeader ? p.theme.colors.tintBackground : p.theme.colors.background
    }` as CSS.ColorProperty
  },

  [mediaquery.desktop()]: {
    verticleAlign: 'middle',
    fontSize: '26px'
  },

  [mediaquery.tablet()]: {
    verticleAlign: 'middle',
    fontSize: '22px'
  },

  [mediaquery.phablet()]: {
    fontSize: '20px',
    verticleAlign: 'middle',
    WebkitLineClamp: 3,
    padding: '3px 7px 1px 7px'
  },

  [mediaquery.phone()]: {
    padding: '3px 7px 1px 7px'
  }
}));
