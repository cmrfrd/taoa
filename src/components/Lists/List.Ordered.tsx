import { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import * as CSS from 'csstype';

const OrderedList = styled.ol((p: ITAOAThemeUIContext) => ({
  listStyle: 'none',
  listStylePosition: 'inside',
  counterReset: 'foo',
  color: p.theme.colors.postText as CSS.ColorProperty,
  padding: '0px 0 0px 0px',
  paddingLeft: '0px',
  margin: '0 auto',
  transition: p.theme.colorModeTransition,
  position: 'relative',

  width: '100%',

  'li > ol': {
    textAlign: 'left',
    [mediaquery.phablet()]: {
      padding: '0px 0px'
    }
  },
  'li ol > li': {
    margin: 0
  },
  'li ol > li:before': {
    content: "counter(foo) '.'"
  },

  li: {
    listStyle: 'none',
    display: 'table',
    fontSize: '19px',
    counterIncrement: 'foo',

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

  'li::before': {
    content: "counter(foo) '.'",
    display: 'table-cell',
    textAlign: 'left',
    fontWeight: 600,
    paddingRight: '10px'
  }
}));

export default OrderedList;
