import { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import * as CSS from 'csstype';
import React from 'react';

const StyledTable = styled.table((p: ITAOAThemeUIContext) => ({
  position: 'relative',
  lineHeight: 1.65,
  color: p.theme.colors.grey as CSS.ColorProperty,
  fontFamily: p.theme.fonts.sansSerif,
  transition: p.theme.colorModeTransition,
  background: p.theme.colors.card as CSS.ColorProperty,
  margin: '45px auto 85px',
  width: '100%',
  maxWidth: '804px',
  border: `1px solid ${p.theme.colors.horizontalRule}`,
  borderRadius: '5px',
  overflow: 'hidden',
  borderCollapse: 'separate',

  [mediaquery.desktop()]: {
    margin: '25px auto 65px',
    maxWidth: '750px'
  },

  [mediaquery.tablet()]: {
    maxWidth: '486px'
  },

  [mediaquery.phablet()]: {
    margin: '15px auto 55px'
  }
}));

interface ITableProps {
  children: React.ReactNode;
}

const Table: React.FC<ITableProps> = ({ children }: ITableProps) => {
  return (
    <div style={{ overflowX: 'auto', padding: '0 20px' }}>
      <StyledTable>{children}</StyledTable>
    </div>
  );
};

export default Table;
