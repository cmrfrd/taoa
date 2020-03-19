import React from "react";
import styled from "@emotion/styled";
import { css } from '@emotion/core';
import { useColorMode } from "theme-ui";

import Headings from '@components/Headings';
import useStickyOnScrolled from "@components/UseStickyScroll";

import mediaqueries from "@styles/media";

import { Icon } from '@types';

import { theme } from "@utils";

const LogoText: string = "T·A·O·A";

const Logo: Icon = () => {
    const [colorMode] = useColorMode();
    const stickyHeader = useStickyOnScrolled();
    const tcolors = colorMode === "dark" ? theme.colors.modes.dark : theme.colors;

    const logoHov = css`
        &:hover{
            background: ${stickyHeader ? tcolors.tintBackground : tcolors.background};
        }
    `
    return (
        <LogoContainer>
            <LogoFont css={logoHov}>{LogoText}</LogoFont>
        </LogoContainer>
    );
};

export default Logo;

const LogoContainer = styled.div`
    .Logo__Mobile {
    display: none;
    }

    ${mediaqueries.tablet`
                            .Logo__Desktop {
                                display: none;
                            }

                        .Logo__Mobile{
                        display: block;
                    }
    `}
`;

const LogoFont = styled.h1`
    font-family: ${p => p.theme.fonts.heebo};
    transition: ${p => p.theme.colorModeTransition};
    color: ${p => p.theme.colors.background};
    background: ${p => p.theme.colors.invbackground};
    padding: 5px 10px 3px 10px;

    font-style: normal;
    font-weight: 500;
    font-size: 44px;

    &:hover {
    color: ${p => p.theme.colors.invbackground};
    background: ${p => (p.stickyHeader ? p.theme.colors.tintBackground : p.theme.colors.background)};
    }

    ${mediaqueries.desktop`
verticle-align: middle;
font-size: 34px
`}

    ${mediaqueries.tablet`
verticle-align: middle;
font-size: 26px
`}

    ${mediaqueries.phablet`
font-size: 22px
verticle-align: middle;
                -webkit-line-clamp: 3;
padding: 3px 7px 1px 7px;
`}

    ${mediaqueries.phone`
font-size: 18px
padding: 3px 7px 1px 7px;
`}
`;
