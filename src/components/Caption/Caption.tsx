import { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import * as CSS from 'csstype';

/** Caption is a styled component to display captions under
 *  Images
 */
const Caption = styled.span((p: ITAOAThemeUIContext) => ({
  display: 'inline-block',
  textAlign: 'center',
  lineHeight: '1.756',
  fontSize: '14px',
  color: p.theme.colors.grey as CSS.ColorProperty,
  fontFamily: p.theme.fonts.sansSerif,
  transition: p.theme.colorModeTransition,
  margin: '0 auto 25px',
  width: '100%',
  maxWidth: '780px',

  b: {
    fontWeight: 800
  },

  [mediaquery.desktop()]: {
    maxWidth: '607px'
  },

  [mediaquery.tablet()]: {
    maxWidth: '586px',
    margin: '0 auto 25px'
  },

  [mediaquery.phablet()]: {
    padding: '0 20px'
  }
}));

export default Caption;
