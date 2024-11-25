import NavDesk from '../components/manual/NavDesk/Navbar';
import NavMob from '../components/manual/NavMob/Navbar';
import Meal from './Meal';
import Workout from './Workout';
import SelfCare from './SelfCare';
import { usePage } from '@/components/manual/Context/pageContext';
import { useWindowSize } from '@/utils/useWindowSize';

function Home(): JSX.Element {
    const { width } = useWindowSize();
    const { selectedPage } = usePage();

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
                    <NavMob />
                    <div className="bg-blue-500 p-4 w-full text-white">Mobile View</div>
                </div>
            ) : (
                <>
                    {/* Desktop View */}
                    {/* Using PageProvider for the navbar */}
                    <NavDesk />
                    <div className="bg-blue-500 p-4 text-white">Desktop View</div>

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

                        {/* Meal Page */}
                        {selectedPage === "workOut" && (
                            <Workout />
                        )}

                        {/* Meal Page */}
                        {selectedPage === "selfCare" && (
                            <SelfCare />
                        )}
                </>
            )}
        </>
    );
}

export default Home;
