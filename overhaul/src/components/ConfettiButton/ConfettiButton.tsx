import Reward from 'react-rewards';
import React, { useRef } from "react";
import Button from "@components/Button";

const ConfettiButton: React.FC<{}> = (props: any) => {
    var rewardRef = null;

    const settings = {
        type: 'confetti',
        fakingRequest: false,
        angle: 90,
        decay: 0.91,
        spread: 100,
        startVelocity: 30,
        elementCount: 50,
        elementSize: 10,
        lifetime: 100,
        zIndex: 10,
        springAnimation: false
    };
    return (
        <div style={{ margin: '15px auto' }}>
            <Reward
                ref={(ref) => { rewardRef = ref }}
                type={settings.type}
                config={settings}>
                <Button
                    onPress={() => { rewardRef.rewardMe() }}
                    text="Interactivity!"
                />
            </Reward>
        </div>
    );
};

export default ConfettiButton;
