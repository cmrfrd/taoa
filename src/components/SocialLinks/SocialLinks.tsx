import Icons from '@icons';
import { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import React from 'react';

interface ILink {
  name: string;
  url: string;
}
interface ISocialLinksProps {
  links: ILink[];
  fill?: string;
}

const icons = {
  behance: Icons.Behance,
  dribbble: Icons.Dribbble,
  linkedin: Icons.LinkedIn,
  twitter: Icons.Twitter,
  facebook: Icons.Facebook,
  instagram: Icons.Instagram,
  devto: Icons.DevTo,
  github: Icons.Github,
  stackoverflow: Icons.Stackoverflow,
  youtube: Icons.YouTube,
  medium: Icons.Medium,
  unsplash: Icons.Unsplash,
  patreon: Icons.Patreon,
  paypal: Icons.Paypal,
  digitalocean: Icons.DigitalOcean
};

const getHostname = (url: string): string => {
  return new URL(url.toLowerCase()).hostname.replace('www.', '').split('.')[0];
};

const SocialLinks: React.FC<ISocialLinksProps> = ({
  links,
  fill = '#73737D'
}: ISocialLinksProps) => {
  if (!links) return null;

  return (
    <>
      {links.map((option: ILink) => {
        const name = option.name || getHostname(option.url);
        const Icon = icons[name];
        if (!Icon) {
          throw new Error(`unsupported social link name=${name} / url=${option.url}`);
        }
        return (
          <SocialIconContainer
            key={option.url}
            target="_blank"
            rel="noopener nofollow"
            data-a11y="false"
            aria-label={`Link to ${option.url}`}
            href={option.url}
          >
            <Icon fill={fill} />
            <Hidden>Link to ${option.url}</Hidden>
          </SocialIconContainer>
        );
      })}
    </>
  );
};

export default SocialLinks;

const SocialIconContainer = styled.a((p: ITAOAThemeUIContext) => ({
  position: 'relative',
  marginLeft: '3.2rem',
  textDecoration: 'none',
  maxWidth: '16px',

  '&:hover': {
    svg: {
      '&:hover *': {
        fill: `${p.theme.colors.primary}`
      },
      '*': {
        transition: 'fill 0.25s var(--ease-in-out-quad)'
      }
    }
  },

  '&:first-of-type': {
    marginLeft: 0
  },

  '&:last-child': {
    marginRight: 0
  },

  "&[data-a11y='true']:focus::after": {
    content: '" "',
    position: 'absolute',
    left: '-50%',
    top: '-20%',
    width: '200%',
    height: '160%',
    border: `2px solid ${p.theme.colors.accent}`,
    background: 'rgba(255, 255, 255, 0.01)',
    borderRadius: '5px'
  },

  [mediaquery.tablet()]: {
    margin: '0 2.2rem'
  }
}));

const Hidden = styled.span({
  width: '0px',
  height: '0px',
  visibility: 'hidden',
  opacity: 0,
  overflow: 'hidden',
  display: 'inline-block'
});
