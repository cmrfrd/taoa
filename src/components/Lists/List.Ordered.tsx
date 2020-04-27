import { mediaquery } from '@styles/media';
import mediaqueries from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import { css } from '@emotion/core';
import styled from '@emotion/styled';
import * as CSS from 'csstype';

const OrderedList = styled.ol((p: ITAOAThemeUIContext) =>
  css({
    listStyle: 'none',
    counterReset: 'list',
    color: p.theme.colors.articleText as CSS.ColorProperty,
    position: 'relative',
    padding: '15px 0 30px 0px',
    margin: '0 auto',
    transition: p.theme.colorModeTransition,
    fontSize: '18px',

    width: '100%',
    maxWidth: '780px',

    [mediaquery.desktop()]: {
      maxWidth: '607px'
    },

    [mediaquery.tablet()]: {
      maxWidth: '586px',
      paddingLeft: '0px',
      fontSize: '16px'
    },

    [mediaquery.phablet()]: {
      padding: '0 20px',
      fontSize: '14px'
    },

    li: {
      position: 'relative',
      paddingBottom: '15px',

      [mediaqueries.tablet()]: {
        paddingLeft: '30px'
      },

      [mediaqueries.phablet()]: {
        paddingLeft: '30px'
      },

      p: {
        [mediaqueries.tablet()]: {
          padding: 0
        }
      }
    },

    'li > :not(ol, ul)': {
      display: 'inline-block',
      color: 'red'
    },

    'li > p': {
      display: 'inline-block',
      paddingLeft: '3rem'
    },

    'li::before': {
      display: 'block',
      position: 'absolute',
      color: p.theme.colors.articleText as CSS.ColorProperty,
      content: `counter(list) '.'`,
      top: '0.2rem',
      width: '2.5rem',
      counterIncrement: 'list',
      fontWeight: 600,

      [mediaquery.tablet()]: {
        left: 0,
        fontSize: '18px'
      },

      [mediaquery.phablet()]: {
        fontSize: '16px'
      }
    }
  })
);

export default OrderedList;
