import Headings from '@components/Headings';
import { ITAOAThemeUIContext, IStringMap } from '@types';

import styled from '@emotion/styled';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

const nameQuery = graphql`
  {
    site {
      siteMetadata {
        siteName
      }
    }
  }
`;

const name = (): string => useStaticQuery(nameQuery).site.siteMetadata.siteName;

const base = (p: ITAOAThemeUIContext): IStringMap => ({
  color: `${p.theme.colors.primary}`,
  fontFamily: `${p.theme.fonts.serif}`,
  marginTop: '20px',
  overflow: 'auto',
  display: 'inline',
  padding: '0 0px !important'
});

const h1: React.FC = (): ReactElement => {
  const Nameh1 = styled(Headings.h1)(base);
  return <Nameh1>{name()}</Nameh1>;
};
const h2: React.FC = (): ReactElement => {
  const Nameh2 = styled(Headings.h2)(base);
  return <Nameh2>{name()}</Nameh2>;
};
const h3: React.FC = (): ReactElement => {
  const Nameh3 = styled(Headings.h3)(base);
  return <Nameh3>{name()}</Nameh3>;
};
const h4: React.FC = (): ReactElement => {
  const Nameh4 = styled(Headings.h4)(base);
  return <Nameh4>{name()}</Nameh4>;
};
const h5: React.FC = (): ReactElement => {
  const Nameh5 = styled(Headings.h5)(base);
  return <Nameh5>{name()}</Nameh5>;
};
const h6: React.FC = (): ReactElement => {
  const Nameh6 = styled(Headings.h6)(base);
  return <Nameh6>{name()}</Nameh6>;
};

export default {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6
};
