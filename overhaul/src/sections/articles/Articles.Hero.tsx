import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import Section from '@components/Section';
import Bio from '@components/Bio';
import Icons from '@icons';
import mediaqueries from '@styles/media';
import { IAuthor } from '@types';

import { GridLayoutContext } from './Articles.List.Context';

const authorQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            hero {
              welcome
              heading
              maxWidth
            }
          }
        }
      }
    }
  }
`;

const ArticlesHero: React.FC<IAuthor> = ({ authors }) => {
    const { gridLayout = 'tiles', hasSetGridLayout, setGridLayout } = useContext(
        GridLayoutContext,
    );

    const results = useStaticQuery(authorQuery);
    const hero = results.site.edges[0].node.siteMetadata.hero;
    const tilesIsActive = hasSetGridLayout && gridLayout === 'tiles';
    const featuredAuthor = authors.find(author => author.featured);

    if (!featuredAuthor) {
        throw new Error(`
      No featured Author found.
      Please ensure you have at least featured Author.
  `);
    }

    return (
        <Section relative id="Articles__Hero">
            <HeadingContainer style={{ maxWidth: `${hero.maxWidth}px` }}>
                <HeroWelcome dangerouslySetInnerHTML={{ __html: hero.welcome }} />
                <HeroHeading dangerouslySetInnerHTML={{ __html: hero.heading }} />
            </HeadingContainer>
            <SubheadingContainer>
                <Bio author={featuredAuthor} />
                <GridControlsContainer>
                    <GridButton
                        onClick={() => setGridLayout('tiles')}
                        active={tilesIsActive}
                        data-a11y="false"
                        title="Show articles in Tile grid"
                        aria-label="Show articles in Tile grid"
                    >
                        <Icons.Tiles />
                    </GridButton>
                    <GridButton
                        onClick={() => setGridLayout('rows')}
                        active={!tilesIsActive}
                        data-a11y="false"
                        title="Show articles in Row grid"
                        aria-label="Show articles in Row grid"
                    >
                        <Icons.Rows />
                    </GridButton>
                </GridControlsContainer>
            </SubheadingContainer>
        </Section>
    );
};

export default ArticlesHero;

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

const HeadingContainer = styled.div`
    margin: 100px auto;
    position: relative;

    ${mediaqueries.desktop`
margin: 70px auto;
width: 80%;
`}

    ${mediaqueries.tablet`
margin: 50px auto;
width: 100%;
`}
`;

const HeroHeading = styled.h2`
    font-style: normal;
    font-weight: 500;
    font-size: 42px;
    line-height: 1.15;
    text-align: center;
    color: ${p => p.theme.colors.primary};

    a {
    color: ${p => p.theme.colors.accent};
    }

    ${mediaqueries.desktop`
font-size: 32px
`}

    ${mediaqueries.phablet`
font-size: 26px;
`}

    ${mediaqueries.phone`
font-size: 14px;
`}
`;

const HeroWelcome = styled.h1`
    font-style: normal;
    font-weight: 600;
    font-size: 46px;
    line-height: 1.15;
    text-align: center;
    margin-bottom: 30px;
    color: ${p => p.theme.colors.primary};

    a {
    color: ${p => p.theme.colors.accent};
    }

    ${mediaqueries.desktop`
font-size: 36px
`}

    ${mediaqueries.phablet`
font-size: 30px;
`}

    ${mediaqueries.phone`
font-size: 18px;
`}
`;



const GridButton = styled.button<{ active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background: transparent;
  transition: background 0.25s;

  &:not(:last-child) {
    margin-right: 30px;
  }

  &:hover {
    background: ${p => p.theme.colors.hover};
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -10%;
    top: -10%;
    width: 120%;
    height: 120%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 50%;
  }

  svg {
    opacity: ${p => (p.active ? 1 : 0.25)};
    transition: opacity 0.2s;

    path {
      fill: ${p => p.theme.colors.primary};
    }
  }
`;
