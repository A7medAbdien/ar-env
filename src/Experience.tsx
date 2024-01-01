import { MeshWobbleMaterial, OrbitControls, useTexture } from '@react-three/drei'
import React from 'react'
import * as THREE from 'three'
import { Portal } from './components/portal';
import { Perf } from 'r3f-perf';

export default function Experience() {
    return <>

        {/* <ambientLight /> */}
        {/* <pointLight position={[10, 10, 10]} /> */}

        <axesHelper />
        <OrbitControls makeDefault />
        <Perf position="top-left" />

        <Portal />
    </>
}
