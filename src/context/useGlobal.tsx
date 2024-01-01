import { useControls } from 'leva';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface GlobalContextProps {
    start: boolean;
    setStart: React.Dispatch<React.SetStateAction<boolean>>;
    gltfColor: string
    bg: string
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [start, setStart] = useState(false);
    const { gltfColor, bg } = useControls({ bg: '#f0f0f0', gltfColor: '#3e3e3e' })
    return (
        <GlobalContext.Provider value={{ start, setStart, gltfColor, bg }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = (): GlobalContextProps => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobal must be used within a GlobalProvider');
    }
    return context;
};