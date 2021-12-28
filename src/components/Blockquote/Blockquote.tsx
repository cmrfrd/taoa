import { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';

/**
 * Blockquote is a component for display quotes!
 */
const Blockquote = styled.blockquote((p: ITAOAThemeUIContext) => ({
  transition: p.theme.colorModeTransition,
  color: p.theme.colors.postText,
  borderLeft: `10px solid ${p.theme.colors.postText}`,
  margin: '0 auto',
  padding: '10px 10px 10px 10px',

  [mediaquery.phablet()]: {
    paddingRight: '20px'
  }
}));

export default Blockquote;
