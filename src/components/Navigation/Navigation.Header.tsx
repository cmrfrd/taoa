import { GridLayoutContext } from '../../sections/posts/Posts.List.Context';
import ArrowIcon from './Navigation.Arrow';

import Headings from '@components/Headings';
import Logo from '@components/Logo';
import Section from '@components/Section';
import useStickyOnScrolled from '@components/UseStickyScroll';
import Icons from '@icons';
import mediaqueries, { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';
import { copyToClipboard, getWindowDimensions, getBreakpointFromTheme, theme } from '@utils';

import styled from '@emotion/styled';
import * as CSS from 'csstype';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'gatsby';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useColorMode } from 'theme-ui';

interface IGridRowToggle {
  active: boolean;
}

/* GridRowToggle is a component that toggles between two
 * layouts of posts
 */
const GridRowToggle: React.FC<IGridRowToggle> = (props: IGridRowToggle) => {
  const { active } = props;
  const { gridLayout = 'tiles', setGridLayout } = useContext(GridLayoutContext);
  const rowsIsActive = gridLayout === 'tiles';

  const [activeInLargeFormat, setActiveInLargeFormat] = useState<boolean>(true);

  const handleWindowResize = (): void => {
    const { width } = getWindowDimensions();
    const breakpoint = getBreakpointFromTheme('tablet');
    setActiveInLargeFormat(width > breakpoint);
  };

  useEffect((): (() => void) => {
    window.addEventListener('resize', handleWindowResize);
    return (): void => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <IconWrapper isDark={false}>
      {rowsIsActive ? (
        <GridButton
          onClick={(): void => {
            if (active && activeInLargeFormat) setGridLayout('rows');
          }}
          active={active && activeInLargeFormat}
          data-a11y={false}
          title="Show posts in Row grid"
          aria-label="Show posts in Row grid"
        >
          <Icons.Rows />
        </GridButton>
      ) : (
        <GridButton
          onClick={(): void => {
            if (active && activeInLargeFormat) setGridLayout('tiles');
          }}
          active={active && activeInLargeFormat}
          data-a11y={false}
          title="Show posts in Tile grid"
          aria-label="Show posts in Tile grid"
        >
          <Icons.Tiles />
        </GridButton>
      )}
    </IconWrapper>
  );
};

/* DarkModeToggle is a component that toggles between two
 * color themes
 */
const DarkModeToggle: React.FC<{}> = () => {
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === `dark`;

  /* Toggle function to switch from light and dark */
  function toggleColorMode(event: React.MouseEvent<HTMLElement>): void {
    event.preventDefault();
    setColorMode(isDark ? `light` : `dark`);
  }

  return (
    <IconWrapper
      isDark={isDark}
      onClick={toggleColorMode}
      data-a11y={false}
      aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'}
      title={isDark ? 'Activate light mode' : 'Activate dark mode'}
    >
      <MoonOrSun isDark={isDark} />
    </IconWrapper>
  );
};

/* SharePageButton is a component that when clicked
 * will copy the current URL to the clipboard
 */
const SharePageButton: React.FC<{}> = () => {
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const [colorMode] = useColorMode();
  const isDark = colorMode === `dark`;
  const fill = isDark ? '#fff' : '#000';

  function copyToClipboardOnClick(): void {
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
      data-a11y={false}
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

interface INavigationHeader {
  enableGridRow: boolean;
  initialArrowUp: boolean;
}

/* NavigationHeader contained the associated links and widgets to control
 * navigation, color, and layout
 */
const NavigationHeader: React.FC<INavigationHeader> = (props: INavigationHeader) => {
  /* initial paramaters for the nav header */
  const { enableGridRow, initialArrowUp } = props;

  /* When in mobile view sets the inital direction of the menu arrow */
  const [arrowUp, setArrowUp] = useState<boolean>(initialArrowUp);

  /* Check if the app is mobile or desktop */
  const { width } = getWindowDimensions();
  const breakpoint = getBreakpointFromTheme('phablet');
  const [showArrow, setShowArrow] = useState<number>(+(width <= breakpoint));

  /* Function to handle turning the UI from a desktop view to
   * a mobile view.
   *
   * This is done via theme-ui breakpoints
   */
  const handleWindowResize = (): void => {
    const { width } = getWindowDimensions();
    const breakpoint = getBreakpointFromTheme('phablet');
    const willShowArrow = width <= breakpoint;

    // When the arrow is removed, set it to the up position
    if (!willShowArrow) {
      setArrowUp(false);
    }

    setShowArrow(+willShowArrow);
  };

  /* React hook to call function that will
   * handle mobile vs desktop view
   */
  useEffect((): (() => void) => {
    window.addEventListener('resize', handleWindowResize);
    return (): void => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  /* These are the React refs that keep track of
   * the components when clicked will minimize the menu
   */
  const arrowRef = useRef(null);
  const menuRef = useRef(null);

  /* Listener to minimize the menu on mouse click outside the menu */
  useEffect((): (() => void) => {
    const menuf: { (event: MouseEvent): void } = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setArrowUp(false);
      }
    };

    window.addEventListener('mousedown', menuf);
    return (): void => {
      window.removeEventListener('mousedown', menuf);
    };
  }, [menuRef, arrowRef]);

  const stickyHeader = useStickyOnScrolled();

  const arrowMenuMotion = {
    initial: {
      opacity: 0,
      y: -10
    },
    animate: {
      opacity: 1,
      y: 10
    },
    exit: {
      opacity: 0,
      y: -10
    },
    transition: {
      duration: 0.2
    }
  };

  return (
    <HeaderSticky sticky={stickyHeader}>
      <HeaderSection>
        <NavContainer>
          <LogoLink
            to={'/'}
            data-a11y={false}
            title="Navigate back to the homepage"
            aria-label="Navigate back to the homepage"
            state={{ arrowUp: arrowUp }}
          >
            <Logo />
          </LogoLink>
          {showArrow ? (
            <div ref={menuRef}>
              <ArrowIconContainer
                data-a11y={false}
                title="Hide/Display menu"
                aria-label="Hide/Display menu"
                ref={arrowRef}
                onClick={(): void => {
                  setArrowUp(!arrowUp);
                }}
              >
                <ArrowIcon isOpen={arrowUp} />
              </ArrowIconContainer>
              <AnimatePresence initial={false}>
                {arrowUp && (
                  <motion.div {...arrowMenuMotion}>
                    <MenuContainer>
                      <MenuNav>
                        <NavLinks arrow={showArrow}>
                          <VSpacer />
                          <NavLink
                            to={'/about'}
                            arrow={showArrow}
                            state={{ arrowUp: arrowUp }}
                            data-a11y={false}
                            title="Navigate to the about page"
                            aria-label="Navigate to the about page"
                          >
                            <NavLinkText arrow={showArrow}>About</NavLinkText>
                          </NavLink>
                        </NavLinks>
                        <Horizontal />
                        <NavControls>
                          <>
                            <GridRowToggle active={false} />
                            <SharePageButton />
                            <DarkModeToggle />
                          </>
                        </NavControls>
                      </MenuNav>
                    </MenuContainer>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <NavLinks arrow={showArrow}>
                <HSpacer />
                <NavLink
                  to={'/about'}
                  arrow={showArrow}
                  state={{ arrowUp: arrowUp }}
                  data-a11y={false}
                  title="Navigate to the about page"
                  aria-label="Navigate to the about page"
                >
                  <NavLinkText arrow={showArrow}>About</NavLinkText>
                </NavLink>
              </NavLinks>
              <NavControls>
                <>
                  <GridRowToggle active={enableGridRow} />
                  <SharePageButton />
                  <DarkModeToggle />
                </>
              </NavControls>
            </>
          )}
        </NavContainer>
      </HeaderSection>
    </HeaderSticky>
  );
};

export default NavigationHeader;

interface IHeaderStickyProps extends ITAOAThemeUIContext {
  sticky: boolean;
}

const HeaderSticky = styled.div((p: IHeaderStickyProps) =>
  p.sticky
    ? {
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        opacity: 1,
        zIndex: 100,
        transition: theme.colorModeTransition,
        paddingTop: '8px',
        paddingBottom: '8px',
        boxShadow: `3px 5px 2px 0px ${p.theme.colors.tintHover}`,
        backgroundColor: p.theme.colors.tintBackground,
        [mediaquery.desktop()]: {
          paddingTop: '8px',
          paddingBottom: '8px'
        },
        [mediaquery.tablet()]: {
          paddingTop: '6px',
          paddingBottom: '6px'
        },
        [mediaquery.phablet()]: {
          paddingTop: '6px',
          paddingBottom: '6px'
        }
      }
    : {
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        opacity: 1,
        zIndex: 100,
        paddingTop: '16px',
        paddingBottom: '16px',
        transition: theme.colorModeTransition,
        backgroundColor: p.theme.colors.background
      }
);

const HeaderSection = styled(Section)({
  paddingLeft: 0,
  paddingRight: 0,
  [mediaquery.tablet()]: {}
});

const Horizontal = styled.div((p: ITAOAThemeUIContext) => ({
  position: 'relative',
  borderBottom: `1px solid ${p.theme.colors.horizontalNav}`,
  zIndex: 0,

  [mediaquery.tablet()]: {
    margin: '5px 15px 5px'
  }
}));

const ArrowIconContainer = styled.div(() => ({
  position: 'relative',
  display: 'flex'
}));

const MenuContainer = styled.div({
  top: '15px',
  right: 'calc((40px + 2rem) - (1rem + 60px))',
  width: 'calc(2 * (1rem + 60px))',

  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const MenuNav = styled.nav((p: ITAOAThemeUIContext) => ({
  backgroundColor: p.theme.colors.tintBackground,
  borderRadius: '5px',
  boxShadow: `rgba(0,0,0,.11) 0 0 0 1px, rgba(0,0,0,.05) 0 10px 10px -5px`,
  border: '0px',
  paddingBottom: '5px',
  transition: p.theme.colorModeTransition
}));

const NavContainer = styled.div({
  zIndex: 100,
  display: 'flex',
  justifyContent: 'space-between'
});

const LogoLink = styled(Link)((p: ITAOAThemeUIContext) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',

  [mediaquery.desktop_medium()]: {
    left: 0
  },

  '&[data-a11y="true"]:focus::after': {
    content: '""',
    position: 'absolute',
    left: '-10%',
    top: '-30%',
    width: '120%',
    height: '160%',
    border: `2px solid ${p.theme.colors.accent}`,
    background: 'rgba(255, 255, 255, 0.01)',
    borderRadius: '5px'
  },

  '&:hover': {}
}));

interface INavLinks extends ITAOAThemeUIContext {
  arrow: number;
}

const NavLinks = styled.div((p: INavLinks) => ({
  position: 'relative',
  display: 'flex',
  align: p.arrow ? 'none' : 'left',
  flexDirection: p.arrow ? 'column' : 'row',
  marginRight: 'auto',

  [mediaquery.phablet()]: {
    marginLeft: '0%',
    right: '-1px'
  }
}));

const NavControls = styled.div(() => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center'
}));

const VSpacer = styled.div({
  height: '5px'
});

const HSpacer = styled.div({
  width: '5px'
});

interface INavLink extends ITAOAThemeUIContext {
  arrow: number;
}

const NavLink = styled(Link)((p: INavLink) => ({
  position: 'relative',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.25s ease-in-out 0s',
  margin: '0px 4px 0px 4px',
  borderRadius: '2px',

  paddingBottom: p.arrow ? '6px' : '0px',
  paddingTop: p.arrow ? '5px' : '0px',
  [mediaquery.phablet()]: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  '&:hover': {
    backgroundColor: `${p.theme.colors.hoverGrey}`
  }
}));

interface INavLinkText extends ITAOAThemeUIContext {
  arrow: number;
}

const NavLinkText = styled(Headings.h2)(
  (p: INavLinkText) => `
    font-family: ${p.theme.fonts.serif};
    transition: ${p.theme.colorModeTransition};
    font-size: 20px;
    font-weight: 600;
    padding: 0 12px;
    margin: auto auto;

    ${mediaquery.desktop_large()} {
        font-size: 20px;
    };

    ${mediaquery.desktop()} {
        font-size: 20px;
    };

    ${mediaquery.tablet()} {
        padding: 0 10px;
        font-size: 16px;
    };

    ${mediaquery.phablet()} {
        font-size: 14px;
    };
    ${mediaquery.phone_large()} {
    };
    `
);

interface IToolTip extends ITAOAThemeUIContext {
  isDark: boolean;
  hasCopied: boolean;
}

const ToolTip = styled.div((p: IToolTip) => ({
  position: 'absolute',
  padding: '3px 10px',
  background: p.isDark ? '#000' : p.theme.colors.background,
  color: p.isDark ? '#fff' : '#000',
  borderRadius: '3px',
  fontSize: '10px',
  top: '-20px',
  opacity: p.hasCopied ? 1 : 0,
  transform: p.hasCopied ? 'translateY(-3px)' : 'none',
  transition: p.theme.colorModeTransition,
  zIndex: 100,

  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '-6px',
    margin: '0 auto',
    width: 0,
    height: 0,
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderTop: `6px solid ${p.isDark ? '#000' : p.theme.colors.background}`
  }
}));

interface IIconWrapper extends ITAOAThemeUIContext {
  isDark: boolean;
}

const IconWrapper = styled.div((p: IIconWrapper) => ({
  opacity: 0.5,
  position: 'relative',
  borderRadius: '5px',
  width: '40px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'opacity 0.3s ease',
  marginLeft: '25px',

  [mediaquery.phone()]: {
    marginLeft: '2px'
  },

  [mediaquery.phablet()]: {
    marginLeft: '10px'
  },

  [mediaquery.tablet()]: {
    marginLeft: '2px',
    display: 'inline-flex',
    transform: 'scale(0.708)',
    '&:hover': {
      opacity: 0.5
    }
  },

  '&:hover': {
    opacity: 1
  },

  "&[data-a11y='true']:focus::after": {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '-30%',
    width: '100%',
    height: '160%',
    border: `2px solid ${p.theme.colors.accent}`,
    background: 'rgba(255, 255, 255, 0.01)',
    borderRadius: '5px'
  }
}));

const GridButton = styled.button((p: ITAOAThemeUIContext) => ({
  outline: 0,
  border: 0,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '36px',
  width: '36px',
  borderRadius: '50%',
  background: 'transparent',
  transition: 'background 0.25s',

  '&:not(:last-child)': {
    marginRight: '30px'
  },

  '&:hover': {
    background: p.theme.colors.hover
  },

  "&[data-a11y='true']:focus::after": {
    content: '""',
    position: 'absolute',
    left: '-10%',
    top: '-10%',
    width: '120%',
    height: '120%',
    border: '2px solid p.theme.colors.accent',
    background: 'rgba(255, 255, 255, 0.01)',
    borderRadius: '50%'
  },

  svg: {
    opacity: p.active ? 1 : 0.25,
    transition: 'opacity 0.2s',

    path: {
      fill: p.theme.colors.primary
    }
  }
}));

interface IMoonOrSun extends ITAOAThemeUIContext {
  isDark: boolean;
}

// This is based off a codepen! Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
const MoonOrSun = styled.div(
  (p: IMoonOrSun) => `
    position: relative;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: ${p.isDark ? '4px' : '2px'} solid ${p.theme.colors.primary};
    background: ${p.theme.colors.primary};
    transform: scale(${p.isDark ? 0.55 : 1});
    transition: all 0.45s ease;
    overflow: ${p.isDark ? 'visible' : 'hidden'};

                            &::before {
                                outline: 0;
                                border: 0;
                                content: ' ';
                                position: absolute;
                                right: -9px;
                                top: -9px;
                                height: 24px;
                                width: 24px;
                                border: 2px solid ${p.theme.colors.primary};
                                border-radius: 50%;
                                transform: translate(${p.isDark ? '14px, -14px' : '0, 0'});
                                opacity: ${p.isDark ? 0 : 1};
                                transition: transform 0.45s ease;
                                background: radial-gradient(
                                    ellipse farthest-corner at 33% 100%,
                                    ${p.theme.colors.secondary} 50%,
                                    ${p.theme.colors.secondary} 50%
                                );
                            }

                            &::after {
                                content: ' ';
                                width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 -23px 0 ${p.theme.colors.primary}, 0 23px 0 ${p.theme.colors.primary},
      23px 0 0 ${p.theme.colors.primary}, -23px 0 0 ${p.theme.colors.primary},
      15px 15px 0 ${p.theme.colors.primary}, -15px 15px 0 ${p.theme.colors.primary},
      15px -15px 0 ${p.theme.colors.primary}, -15px -15px 0 ${p.theme.colors.primary};
    transform: scale(${p.isDark ? 1 : 0});
    transition: all 0.35s ease;

    ${mediaqueries.tablet`
    transform: scale(${p.isDark ? 0.92 : 0});
    `}
  }
    `
);
