import { mediaquery } from '@styles/media';
import { TAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import { Theme } from 'theme-ui';

/**
 * Example:
 * <Heading.h1>Lorem Ipsum</Heading.h1>
 */

const commonStyles = (p: TAOAThemeUIContext): Theme => ({
  fontWeight: 'bold',
  color: p.theme.colors.primary,
  fontFamily: p.theme.fonts.monospace
});

const h1 = styled.h1((p: TAOAThemeUIContext) => ({
  ...commonStyles(p),

  wordBreak: 'keep-all',
  fontSize: '52px',
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

const h2 = styled.h2((p: TAOAThemeUIContext) => ({
  ...commonStyles(p),

  wordBreak: 'keep-all',
  fontSize: '32px',
  lineHeight: '1.333',

  [mediaquery.desktop()]: {
    fontSize: '21px'
  },

  [mediaquery.tablet()]: {
    fontSize: '24px',
    lineHeight: '1.45'
  },

  [mediaquery.phablet()]: {
    fontSize: '22px',
    padding: '0 20px'
  }
}));

const h3 = styled.h3((p: TAOAThemeUIContext) => ({
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

const h4 = styled.h4((p: TAOAThemeUIContext) => ({
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

const h5 = styled.h5((p: TAOAThemeUIContext) => ({
  ...commonStyles(p),
  wordBreak: 'keep-all',
  fontSize: '18px',
  lineHeight: '1.45',

  [mediaquery.phablet()]: {
    fontSize: '16px'
  }
}));

const h6 = styled.h6((p: TAOAThemeUIContext) => ({
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
