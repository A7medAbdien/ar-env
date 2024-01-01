import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import App from './App.tsx'
import { GlobalProvider } from './context/useGlobal.tsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(<App />)