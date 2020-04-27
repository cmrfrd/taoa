import Button from '@components/Button';

import React from 'react';
import Reward from 'react-rewards';

const ConfettiButton: React.FC<{}> = (props: any) => {
  let rewardRef = null;
  const { settings, text } = props;

  return (
    <div style={{ margin: '15px auto' }}>
      <Reward
        ref={(ref: React.RefObject): never => {
          rewardRef = ref;
        }}
        type={settings.type}
        config={settings}
      >
        <Button
          onPress={(): never => {
            rewardRef.rewardMe();
          }}
          text={text}
        />
      </Reward>
    </div>
  );
};

export default ConfettiButton;
