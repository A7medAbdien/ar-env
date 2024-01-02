import React, { forwardRef } from 'react';
import { useGlobal } from '../context/useGlobal';
import { MeshProps } from '@react-three/fiber';
import { Mesh } from 'three';

export interface IModelProps extends MeshProps {
}

const Model = forwardRef<Mesh, IModelProps>((props, ref) => {
    const { gltfColor } = useGlobal();
    return (
        <mesh {...props} ref={ref}>
            <dodecahedronGeometry />
            <meshStandardMaterial color={gltfColor} />
        </mesh>
    );
});

export default Model;
