import Section from '@components/Section';
import SocialLinks from '@components/SocialLinks';
import { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import * as CSS from 'csstype';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Twemoji } from 'react-emoji-render';

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
            social {
              url
              name
            }
            footer {
              message
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
  }
`;

interface IFooterProps {
  gradient: boolean;
}

const Footer: React.FC<IFooterProps> = ({ gradient = true }: IFooterProps) => {
  const results = useStaticQuery(siteQuery);
  const { name, social, footer } = results.allSite.edges[0].node.siteMetadata;

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
            {copyrightDate} {name} - <Twemoji text={footer.message} />
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
  margin: '140px auto 50px',
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

const FooterGradient = styled.div((p: ITAOAThemeUIContext) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '590px',
  zIndex: -1,
  pointerEvents: 'none',
  background: p.theme.colors.gradient as CSS.ColorProperty,
  transition: p.theme.colorModeTransition
}));
