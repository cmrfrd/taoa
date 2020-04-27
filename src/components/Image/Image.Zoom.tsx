import Caption from '@components/Caption';

import React, { useCallback, useState } from 'react';
import { Controlled as ControlledZoom } from 'react-medium-image-zoom';
import { useThemeUI } from 'theme-ui';

import 'react-medium-image-zoom/dist/styles.css';

interface IImageZoomProps {
  title?: string;
}

/** ImageZoom is a component to display a zoomed in image
 *
 * @param props
 */
const ImageZoom: React.FC<IImageZoomProps> = ({ title, ...props }: IImageZoomProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const { theme } = useThemeUI();

  const image = {
    ...props,
    className: 'Image__Zoom',
    style: {
      display: 'block',
      margin: '0 auto',
      width: '100%',
      borderRadius: isZoomed ? '5px' : '0px'
    }
  };

  const handleZoomChange = useCallback((shouldZoom: boolean) => {
    setIsZoomed(shouldZoom);
  }, []);

  return (
    <>
      <ControlledZoom
        isZoomed={isZoomed}
        onZoomChange={handleZoomChange}
        zoomMargin={40}
        overlayBgColorEnd={theme.colors.background}
      >
        <img {...image} />
      </ControlledZoom>
      <Caption>{title}</Caption>
    </>
  );
};

export default ImageZoom;
