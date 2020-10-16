import mediaqueries from '@styles/media';

import styled from '@emotion/styled';
import React, { useRef, useEffect, useState } from 'react';

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  background: '#ccc',
  color: '#898989',
  fontSize: '32px',
  fontWeight: 600,

  [mediaqueries.phablet()]: {
    fontSize: '28px'
  }
});

/**
 * ImagePlaceholder is a component that places an empty image
 * @param props
 */
const ImagePlaceholder: React.FC<{}> = (props: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions(containerRef.current.getBoundingClientRect());

    const handleResize = (): void => setDimensions(containerRef.current.getBoundingClientRect());

    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container ref={containerRef} {...props}>
      <div>
        {dimensions.width} x {dimensions.height}
      </div>
    </Container>
  );
};

export default ImagePlaceholder;
