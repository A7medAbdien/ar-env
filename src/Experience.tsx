import { MeshWobbleMaterial, OrbitControls, useTexture } from '@react-three/drei'
import React from 'react'
import * as THREE from 'three'
import { Portal } from './components/portal';
import { Perf } from 'r3f-perf';
import { Canvas } from '@react-three/fiber';

export default function Experience() {
    return <Canvas
        shadows
        camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            // position: [1, 2, 6]
            position: [-3, 0.5, 3]
        }}
    >

        {/* <ambientLight /> */}
        {/* <pointLight position={[10, 10, 10]} /> */}

        <axesHelper />
        <OrbitControls makeDefault />
        <Perf position="top-left" />

        <Portal />
    </Canvas>
}
