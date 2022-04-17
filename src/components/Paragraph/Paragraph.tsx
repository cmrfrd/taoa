import { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import * as CSS from 'csstype';

export const commonStyles = (p: ITAOAThemeUIContext): any => ({
  width: '100%',
  paddingTop: '10px',
  paddingBottom: '10px',

  [mediaquery.desktop()]: {
    maxWidth: '607px'
  },
   
  [mediaquery.tablet()]: {
    maxWidth: '586px',
    margin: '0 auto 25px',
  },
});


const Paragraph = styled.p((p: ITAOAThemeUIContext) => ({
  ...commonStyles(p),
  maxWidth: '800px',
  lineHeight: '1.756',
  fontSize: '18px',
  color: p.theme.colors.postText,
  fontFamily: p.theme.fonts.sansSerif,
  transition: p.theme.colorModeTransition,

  b: {
    fontWeight: 800
  },

  [mediaquery.tablet()]: {
    fontSize: '16px'
  },

  [mediaquery.phablet()]: {
    fontSize: '14px'
  }
}));

export default Paragraph;
