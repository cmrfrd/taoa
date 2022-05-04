import axios from 'axios';
import { mediaquery } from '@styles/media';
import React, { useState, useEffect } from 'react';
import { Box, Flex, Switch, Badge } from 'theme-ui';
import styled from '@emotion/styled';
import Paragraph from '@components/Paragraph';
import Headings from '@components/Headings';
import { ITAOAThemeUIContext } from '@types';
import { graphql, useStaticQuery } from 'gatsby';
import Skeleton from 'react-loading-skeleton';

import { TAOABrowserMiner, Status } from './miner';

interface IMinerProps {
  running: boolean;
}

const envQuery = graphql`
  {
    site {
      siteMetadata {
        env
        wallets {
          monero {
            address
            viewkey
          }
        }
      }
    }
  }
`;

export const WalletState: React.FC<{}> = ({ preText = '' }) => {
  const {
    wallets: { monero }
  } = useStaticQuery(envQuery).site.siteMetadata;
  const [isLoading, setIsLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let balance = null;
      try {
        const { data } = await axios.post('https://api.mymonero.com/get_address_info', {
          address: monero.address,
          view_key: monero.viewkey
        });
        const balanceCrypto = (parseInt(data.total_received) / 1000000000000.0).toFixed(4);
        setWalletBalance((balanceCrypto * data.rates.USD).toFixed(2));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
        } else {
          console.log(error);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Headings.h2>
          {preText}
          {walletBalance}
        </Headings.h2>
      )}
    </>
  );
};

export const Miner: React.FC<IMinerProps> = ({ running = false }: IMinerProps) => {
  const {
    env,
    wallets: { monero }
  } = useStaticQuery(envQuery).site.siteMetadata;
  const [isToggled, setIsToggled] = useState<boolean>(running);
  const [status, setstatus] = useState<string>('Starting');
  const [hashes, sethashes] = useState<number>(0);
  const [oldhashes, oldsethashes] = useState<number>(0);
  const [hashrate, sethashrate] = useState<number>(0);
  const onToggle = () => {
    setIsToggled(!isToggled);

    if (!isToggled) {
      setstatus(Status.offline.toString());
    }
  };

  const miner = new TAOABrowserMiner(env, monero.address, setstatus, sethashes, 'auto');

  useEffect(() => {
    miner.run(isToggled);
  }, [isToggled]);

  const seconds = 5;
  const milliPerSeconds = 1000;
  useEffect(() => {
    const timer = window.setInterval(() => {
      let ch;
      let oh;
      sethashes(h => {
        ch = h;
        return h;
      });
      oldsethashes(o => {
        oh = o;
        return ch;
      });
      sethashrate(r => {
        return (Math.abs(ch - oh) / seconds).toFixed(1);
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
            <MinerHeading>TAOA Browser Miner</MinerHeading>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', margin: 'auto auto' }}>
            <MinerParagraph>
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
            </MinerParagraph>
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

const MinerHeading = styled(Headings.h2)((p: ITAOAThemeUIContext) => ({
  color: p.theme.colors.invpostText,
  margin: '0 !important'
}));
const MinerParagraph = styled(Headings.h5)((p: ITAOAThemeUIContext) => ({
  color: p.theme.colors.invpostText,
  margin: '0 !important'
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
