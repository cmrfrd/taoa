import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import _ from 'lodash';

import { Twemoji } from 'react-emoji-render';

import { css } from '@emotion/core';
import styled from '@emotion/styled';

import Section from '@components/Section';
import SEO from '@components/SEO';
import Layout from '@components/Layout';
import Headings from '@components/Headings';
import Name from '@components/Name';
import Paragraph from '@components/Paragraph';

import { Template } from '@types';

import mediaqueries, { mediaquery } from '@styles/media';

import AuthorHero from '../sections/author/Author.Hero';
import AuthorArticles from '../sections/author/Author.Articles';

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            fourOfour {
              messages {
                emoji
                message
              }
            }
          }
        }
      }
    }
  }
`;

const Page404: Template = ({ location, pageContext }) => {
  const results = useStaticQuery(siteQuery);
  const { fourOfour } = results.allSite.edges[0].node.siteMetadata;
  const message = _.sample(fourOfour.messages);

  return (
    <Layout location={location} gradient={false}>
      <Section narrow>
        <Container>
          <CenterRowMessage>
            <Big>404</Big>
            <EmojiContainer>
              <Twemoji text={message.emoji} />
            </EmojiContainer>
          </CenterRowMessage>
          <Small>{message.message}</Small>
        </Container>
      </Section>
      <AboutGradient />
    </Layout>
  );
};

export default Page404;

const Container = styled('div')((p) => ({
  position: 'relative',
  textAlign: 'center',
  paddingTop: '200px',
  paddingBottom: '300px',
  [mediaquery.desktop()]: {
    paddingTop: '200px',
    paddingBottom: '200px'
  },
  [mediaquery.tablet()]: {
    paddingTop: '250px',
    paddingBottom: '200px'
  },
  [mediaquery.phablet()]: {
    paddingTop: '150px',
    paddingBottom: '100px'
  }
}));

const CenterRowMessage = styled('div')((p) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  textAlign: 'center',
  alignItems: 'center',
  margin: '0px auto',
  [mediaquery.tablet()]: {
    margin: '20px 100px'
  },
  [mediaquery.phablet()]: {
    margin: '10px 60px'
  },
  [mediaquery.phone()]: {
    margin: '0 20px'
  }
}));

const Big = styled(Paragraph)`
  width: auto;
  font-size: 140px;
  margin-bottom: 0px;
  margin: 0 0px 0px;
  [mediaquery.desktop()]: {
    font-size: 140px;
    margin-bottom: 0px;
  }
  ${mediaquery.tablet()} {
    font-size: 110px;
    margin-bottom: 0px;
  }
  ${mediaquery.phablet()} {
    font-size: 90px;
    padding: 0 0px;
  }
  ${mediaquery.phone()} {
    font-size: 70px;
    margin: 0 0px 0px;
  }
`;

const EmojiContainer = styled.div`
  padding-left: 30px;
  font-size: 110px;
  ${mediaquery.tablet()} {
    padding-left: 20px;
    font-size: 120px;
  }
  ${mediaquery.phablet()} {
    font-size: 100px;
  }
  ${mediaquery.phone()} {
    font-size: 80px;
  }
`;

const Small = styled(Paragraph)`
  z-index: 1;
  font-size: 30px;
  ${mediaquery.desktop()} {
    margin: 0 auto 10px;
  }
  ${mediaquery.tablet()} {
    font-size: 30px;
  }
  ${mediaquery.phablet()} {
    font-size: 28px;
  }
  ${mediaquery.phone()} {
    font-size: 26px;
  }
`;

const AboutGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 390px;
  z-index: 0;
  pointer-events: none;
  background: ${(p) => p.theme.colors.gradient};
  transition: ${(p) => p.theme.colorModeTransition};
`;
