import { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import * as CSS from 'csstype';

const UnorderedList = styled.ul((p: ITAOAThemeUIContext) => ({
  listStyleType: 'disc',
  listStylePosition: 'outside',
  color: p.theme.colors.postText,
  padding: '0px 0 0px 0px',
  paddingTop: '10px !important',
  paddingBottom: '10px !important',
  margin: '0 auto',
  transition: p.theme.colorModeTransition,
  position: 'relative',
  paddingLeft: '20px',
  paddingRight: '20px',

  width: '100%',

  [mediaquery.tablet()]: {
    paddingLeft: '20px'
  },

  [mediaquery.phablet()]: {
    paddingLeft: '40px'
  },

  'li > ul': {
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
    fontSize: '18px',
    marginLeft: '0px',
    paddingLeft: '0px',

    [mediaquery.tablet()]: {
      fontSize: '16px'
    },

    [mediaquery.phablet()]: {
      fontSize: '14px'
    },
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
  }

  /* '> li::marker': {
   *   color: p.theme.colors.postText
   * } */
}));

export default UnorderedList;
