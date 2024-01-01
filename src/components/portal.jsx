import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Edges, MeshPortalMaterial, CameraControls, Environment, PivotControls, useHelper } from '@react-three/drei'
import { useControls } from 'leva'
import { SpotLightHelper } from 'three'
import PortalEnv from './PortalEnv'

export const Portal = () => (
    <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <Side rotation={[0, 0, 0]} index={0}>
            <PortalEnv />
        </Side>
    </mesh>
)

function Side({ rotation = [0, 0, 0], children, index }) {
    const li = useRef()
    // useHelper(li, SpotLightHelper, 10, "red");
    const { bg } = useControls({ bg: '#f0f0f0' })
    const { nodes } = useGLTF('/aobox-transformed.glb')
    return (
        <>
            <MeshPortalMaterial attach={`material-${index}`}>
                {/** Everything in here is inside the portal and isolated from the canvas */}
                <ambientLight intensity={2} />
                <Environment preset="city" />
                {/** A box with baked AO */}
                <mesh castShadow receiveShadow rotation={rotation} geometry={nodes.Cube.geometry}>
                    <meshStandardMaterial aoMapIntensity={1} aoMap={nodes.Cube.material.aoMap} color={bg} />
                    <spotLight ref={li} castShadow color={bg} intensity={15} position={[3, 2, 2]} angle={0.5} penumbra={1} shadow-normalBias={0.05} shadow-bias={0.001} />
                </mesh>
                {/** The shape */}
                {children}
            </MeshPortalMaterial>
        </>
    )
}
