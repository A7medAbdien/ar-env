import { MeshWobbleMaterial, OrbitControls, useTexture } from '@react-three/drei'
import React from 'react'
import * as THREE from 'three'

export default function Experience() {
    return <>

        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        {/* <OrbitControls makeDefault /> */}

        {/* <mesh scale={1.5}>
            <boxGeometry />
            <meshNormalMaterial />
        </mesh> */}

        <Sticker position={[1, 0, 1]} scale={2} />
    </>
}

const Sticker = ({ ...props }) => {
    const [smiley, invert] = useTexture(['Sticjer_1024x1024@2x.png', 'Sticjer_1024x1024@2x_invert.png'])
    return (
        <mesh   {...props}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <MeshWobbleMaterial
                factor={4}
                speed={2}
                depthTest={false}
                transparent
                map={smiley}
                map-flipY={false}
                roughness={1}
                roughnessMap={invert}
                roughnessMap-flipY={false}
                map-anisotropy={16}
                metalness={0.8}
                side={THREE.DoubleSide}
            />
        </mesh>
    )
}
