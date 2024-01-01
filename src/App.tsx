import * as React from 'react';
import { GlobalProvider, useGlobal } from './context/useGlobal';
import Experience from './Experience';
import { Layout } from './Layout';

export interface IAppProps {
}

export default function App(props: IAppProps) {
    return (
        <GlobalProvider>
            {/* <div className="" onClick={ }>Start</div> */}
            <Layout />
            <Experience />
        </GlobalProvider>
    );
}

