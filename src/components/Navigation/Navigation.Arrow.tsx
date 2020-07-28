import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import React from 'react';

import './arrow.scss';

interface IArrowIcon {
  isOpen: boolean;
}

/* Component to display menu arrow */
const ArrowIcon: React.FC<IArrowIcon> = (props: IArrowIcon) => {
  const { isOpen } = props;
  return (
    <ArrowIconContainer className={isOpen ? 'arrow-icon open' : 'arrow-icon'}>
      <ArrowSpan className="left-bar"></ArrowSpan>
      <ArrowSpan className="right-bar"></ArrowSpan>
    </ArrowIconContainer>
  );
};

export default ArrowIcon;

const ArrowIconContainer = styled.a({
  marginRight: '20px',
  height: '40px'
});

const ArrowSpan = styled.span((p: ITAOAThemeUIContext) => ({
  top: 'calc(50%)',
  '&:after': {
    backgroundColor: p.theme.colors.primary
  }
}));
