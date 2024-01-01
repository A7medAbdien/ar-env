import { Environment } from '@react-three/drei';
import * as React from 'react';
import { useGlobal } from '../context/useGlobal';

export interface ILightsProps {
}

export function Lights(props: ILightsProps) {
    const { bg } = useGlobal();

    return (
        <>
            {/* <spotLight
                castShadow
                intensity={15}
                position={[5, 4, 2.5]}
                angle={0.3}
                penumbra={1}
                shadow-normalBias={0.05}
                shadow-bias={0.001}
            /> */}
            <ambientLight intensity={2} />
            <Environment preset="city" />
        </>
    );
}
