import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

const Caption = styled.p`
    text-align: center;
    line-height: 1.756;
    font-size: 14px;
    color: ${p => p.theme.colors.articleText};
    font-family: ${p => p.theme.fonts.sansSerif};
    transition: ${p => p.theme.colorModeTransition};
    margin: 0 auto 25px;
    width: 100%;
    max-width: 780px;

    b {
    font-weight: 800;
    }

    ${mediaqueries.desktop`
max-width: 607px;
`}

  ${mediaqueries.tablet`
max-width: 586px;
margin: 0 auto 25px;
`};

  ${mediaqueries.phablet`
padding: 0 20px;
`};
`;

export default Caption;
