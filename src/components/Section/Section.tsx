import { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';

const Section = styled.section<{
  narrow?: boolean;
}>((p: ITAOAThemeUIContext) => ({
  width: '100%',
  maxWidth: '1220px',
  margin: '0 auto',
  padding: '0 4rem',

  [mediaquery.desktop()]: {
    maxWidth: '850px'
  },
  [mediaquery.phablet()]: {
    maxWidth: '100%'
  },

  ...(p.narrow
    ? {
        [mediaquery.tablet()]: {
          padding: '0 1rem',
          maxWidth: '527px'
        }
      }
    : {
        [mediaquery.tablet()]: {
          padding: '0 2rem',
          maxWidth: '567px'
        }
      })
}));

export default Section;
