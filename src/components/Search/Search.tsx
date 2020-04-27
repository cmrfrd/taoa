import Icons from '@icons';
import mediaqueries from '@styles/media';
import { theme } from '@utils';

import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useColorMode } from 'theme-ui';
import _ from 'lodash';

const remove = (arr: any, item: any) => {
  const newArr = [...arr];
  newArr.splice(
    newArr.findIndex(i => i === item),
    1
  );
  return newArr;
};

const add = (arr: any, item: any) => {
  return [...arr, item];
};

const Search: React.FC<{}> = (props: any) => {
  const { elements, searchResults, setSearchResults, placeholder, filter, sort } = props;

  const [colorMode] = useColorMode();
  const tcolors = colorMode === 'dark' ? theme.colors.modes.dark : theme.colors;

  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = elements.filter(e => filter(e, searchTerm)).sort(sort);

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

const InputContainer = styled.div`
  position: relative;
  display: inline-block;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1rem;
  }
`;

const Input = styled.input`
  outline: 0;
  border-width: 0 0 2px;
  border-color: ${p => p.theme.colors.invbackground};
  color: ${p => p.theme.colors.invbackground};
  background: transparent;
  height: 30px;
  padding: 0.5rem;
  width: 100%;
`;

const IconContainer = styled.div`
  padding-bottom: 4px;
`;
