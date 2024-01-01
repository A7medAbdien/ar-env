import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { easing } from 'maath';
import React, { useEffect, useRef, useState } from 'react';
import { Mesh } from 'three';
import { useGlobal } from '../context/useGlobal';

function PortalEnv() {
    const { start, gltfColor } = useGlobal()

    const mesh = useRef<Mesh>(null!)
    const coverBottom = useRef<Mesh>(null!)
    const coverUp = useRef<Mesh>(null!)

    const { s } = useControls({ s: { value: 0, max: 1, min: 0 } })

    useFrame((state, delta) => {
        if (mesh.current)
            mesh.current.rotation.x = mesh.current.rotation.y += delta

        if (coverBottom.current && coverUp.current && start) {
            easing.damp3(coverBottom.current.position, [0, 1, -1.6], 2, delta)
            easing.damp3(coverUp.current.position, [0, 1, 1.6], 2, delta)
        } else {
            easing.damp3(coverBottom.current.position, [0, 1, -0.5], 2, delta)
            easing.damp3(coverUp.current.position, [0, 1, 0.5], 2, delta)

        }
    })


    // useEffect(() => {
    //     if (!coverBottom.current) return;
    //     coverBottom.current.geometry.translate(0, -0.5, 0);
    //     coverUp.current.geometry.translate(0, 0.5, 0);
    // }, [])

    return (
        <>
            {/* coverBottom */}
            <mesh
                ref={coverBottom}
                castShadow
                receiveShadow
                position={[0, 1, -0.5 - s]}
                rotation={[(-Math.PI / 2), 0, 0]}
            >
                <planeGeometry args={[2, 1]} />
                <meshStandardMaterial color={"#f0f0f0"} />
            </mesh>

            {/* coverUp */}
            <mesh
                ref={coverUp}
                castShadow
                receiveShadow
                position={[0, 1, 0.5 + s]}
                rotation={[(-Math.PI / 2), 0, 0]}
            >
                <planeGeometry args={[2, 1]} />
                <meshStandardMaterial color={"#f0f0f0"} />
            </mesh>

            {/* Inne rs */}
            <mesh
                ref={mesh}
                position={[0, 0, 0]}
                castShadow
                receiveShadow
            >
                <dodecahedronGeometry />
                <meshStandardMaterial color={gltfColor} />
            </mesh>
        </>
    );
}

export default PortalEnv;