import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';

/**
 * Anchor is a styled link
 */
const Anchor = styled.a((p: ITAOAThemeUIContext) => ({
  transition: p.theme.colorModeTransition,
  color: p.theme.colors.accent,

  '&:visited': {
    color: p.theme.colors.accent,
    opacity: '0.85'
  },

  '&:hover,&:focus': {
    textDecoration: 'underline'
  }
}));

export default Anchor;
