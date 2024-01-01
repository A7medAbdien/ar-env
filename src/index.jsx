import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.tsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        shadows
        camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            // position: [1, 2, 6]
            position: [-3, 0.5, 3]
        }}
    >
        <Experience />
    </Canvas>
)