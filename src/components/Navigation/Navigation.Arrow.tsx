import { ITAOAThemeUIContext } from '@types';
import styled from '@emotion/styled';
import React from 'react';

import './arrow.scss';

/* Component to display menu arrow */
const ArrowIcon: React.FC<{}> = (props: any) => {
  const open = props.isOpen;
  return (
    <ArrowIconContainer className={open ? 'arrow-icon open' : 'arrow-icon'}>
      <ArrowSpan className="left-bar"></ArrowSpan>
      <ArrowSpan className="right-bar"></ArrowSpan>
    </ArrowIconContainer>
  );
};

export default ArrowIcon;

const ArrowIconContainer = styled.a`
  margin-right: 20px;
  height: 40px;
`;
const ArrowSpan = styled.span`
  top: calc(50%);
  &:after {
    background-color: ${p => p.theme.colors.primary};
  }
`;
