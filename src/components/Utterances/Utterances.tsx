import Section from '@components/Section';
import styled from '@emotion/styled';
import { useColorMode } from 'theme-ui';

const Utterances = () => {
  const [colorMode] = useColorMode();
  const utterancesTheme = colorMode === 'light' ? 'github-light' : 'photon-dark';

  return (
    <UtterancesContainer
      ref={element => {
        if (!element) {
          return;
        }

        const scriptElement = document.createElement('script');
        scriptElement.setAttribute('src', 'https://utteranc.es/client.js');
        scriptElement.setAttribute('repo', 'cmrfrd/taoa');
        scriptElement.setAttribute('issue-term', 'title');
        scriptElement.setAttribute('theme', utterancesTheme);
        scriptElement.setAttribute('crossorigin', 'anonymous');
        scriptElement.setAttribute('async', 'true');
        element.replaceChildren(scriptElement);
      }}
    />
  );
};

export default Utterances;

const UtterancesContainer = styled(Section)({
  display: 'block'
});
