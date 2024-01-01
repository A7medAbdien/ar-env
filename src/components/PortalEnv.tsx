import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import React, { useRef } from 'react';
import { Mesh } from 'three';

function PortalEnv() {
    const mesh = useRef<Mesh>(null!)
    const { gltfColor } = useControls({ worldUnits: false, bg: '#f0f0f0', gltfColor: '#3e3e3e' })


    useFrame((state, delta) => {
        if (!mesh.current) return;
        mesh.current.rotation.x = mesh.current.rotation.y += delta
    })
    return (
        <>
            <mesh castShadow receiveShadow ref={mesh}>
                <boxGeometry />
                <meshLambertMaterial color={gltfColor} />
            </mesh>
        </>
    );
}

export default PortalEnv;