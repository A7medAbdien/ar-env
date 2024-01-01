import React, { createContext, useState, useContext, ReactNode } from 'react';

interface GlobalContextProps {
    start: boolean;
    setStart: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [start, setStart] = useState(false);

    return (
        <GlobalContext.Provider value={{ start, setStart }}>
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