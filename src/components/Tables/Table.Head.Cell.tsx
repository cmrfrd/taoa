import { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';

const Cell = styled.td((p: ITAOAThemeUIContext) => ({
  padding: '18px 30px',
  fontSize: '16px',
  background: `${p.theme.colors.card}`,

  [mediaquery.desktop()]: {
    padding: '14px 20px'
  },

  [mediaquery.tablet()]: {
    fontSize: '14px'
  }
}));

export default Cell;
