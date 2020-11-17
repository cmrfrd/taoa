import { mediaquery } from '@styles/media';
import mediaqueries from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import { css } from '@emotion/core';
import styled from '@emotion/styled';
import * as CSS from 'csstype';

const OrderedList = styled.ol((p: ITAOAThemeUIContext) => ({
  listStyleType: 'decimal',
  counterReset: 'ordered-list',
  color: p.theme.colors.postText as CSS.ColorProperty,
  padding: '15px 0 30px 0px',
  margin: '0 auto',
  transition: p.theme.colorModeTransition,
  position: 'relative',
  fontWeight: 400,

  width: '100%',
  maxWidth: '780px',

  [mediaquery.desktop()]: {
    maxWidth: '607px'
  },

  [mediaquery.tablet()]: {
    maxWidth: '586px',
    paddingLeft: '20px'
  },

  [mediaquery.phablet()]: {
    padding: '0 20px',
    paddingLeft: '20px'
  },

  [mediaquery.phone()]: {
    paddingLeft: '40px'
  },

  li: {
    paddingBottom: '15px',
    fontSize: '19px',

    [mediaquery.tablet()]: {
      fontSize: '17px'
    },

    [mediaquery.phablet()]: {
      fontSize: '15px'
    },

    p: {
      paddingLeft: '0px',
      fontSize: '18px',

      [mediaquery.tablet()]: {
        fontSize: '16px'
      },

      [mediaquery.phablet()]: {
        fontSize: '14px'
      }
    }
  },

  'li > :not(ol, ul)': {
    display: 'inline-block'
  }
}));

export default OrderedList;
