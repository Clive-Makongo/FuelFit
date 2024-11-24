import Card from '../components/manual/card';
import NavDesk from '../components/manual/NavDesk/Navbar';
import NavMob from '../components/manual/NavMob/Navbar'
import { useState } from 'react';
import { useWindowSize } from '@/utils/useWindowSize';

function Home(): JSX.Element {
    const { width } = useWindowSize();

    // Define a breakpoint (e.g., 768px for mobile vs. desktop)
    const isMobile: boolean = width < 768;

    return (
        <>
            <>
                {console.log(width, isMobile)}
            </>
            {isMobile ? (
                <div>
                    {/* Mobile View */}
                    <NavMob/>
                    <div className="bg-red-500 p-4 w-full text-white">Mobile View</div>
                </div>
            ) : (
                <div>
                    {/* Desktop View */}
                    <NavDesk />
                    <div className="bg-blue-500 p-4 text-white">Desktop View</div>
                    <Card />
                </div>
            )}
        </>
    );
}

export default Home;
