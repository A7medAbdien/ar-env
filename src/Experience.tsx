import { MeshWobbleMaterial, OrbitControls, useTexture } from '@react-three/drei'
import React from 'react'
import * as THREE from 'three'
import { Portal } from './components/portal';
import { Perf } from 'r3f-perf';

export default function Experience() {

    // Create the main box shape
    const boxShape = new THREE.Shape();
    boxShape.moveTo(-1, -1);
    boxShape.lineTo(-1, 1);
    boxShape.lineTo(1, 1);
    boxShape.lineTo(1, -1);
    boxShape.lineTo(-1, -1);

    // Create the hole shape
    const holeShape = new THREE.Path();
    holeShape.absarc(0, 0, 0.8, 0, Math.PI * 2, false);
    boxShape.holes.push(holeShape);

    // Create the extruded geometry with holes
    const extrudeSettings = {
        steps: 1,
        depth: 2,
        bevelEnabled: false,
    };

    const geometry0 = new THREE.ExtrudeGeometry(boxShape, extrudeSettings);


    return <>

        {/* <ambientLight /> */}
        {/* <pointLight position={[10, 10, 10]} /> */}

        <axesHelper />
        <OrbitControls makeDefault />
        <Perf position="top-left" />

        <Portal />
    </>
}
