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
    transition: color 0.2s ease-in-out, background 0.2s ease-in-out;
    color: ${p => p.theme.colors.background};
    background: ${p => p.theme.colors.invbackground};
    padding: 5px 10px 3px 10px;

    font-style: normal;
    font-weight: 500;
    font-size: 48px;

    &:hover {
    color: ${p => p.theme.colors.invbackground};
    background: ${p => (p.stickyHeader ? p.theme.colors.tintBackground : p.theme.colors.background)};
    }

    ${mediaqueries.desktop`
    verticle-align: middle;
    font-size: 38px
    `}

    ${mediaqueries.tablet`
    verticle-align: middle;
    font-size: 30px
    `}

    ${mediaqueries.phablet`
      font-size: 26px
      verticle-align: middle;
      -webkit-line-clamp: 3;
    `}

    ${mediaqueries.phone`
      font-size: 22px
    `}
`;
