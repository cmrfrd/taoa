import { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import { Theme } from 'theme-ui';

/**
 * Example:
 * <Heading.h1>Lorem Ipsum</Heading.h1>
 */

const commonStyles = (p: ITAOAThemeUIContext): Theme => ({
  fontWeight: 'bold',
  color: p.theme.colors.primary,
  fontFamily: p.theme.fonts.monospace,
  width: '100%',

  [mediaquery.desktop_large()]: {
    maxWidth: '800px'
  },

  [mediaquery.tablet()]: {
    maxWidth: '586px'
  }
});

const h1 = styled.h1((p: ITAOAThemeUIContext) => ({
  ...commonStyles(p),

  wordBreak: 'keep-all',
  fontSize: '38px',
  lineHeight: '1.15',

  [mediaquery.desktop()]: {
    fontSize: '38px',
    lineHeight: '1.2'
  },

  [mediaquery.phablet()]: {
    fontSize: '32px',
    lineHeight: '1.3'
  }
}));

const h2 = styled.h2((p: ITAOAThemeUIContext) => ({
  ...commonStyles(p),

  wordBreak: 'keep-all',
  fontSize: '32px',
  lineHeight: '1.333',

  [mediaquery.desktop()]: {
    fontSize: '26px'
  },

  [mediaquery.tablet()]: {
    fontSize: '24px',
    lineHeight: '1.45'
  },

  [mediaquery.phablet()]: {
    fontSize: '22px'
  }
}));

const h3 = styled.h3((p: ITAOAThemeUIContext) => ({
  ...commonStyles(p),

  wordBreak: 'keep-all',
  fontSize: '24px',
  lineHeight: '1.45',

  [mediaquery.tablet()]: {
    fontSize: '22px'
  },

  [mediaquery.phablet()]: {
    fontSize: '20px'
  }
}));

const h4 = styled.h4((p: ITAOAThemeUIContext) => ({
  ...commonStyles(p),

  wordBreak: 'keep-all',
  fontSize: '22px',
  lineHeight: '1.45',

  [mediaquery.tablet()]: {
    fontSize: '20px'
  },

  [mediaquery.phablet()]: {
    fontSize: '18px'
  }
}));

const h5 = styled.h5((p: ITAOAThemeUIContext) => ({
  ...commonStyles(p),
  wordBreak: 'keep-all',
  fontSize: '18px',
  lineHeight: '1.45',

  [mediaquery.phablet()]: {
    fontSize: '16px'
  }
}));

const h6 = styled.h6((p: ITAOAThemeUIContext) => ({
  ...commonStyles(p),

  wordBreak: 'keep-all',
  fontSize: '16px',
  lineHeight: '1.45',

  [mediaquery.phablet()]: {
    fontSize: '14px'
  }
}));

export default {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6
};
