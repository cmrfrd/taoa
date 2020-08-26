import { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import * as CSS from 'csstype';

/**
 * Blockquote is a component for display quotes!
 */
const Blockquote = styled.blockquote((p: ITAOAThemeUIContext) => ({
  transition: p.theme.colorModeTransition,
  margin: '15px auto 50px',
  color: p.theme.colors.articleText as CSS.ColorProperty,
  fontFamily: p.theme.fonts.serif,
  fontStyle: 'italic',
  textAlign: 'center',

  [mediaquery.tablet()]: {
    margin: '10px auto 35px'
  },

  '& > p': {
    fontFamily: p.theme.fonts.serif,
    maxWidth: '880px !important',
    paddingBottom: 0,
    width: '100%',
    margin: '0 auto',
    fontSize: '36px',
    lineHeight: 1.32,
    fontWeight: 'bold',

    [mediaquery.tablet()]: {
      fontSize: '26px',
      padding: '0 180px'
    },

    [mediaquery.phablet()]: {
      fontSize: '36px',
      padding: '0 20px 0 40px'
    }
  }
}));

export default Blockquote;
