import { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';

const Section = styled.section<{
  narrow?: boolean;
}>((p: ITAOAThemeUIContext) => ({
  width: '100%',
  maxWidth: '820px',
  margin: '0 auto',
  padding: '0 4rem',

  [mediaquery.desktop()]: {
    maxWidth: '850px'
  },
  [mediaquery.phablet()]: {
    padding: '0 20px'
    /* maxWidth: '100%' */
  },

  ...(p.narrow
    ? {
        [mediaquery.tablet()]: {
          padding: '0 10px',
          maxWidth: '527px'
        }
      }
    : {
        [mediaquery.tablet()]: {
          padding: '0 24px',
          maxWidth: '567px'
        }
      })
}));

export default Section;
