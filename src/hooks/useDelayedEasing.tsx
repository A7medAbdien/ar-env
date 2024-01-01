import { useEffect, useState } from 'react';
import { useGlobal } from '../context/useGlobal';

const useDelayedEasing = (delayDuration = 2000) => {
    const { start } = useGlobal()
    const [startEasing, setStartEasing] = useState(false);

    useEffect(() => {
        if (!start) {
            setStartEasing(false);
            return;
        } else {
            const delayTimer = setTimeout(() => {
                setStartEasing(true);
            }, delayDuration)
            return () => clearTimeout(delayTimer);
        }
    }, [delayDuration, start]);

    return startEasing;
};

export default useDelayedEasing;
