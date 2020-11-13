import { ITAOAThemeUIContext } from '@types';
import { useMounted } from '@utils';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

const Loading: React.FC<{}> = () => {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
};

interface ILoadingContainerProps {
  children: React.ReactNode;
}

const LoadingContainer: React.FC<ILoadingContainerProps> = ({
  children
}: ILoadingContainerProps) => {
  const mounted = useMounted();

  return <span>{!mounted ? <Loading /> : { children }}</span>;
};

export default {
  Loading,
  LoadingContainer
};

const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)'
  },
  '100%': {
    transform: 'rotate(360deg)'
  }
});

const SpinnerContainer = styled.div({
  display: 'block',
  position: 'absolute',
  left: 15,
  top: 15,
  zIndex: 1031
});

const Spinner = styled.div((p: ITAOAThemeUIContext) => ({
  zIndex: 1031,
  animation: `400ms linear infinite ${spin}`,
  borderBottom: '2px solid transparent',
  borderLeft: `2px solid ${p.theme.colors.primary}`,
  borderRadius: '50%',
  borderRight: '2px solid transparent',
  borderTop: `2px solid ${p.theme.colors.primary}`,
  boxSizing: 'border-box',
  height: 18,
  width: 18
}));
