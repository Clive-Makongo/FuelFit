import { useEffect, useState } from "react";

interface size {
    width: number;
    height: number
};

export const useWindowSize = (): size => {
    const getSize = (): size => {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    };

    const [windowSize, setWindowSize] = useState<size>(getSize);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(getSize());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowSize;

};
