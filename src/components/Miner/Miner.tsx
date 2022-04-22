import { mediaquery } from '@styles/media';
import React, { useState, useEffect } from 'react';
import { Box, Flex, Switch, Badge } from 'theme-ui';
import styled from '@emotion/styled';
import Paragraph from '@components/Paragraph';
import Headings from '@components/Headings';
import { ITAOAThemeUIContext } from '@types';

import { start } from './miner';

const Miner: React.FC = () => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [status, setstatus] = useState<string>('Starting');
  const [hashes, sethashes] = useState<number>(0);
  const [oldhashes, oldsethashes] = useState<number>(0);
  const [hashrate, sethashrate] = useState<number>(0);
  const onToggle = () => setIsToggled(!isToggled);

  useEffect(() => {
    start(isToggled, hashes, sethashes, status, setstatus);
  }, [isToggled]);

  const seconds = 2;
  const milliPerSeconds = 1000;
  useEffect(() => {
    const timer = window.setInterval(() => {
      sethashes(h => {
        oldsethashes(o => {
          sethashrate(r => {
            return Math.round(Math.abs(h - o) / seconds);
          });
          return h;
        });
        return h;
      });
    }, seconds * milliPerSeconds);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <MinerContainer>
      <Box
        p={3}
        bg="invbackground"
        sx={{
          borderRadius: '2px'
        }}
      >
        <Flex>
          <Box sx={{ flex: '1 1 auto' }}>
            <MinerHeading>Miner Status</MinerHeading>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', margin: 'auto auto' }}>
            <Switch
              checked={isToggled}
              onChange={onToggle}
              sx={{
                'input:checked ~ &': {
                  backgroundColor: 'grey'
                },
                marginRight: '0px'
              }}
            />
          </Box>
        </Flex>
        <Flex>
          <Box sx={{ flex: '1 1 auto' }}>
            <MinerParagraph>Total hashes</MinerParagraph>
          </Box>
          <Box>
            <MinerParagraph>{hashes}</MinerParagraph>
          </Box>
        </Flex>
        <Flex>
          <Box sx={{ flex: '1 1 auto' }}>
            <MinerParagraph>Hash rate</MinerParagraph>
          </Box>
          <Box>
            <MinerParagraph>{hashrate} h/s</MinerParagraph>
          </Box>
        </Flex>
        <Flex>
          <Box sx={{ flex: '1 1 auto' }}>
            <MinerParagraph>Status</MinerParagraph>
          </Box>
          <Box>
            <MinerParagraph>
              {isToggled ? <Badge bg="green">{status}</Badge> : <Badge bg="red">offline</Badge>}
            </MinerParagraph>
          </Box>
        </Flex>
      </Box>
    </MinerContainer>
  );
};

export default Miner;

const MinerHeading = styled(Headings.h2)((p: ITAOAThemeUIContext) => ({
  color: p.theme.colors.invpostText,
  margin: 0
}));
const MinerParagraph = styled(Headings.h5)((p: ITAOAThemeUIContext) => ({
  color: p.theme.colors.invpostText,
  margin: 0
}));
const MinerContainer = styled.div((p: ITAOAThemeUIContext) => ({
  width: '100%',
  maxWidth: '780px',
  margin: '25px auto 18px',

  [mediaquery.desktop()]: {
    maxWidth: '607px'
  },

  [mediaquery.tablet()]: {
    maxWidth: '586px',
    margin: '30px auto 18px'
  }
}));
