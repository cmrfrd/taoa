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

const AboutPage: Template = ({ location, pageContext }) => {
    const authors = pageContext.authors;
    const about = pageContext.about;

    return (
        <Layout>
            <Section narrow>
                <AuthorContainer>
                    <Headings.h2>
                        {about.about.title[0]}
                        <Name.h2 />
                        {about.about.title[1]}
                    </Headings.h2>
                    <AboutParagraph>{about.about.about}</AboutParagraph>
                    <AuthorHero author={authors[0]} />
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
    padding-top: 200px;
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

const AboutParagraph = styled(Paragraph)`
    margin:30px 0px;
`;
