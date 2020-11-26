import { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import * as CSS from 'csstype';

const OrderedList = styled.ol((p: ITAOAThemeUIContext) => ({
  listStyleType: 'decimal',
  listStylePosition: 'outside',
  color: p.theme.colors.postText as CSS.ColorProperty,
  paddingTop: '10px !important',
  margin: '0 auto',
  transition: p.theme.colorModeTransition,
  position: 'relative',
  width: '100%',
  paddingLeft: '20px',
  paddingRight: '20px',

  [mediaquery.tablet()]: {
    paddingLeft: '20px'
  },
  [mediaquery.phablet()]: {
    paddingLeft: '40px'
  },

  '> li::before': {
    fontWeight: 600
  },

  'li > ol': {
    textAlign: 'left',
    [mediaquery.tablet()]: {
      paddingLeft: '20px !important'
    },
    [mediaquery.phablet()]: {
      paddingLeft: '20px !important'
    }
  },

  'li::marker': {
    paddingLeft: '20px',
    fontWeight: 'bold',
    color: p.theme.colors.postText as CSS.ColorProperty
  },

  li: {
    fontSize: '19px',
    marginLeft: '0px',
    paddingLeft: '0px',

    [mediaquery.tablet()]: {
      fontSize: '17px'
    },

    [mediaquery.phablet()]: {
      fontSize: '15px'
    },

    p: {
      paddingLeft: '0px',
      fontSize: '18px',
      padding: '5px 0 5px 0',
      margin: '0',

      [mediaquery.tablet()]: {
        fontSize: '16px'
      },

      [mediaquery.phablet()]: {
        fontSize: '14px'
      }
    }
  }
}));

export default OrderedList;
