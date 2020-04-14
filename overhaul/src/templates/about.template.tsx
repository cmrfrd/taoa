import React from "react";
import styled from "@emotion/styled";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";

import AuthorHero from "../sections/author/Author.Hero";
import AuthorArticles from "../sections/author/Author.Articles";

import { Template } from "@types";

import Headings from "@components/Headings";
import Name from "@components/Name";
import Paragraph from "@components/Paragraph";

import mediaqueries from "@styles/media";

const AboutPage: Template = ({ location, pageContext }) => {
    const authors = pageContext.authors;
    const about = pageContext.about.about;

    return (
        <Layout location={location}>
            <Section narrow>
                <AuthorContainer>
                    <AboutHeading>
                        {about.title.about[0]}
                        <Name.h2 />
                        {about.title.about[1]}
                    </AboutHeading>
                    {about.about.map((para, i) => {
                        return <AboutParagraph>{para}</AboutParagraph>
                    })}
                    <AuthorHeading>
                        {authors.length > 1 ? about.title.authors : about.title.author}
                    </AuthorHeading>
                    {authors.map((a, i) => {
                        return <AuthorHero author={a} />
                    })}
                </AuthorContainer>
            </Section>
            <AboutGradient />
        </Layout>
    );
}

export default AboutPage;

const AuthorContainer = styled.div`
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 200px 30px 0;
    background: ${p => p.theme.colors.background};
    transition: ${p => p.theme.colorModeTransition};
`;


const AboutGradient = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 590px;
    z-index: 0;
    pointer-events: none;
    background: ${p => p.theme.colors.gradient};
    transition: ${p => p.theme.colorModeTransition};
`;

const AboutHeading = styled(Headings.h2)`
margin: 25px 0 25px;
max-width: inherit;

${mediaqueries.desktop`
max-width: inherit;
`}
${mediaqueries.tablet`
margin: 25px 0 25px;
`};
${mediaqueries.phablet`
padding: 0 0px;
`};
`;

const AboutParagraph = styled(Paragraph)`
margin: 25px 0 25px;
max-width: inherit;

${mediaqueries.desktop`
max-width: inherit;
`}
${mediaqueries.tablet`
margin: 25px 0 25px;
`};
${mediaqueries.phablet`
padding: 0 0px;
`};
`;

const AuthorHeading = styled(Headings.h2)`
${mediaqueries.phablet`
padding: 0 0px;
`};
${mediaqueries.phone`
text-align: center;
`};
`;
