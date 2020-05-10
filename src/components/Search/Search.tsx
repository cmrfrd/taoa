import Icons from '@icons';
import { ITAOAThemeUIContext } from '@types';
import { theme } from '@utils';

import styled from '@emotion/styled';
import * as CSS from 'csstype';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useColorMode } from 'theme-ui';

const Search: React.FC<{}> = (props: any) => {
  const { elements, searchResults, setSearchResults, placeholder, filter, sort } = props;

  const [colorMode] = useColorMode();
  const tcolors = colorMode === 'dark' ? theme.colors.modes.dark : theme.colors;

  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = elements.filter((e: any) => filter(e, searchTerm)).sort(sort);

    if (_.isEqual(results.sort(), searchResults.sort())) return;

    setTimeout(() => {
      setSearchResults(results);
    }, 200);
    setSearchResults([]);
  }, [searchTerm]);

  return (
    <InputContainer>
      <IconContainer>
        <Icons.SearchIcon fill={tcolors.invbackground} />
      </IconContainer>
      <Input type="text" placeholder={placeholder} onChange={handleChange} />
    </InputContainer>
  );
};

export default Search;

const InputContainer = styled.div(() => ({
  position: 'relative',
  display: 'inline-block',
  paddingTop: '20px',
  paddingBottom: '20px',
  width: '100%',
  svg: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: '1rem'
  }
}));

const Input = styled.input((p: ITAOAThemeUIContext) => ({
  outline: 0,
  borderWidth: '0 0 2px',
  borderColor: p.theme.colors.invbackground as CSS.ColorProperty,
  color: p.theme.colors.invbackground as CSS.ColorProperty,
  background: 'transparent',
  height: '30px',
  padding: '0.5rem',
  width: '100%'
}));

const IconContainer = styled.div(() => ({
  paddingBottom: '4px'
}));
