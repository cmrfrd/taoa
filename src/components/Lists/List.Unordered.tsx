import { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import * as CSS from 'csstype';

const UnorderedList = styled.ul((p: ITAOAThemeUIContext) => ({
  listStyleType: 'circle',
  counterReset: 'list',
  color: p.theme.colors.postText as CSS.ColorProperty,
  padding: '0px 0 0px 20px',
  paddingTop: '10px !important',
  margin: '0 auto',
  transition: p.theme.colorModeTransition,
  position: 'relative',
  display: 'inline-block',

  width: '100%',
  maxWidth: '780px',

  [mediaquery.desktop_medium()]: {
    maxWidth: '607px'
  },

  [mediaquery.tablet()]: {
    maxWidth: '586px',
    paddingLeft: '20px !important'
  },
  [mediaquery.phablet()]: {
    paddingLeft: '40px !important'
  },

  'li > ul': {
    textAlign: 'left',
    [mediaquery.tablet()]: {
      paddingLeft: '20px !important'
    }
  },
  'li ul > li': {
    margin: 0
  },

  li: {
    position: 'relative',

    p: {
      listStyle: 'none',
      padding: '5px 0 5px 0',
      paddingLeft: '0px'
    }
  },

  'li > :not(ol, ul)': {
    display: 'inline'
  }
}));

export default UnorderedList;
