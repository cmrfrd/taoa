import React, { useState, useEffect, useContext, useRef } from "react";
import { css, keyframes } from '@emotion/core';
import styled from "@emotion/styled";
import { Link, navigate, graphql, useStaticQuery } from "gatsby";
import { motion, AnimatePresence, Variants } from "framer-motion";
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

import ArrowIcon from './Navigation.Arrow';

/* GridRowToggle is a component that toggles between two
 * layouts of articles
 */
const GridRowToggle: React.FC<{}> = (props: any) => {

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
                    active={props.active}
                    data-a11y="false"
                    title="Show articles in Row grid"
                    aria-label="Show articles in Row grid"
                >
                    <Icons.Rows />
                </GridButton>
            ) : (
                    <GridButton
                        onClick={() => setGridLayout('tiles')}
                        active={props.active}
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

const NavigationHeader: React.FC<{}> = (props: any) => {

    /* initial paramaters for the nav header */
    const { enableGridRow, initialArrowUp } = props;

    /* When in mobile view sets the inital direction of the menu arrow */
    const [arrowUp, setArrowUp] = useState<boolean>(initialArrowUp);

    /* Check if the app is mobile or desktop */
    const { width } = getWindowDimensions();
    const breakpoint = getBreakpointFromTheme("phablet");
    const [showArrow, setShowArrow] = useState<boolean>(width <= breakpoint);

    const [colorMode] = useColorMode();
    const fill = colorMode === "dark" ? "#fff" : "#000";
    const tcolors = colorMode === "dark" ? theme.colors.modes.dark : theme.colors;

    /* Function to handle turning the UI from a desktop view to
     * a mobile view.
     *
     * This is done via theme-ui breakpoints
     */
    const handleWindowResize = () => {
        const { width } = getWindowDimensions();
        const breakpoint = getBreakpointFromTheme("phablet");
        const willShowArrow = width <= breakpoint;

        // When the arrow is removed, set it to the up position
        if (!willShowArrow) {
            setArrowUp(false)
        }

        setShowArrow(willShowArrow);
    };

    /* React hook to call function that will
     * handle mobile vs desktop view
     */
    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);


    /* These are the React refs that keep track of
     * the components when clicked will minimize the menu
     */
    const arrowRef = useRef(null);
    const menuRef = useRef(null);
    const logoRef = useRef(null);

    useEffect(() => {
        const menuf = (e) => {
            if (
                (menuRef.current && !menuRef.current.contains(event.target)) &&
                (logoRef.current && !logoRef.current.contains(event.target))
            ) {
                setArrowUp(false);
            };
        }

        window.addEventListener("mousedown", menuf);
        return () => {
            window.removeEventListener("mousedown", menuf);
        };
    }, [menuRef, arrowRef]);

    const variants: Variants = {
        open: { opacity: 1, y: "0%", visibility: "visible", pointerEvents: "auto" },
        closed: { opacity: 0, y: "-50%", visibility: "hidden", pointerEvents: "none" },
    }
    const transition = {
        duration: 0.3
    }

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
        padding-top: 12px;
        padding-bottom: 12px;
        ${mediaqueries.phablet`
    padding-top: 10px;
    padding-bottom: 10px;
    `};
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
                        ref={logoRef}
                        state={{ arrowUp: arrowUp }}
                    >
                        <Logo fill={fill} />
                        <Hidden>Navigate back to the homepage</Hidden>
                    </LogoLink>
                    {showArrow ? (
                        <div ref={menuRef}>
                            <ArrowIconContainer
                                data-a11y="false"
                                title="Hide/Display menu"
                                aria-label="Hide/Display menu"
                                ref={arrowRef}
                                onClick={() => { setArrowUp(!arrowUp) }}
                            >
                                <ArrowIcon isOpen={arrowUp} />
                            </ArrowIconContainer>
                            <AnimatePresence>
                                {arrowUp && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <MenuContainer arrowUp={arrowUp}>
                                            <MenuNav>
                                                <NavLinks showArrow={showArrow}>
                                                    <NavLink to={'/'} arrow={showArrow} state={{ arrowUp: arrowUp }}>
                                                        <NavLinkText>Home</NavLinkText>
                                                    </NavLink>
                                                    <NavLink to={'/about'} arrow={showArrow} state={{ arrowUp: arrowUp }}>
                                                        <NavLinkText>About</NavLinkText>
                                                    </NavLink>
                                                </NavLinks>
                                                <NavControls>
                                                    <>
                                                        <SharePageButton />
                                                        <DarkModeToggle />
                                                        <GridRowToggle enable={enableGridRow} active={enableGridRow} />
                                                    </>
                                                </NavControls>
                                            </MenuNav>
                                        </MenuContainer>
                                    </motion.div>)}
                            </AnimatePresence>
                        </div>
                    ) : (
                            <>
                                <NavLinks showArrow={showArrow}>
                                    <NavLink to={'/'} arrow={showArrow} state={{ arrowUp: arrowUp }}>
                                        <NavLinkText>Home</NavLinkText>
                                    </NavLink>
                                    <NavLink to={'/about'} arrow={showArrow} state={{ arrowUp: arrowUp }}>
                                        <NavLinkText>About</NavLinkText>
                                    </NavLink>
                                </NavLinks>
                                <NavControls>
                                    <>
                                        <GridRowToggle enable={enableGridRow} active={enableGridRow} />
                                        <SharePageButton />
                                        <DarkModeToggle />
                                    </>
                                </NavControls>
                            </>
                        )}
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

const ArrowIconContainer = styled.div`
    position: relative;
    display: flex;
`;

const MenuContainer = styled.div<{ arrowUp: boolean }>`
    top: 80px;
    right: calc((40px + 20px + 2rem) - (1rem + 60px));
    width: calc(2 * (1rem + 60px));

    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const open = css`
    animation: fadeIn 0.3s ease-out forwards;
`;
const closed = css`
    animation: fadeOut 0.3s ease-out forwards;
`;

const MenuNav = styled.nav`
    background-color: ${p => p.theme.colors.tintBackground};
    border-radius: 5px;
    box-shadow: 3px 4px 3px 0px ${p => p.theme.colors.tintHover};
    padding-bottom: 5px;
    transition: all 0.3s ease-out;
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

const NavLinks = styled.div<{ showArrow: boolean }>`
    position: relative;
    display: flex;
    align: ${p => (p.showArrow ? "none" : "left")};
    flex-direction: ${p => (p.showArrow ? "column" : "row")};
    margin-right: auto;

    ${mediaqueries.phablet`
margin-left: 0%;
right: -1px;
`}
`;

const NavControls = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const NavLink = styled(Link) <{ arrow: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: auto;
  padding-bottom: ${p => (p.arrow ? "6px" : "0px")};
  padding-top: ${p => (p.arrow ? "5px" : "0px")};
margin-left: ${p => (p.arrow ? "auto" : "30px")};
  ${mediaqueries.tablet`
margin-left: ${p => (p.arrow ? "auto" : "20px")};
`};
`;

const NavLinkText = styled(Headings.h3)`
  font-family: ${p => p.theme.fonts.serif};
  transition: ${p => p.theme.colorModeTransition};

  ${mediaqueries.desktop_large`
font-size: 24px;
`};
  ${mediaqueries.desktop`
font-size: 22px;
`};
  ${mediaqueries.tablet`
font-size: 20px;
`};
  ${mediaqueries.phablet`
font-size: 18px;
`};

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
  width: 45px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  margin-left: 30px;

  ${mediaqueries.phone`
margin-left: 2px;
`}

  ${mediaqueries.tablet`
margin-left: 2px;
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
