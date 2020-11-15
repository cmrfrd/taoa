import AuthorHero from '../sections/author/Author.Hero';

import Headings from '@components/Headings';
import LoadingContainer from '@components/Loading';
import Paragraph from '@components/Paragraph';
import Section from '@components/Section';
import { mediaquery } from '@styles/media';
import { Template, TTemplate, IAuthor, ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import React from 'react';

/**
 * About page contains a small excerpt about the website and a spotlight
 * excerpt about each of the author(s)
 */
const AboutPage: Template = ({ pageContext }: TTemplate) => {
  const authors = pageContext.authors;
  const about = pageContext.aboutPageData.about;

  return (
    <LoadingContainer>
      <Section narrow>
        <AuthorContainer>
          <AboutHeading>{about.title.about}</AboutHeading>
          {about.about.map((para: string, i: number) => {
            return <AboutParagraph key={i}>{para}</AboutParagraph>;
          })}
          <AuthorHeading>
            {authors.length > 1 ? about.title.authors : about.title.author}
          </AuthorHeading>
          {authors.map((a: IAuthor, i: number) => {
            return <AuthorHero key={i} author={a} />;
          })}
        </AuthorContainer>
      </Section>
    </LoadingContainer>
  );
};

export default AboutPage;

const AuthorContainer = styled.div((p: ITAOAThemeUIContext) => ({
  position: 'relative',
  bottom: 0,
  left: 0,
  zIndex: 1,
  width: '100%',
  padding: '150px 10px 0',
  transition: p.theme.colorModeTransition
}));

const AboutHeading = styled(Headings.h2)({
  margin: '25px 0 25px',
  maxWidth: 'inherit',

  [mediaquery.desktop()]: {
    maxWidth: 'inherit'
  },
  [mediaquery.tablet()]: {
    margin: '25px 0 25px'
  },
  [mediaquery.phablet()]: {
    padding: '0 0px'
  }
});

const AboutParagraph = styled(Paragraph)({
  margin: '25px 0 25px',
  maxWidth: 'inherit',

  [mediaquery.desktop()]: {
    maxWidth: 'inherit'
  },
  [mediaquery.tablet()]: {
    margin: '25px 0 25px'
  },
  [mediaquery.phablet()]: {
    padding: '0 0px'
  }
});

const AuthorHeading = styled(Headings.h2)({
  [mediaquery.phablet()]: {
    padding: '0 0px'
  },
  [mediaquery.phone()]: {
    textAlign: 'center'
  }
});
