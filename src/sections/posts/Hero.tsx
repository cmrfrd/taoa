import { GridLayoutContext } from './Posts.List.Context';

import Name from '@components/Name';
import Section from '@components/Section';
import Icons from '@icons';
import mediaqueries, { mediaquery } from '@styles/media';
import { IAuthor } from '@types';

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
    <Section relative id="Posts__Hero">
      <HeadingContainer style={{ maxWidth: `${hero.maxWidth}px` }}>
        <Name.h1 />
        <HeroHeading>{hero.heading}</HeroHeading>
      </HeadingContainer>
      <Horizontal />
    </Section>
  );
};

export default Hero;

const Horizontal = styled.div`
  position: relative;
  margin: 20px auto 20px;
  border-bottom: 1px solid ${p => p.theme.colors.horizontalNav};
`;

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

const HeroHeading = styled.h2`
  font-family: ${p => p.theme.fonts.serif};
  font-style: normal;
  font-weight: 600;
  line-height: 1.15;
  margin-top: 20px;
  font-size: 26px;
  color: ${p => p.theme.colors.primary};

  a {
    color: ${p => p.theme.colors.accent};
  }

  ${mediaquery.desktop()} {
    font-size: 26px;
  }

  ${mediaquery.tablet()} {
    font-size: 18px;
  }

  ${mediaquery.phablet()} {
    font-size: 18px;
  } ;
`;
