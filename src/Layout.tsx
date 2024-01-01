import * as React from 'react';
import { useGlobal } from './context/useGlobal';

export interface ILayoutProps {
}

export function Layout(props: ILayoutProps) {
    const { setStart, start } = useGlobal()

    return (
        <div style={{ width: '100vw' }}>
            <div className='myButton positionMiddle' onClick={() => setStart(!start)}>Start</div>
        </div>
    );
}
