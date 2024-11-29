import NavDesk from '../components/manual/NavDesk/Navbar';
import NavMob from '../components/manual/NavMob/Navbar';
import Meal from './Meal';
import Workout from './Workout';
import SelfCare from './SelfCare';
import { useState } from 'react';
import { usePage } from '@/components/manual/Context/pageContext';
import { useWindowSize } from '@/utils/useWindowSize';

function Home(): JSX.Element {
    const [mobilePage, setMobilePage] = useState<string>("home"); // prop drilling mobile state
    const { width } = useWindowSize(); // get size of screen
    const { selectedPage } = usePage(); // pull selected page from context

    // Mobile breakpoint
    const isMobile: boolean = width < 768;

    return (
        <>
            <>
                {console.log(mobilePage)}
            </>
            {isMobile && mobilePage ? (
                <div>
                    {/* Mobile View */}
                    {/* prop drilling navbar */}
                    <NavMob selectedPage={mobilePage} setSelectedPage={setMobilePage}/>
                    <div className="bg-blue-500 p-4 w-full text-white">Mobile View</div>
                    {mobilePage === "home" && (
                        <div className='bg-purple-500'>
                            <h1 className="text-2xl font-bold">Welcome Home!</h1>
                            <p>This is the home page content.</p>
                        </div>
                    )}

                    {/* Meal Page */}
                    {mobilePage === "meal" && (
                        <Meal />
                    )}

                    {/* Workout Page */}
                    {mobilePage === "workOut" && (
                        <Workout />
                    )}

                    {/* SelfCare Page */}
                    {mobilePage === "selfCare" && (
                        <SelfCare />
                    )}
                    
                </div>
            ) : (
                <>
                    {/* Desktop View */}
                    {/* Using PageProvider for the navbar */}
                    <NavDesk />
                    <div className="bg-blue-500 h-[50px] p-4 text-white">Desktop View</div>

                    {/* Home Page */}
                    {selectedPage === "home" && (
                        <div className='bg-purple-500'>
                            <h1 className="text-2xl font-bold">Welcome Home!</h1>
                            <p>This is the home page content.</p>
                        </div>
                    )}

                        {/* Meal Page */}
                        {selectedPage === "meal" && (
                            <Meal />
                        )}

                        {/* Workout Page */}
                        {selectedPage === "workOut" && (
                            <Workout />
                        )}

                        {/* SelfCare Page */}
                        {selectedPage === "selfCare" && (
                            <SelfCare />
                        )}
                </>
            )}
        </>
    );
}

export default Home;
