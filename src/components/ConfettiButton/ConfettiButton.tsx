import { MediumButton } from '@components/Button';

import React from 'react';

// @ts-ignore
import Reward from 'react-rewards';

const ConfettiButton: React.FC<{}> = (props: any) => {
  let rewardRef = null;
  const { settings, text } = props;

  return (
    <div style={{ margin: '15px auto' }}>
      <Reward
        ref={(ref: React.RefObject): void => {
          rewardRef = ref;
        }}
        type={settings.type}
        config={settings}
      >
        <MediumButton
          button={{
            onPress: (): void => {
              rewardRef.rewardMe();
            }
          }}
          text={text}
        />
      </Reward>
    </div>
  );
};

export default ConfettiButton;
