import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import * as CSS from 'csstype';
import React from 'react';
// @ts-ignore
import { AwesomeButton } from 'react-awesome-button';

interface IButtonPropsTheme extends ITAOAThemeUIContext {
  fontSize?: string;
  width?: string;
  height?: string;
}

interface IButtonPropsAwesome {
  // extends AwesomeButtonProps
  onPress?(): void;
  size?: string;
}

interface IButtonProps {
  button?: IButtonPropsAwesome;
  theme?: IButtonPropsTheme;
  text?: string;
}

/**
 * Buttons are fun and clickable! This component exported and based
 * on https://github.com/rcaferati/react-awesome-button
 */
const Button: React.FC<IButtonProps> = (props: IButtonProps) => {
  const { text } = props;

  return (
    <ButtonContainer {...props.theme}>
      <AwesomeButton type="primary" {...props.button}>
        {text}
      </AwesomeButton>
    </ButtonContainer>
  );
};

export const SmallButton: React.FC<IButtonProps> = (props: IButtonProps) => (
  <Button button={{ size: 'small', ...props.button }} {...props} />
);
export const MediumButton: React.FC<IButtonProps> = (props: IButtonProps) => (
  <Button button={{ size: 'medium', ...props.button }} {...props} />
);
export const LargeButton: React.FC<IButtonProps> = (props: IButtonProps) => (
  <Button button={{ size: 'large', ...props.button }} {...props} />
);

export default Button;

const ButtonContainer = styled.div(
  (p: IButtonPropsTheme) => `
        .aws-btn {
            --button-icon-width: 44px;
            --button-icon-height: 44px;
            --button-default-height: ${p.height || '44px'};
            --button-default-font-size: ${p.fontSize || '14px'};
            --button-default-line-height: 24px;
            --button-default-border-radius: 2px;
            --button-default-placeholder-width: 120px;
            --button-small-width: ${p.width || '88px'};
            --button-small-height: ${p.height || '44px'};
            --button-small-font-size: ${p.fontSize || '14px'};
            --button-medium-width: ${p.width || '186px'};
            --button-medium-height: ${p.height || '54px'};
            --button-medium-font-size: ${p.fontSize || '18px'};
            --button-large-width: ${p.width || '212px'};
            --button-large-height: ${p.height || '60px'};
            --button-large-font-size: ${p.fontSize || '22px'};
            --button-font-family: ${p.theme.fonts.serif};
            --button-font-color: ${p.theme.colors.invTintBackground};
            --button-font-color-hover: ${p.theme.colors.invTintBackground};
            --button-font-weight: 600;
            --button-font-style: normal;
            --button-hover-darken-opacity: 0.1;
            --button-letter-spacing: 0px;
            --button-horizontal-padding: 16px;
            --button-raise-level: 3px;
            --button-hover-pressure: 0;
            --loading-transition-timing: ease-out;
            --loading-transition-speed: 6s;
            --loading-transition-end-speed: 0.3s;
            --transform-speed: 0.25s;
            --button-primary-color-light: ${p.theme.colors.background};
            --button-primary-color: ${p.theme.colors.invTintBackground};
            --button-primary-color-dark: ${p.theme.colors.grey};
            --button-primary-color-hover: ${p.theme.colors.tintBackground};
            --button-primary-color-active: ${p.theme.colors.tintBackground};
            --button-primary-border: none;
            --button-secondary-color: #f2f6f9;
            --button-secondary-color-dark: #1360a4;
            --button-secondary-color-light: #1e88e5;
            --button-secondary-color-hover: #e1eaf1;
            --button-secondary-color-active: #cfdee9;
            --button-secondary-border: 2px solid #1e88e5;
            --button-anchor-color: #0e4f88;
            --button-anchor-color-dark: #072743;
            --button-anchor-color-light: white;
            --button-anchor-color-hover: #0d4a7f;
            --button-anchor-color-active: #0c4271;
            --button-anchor-border: none;
            --button-disabled-color: #afafaf;
            --button-disabled-color-dark: #898989;
            --button-disabled-color-light: #969696;
            --button-disabled-color-hover: #afafaf;
            --button-disabled-color-active: #afafaf;
            --button-disabled-border: none;
            --button-placeholder-color: #afafaf;
            --button-placeholder-color-dark: #898989;
            --button-placeholder-color-light: #969696;
            --button-placeholder-color-hover: #afafaf;
            --button-placeholder-color-active: #afafaf;
            --button-placeholder-border: none;
            --button-mail-color: #cfcfcf;
            --button-mail-color-dark: #9c9c9c;
            --button-facebook-color: #4868ad;
            --button-facebook-color-dark: #324877;
            --button-messenger-color: #3186f6;
            --button-messenger-color-dark: #0960d1;
            --button-twitter-color: #00aced;
            --button-twitter-color-dark: #0074a1;
            --button-linkedin-color: #0077b5;
            --button-linkedin-color-dark: #004569;
            --button-whatsapp-color: #25d366;
            --button-whatsapp-color-dark: #1a9247;
            --button-github-color: #25292e;
            --button-github-color-dark: #030304;
            --button-reddit-color: #fc461e;
            --button-reddit-color-dark: #cb2703;
            --button-pinterest-color: #bd091c;
            --button-pinterest-color-dark: #740611;
            --button-gplus-color: #ce5b4e;
            --button-gplus-color-dark: #a3392d;
            --button-youtube-color: #cc181e;
            --button-youtube-color-dark: #881014;
            --button-instagram-radial-color: radial-gradient(
                circle at 25% 110%,
                #fdf497 0%,
                #fdf497 5%,
                #fd5949 45%,
                #d6249f 60%,
                #285aeb 90%
            );
            --button-instagram-radial-color-dark: radial-gradient(
                circle at 25% 110%,
                #b9a800 0%,
                #938500 5%,
                #b10f00 45%,
                #8c0061 60%,
                #002ca9 90%
            );
        }

    /**
       button-color:
       color-name, (required)
       background, (required)
       darker-background, (required)
       font-color, (required)
       hover-background,
       border,
     */
    /**
       button-social-color:
       color-name,
       background,
       darken-background,
       font-color
     */
    /**
       button-size: size-name, width, height, font-size, line-height
     */
        .aws-btn .aws-btn__wrapper:before,
      .aws-btn .aws-btn__wrapper:after,
      .aws-btn .aws-btn__content:after,
      .aws-btn--progress .aws-btn__progress:before,
      .aws-btn--progress .aws-btn__progress:after,
      .aws-btn--progress .aws-btn__content:after {
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
      }

      .aws-btn {
          padding: 0;
          margin: 0;
      }

      .aws-btn,
      .aws-btn:focus {
          outline-color: 0;
          outline-style: none;
          outline-width: 0;
      }

      .aws-btn {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
          user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
      }

    button.aws-btn .aws-btn__wrapper {
        margin-top: calc(var(--button-raise-level) * -1);
    }

      .aws-btn {
    -webkit-box-sizing: border-box;
          box-sizing: border-box;
          display: inline-block;
          vertical-align: middle;
          height: var(--button-default-height);
          position: relative;
          z-index: 1;
          background-color: transparent;
          font-size: var(--button-default-font-size);
          line-height: var(--button-default-line-height);
          font-weight: var(--button-font-weight);
          font-family: var(--button-font-family);
          font-style: var(--button-font-style);
          letter-spacing: var(--button-letter-spacing);
          text-rendering: auto;
          text-decoration: none;
          text-align: center;
    -webkit-transition: opacity 0.1s ease-out;
          transition: opacity 0.1s ease-out;
          border: none;
          opacity: 0;
          cursor: pointer;
    -webkit-font-smoothing: antialiased;
    -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
    -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
      }
      .aws-btn .aws-btn__wrapper {
          position: relative;
          font-family: var(--button-font-family);
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
                   -webkit-box-align: stretch;
                   -ms-flex-align: stretch;
          align-items: stretch;
          width: 100%;
          height: calc(100% - var(--button-raise-level));
                   -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
                   -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
                   -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
      }
      .aws-btn .aws-btn__wrapper:before {
          content: ' ';
          border-radius: var(--button-default-border-radius);
          top: auto;
          bottom: calc(var(--button-raise-level) * -1);
          z-index: 1;
                  -webkit-transition: background var(--transform-speed) ease-out,
                  -webkit-transform var(--transform-speed) ease-out;
          transition: background var(--transform-speed) ease-out,
                  -webkit-transform var(--transform-speed) ease-out;
          transition: transform var(--transform-speed) ease-out,
          background var(--transform-speed) ease-out;
          transition: transform var(--transform-speed) ease-out,
          background var(--transform-speed) ease-out,
                  -webkit-transform var(--transform-speed) ease-out;
      }
      .aws-btn .aws-btn__wrapper:after {
          content: ' ';
          background-color: rgba(0, 0, 0, 0.15);
          border-radius: var(--button-default-border-radius);
          z-index: 2;
          width: 0;
          top: var(--button-raise-level);
      }
      .aws-btn .aws-btn__content {
          position: relative;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
                   -webkit-box-flex: 1;
                   -ms-flex: 1;
          flex: 1;
                   -webkit-box-align: center;
                   -ms-flex-align: center;
          align-items: center;
                   -webkit-box-pack: center;
                   -ms-flex-pack: center;
          justify-content: center;
          border-radius: var(--button-default-border-radius);
          text-indent: 0;
          z-index: 1;
          overflow: hidden;
          padding: 0 var(--button-horizontal-padding);
                   -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
                   -webkit-transform-style: flat;
          transform-style: flat;
                   -webkit-transform: skew(0) translate3d(0, 0, 0);
          transform: skew(0) translate3d(0, 0, 0);
                   -webkit-transition: border var(--transform-speed) ease-out,
          background var(--transform-speed) ease-out,
          color var(--transform-speed) ease-out,
                   -webkit-transform var(--transform-speed) ease-out;
          transition: border var(--transform-speed) ease-out,
          background var(--transform-speed) ease-out,
          color var(--transform-speed) ease-out,
                   -webkit-transform var(--transform-speed) ease-out;
          transition: border var(--transform-speed) ease-out,
          transform var(--transform-speed) ease-out,
          background var(--transform-speed) ease-out,
          color var(--transform-speed) ease-out;
          transition: border var(--transform-speed) ease-out,
          transform var(--transform-speed) ease-out,
          background var(--transform-speed) ease-out,
          color var(--transform-speed) ease-out,
                   -webkit-transform var(--transform-speed) ease-out;
      }
      .aws-btn .aws-btn__content > span:first-of-type {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
          align-items: center;
                  -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
                  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
                  -webkit-transform: skew(0) translate3d(0, 0, 0);
          transform: skew(0) translate3d(0, 0, 0);
      }
      .aws-btn .aws-btn__content > span:first-of-type > svg {
          margin-top: -2px;
          margin-right: 3px;
      }
      .aws-btn:before {
          content: ' ';
          background-color: rgba(0, 0, 0, 0.3);
          width: calc(100% - 2px);
          height: calc(100% - (var(--button-raise-level) * 2));
          bottom: calc(0px - (var(--button-raise-level) / 2));
          left: 1px;
          position: absolute;
          border-radius: var(--button-default-border-radius);
                  -webkit-transform: skewY(0) translate3d(0, 0, 0);
          transform: skewY(0) translate3d(0, 0, 0);
                  -webkit-transition: background calc(var(--transform-speed) * 0.8) ease-out,
                  -webkit-transform calc(var(--transform-speed) * 0.8) ease-out;
          transition: background calc(var(--transform-speed) * 0.8) ease-out,
                  -webkit-transform calc(var(--transform-speed) * 0.8) ease-out;
          transition: transform calc(var(--transform-speed) * 0.8) ease-out,
          background calc(var(--transform-speed) * 0.8) ease-out;
          transition: transform calc(var(--transform-speed) * 0.8) ease-out,
          background calc(var(--transform-speed) * 0.8) ease-out,
                  -webkit-transform calc(var(--transform-speed) * 0.8) ease-out;
      }
      .aws-btn--facebook .aws-btn__wrapper:before {
          background: #324877;
      }
      .aws-btn--facebook .aws-btn__content {
          background: #4868ad;
          color: #ffffff;
      }
      .aws-btn--facebook .aws-btn__content path {
          fill: #ffffff;
      }
      .aws-btn--facebook.aws-btn--progress .aws-btn__content > span {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 100%;
          width: 100%;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
          align-items: center;
                  -webkit-box-pack: center;
                  -ms-flex-pack: center;
          justify-content: center;
      }
      .aws-btn--facebook.aws-btn--progress .aws-btn__progress:before,
      .aws-btn--facebook.aws-btn--progress .aws-btn__progress:after {
          color: #ffffff;
      }
      .aws-btn--messenger .aws-btn__wrapper:before {
          background: #0960d1;
      }
      .aws-btn--messenger .aws-btn__content {
          background: #3186f6;
          color: #ffffff;
      }
      .aws-btn--messenger .aws-btn__content path {
          fill: #ffffff;
      }
      .aws-btn--messenger.aws-btn--progress .aws-btn__content > span {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 100%;
          width: 100%;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
          align-items: center;
                  -webkit-box-pack: center;
                  -ms-flex-pack: center;
          justify-content: center;
      }
      .aws-btn--messenger.aws-btn--progress .aws-btn__progress:before,
      .aws-btn--messenger.aws-btn--progress .aws-btn__progress:after {
          color: #ffffff;
      }
      .aws-btn--twitter .aws-btn__wrapper:before {
          background: #0074a1;
      }
      .aws-btn--twitter .aws-btn__content {
          background: #00aced;
          color: #ffffff;
      }
      .aws-btn--twitter .aws-btn__content path {
          fill: #ffffff;
      }
      .aws-btn--twitter.aws-btn--progress .aws-btn__content > span {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 100%;
          width: 100%;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
          align-items: center;
                  -webkit-box-pack: center;
                  -ms-flex-pack: center;
          justify-content: center;
      }
      .aws-btn--twitter.aws-btn--progress .aws-btn__progress:before,
      .aws-btn--twitter.aws-btn--progress .aws-btn__progress:after {
          color: #ffffff;
      }
      .aws-btn--linkedin .aws-btn__wrapper:before {
          background: #004569;
      }
      .aws-btn--linkedin .aws-btn__content {
          background: #0077b5;
          color: #ffffff;
      }
      .aws-btn--linkedin .aws-btn__content path {
          fill: #ffffff;
      }
      .aws-btn--linkedin.aws-btn--progress .aws-btn__content > span {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 100%;
          width: 100%;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
          align-items: center;
                  -webkit-box-pack: center;
                  -ms-flex-pack: center;
          justify-content: center;
      }
      .aws-btn--linkedin.aws-btn--progress .aws-btn__progress:before,
      .aws-btn--linkedin.aws-btn--progress .aws-btn__progress:after {
          color: #ffffff;
      }
      .aws-btn--whatsapp .aws-btn__wrapper:before {
          background: #1a9247;
      }
      .aws-btn--whatsapp .aws-btn__content {
          background: #25d366;
          color: #ffffff;
      }
      .aws-btn--whatsapp .aws-btn__content path {
          fill: #ffffff;
      }
      .aws-btn--whatsapp.aws-btn--progress .aws-btn__content > span {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 100%;
          width: 100%;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
          align-items: center;
                  -webkit-box-pack: center;
                  -ms-flex-pack: center;
          justify-content: center;
      }
      .aws-btn--whatsapp.aws-btn--progress .aws-btn__progress:before,
      .aws-btn--whatsapp.aws-btn--progress .aws-btn__progress:after {
          color: #ffffff;
      }
      .aws-btn--github .aws-btn__wrapper:before {
          background: #030304;
      }
      .aws-btn--github .aws-btn__content {
          background: #25292e;
          color: #ffffff;
      }
      .aws-btn--github .aws-btn__content path {
          fill: #ffffff;
      }
      .aws-btn--github.aws-btn--progress .aws-btn__content > span {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 100%;
          width: 100%;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
          align-items: center;
                  -webkit-box-pack: center;
                  -ms-flex-pack: center;
          justify-content: center;
      }
      .aws-btn--github.aws-btn--progress .aws-btn__progress:before,
      .aws-btn--github.aws-btn--progress .aws-btn__progress:after {
          color: #ffffff;
      }
      .aws-btn--reddit .aws-btn__wrapper:before {
          background: #cb2703;
      }
      .aws-btn--reddit .aws-btn__content {
          background: #fc461e;
          color: #ffffff;
      }
      .aws-btn--reddit .aws-btn__content path {
          fill: #ffffff;
      }
      .aws-btn--reddit.aws-btn--progress .aws-btn__content > span {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 100%;
          width: 100%;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
          align-items: center;
                  -webkit-box-pack: center;
                  -ms-flex-pack: center;
          justify-content: center;
      }
      .aws-btn--reddit.aws-btn--progress .aws-btn__progress:before,
      .aws-btn--reddit.aws-btn--progress .aws-btn__progress:after {
          color: #ffffff;
      }
      .aws-btn--pinterest .aws-btn__wrapper:before {
          background: #740611;
      }
      .aws-btn--pinterest .aws-btn__content {
          background: #bd091c;
          color: #ffffff;
      }
      .aws-btn--pinterest .aws-btn__content path {
          fill: #ffffff;
      }
      .aws-btn--pinterest.aws-btn--progress .aws-btn__content > span {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 100%;
          width: 100%;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
          align-items: center;
                  -webkit-box-pack: center;
                  -ms-flex-pack: center;
          justify-content: center;
      }
      .aws-btn--pinterest.aws-btn--progress .aws-btn__progress:before,
      .aws-btn--pinterest.aws-btn--progress .aws-btn__progress:after {
          color: #ffffff;
      }
      .aws-btn--gplus .aws-btn__wrapper:before {
          background: #a3392d;
      }
      .aws-btn--gplus .aws-btn__content {
          background: #ce5b4e;
          color: #ffffff;
      }
      .aws-btn--gplus .aws-btn__content path {
          fill: #ffffff;
      }
      .aws-btn--gplus.aws-btn--progress .aws-btn__content > span {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 100%;
          width: 100%;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
          align-items: center;
                  -webkit-box-pack: center;
                  -ms-flex-pack: center;
          justify-content: center;
      }
      .aws-btn--gplus.aws-btn--progress .aws-btn__progress:before,
      .aws-btn--gplus.aws-btn--progress .aws-btn__progress:after {
          color: #ffffff;
      }
      .aws-btn--youtube .aws-btn__wrapper:before {
          background: #881014;
      }
      .aws-btn--youtube .aws-btn__content {
          background: #cc181e;
          color: #ffffff;
      }
      .aws-btn--youtube .aws-btn__content path {
          fill: #ffffff;
      }
      .aws-btn--youtube.aws-btn--progress .aws-btn__content > span {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 100%;
          width: 100%;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
          align-items: center;
                  -webkit-box-pack: center;
                  -ms-flex-pack: center;
          justify-content: center;
      }
      .aws-btn--youtube.aws-btn--progress .aws-btn__progress:before,
      .aws-btn--youtube.aws-btn--progress .aws-btn__progress:after {
          color: #ffffff;
      }
      .aws-btn--mail .aws-btn__wrapper:before {
          background: #9c9c9c;
      }
      .aws-btn--mail .aws-btn__content {
          background: #cfcfcf;
          color: #ffffff;
      }
      .aws-btn--mail .aws-btn__content path {
          fill: #ffffff;
      }
      .aws-btn--mail.aws-btn--progress .aws-btn__content > span {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 100%;
          width: 100%;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
          align-items: center;
                  -webkit-box-pack: center;
                  -ms-flex-pack: center;
          justify-content: center;
      }
      .aws-btn--mail.aws-btn--progress .aws-btn__progress:before,
      .aws-btn--mail.aws-btn--progress .aws-btn__progress:after {
          color: #ffffff;
      }
      .aws-btn--instagram .aws-btn__wrapper:before {
          background: radial-gradient(
              circle at 25% 110%,
              #b9a800 0%,
              #938500 5%,
              #b10f00 45%,
              #8c0061 60%,
              #002ca9 90%
          );
      }
      .aws-btn--instagram .aws-btn__content {
          background: radial-gradient(
              circle at 25% 110%,
              #fdf497 0%,
              #fdf497 5%,
              #fd5949 45%,
              #d6249f 60%,
              #285aeb 90%
          );
          color: #ffffff;
      }
      .aws-btn--instagram .aws-btn__content path {
          fill: #ffffff;
      }
      .aws-btn--instagram.aws-btn--progress .aws-btn__content > span {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 100%;
          width: 100%;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
          align-items: center;
                  -webkit-box-pack: center;
                  -ms-flex-pack: center;
          justify-content: center;
      }
      .aws-btn--instagram.aws-btn--progress .aws-btn__progress:before,
      .aws-btn--instagram.aws-btn--progress .aws-btn__progress:after {
          color: #ffffff;
      }
      .aws-btn--primary .aws-btn__wrapper:before {
          background: var(--button-primary-color-dark);
      }
      .aws-btn--primary .aws-btn__content {
          background: var(--button-primary-color);
          color: var(--button-primary-color-light);
          border: var(--button-primary-border);
      }
      .aws-btn--primary .aws-btn__content path {
          fill: var(--button-primary-color-light);
      }
      .aws-btn--primary .aws-btn__wrapper:hover .aws-btn__content {
          background: var(--button-primary-color-hover);
          color: var(--button-font-color-hover);
      }
      .aws-btn--primary.aws-btn--active .aws-btn__wrapper .aws-btn__content {
          background: var(--button-primary-color-active);
      }
      .aws-btn--primary.aws-btn--progress .aws-btn__content > span {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 100%;
          width: 100%;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
          align-items: center;
                  -webkit-box-pack: center;
                  -ms-flex-pack: center;
          justify-content: center;
      }
      .aws-btn--primary.aws-btn--progress .aws-btn__progress:before,
      .aws-btn--primary.aws-btn--progress .aws-btn__progress:after {
          color: var(--button-primary-color-light);
      }
      .aws-btn--secondary .aws-btn__wrapper:before {
          background: var(--button-secondary-color-dark);
      }
      .aws-btn--secondary .aws-btn__content {
          background: var(--button-secondary-color);
          color: var(--button-secondary-color-light);
          border: var(--button-secondary-border);
      }
      .aws-btn--secondary .aws-btn__content path {
          fill: var(--button-secondary-color-light);
      }
      .aws-btn--secondary .aws-btn__wrapper:hover .aws-btn__content {
          background: var(--button-secondary-color-hover);
      }
      .aws-btn--secondary.aws-btn--active .aws-btn__wrapper .aws-btn__content {
          background: var(--button-secondary-color-active);
      }
      .aws-btn--secondary.aws-btn--progress .aws-btn__content > span {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 100%;
          width: 100%;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
          align-items: center;
                  -webkit-box-pack: center;
                  -ms-flex-pack: center;
          justify-content: center;
      }
      .aws-btn--secondary.aws-btn--progress .aws-btn__progress:before,
      .aws-btn--secondary.aws-btn--progress .aws-btn__progress:after {
          color: var(--button-secondary-color-light);
      }
      .aws-btn--link .aws-btn__wrapper:before {
          background: var(--button-anchor-color-dark);
      }
      .aws-btn--link .aws-btn__content {
          background: var(--button-anchor-color);
          color: var(--button-anchor-color-light);
          border: var(--button-anchor-border);
      }
      .aws-btn--link .aws-btn__content path {
          fill: var(--button-anchor-color-light);
      }
      .aws-btn--link .aws-btn__wrapper:hover .aws-btn__content {
          background: var(--button-anchor-color-hover);
      }
      .aws-btn--link.aws-btn--active .aws-btn__wrapper .aws-btn__content {
          background: var(--button-anchor-color-active);
      }
      .aws-btn--link.aws-btn--progress .aws-btn__content > span {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 100%;
          width: 100%;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
          align-items: center;
                  -webkit-box-pack: center;
                  -ms-flex-pack: center;
          justify-content: center;
      }
      .aws-btn--link.aws-btn--progress .aws-btn__progress:before,
      .aws-btn--link.aws-btn--progress .aws-btn__progress:after {
          color: var(--button-anchor-color-light);
      }
      .aws-btn--disabled .aws-btn__wrapper:before {
          background: var(--button-disabled-color-dark);
      }
      .aws-btn--disabled .aws-btn__content {
          background: var(--button-disabled-color);
          color: var(--button-disabled-color-light);
          border: var(--button-disabled-border);
      }
      .aws-btn--disabled .aws-btn__content path {
          fill: var(--button-disabled-color-light);
      }
      .aws-btn--disabled .aws-btn__wrapper:hover .aws-btn__content {
          background: var(--button-disabled-color-hover);
      }
      .aws-btn--disabled.aws-btn--active .aws-btn__wrapper .aws-btn__content {
          background: var(--button-disabled-color-active);
      }
      .aws-btn--disabled.aws-btn--progress .aws-btn__content > span {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 100%;
          width: 100%;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
          align-items: center;
                  -webkit-box-pack: center;
                  -ms-flex-pack: center;
          justify-content: center;
      }
      .aws-btn--disabled.aws-btn--progress .aws-btn__progress:before,
      .aws-btn--disabled.aws-btn--progress .aws-btn__progress:after {
          color: var(--button-disabled-color-light);
      }
      .aws-btn--placeholder .aws-btn__wrapper:before {
          background: var(--button-placeholder-color-dark);
      }
      .aws-btn--placeholder .aws-btn__content {
          background: var(--button-placeholder-color);
          color: var(--button-placeholder-color-light);
          border: var(--button-placeholder-border);
      }
      .aws-btn--placeholder .aws-btn__content path {
          fill: var(--button-placeholder-color-light);
      }
      .aws-btn--placeholder .aws-btn__wrapper:hover .aws-btn__content {
          background: var(--button-placeholder-color-hover);
      }
      .aws-btn--placeholder.aws-btn--active .aws-btn__wrapper .aws-btn__content {
          background: var(--button-placeholder-color-active);
      }
      .aws-btn--placeholder.aws-btn--progress .aws-btn__content > span {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 100%;
          width: 100%;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
          align-items: center;
                  -webkit-box-pack: center;
                  -ms-flex-pack: center;
          justify-content: center;
      }
      .aws-btn--placeholder.aws-btn--progress .aws-btn__progress:before,
      .aws-btn--placeholder.aws-btn--progress .aws-btn__progress:after {
          color: var(--button-placeholder-color-light);
      }
      .aws-btn--placeholder {
          width: var(--button-default-placeholder-width);
      }
      .aws-btn--placeholder .aws-btn__content > span {
          display: block;
          width: 100%;
          height: 40%;
          background-color: var(--button-placeholder-color-light);
          border-radius: 2px;
          position: relative;
          overflow: hidden;
      }
      .aws-btn--placeholder .aws-btn__content > span:before {
          content: '';
          background-color: rgba(0, 0, 0, 0.1);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
                  -webkit-animation: placeholder calc(var(--transform-speed) * 14) linear
          forwards infinite;
          animation: placeholder calc(var(--transform-speed) * 14) linear forwards
          infinite;
      }
      .aws-btn--visible {
          opacity: 1;
      }
      .aws-btn--left:before {
    -webkit-transform: skewY(calc(1deg * var(--button-hover-pressure) * 1))
          translate3d(0, calc(-1px * var(--button-hover-pressure) / 2), 0);
          transform: skewY(calc(1deg * var(--button-hover-pressure) * 1))
          translate3d(0, calc(-1px * var(--button-hover-pressure) / 2), 0);
      }
      .aws-btn--left .aws-btn__content {
    -webkit-transform: skewY(calc(1deg * var(--button-hover-pressure) * -1));
          transform: skewY(calc(1deg * var(--button-hover-pressure) * -1));
      }
      .aws-btn--right:before {
    -webkit-transform: skewY(calc(1deg * var(--button-hover-pressure) * -1))
          translate3d(0, calc(-1px * var(--button-hover-pressure) / 2), 0);
          transform: skewY(calc(1deg * var(--button-hover-pressure) * -1))
          translate3d(0, calc(-1px * var(--button-hover-pressure) / 2), 0);
      }
      .aws-btn--right .aws-btn__content {
    -webkit-transform: skewY(calc(1deg * var(--button-hover-pressure) * 1));
          transform: skewY(calc(1deg * var(--button-hover-pressure) * 1));
      }
      .aws-btn--middle:before {
    -webkit-transform: translate3d(
        0,
        calc(-1px * var(--button-hover-pressure)),
        0
    );
          transform: translate3d(0, calc(-1px * var(--button-hover-pressure)), 0);
      }
      .aws-btn--middle .aws-btn__content {
    -webkit-transform: translate3d(
        0,
        calc(1px * var(--button-hover-pressure)),
        0
    );
          transform: translate3d(0, calc(1px * var(--button-hover-pressure)), 0);
      }
      .aws-btn--icon .aws-btn__content > span:first-of-type > svg {
          vertical-align: middle;
      }
      .aws-btn--active:before {
          will-change: transform;
          -webkit-transform: translate3d(0, calc(var(--button-raise-level) * -1), 0);
          transform: translate3d(0, calc(var(--button-raise-level) * -1), 0);
      }
      .aws-btn--active .aws-btn__content {
          will-change: transform;
          -webkit-transition: background calc(var(--transform-speed) * 0.8) ease-out,
          color calc(var(--transform-speed) * 0.8) ease-out,
          -webkit-transform calc(var(--transform-speed) * 0.8) ease-out;
          transition: background calc(var(--transform-speed) * 0.8) ease-out,
          color calc(var(--transform-speed) * 0.8) ease-out,
          -webkit-transform calc(var(--transform-speed) * 0.8) ease-out;
          transition: transform calc(var(--transform-speed) * 0.8) ease-out,
          background calc(var(--transform-speed) * 0.8) ease-out,
          color calc(var(--transform-speed) * 0.8) ease-out;
          transition: transform calc(var(--transform-speed) * 0.8) ease-out,
          background calc(var(--transform-speed) * 0.8) ease-out,
          color calc(var(--transform-speed) * 0.8) ease-out,
          -webkit-transform calc(var(--transform-speed) * 0.8) ease-out;
          -webkit-transform: translate3d(0, var(--button-raise-level), 0);
          transform: translate3d(0, var(--button-raise-level), 0);
      }
      .aws-btn--off:before {
    -webkit-transform: translate3d(0, calc(var(--button-raise-level) * -1), 0);
          transform: translate3d(0, calc(var(--button-raise-level) * -1), 0);
          background-color: rgba(0, 0, 0, 0.05);
      }
      .aws-btn--off:hover .aws-btn__wrapper:before {
          background-color: #2d2d2d;
      }
      .aws-btn--off:hover .aws-btn__content {
          background-color: #313131;
          color: #3b3b3b;
      }
      .aws-btn--off .aws-btn__wrapper:before {
          background-color: #323232;
      }
      .aws-btn--off .aws-btn__content {
          background-color: #353535;
          color: #424242;
          -webkit-transform: translate3d(0, var(--button-raise-level), 0);
          transform: translate3d(0, var(--button-raise-level), 0);
      }
      .aws-btn--icon {
          width: var(--button-icon-width);
          height: var(--button-icon-height);
          font-size: calc(var(--button-default-font-size) * 1.5);
          line-height: calc(var(--button-default-line-height) * 1.5);
      }
      .aws-btn--small {
          /* width: var(--button-small-width); */
          height: var(--button-small-height);
          font-size: var(--button-small-font-size);
          line-height: var(--button-default-line-height);
      }
      .aws-btn--medium {
          /* width: var(--button-medium-width); */
          height: var(--button-medium-height);
          font-size: var(--button-medium-font-size);
          line-height: var(--button-default-line-height);
      }
      .aws-btn--large {
          /* width: var(--button-large-width); */
          height: var(--button-large-height);
          font-size: var(--button-large-font-size);
          line-height: var(--button-default-line-height);
      }
      .aws-btn--fill {
          width: 100%;
      }

    span.aws-btn__bubble {
        display: block;
        position: absolute;
        visibility: hidden;
        top: 0;
        left: 0;
        width: 0px;
        height: 0px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.1);
        opacity: 0;
                -webkit-transform: scale(0.1);
        transform: scale(0.1);
                -webkit-animation: bubble-ping calc(var(--transform-speed) * 3.5)
        cubic-bezier(0.5, 0, 0.6, 0.4) 0.05s forwards;
        animation: bubble-ping calc(var(--transform-speed) * 3.5)
        cubic-bezier(0.5, 0, 0.6, 0.4) 0.05s forwards;
    }

    @-webkit-keyframes placeholder {
        0% {
      -webkit-transform: translateX(-110%);
            transform: translateX(-110%);
        }
        25% {
      -webkit-transform: translateX(0%);
            transform: translateX(0%);
        }
        50% {
      -webkit-transform: translateX(110%);
            transform: translateX(110%);
        }
        75% {
      -webkit-transform: translateX(0%);
            transform: translateX(0%);
        }
        100% {
      -webkit-transform: translateX(-110%);
            transform: translateX(-110%);
        }
    }

    @keyframes placeholder {
        0% {
      -webkit-transform: translateX(-110%);
            transform: translateX(-110%);
        }
        25% {
      -webkit-transform: translateX(0%);
            transform: translateX(0%);
        }
        50% {
      -webkit-transform: translateX(110%);
            transform: translateX(110%);
        }
        75% {
      -webkit-transform: translateX(0%);
            transform: translateX(0%);
        }
        100% {
      -webkit-transform: translateX(-110%);
            transform: translateX(-110%);
        }
    }

    @-webkit-keyframes bounce {
        0% {
      -webkit-transform: scale(1);
            transform: scale(1);
        }
        30% {
      -webkit-transform: scale(1.6);
            transform: scale(1.6);
        }
        60% {
      -webkit-transform: scale(1.4);
            transform: scale(1.4);
        }
        100% {
      -webkit-transform: scale(1.5);
            transform: scale(1.5);
        }
    }

    @keyframes bounce {
        0% {
      -webkit-transform: scale(1);
            transform: scale(1);
        }
        30% {
      -webkit-transform: scale(1.6);
            transform: scale(1.6);
        }
        60% {
      -webkit-transform: scale(1.4);
            transform: scale(1.4);
        }
        100% {
      -webkit-transform: scale(1.5);
            transform: scale(1.5);
        }
    }

    @-webkit-keyframes bubble-ping {
        1% {
            visibility: visible;
        }
        10% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        99% {
      -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 0;
        }
        100% {
            visibility: hidden;
        }
    }

    @keyframes bubble-ping {
        1% {
            visibility: visible;
        }
        10% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        99% {
      -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 0;
        }
        100% {
            visibility: hidden;
        }
    }

      .aws-btn--progress .aws-btn__progress {
          position: relative;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
                   -webkit-box-flex: 1;
                   -ms-flex: 1;
          flex: 1;
                   -webkit-box-align: center;
                   -ms-flex-align: center;
          align-items: center;
                   -webkit-box-pack: center;
                   -ms-flex-pack: center;
          justify-content: center;
          border-radius: 2px;
          text-indent: 0;
          z-index: 3;
          overflow: hidden;
                   -webkit-transition: border var(--transform-speed) ease-out,
          background var(--transform-speed) ease-out,
          color var(--transform-speed) ease-out,
                   -webkit-transform var(--transform-speed) ease-out;
          transition: border var(--transform-speed) ease-out,
          background var(--transform-speed) ease-out,
          color var(--transform-speed) ease-out,
                   -webkit-transform var(--transform-speed) ease-out;
          transition: border var(--transform-speed) ease-out,
          transform var(--transform-speed) ease-out,
          background var(--transform-speed) ease-out,
          color var(--transform-speed) ease-out;
          transition: border var(--transform-speed) ease-out,
          transform var(--transform-speed) ease-out,
          background var(--transform-speed) ease-out,
          color var(--transform-speed) ease-out,
                   -webkit-transform var(--transform-speed) ease-out;
      }
      .aws-btn--progress .aws-btn__progress > span {
    -webkit-transition: opacity calc(var(--transform-speed) * 0.5) ease-out
          calc(var(--transform-speed) * 0.75);
          transition: opacity calc(var(--transform-speed) * 0.5) ease-out
          calc(var(--transform-speed) * 0.75);
      }
      .aws-btn--progress .aws-btn__progress:before,
      .aws-btn--progress .aws-btn__progress:after {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
          align-items: center;
                  -webkit-box-pack: center;
                  -ms-flex-pack: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.65);
          opacity: 0;
                  -webkit-transition: opacity calc(var(--transform-speed) * 0.75) ease-out
          0.05s,
                  -webkit-transform var(--transform-speed) ease-out 0.05s;
          transition: opacity calc(var(--transform-speed) * 0.75) ease-out 0.05s,
                  -webkit-transform var(--transform-speed) ease-out 0.05s;
          transition: transform var(--transform-speed) ease-out 0.05s,
          opacity calc(var(--transform-speed) * 0.75) ease-out 0.05s;
          transition: transform var(--transform-speed) ease-out 0.05s,
          opacity calc(var(--transform-speed) * 0.75) ease-out 0.05s,
                  -webkit-transform var(--transform-speed) ease-out 0.05s;
      }
      .aws-btn--progress .aws-btn__progress:before {
          content: attr(data-loading);
          display: none;
                  -webkit-transform: translate3d(0, 50%, 0);
          transform: translate3d(0, 50%, 0);
      }
      .aws-btn--progress .aws-btn__progress:after {
          content: attr(data-status);
          display: none;
                  -webkit-transform: translate3d(0, -50%, 0);
          transform: translate3d(0, -50%, 0);
      }

      .aws-btn--progress.aws-btn--active .aws-btn__progress > span {
          opacity: 0.075;
      }

      .aws-btn--progress.aws-btn--active .aws-btn__progress:after,
      .aws-btn--progress.aws-btn--active .aws-btn__progress:before,
      .aws-btn--progress.aws-btn--active .aws-btn__content:after {
          display: block;
      }

      .aws-btn--progress .aws-btn__content:after {
          content: ' ';
          background-color: rgba(0, 0, 0, 0.15);
                  -webkit-transform: translate3d(-100%, 0, 0);
          transform: translate3d(-100%, 0, 0);
          width: 100%;
          display: none;
      }

      .aws-btn--start .aws-btn__progress:before {
          opacity: 1;
                  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
      }

      .aws-btn--start .aws-btn__content:after {
    -webkit-transition: -webkit-transform var(--loading-transition-speed)
          ease-out;
          transition: -webkit-transform var(--loading-transition-speed) ease-out;
          transition: transform var(--loading-transition-speed) ease-out;
          transition: transform var(--loading-transition-speed) ease-out,
    -webkit-transform var(--loading-transition-speed) ease-out;
    -webkit-transform: translate3d(-15%, 0, 0);
          transform: translate3d(-15%, 0, 0);
      }

      .aws-btn--errored .aws-btn__content:after {
          background-color: rgba(255, 0, 0, 0.75);
      }

      .aws-btn--end .aws-btn__content:after {
    -webkit-transition: -webkit-transform var(--loading-transition-end-speed)
          var(--loading-transition-timing);
          transition: -webkit-transform var(--loading-transition-end-speed)
          var(--loading-transition-timing);
          transition: transform var(--loading-transition-end-speed)
          var(--loading-transition-timing);
          transition: transform var(--loading-transition-end-speed)
          var(--loading-transition-timing),
    -webkit-transform var(--loading-transition-end-speed) var(--loading-transition-timing);
    -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
      }

      .aws-btn--end .aws-btn__progress:after {
          opacity: 1;
                  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
      }

      .aws-btn--end .aws-btn__progress:before {
    -webkit-transform: translate3d(0, 50%, 0);
          transform: translate3d(0, 50%, 0);
          opacity: 0;
      }
    `
);
