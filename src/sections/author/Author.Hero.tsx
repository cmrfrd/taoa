import React from "react";
import styled from "@emotion/styled";

import Image from "@components/Image";

import Paragraph from "@components/Paragraph";

import mediaqueries from "@styles/media";
import { IAuthor } from "@types";

import SocialLinks from "@components/SocialLinks";

interface AuthorHeroProps {
    author: IAuthor;
}

const AuthorHero: React.FC<AuthorHeroProps> = ({ author }) => {
    return (
        <Hero>
            <HeroDiv>
                <HeroHeadings>
                    <HeroImage>
                        <RoundedImage src={author.avatar.large} />
                    </HeroImage>
                    <Heading>{author.name}</Heading>
                </HeroHeadings>
                <AuthorParagraph>{author.bio}</AuthorParagraph>
            </HeroDiv>
            {/* <Social>
                <SocialLinks links={author.social} />
                </Social> */}
        </Hero>
    );
};

export default AuthorHero;

const Hero = styled.div`
    position: relative;
    z-index: 1;
    margin: 35px auto 110px;
    display: flex;
    flex-direction: row;

    ${mediaqueries.phablet`
flex-direction: row;
`}
    ${mediaqueries.phone`
flex-direction: column;
align-items: center;
justify-content: center;
`}
`;

const HeroImage = styled.div`
    position: relative;
    z-index: 1;
    height: 164px;
    width: 164px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid ${p => p.theme.colors.background};
    box-shadow: 0px 15.619px 31.2381px rgba(0, 0, 0, 0.15);
    flex-shrink: 0;
    ${mediaqueries.tablet`
width: 146px;
height: 146px;
`}

  ${mediaqueries.phablet`
flex: none;
width: 126px;
height: 126px;
`}

  ${mediaqueries.phone`
flex: none;
width: 116px;
height: 116px;
`}
`;

const RoundedImage = styled(Image)`
  border-radius: 50%;
`;

const HeroDiv = styled.div`
`;

const HeroHeadings = styled.div`
    margin-bottom: 25px;
    display: flex;
    flex-direction: row;

    ${mediaqueries.phone`
flex-direction: column;
align-items: center;
justify-content: center;
`}
`;

const Heading = styled.h1`
    font-size: 38px;
    font-family: ${p => p.theme.fonts.monospace};
    color: ${p => p.theme.colors.primary};
    margin-top: 5px;
    margin-bottom: 5px;
    font-weight: 600;
    margin: auto 50px;

    ${mediaqueries.phone`
padding-top: 15px;
text-align: center;
`}
  ${mediaqueries.phablet`
margin: auto 15px;
text-align: center;
`}
  ${mediaqueries.tablet`
margin: auto 20px;
text-align: center;
`}
  ${mediaqueries.desktop`
font-size: 30px;
margin: auto 40px;
text-align: center;
`}
`;

const Subheading = styled.p`
    margin: 0 auto;
    max-width: 500px;
    color: ${p => p.theme.colors.grey};
    font-size: 18px;
    font-family: ${p => p.theme.fonts.sansSerif};
    line-height: 1.4;
    text-align: left;

    ${mediaqueries.phablet`
font-size: 14px;
`}
`;

const Social = styled.div`
    display: flex;
    align-items: center;
    margin-top: 35px;

    ${mediaqueries.phablet`
font-size: 14px;
`}
`;

const AuthorParagraph = styled(Paragraph)`
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