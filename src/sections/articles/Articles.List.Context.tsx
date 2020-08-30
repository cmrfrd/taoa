import React, { createContext, useState } from 'react';

export const GridLayoutContext = createContext({
  gridLayout: 'tiles',
  setGridLayout: (tile: string) => {},
  getGridLayout: () => {}
});

const GridLayoutProvider: React.FC<{}> = ({ children }) => {
  const initialLayout = 'tiles';

  const [gridLayout, setGridLayout] = useState<string>(initialLayout);

  function setGridLayoutAndSave(tile: string) {
    localStorage.setItem('gridLayout', tile || initialLayout);
    setGridLayout(tile);
  }

  function getGridLayoutAndSave() {
    setGridLayout(localStorage.getItem('gridLayout') || initialLayout);
  }

  return (
    <GridLayoutContext.Provider
      value={{
        gridLayout,
        setGridLayout: setGridLayoutAndSave,
        getGridLayout: getGridLayoutAndSave
      }}
    >
      {children}
    </GridLayoutContext.Provider>
  );
};

export default GridLayoutProvider;
