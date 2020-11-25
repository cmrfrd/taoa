import { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import * as CSS from 'csstype';

const UnorderedList = styled.ul((p: ITAOAThemeUIContext) => ({
  listStyleType: 'disc',
  color: p.theme.colors.postText as CSS.ColorProperty,
  padding: '0px 0 0px 0px',
  paddingTop: '10px !important',
  paddingLeft: '20px !important',
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
    maxWidth: '586px'
  },

  [mediaquery.phablet()]: {
    paddingLeft: '40px !important'
  },

  'li > ul': {
    display: 'list-item',
    textAlign: 'left',
    [mediaquery.tablet()]: {
      paddingLeft: '20px !important'
    },
    [mediaquery.phablet()]: {
      paddingLeft: '20px !important'
    }
  },

  'li ul > li': {
    margin: 0
  },

  li: {
    display: 'list-item',
    p: {
      paddingLeft: '0px',
      fontSize: '18px',
      padding: '5px 0 5px 0',

      [mediaquery.tablet()]: {
        fontSize: '16px'
      },

      [mediaquery.phablet()]: {
        fontSize: '14px'
      }
    }
  },

  '> li::marker': {
    color: p.theme.colors.postText as CSS.ColorProperty
  }
}));

export default UnorderedList;
