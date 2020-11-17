import { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import * as CSS from 'csstype';

const UnorderedList = styled.ul((p: ITAOAThemeUIContext) => ({
  listStyleType: 'circle',
  counterReset: 'list',
  color: p.theme.colors.postText as CSS.ColorProperty,
  padding: '15px 0 15px 30px',
  margin: '0 auto',
  transition: p.theme.colorModeTransition,
  position: 'relative',
  display: 'inline-block',

  width: '100%',
  maxWidth: '780px',

  [mediaquery.desktop()]: {
    maxWidth: '607px'
  },

  [mediaquery.tablet()]: {
    maxWidth: '586px'
  },

  [mediaquery.phablet()]: {
    paddingLeft: '20px'
  },

  [mediaquery.phone()]: {
    paddingLeft: '40px'
  },

  li: {
    position: 'relative',

    p: {
      listStyle: 'none',
      paddingLeft: '0px'
    }
  },

  'li > :not(ol, ul)': {
    display: 'inline'
  }
}));

export default UnorderedList;
