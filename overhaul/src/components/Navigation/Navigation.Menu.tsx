import { motion } from "framer-motion";
import { Flipper, Flipped } from "react-flip-toolkit";
import PropTypes from "prop-types";
import { css, keyframes } from '@emotion/core';
import styled from "@emotion/styled";

import React, { useState, useEffect, useContext, Component, forwardRef, createRef, Children } from "react";

export const promoteLayer = css`
  will-change: transform;
`

const getFadeContainerKeyFrame = ({ animatingOut, direction }) => {
    if (!direction) return
    return keyframes`
  to {
    transform: translateX(0px);
    opacity: ${animatingOut ? 0 : 1};
  }
    `
}
const FadeContainer = styled.div`
    ${promoteLayer}
    animation-name: ${getFadeContainerKeyFrame};
    animation-duration: ${props => props.duration}ms;
    animation-fill-mode: forwards;
    opacity: ${props => (props.direction && !props.animatingOut ? 0 : 1)};
    top: 0;
    left: 0;
`

const propTypes = {
    duration: PropTypes.number,
    direction: PropTypes.oneOf(["right", "left"]),
    animatingOut: PropTypes.bool,
    children: PropTypes.node
}

const FadeContents = forwardRef(
    ({ children, duration, animatingOut, direction }, ref) => (
        <FadeContainer
            // prevent screen readers from reading out hidden content
            aria-hidden={animatingOut}
            animatingOut={animatingOut}
            direction={direction}
            duration={duration}
            ref={ref}
        >
            {children}
        </FadeContainer>
    )
)

FadeContents.propTypes = propTypes

const getDropdownRootKeyFrame = ({ animatingOut, direction }) => {
    if (!animatingOut && direction) return null
    return keyframes`
  from {
    transform: ${animatingOut ? "translateY(0)" : "translateY(-15px)"};
    opacity: ${animatingOut ? 1 : 0};
  }
  to {
    transform: ${animatingOut ? "translateY(-15px)" : "translateY(0)"};
    opacity: ${animatingOut ? 0 : 1};
  }
    `
}

export const DropdownRoot = styled.div`
    transform-origin: 0 0;
    ${promoteLayer}
    animation-name: ${getDropdownRootKeyFrame};
    animation-duration: ${props => props.duration}ms;
    /* use 'forwards' to prevent flicker on leave animation */
    animation-fill-mode: forwards;
    /* flex styles will center the caret child component */
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 80px;
    right: calc(2rem);
`

export const Caret = styled.div`
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent ${p => p.theme.colors.tintBackground};
    /* make sure it's above the main dropdown container so now box-shadow bleeds over it */
    z-index: 1;
    position: relative;
    /* prevent any gap in between caret and main dropdown */
    top: 1px;
`

export const DropdownBackground = styled.div`
    transform-origin: 0 0;
    background-color: ${p => p.theme.colors.tintBackground};
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    /* box-shadow: 0 50px 100px rgba(50, 50, 93, 0.1); */
    ${promoteLayer}
`

export const AltBackground = styled.div`
    background-color: var(--grey);
    width: 300%;
    height: 100%;
    position: absolute;
    top: 0;
    left: -100%;
    transform-origin: 0 0;
    z-index: 0;
    transition: transform ${props => props.duration}ms;
`

export const InvertedDiv = styled.div`
    ${promoteLayer}
    position: ${props => (props.absolute ? "absolute" : "relative")};
    top: 0;
    left: 0;
    &:first-of-type {
    z-index: 1;
    }
    &:not(:first-of-type) {
    z-index: -1;
    }
`

const NavbarEl = styled.nav`
    margin: auto;
`

const NavbarList = styled.ul`
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 0;
`

class Navbar extends Component {
    render() {
        const { children, onMouseLeave } = this.props
        return (
            <NavbarEl onMouseLeave={onMouseLeave}>
                <NavbarList>{children}</NavbarList>
            </NavbarEl>
        )
    }
}

const NavbarItemTitle = styled.button`
    background: transparent;
    border: 0;
    font-weight: bold;
    font-family: inherit;
    font-size: 18px;
    padding: 2rem 1.5rem 1.2rem 1.5rem;
    color: white;
    display: flex;
    justify-content: center;
    transition: opacity 250ms;
    cursor: pointer;
    /* position above the dropdown, otherwise the dropdown will cover up the bottom sliver of the buttons */
    position: relative;
    z-index: 2;
    &:hover, &:focus {
    opacity: 0.7;
    outline:none;
    }
`

const NavbarItemEl = styled.li`
    position: relative;
`

const DropdownSlot = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    perspective: 1500px;
`

class NavbarItem extends Component {
    static propTypes = {
        onMouseEnter: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        children: PropTypes.node
    }
    onMouseEnter = () => {
        this.props.onMouseEnter(this.props.index)
    }

    render() {
        const { title, children } = this.props
        return (
            <NavbarItemEl onMouseEnter={this.onMouseEnter} onFocus={this.onMouseEnter}>
                <NavbarItemTitle>{title}</NavbarItemTitle>
                <DropdownSlot>{children}</DropdownSlot>
            </NavbarItemEl>
        )
    }
}

const getFirstDropdownSectionHeight = el => {
    if (
        !el ||
        !el.querySelector ||
        !el.querySelector("*[data-first-dropdown-section]")
    )
        return 0
    return el.querySelector("*[data-first-dropdown-section]").offsetHeight
}

const updateAltBackground = ({
    altBackground,
    prevDropdown,
    currentDropdown
}) => {
    const prevHeight = getFirstDropdownSectionHeight(prevDropdown)
    const currentHeight = getFirstDropdownSectionHeight(currentDropdown)

    const immediateSetTranslateY = (el, translateY) => {
        el.style.transform = `translateY(${translateY}px)`
        el.style.transition = "transform 0s"
        requestAnimationFrame(() => (el.style.transitionDuration = ""))
    }

    if (prevHeight) {
        // transition the grey ("alt") background from its previous height to its current height
        immediateSetTranslateY(altBackground, prevHeight)
        requestAnimationFrame(() => {
            altBackground.style.transform = `translateY(${currentHeight}px)`
        })
    } else {
        // just immediately set the background to the appropriate height
        // since we don't have a stored value
        immediateSetTranslateY(altBackground, currentHeight)
    }
}

class DropdownContainer extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        animatingOut: PropTypes.bool,
        direction: PropTypes.oneOf(["left", "right"]),
        duration: PropTypes.number
    }

    currentDropdownEl = createRef()
    prevDropdownEl = createRef()

    componentDidMount() {
        updateAltBackground({
            altBackground: this.altBackgroundEl,
            prevDropdown: this.prevDropdownEl.current,
            currentDropdown: this.currentDropdownEl.current,
            duration: this.props.duration
        })
    }

    render() {
        const { children, direction, animatingOut, duration } = this.props
        const [currentDropdown, prevDropdown] = Children.toArray(children)
        return (
            <DropdownRoot
                animatingOut={animatingOut}
                duration={duration}
            >
                <Flipped flipId="dropdown-caret">
                    <Caret />
                </Flipped>
                <Flipped flipId="dropdown">
                    <DropdownBackground>

                        <Flipped inverseFlipId="dropdown">
                            <InvertedDiv>
                                <AltBackground
                                    ref={el => (this.altBackgroundEl = el)}
                                    duration={duration}
                                />
                                <FadeContents
                                    direction={direction}
                                    duration={duration}
                                    ref={this.currentDropdownEl}
                                >
                                    {currentDropdown}
                                </FadeContents>
                            </InvertedDiv>
                        </Flipped>
                        <Flipped inverseFlipId="dropdown" scale>
                            <InvertedDiv absolute>
                                {prevDropdown && (
                                    <FadeContents
                                        animatingOut
                                        direction={direction}
                                        duration={duration}
                                        ref={this.prevDropdownEl}
                                    >
                                        {prevDropdown}
                                    </FadeContents>
                                )}
                            </InvertedDiv>
                        </Flipped>
                    </DropdownBackground>
                </Flipped>
            </DropdownRoot>
        )
    }
}


export const Heading = styled.h3`
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.1rem;
    margin-top: 0;
    margin-bottom: ${props => (props.noMarginBottom ? 0 : "1rem")};
    color: ${({ color }) => (color ? `var(--${color})` : "var(--blue)")};
    `

export const HeadingLink = Heading.withComponent("li")

export const LinkList = styled.ul`
    li {
    margin-bottom: 1rem;
    }
    li:last-of-type {
    margin-bottom: 0;
    }

    margin-left: ${props => (props.marginLeft ? props.marginLeft : 0)};
`

export const Icon = styled.div`
    width: 13px;
    height: 13px;
    margin-right: 13px;
    background-color: var(--blue);
    opacity: 0.8;
    display: inline-block;
`

export const DropdownSection = styled.div`
    padding: var(--spacer);
    position: relative;
    z-index: 1;
`

const CompanyDropdownEl = styled.div`
    width: calc(2 * (1rem + 40px));
`

const CompanyDropdown = () => {
    return (
        <CompanyDropdownEl>
            <DropdownSection data-first-dropdown-section>
                <ul>
                    <HeadingLink>
                        <a href="/">
                            <Icon /> About
                        </a>
                    </HeadingLink>
                    <HeadingLink>
                        <a href="/">
                            <Icon />Customers
                        </a>
                    </HeadingLink>
                    <HeadingLink>
                        <a href="/">
                            <Icon />Jobs
                        </a>
                    </HeadingLink>
                </ul>
            </DropdownSection>
        </CompanyDropdownEl>
    )
}



const Menu: React.FC<{}> = (props: any) => {
    const duration = 0.3;
    const { active, open } = props;

    const variants = {
        open: { opacity: 1, y: "100%" },
        closed: { opacity: 0, y: "50%" },
    }

    return (
        <motion.nav
            animate={open ? "open" : "closed"}
            variants={variants}
            transition={{ duration: duration }}
        >
            {/* <CompanyDropdown /> */}
            <p>wut</p>
        </motion.nav>
    );
};

export default Menu;
