import { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import { css } from '@emotion/core';
import styled from '@emotion/styled';
import * as CSS from 'csstype';

const UnorderedList = styled.ul((p: ITAOAThemeUIContext) =>
  css({
    listStyle: 'circle',
    listStylePosition: 'inside',
    counterReset: 'list',
    color: p.theme.colors.postText as CSS.ColorProperty,
    position: 'relative',
    padding: '15px 0 30px 30px',
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
      paddingLeft: '0px'
    },

    [mediaquery.phablet()]: {
      paddingLeft: '20px'
    },

    li: {
      position: 'relative',
      paddingBottom: '15px',

      [mediaquery.tablet()]: {
        paddingLeft: '0px'
      },

      [mediaquery.phablet()]: {
        paddingLeft: '0px'
      },

      p: {
        [mediaquery.tablet()]: {
          padding: 0
        }
      }
    },

    'li > :not(ol, ul)': {
      display: 'inline'
    },

    'li::before': {
      display: 'inline-block',
      position: 'absolute',
      color: p.theme.colors.postText as CSS.ColorProperty,
      content: ' ',
      left: '-30px',
      top: '8px',
      height: '8px',
      width: '8px',
      background: p.theme.colors.postText as CSS.ColorProperty,

      [mediaquery.tablet()]: {
        left: 0
      }
    }
  })
);

export default UnorderedList;
