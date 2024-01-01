import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { easing } from 'maath';
import React, { useEffect, useRef } from 'react';
import { Mesh } from 'three';

function PortalEnv() {
    const mesh = useRef<Mesh>(null!)
    const { gltfColor } = useControls({ worldUnits: false, bg: '#f0f0f0', gltfColor: '#3e3e3e' })
    const coverBottom = useRef<Mesh>(null!)
    const coverUp = useRef<Mesh>(null!)
    const { s } = useControls({ s: { value: 0, max: 1, min: 0 } })

    useFrame((state, delta) => {
        if (mesh.current)
            mesh.current.rotation.x = mesh.current.rotation.y += delta

        // if (coverBottom.current)
        easing.damp3(coverBottom.current.position, [0, 1, -1.5], 2, delta)
        easing.damp3(coverUp.current.position, [0, 1, 1.5], 2, delta)
    })


    // useEffect(() => {
    //     if (!coverBottom.current) return;
    //     coverBottom.current.geometry.translate(0, -0.5, 0);
    //     coverUp.current.geometry.translate(0, 0.5, 0);
    // }, [])

    return (
        <>
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

            <mesh
                ref={mesh}
                castShadow
                receiveShadow
            >
                <boxGeometry />
                <meshStandardMaterial color={gltfColor} />
            </mesh>
        </>
    );
}

export default PortalEnv;