import Emoji from '@components/Emoji';
import Paragraph from '@components/Paragraph';
import SEO from '@components/SEO';
import Section from '@components/Section';
import { mediaquery } from '@styles/media';
import { Template, ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import { graphql, useStaticQuery } from 'gatsby';
import _ from 'lodash';
import React from 'react';

const messagesQuery = graphql`
  {
    allNotFoundYaml {
      edges {
        node {
          messages {
            emoji
            message
          }
        }
      }
    }
  }
`;

const Page404: Template = ({ location }: any) => {
  const results = useStaticQuery(messagesQuery);
  const { messages } = results.allNotFoundYaml.edges[0].node;
  const message = _.sample(messages);

  return (
    <span>
      <SEO pathname={location.pathname} />
      <Section narrow>
        <Container>
          <CenterRowMessage>
            <Big>404</Big>
            <EmojiContainer>
              <Emoji text={message.emoji} />
            </EmojiContainer>
          </CenterRowMessage>
          <Small>{message.message}</Small>
        </Container>
      </Section>
      <AboutGradient />
    </span>
  );
};

export default Page404;

const Container = styled('div')({
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
});

const CenterRowMessage = styled('div')({
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
});

const Big = styled(Paragraph)({
  width: 'auto',
  fontSize: '140px',
  marginBottom: '0px',
  margin: '0 0px 0px',
  [mediaquery.desktop()]: {
    fontSize: '140px',
    marginBottom: '0px'
  },
  [mediaquery.tablet()]: {
    fontSize: '110px',
    marginBottom: '0px'
  },
  [mediaquery.phablet()]: {
    fontSize: '90px',
    padding: '0 0px'
  },
  [mediaquery.phone()]: {
    fontSize: '70px',
    margin: '0 0px 0px'
  }
});

const EmojiContainer = styled.div({
  paddingLeft: '30px',
  fontSize: '110px',
  [mediaquery.tablet()]: {
    paddingLeft: '20px',
    fontSize: '120px'
  },
  [mediaquery.phablet()]: {
    fontSize: '100px'
  },
  [mediaquery.phone()]: {
    fontSize: '80px'
  }
});

const Small = styled(Paragraph)({
  zIndex: 1,
  fontSize: '30px',
  [mediaquery.desktop()]: {
    margin: '0 auto 10px'
  },
  [mediaquery.tablet()]: {
    fontSize: '30px'
  },
  [mediaquery.phablet()]: {
    fontSize: '28px'
  },
  [mediaquery.phone()]: {
    fontSize: '26px'
  }
});

const AboutGradient = styled.div((p: ITAOAThemeUIContext) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '390px',
  zIndex: 0,
  pointerEvents: 'none',
  background: `${p.theme.colors.gradient}`,
  transition: p.theme.colorModeTransition
}));
