import React, { forwardRef, useRef } from 'react';
import { useGlobal } from '../context/useGlobal';
import { MeshProps, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Box } from '@react-three/drei';
import { useControls } from 'leva';
import { easing } from 'maath';

export interface IModelProps extends MeshProps {
}

const Model = forwardRef<Mesh, IModelProps>((props, ref) => {
    const { gltfColor, start, endPos } = useGlobal();

    const { position } = useControls({
        position:
        {
            value: { x: 0, y: 3, z: 0 },
            step: 0.01,
            joystick: 'invertY'
        },
    })

    const subMesh1 = useRef<any>()
    const subMesh2 = useRef<any>()
    const subMesh3 = useRef<any>()

    useFrame((state, delta) => {


        // console.log(mesh.current.position.y == endPos[1]);
        if (ref && ref.current && start) {
            if (ref && ref.current.position.y > endPos[1] - 0.1) {
                subMesh1.current.lookAt(ref.current.position)
                subMesh2.current.lookAt(ref.current.position)
                subMesh3.current.lookAt(ref.current.position)

                easing.damp3(subMesh1.current.position, [3, 3, 3], 3, delta)
                easing.damp3(subMesh2.current.position, [3, 3, 0], 3, delta)
                easing.damp3(subMesh3.current.position, [3, 3, -3], 3, delta)
            } else {
                subMesh1.current.lookAt([0, 0, 0])
                subMesh2.current.lookAt([0, 0, 0])
                subMesh3.current.lookAt([0, 0, 0])
                easing.damp3(subMesh1.current.position, ref.current.position, 0, delta)
                easing.damp3(subMesh2.current.position, ref.current.position, 0, delta)
                easing.damp3(subMesh3.current.position, ref.current.position, 0, delta)
            }
        }

    })

    return <>
        <mesh {...props} ref={ref}>
            <dodecahedronGeometry />
            <meshStandardMaterial color={gltfColor} />
        </mesh>


        <Box ref={subMesh1} visible={start} />
        <Box ref={subMesh2} visible={start} />
        <Box ref={subMesh3} visible={start} />
    </>
});

export default Model;
