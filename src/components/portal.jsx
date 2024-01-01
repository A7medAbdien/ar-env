import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Edges, MeshPortalMaterial, CameraControls, Environment, PivotControls, useHelper } from '@react-three/drei'
import { useControls } from 'leva'
import { SpotLightHelper } from 'three'
import { easing } from 'maath'

import PortalEnv from './PortalEnv'
import { useGlobal } from '../context/useGlobal'
import { Lights } from './Lights'
import useDelayedEasing from '../hooks/useDelayedEasing';

export const Portal = () => {
    const { start, gltfColor, endPos } = useGlobal()
    const startEasing = useDelayedEasing();

    const mesh = useRef()

    useFrame((state, delta) => {
        if (mesh.current)
            mesh.current.rotation.x = mesh.current.rotation.y += delta

        if (mesh.current && startEasing)
            easing.damp3(mesh.current.position, endPos, 4, delta)
        else
            easing.damp3(mesh.current.position, [0, 0, 0], 4, delta)
    })

    return (
        <>

            <Lights />

            <group position={[0, -1, 0]}>
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[2, 2, 2]} />
                    <Side rotation={[0, Math.PI / 2, Math.PI / 2]} index={2}>
                        <PortalEnv />
                    </Side>
                </mesh>

                {/* Inner */}
                <mesh
                    ref={mesh}
                    visible={start}
                    castShadow
                    receiveShadow
                >
                    <dodecahedronGeometry />
                    <meshStandardMaterial color={gltfColor} />
                </mesh>
            </group>
        </>
    )
}

function Side({ rotation = [0, 0, 0], children, index }) {
    const { bg } = useGlobal()
    const li = useRef()
    // useHelper(li, SpotLightHelper, 10, "red");
    const { nodes } = useGLTF('/aobox-transformed.glb')
    return (
        <>
            <MeshPortalMaterial attach={`material-${index}`}>
                {/** Everything in here is inside the portal and isolated from the canvas */}
                <ambientLight intensity={2} />
                <Environment preset="city" />
                {/** A box with baked AO */}
                <mesh castShadow receiveShadow rotation={rotation} geometry={nodes.Cube.geometry}>

                    <meshStandardMaterial
                        aoMapIntensity={1}
                        aoMap={nodes.Cube.material.aoMap}
                        color={bg}
                    />

                    <spotLight ref={li} castShadow color={bg} intensity={15} position={[5, 4, 2.5]} angle={0.3} penumbra={1} shadow-normalBias={0.05} shadow-bias={0.001} />
                </mesh>
                {/** The shape */}
                {children}
            </MeshPortalMaterial>
        </>
    )
}
