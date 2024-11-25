import NavElement from "./NavElement";
import { usePage } from "../Context/pageContext";

const Navbar = (): JSX.Element => {
    // page selections props using useContext
    const { setSelectedPage } = usePage();

    // funtions for changing pages
    const handleHomeClick = () => {
        setSelectedPage("home");
    };

    const handleMealClick = () => {
        setSelectedPage("meal");
    };

    const handleWorkoutClick = () => {
        setSelectedPage("workOut");
    };

    const handleSelfCareClick = () => {
        setSelectedPage("selfCare");
    };

    return (
        <nav>
            <ul className="flex bg-red-500 flex-row justify-evenly px-5">
                <NavElement text="Home" onClick={handleHomeClick} />
                <NavElement text="Meal Ideas" onClick={handleMealClick} />
                <NavElement text="Workout Plans" onClick={handleWorkoutClick} />
                <NavElement text="Self Care" onClick={handleSelfCareClick} />
            </ul>
        </nav>
    );
};

export default Navbar;
