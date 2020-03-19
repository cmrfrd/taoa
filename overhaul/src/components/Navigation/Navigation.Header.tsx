import React, { useState, useEffect, useContext } from "react";
import { css } from '@emotion/core';
import styled from "@emotion/styled";
import { Link, navigate, graphql, useStaticQuery } from "gatsby";
import { useColorMode } from "theme-ui";

import Headings from '@components/Headings';
import Paragraph from '@components/Paragraph';
import Section from "@components/Section";
import Logo from "@components/Logo";
import useStickyOnScrolled from "@components/UseStickyScroll";

import Icons from "@icons";
import mediaqueries from "@styles/media";
import {
    copyToClipboard,
    getWindowDimensions,
    getBreakpointFromTheme,
    theme
} from "@utils";

import { GridLayoutContext } from '../../sections/articles/Articles.List.Context';

const siteQuery = graphql`
    {
        sitePlugin(name: { glob: "**/**" }) {
            pluginOptions {
                rootPath
                basePath
            }
        }
    }
`;

const GridRowToggle: React.FC<{}> = (props) => {
    console.log('asdf', props);

    const [gridMode, setGridMode] = useState(true);
    const { gridLayout = 'tiles', hasSetGridLayout, setGridLayout } = useContext(
        GridLayoutContext,
    );
    const rowsIsActive = hasSetGridLayout && gridLayout === 'tiles';

    /* Only toggle if the component is enabled */
    function toggleGridRow(event) {
        if (props.enable.enableGridRow) setGridMode(!gridMode);
    }

    return (
        <IconWrapper isDark={false}
        >
            {rowsIsActive ? (
                <GridButton
                    onClick={() => setGridLayout('rows')}
                    active={props.active.enableGridRow}
                    data-a11y="false"
                    title="Show articles in Row grid"
                    aria-label="Show articles in Row grid"
                >
                    <Icons.Rows />
                </GridButton>
            ) : (
                    <GridButton
                        onClick={() => setGridLayout('tiles')}
                        active={props.active.enableGridRow}
                        data-a11y="false"
                        title="Show articles in Tile grid"
                        aria-label="Show articles in Tile grid"
                    >
                        <Icons.Tiles />
                    </GridButton>
                )}
        </IconWrapper>
    );
};

const DarkModeToggle: React.FC<{}> = () => {
    const [colorMode, setColorMode] = useColorMode();
    const isDark = colorMode === `dark`;

    function toggleColorMode(event) {
        event.preventDefault();
        setColorMode(isDark ? `light` : `dark`);
    }

    return (
        <IconWrapper
            isDark={isDark}
            onClick={toggleColorMode}
            data-a11y="false"
            aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
            title={isDark ? "Activate light mode" : "Activate dark mode"}
        >
            <MoonOrSun isDark={isDark} />
        </IconWrapper>
    );
};

const SharePageButton: React.FC<{}> = () => {
    const [hasCopied, setHasCopied] = useState<boolean>(false);
    const [colorMode] = useColorMode();
    const isDark = colorMode === `dark`;
    const fill = isDark ? "#fff" : "#000";

    function copyToClipboardOnClick() {
        if (hasCopied) return;

        copyToClipboard(window.location.href);
        setHasCopied(true);

        setTimeout(() => {
            setHasCopied(false);
        }, 1000);
    }

    return (
        <IconWrapper
            isDark={isDark}
            onClick={copyToClipboardOnClick}
            data-a11y="false"
            aria-label="Copy URL to clipboard"
            title="Copy URL to clipboard"
        >
            <Icons.Link fill={fill} />
            <ToolTip isDark={isDark} hasCopied={hasCopied}>
                Copied
            </ToolTip>
        </IconWrapper>
    );
};


const NavigationHeader: React.FC<{}> = (enableGridRow: bool) => {
    const [showBackArrow, setShowBackArrow] = useState<boolean>(false);
    const [previousPath, setPreviousPath] = useState<string>("/");
    const { sitePlugin } = useStaticQuery(siteQuery);

    const [colorMode] = useColorMode();
    const fill = colorMode === "dark" ? "#fff" : "#000";
    const tcolors = colorMode === "dark" ? theme.colors.modes.dark : theme.colors;
    const { rootPath, basePath } = sitePlugin.pluginOptions;

    /* Don't see the effect right now. Seems useless */
    useEffect(() => {
        /* const { width } = getWindowDimensions();
         * const phablet = getBreakpointFromTheme("phablet");

         * const prev = localStorage.getItem("previousPath");
         * const previousPathWasHomepage =
         *     prev === (rootPath || basePath) || (prev && prev.includes("/page/"));
         * const isNotPaginated = !location.pathname.includes("/page/");

         * setShowBackArrow(
         *     previousPathWasHomepage && isNotPaginated && width <= phablet,
         * );
         * setPreviousPath(prev); */
    }, []);

    const { gridLayout = 'tiles', hasSetGridLayout, setGridLayout } = useContext(
        GridLayoutContext,
    );
    const tilesIsActive = hasSetGridLayout && gridLayout === 'tiles';
    const stickyHeader = useStickyOnScrolled();

    const sectionMain = css`
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        opacity: 1;
        z-index: 100;
        padding-top: 25px;
        padding-bottom: 25px;
        transition: all 0.25s var(--ease-in-out-quad);
        background-color: ${tcolors.background};
    `
    const sectionSticky = css`
        padding-top: 15px;
        padding-bottom: 15px;
        box-shadow: 3px 5px 2px 0px ${tcolors.tintHover};
        background-color: ${tcolors.tintBackground};
    `

    return (
        <div css={stickyHeader ? [sectionMain, sectionSticky] : [sectionMain]}>
            <Section>
                <NavContainer>
                    <LogoLink
                        to={'/'}
                        data-a11y="false"
                        title="Navigate back to the homepage"
                        aria-label="Navigate back to the homepage"
                        back={showBackArrow ? "true" : "false"}
                    >
                        {showBackArrow && (
                            <BackArrowIconContainer>
                                <Icons.ChevronLeft fill={fill} />
                            </BackArrowIconContainer>
                        )}
                        <Logo fill={fill} />
                        <Hidden>Navigate back to the homepage</Hidden>
                    </LogoLink>
                    <NavLinks>
                        <NavLink to={'/about'}>
                            <NavLinkText>About</NavLinkText>
                        </NavLink>
                    </NavLinks>
                    <NavControls>
                        {showBackArrow ? (
                            <button
                                onClick={() => navigate(previousPath)}
                                title="Navigate back to the homepage"
                                aria-label="Navigate back to the homepage"
                            >
                                <Icons.Ex fill={fill} />
                            </button>
                        ) : (
                                <>
                                    <GridRowToggle enable={enableGridRow} active={enableGridRow} />
                                    <SharePageButton />
                                    <DarkModeToggle />
                                </>
                            )}
                    </NavControls>
                </NavContainer>
            </Section>
        </div>
    );
};

export default NavigationHeader;

const Horizontal = styled.div`
    position: relative;
    margin: 20px auto 50px;
    border-bottom: 1px solid ${p => p.theme.colors.horizontalNav};

    ${mediaqueries.tablet`
margin: 20px auto;
`}

    ${mediaqueries.phablet`
display: none;
`}
`;

const BackArrowIconContainer = styled.div`
    transition: 0.2s transform var(--ease-out-quad);
    opacity: 0;
    padding-right: 30px;
    animation: fadein 0.3s linear forwards;

    @keyframes fadein {
    to {
    opacity: 1;
    }
    }

    ${mediaqueries.desktop_medium`
display: none;
`}
`;

const NavContainer = styled.div(({
    zIndex: "100",
    display: "flex",
    justifyContent: "space-between",
}));

const LogoLink = styled(Link) <{ back: string }>`
  position: relative;
  display: flex;
  align-items: center;
  left: ${p => (p.back === "true" ? "-54px" : 0)};

  ${mediaqueries.desktop_medium`
left: 0
`}

  &[data-a11y="true"]:focus::after {
    content: "";
    position: absolute;
    left: -10%;
    top: -30%;
    width: 120%;
    height: 160%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  &:hover {
    ${BackArrowIconContainer} {
      transform: translateX(-3px);
    }
  }
`;

const NavLinks = styled.div`
    position: relative;
    display: flex;
    align: left;
    margin-right: auto;
    margin-left: 3%;

    ${mediaqueries.phablet`
right: -5px;
`}
`;

const NavControls = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const NavLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  left: 0;
`;

const NavLinkText = styled(Headings.h4)`
  font-family: ${p => p.theme.fonts.serif};
  transition: ${p => p.theme.colorModeTransition};

               &::before {
                   content: "";
                   position: absolute;
                   width: 100%;
                   height: 2px;
                   bottom: 25%;
                   left: 0;
                   background-color: ${p => p.theme.colors.primary};
                   visibility: visible;
                   -webkit-transform: scaleX(1);
                   transform: scaleX(1);
                   -webkit-transition: all 0.25s ease-in-out 0s;
                   transition: all 0.25s ease-in-out 0s;
               }

               &:hover:before {
                   color: ${p => p.theme.colors.grey};
                   visibility: hidden;
                   -webkit-transform: scaleX(0);
                   transform: scaleX(0);
               }
`;


const ToolTip = styled.div<{ isDark: boolean; hasCopied: boolean }>`
position: absolute;
  padding: 4px 13px;
  background: ${p => (p.isDark ? "#000" : "rgba(0,0,0,0.1)")};
  color: ${p => (p.isDark ? "#fff" : "#000")};
  border-radius: 5px;
  font-size: 14px;
  top: -35px;
  opacity: ${p => (p.hasCopied ? 1 : 0)};
  transform: ${p => (p.hasCopied ? "translateY(-3px)" : "none")};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -6px;
    margin: 0 auto;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid ${p => (p.isDark ? "#000" : "rgba(0,0,0,0.1)")};
  }
`;

const IconWrapper = styled.button<{ isDark: boolean }>`
  opacity: 0.5;
  position: relative;
  border-radius: 5px;
  width: 40px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  margin-left: 30px;

  ${mediaqueries.phone`
margin-left: 5px;
`}

  ${mediaqueries.tablet`
margin-left: 5px;
display: inline-flex;
transform: scale(0.708);
                                 &:hover {
                                     opacity: 0.5;
                                 }
`}

  &:hover {
    opacity: 1;
  }

  &[data-a11y="true"]:focus::after {
    content: "";
    position: absolute;
    left: 0;
    top: -30%;
    width: 100%;
    height: 160%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

`;

// This is based off a codepen! Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
const MoonOrSun = styled.div<{ isDark: boolean }>`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: ${p => (p.isDark ? "4px" : "2px")} solid
    ${p => p.theme.colors.primary};
  background: ${p => p.theme.colors.primary};
  transform: scale(${p => (p.isDark ? 0.55 : 1)});
  transition: all 0.45s ease;
  overflow: ${p => (p.isDark ? "visible" : "hidden")};

  &::before {
    outline: 0;
    border: 0;
    content: "";
    position: absolute;
    right: -9px;
    top: -9px;
    height: 24px;
    width: 24px;
    border: 2px solid ${p => p.theme.colors.primary};
    border-radius: 50%;
    transform: translate(${p => (p.isDark ? "14px, -14px" : "0, 0")});
    opacity: ${p => (p.isDark ? 0 : 1)};
    transition: transform 0.45s ease;
    background: radial-gradient(ellipse farthest-corner at 33% 100%, ${p => p.theme.colors.secondary} 50%, ${p => p.theme.colors.secondary} 50%);
    }

  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 -23px 0 ${p => p.theme.colors.primary},
      0 23px 0 ${p => p.theme.colors.primary},
      23px 0 0 ${p => p.theme.colors.primary},
      -23px 0 0 ${p => p.theme.colors.primary},
      15px 15px 0 ${p => p.theme.colors.primary},
      -15px 15px 0 ${p => p.theme.colors.primary},
      15px -15px 0 ${p => p.theme.colors.primary},
      -15px -15px 0 ${p => p.theme.colors.primary};
    transform: scale(${p => (p.isDark ? 1 : 0)});
    transition: all 0.35s ease;

    ${p => mediaqueries.tablet`
transform: scale(${p.isDark ? 0.92 : 0});
`}
  }
`;

const Hidden = styled.span`
    position: absolute;
    display: inline-block;
    opacity: 0;
    width: 0px;
    height: 0px;
    visibility: hidden;
    overflow: hidden;
`;

const GridButton = styled.button<{ active: boolean }>`
  outline: 0;
  border: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background: transparent;
  transition: background 0.25s;

  &:not(:last-child) {
    margin-right: 30px;
  }

  &:hover {
    background: ${p => p.theme.colors.hover};
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -10%;
    top: -10%;
    width: 120%;
    height: 120%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 50%;
  }

  svg {
    opacity: ${p => (p.active ? 1 : 0.25)};
    transition: opacity 0.2s;

    path {
      fill: ${p => p.theme.colors.primary};
    }
  }
`;
