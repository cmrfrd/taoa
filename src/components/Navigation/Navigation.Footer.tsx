import Emoji from '@components/Emoji';
import Section from '@components/Section';
import SocialLinks from '@components/SocialLinks';
import { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import * as CSS from 'csstype';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

const footerQuery = graphql`
  {
    allComponentsYaml {
      edges {
        node {
          components {
            social {
              url
              name
            }
            footer {
              message
              link
              linkIndex
            }
          }
        }
      }
    }
    allSite {
      edges {
        node {
          siteMetadata {
            siteName
            git {
              repo
              user
            }
          }
        }
      }
    }
    allMdx(
      sort: { fields: frontmatter___date, order: ASC }
      filter: { frontmatter: { date: { ne: "null" } } }
    ) {
      edges {
        node {
          frontmatter {
            date
          }
        }
      }
    }
    gitTag(latest: { eq: true }) {
      name
    }
  }
`;

interface IFooterProps {
  gradient: boolean;
}

const Footer: React.FC<IFooterProps> = ({ gradient = true }: IFooterProps) => {
  const results = useStaticQuery(footerQuery);
  const { siteName } = results.allSite.edges[0].node.siteMetadata;
  const { social, footer } = results.allComponentsYaml.edges[0].node.components;

  const versionTag = results.gitTag.name;
  const { repo, user } = results.allSite.edges[0].node.siteMetadata.git;
  const createGithubLink = (user: string, repo: string, tag: string): string =>
    `https://github.com/${user}/${repo}/tree/${tag}`;

  const copyrightDate = ((): string => {
    const { edges } = results.allMdx;
    const years = [0, edges.length - 1].map((edge: number) =>
      new Date(edges[edge].node.frontmatter.date).getFullYear()
    );
    return years[0] === years[1] ? `${years[0]}` : `${years[0]}–${years[1]}`;
  })();

  return (
    <>
      {gradient ? <FooterGradient /> : <></>}
      <Section narrow>
        <HoritzontalRule />
        <FooterContainer>
          <FooterText>
            {copyrightDate} {siteName}
            {' | '}
            {<FooterLink href={createGithubLink(user, repo, versionTag)}>{versionTag}</FooterLink>}
            {' | '}
            {[...footer.message].map((e: string, i: number) => {
              if (i === footer.linkIndex) {
                return (
                  <a href={footer.link} key={i}>
                    <Emoji text={e} key={i} />
                  </a>
                );
              } else {
                return <Emoji text={e} key={i} />;
              }
            })}
          </FooterText>
          <div>
            <SocialLinks links={social} />
          </div>
        </FooterContainer>
      </Section>
    </>
  );
};

export default Footer;

const FooterContainer = styled.div((p: ITAOAThemeUIContext) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: '80px',
  color: p.theme.colors.grey as CSS.Color,

  [mediaquery.tablet()]: {
    flexDirection: 'column',
    paddingBottom: '100px'
  },

  [mediaquery.phablet()]: {
    paddingBottom: '50px'
  }
}));

const HoritzontalRule = styled.div((p: ITAOAThemeUIContext) => ({
  position: 'relative',
  margin: '90px auto 50px',
  borderBottom: `1px solid ${p.theme.colors.horizontalRule}`,

  [mediaquery.tablet()]: {
    margin: '60px auto'
  },

  [mediaquery.phablet()]: {
    display: 'none'
  }
}));

const FooterText = styled.div({
  [mediaquery.tablet()]: {
    marginBottom: '80px'
  },

  [mediaquery.phablet()]: {
    margin: '120px auto 100px'
  }
});

const FooterLink = styled.a((p: ITAOAThemeUIContext) => ({
  transition: p.theme.colorModeTransition,
  textDecoration: 'none',

  '&:hover': {
    color: p.theme.colors.grey as CSS.ColorProperty,
    fontWeight: 'bold',
    textShadow: '0 0 .01px black'
  },

  ':visited': {
    color: p.theme.colors.grey as CSS.ColorProperty,
    textDecoration: 'none'
  },

  [mediaquery.tablet()]: {
    marginBottom: '80px'
  },

  [mediaquery.phablet()]: {
    margin: '120px auto 100px'
  }
}));

const FooterGradient = styled.div((p: ITAOAThemeUIContext) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '590px',
  zIndex: 0,
  pointerEvents: 'none',
  background: p.theme.colors.gradient as CSS.ColorProperty,
  transition: p.theme.colorModeTransition
}));
