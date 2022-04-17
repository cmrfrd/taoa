import { GridLayoutContext } from './Posts.List.Context';

import Name from '@components/Name';
import Headings from '@components/Headings';
import Section from '@components/Section';
import Icons from '@icons';
import mediaqueries, { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useContext } from 'react';

const homeHeroQuery = graphql`
  {
    home: allHomeYaml {
      edges {
        node {
          home {
            hero {
              heading
              maxWidth
            }
          }
        }
      }
    }
  }
`;

const Hero: React.FC = () => {
  const { hero } = useStaticQuery(homeHeroQuery).home.edges[0].node.home;

  return (
    <Section>
      <HeadingContainer style={{ maxWidth: `${hero.maxWidth}px` }}>
        <HeroHeading>
          <Name.h1 />
        </HeroHeading>
        <HeroHeading>{hero.heading}</HeroHeading>
      </HeadingContainer>
    </Section>
  );
};

export default Hero;

const SubheadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 100px;

  ${mediaqueries.desktop`
margin-bottom: 80px;
`};

  ${mediaqueries.tablet`
margin-bottom: 60px;
`};

  ${mediaqueries.phablet`
display: none;
`};
`;

const GridControlsContainer = styled.div`
  display: flex;
  align-items: center;

  ${mediaqueries.tablet`
display: none;
`};
`;

const HeadingContainer = styled.div({
  margin: '100px auto',
  paddingTop: '150px',
  paddingBottom: '150px',
  position: 'relative',

  [mediaquery.desktop()]: {
    width: '95%',
    paddingTop: '120px',
    paddingBottom: '120px'
  },

  [mediaquery.tablet()]: {
    width: '100%'
  },

  [mediaquery.phablet()]: {
    width: '100%',
    paddingTop: '100px',
    paddingBottom: '100px'
  },

  [mediaquery.phone_large()]: {
    width: '100%',
    paddingTop: '115px',
    paddingBottom: '115px'
  },

  [mediaquery.phone()]: {
    width: '100%',
    paddingTop: '90px',
    paddingBottom: '90px'
  }
});

const HeroHeading = styled.div((p: ITAOAThemeUIContext) => ({
  fontFamily: `${p => p.theme.fonts.serif}`,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 1.15,
  marginTop: '20px',
  fontSize: '26px',
  color: `${p.theme.colors.primary}`,
  a: {
    color: `${p.theme.colors.accent}`
  },

  [mediaquery.desktop()]: {
    fontSize: '26px'
  },

  [mediaquery.tablet()]: {
    fontSize: '18px'
  },

  [mediaquery.phablet()]: {
    fontSize: '18px'
  }
}));
