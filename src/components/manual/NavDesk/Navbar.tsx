import NavElement from "./NavElement";
import { useState, useEffect } from "react";

const Navbar = (): JSX.Element => {
    interface Pages {
        home: string;
        mealIdeas: string;
        workOut: string;
        selfCare: string;

    };

    const [selected, setSelected] = useState<string>("home");

    useEffect(() => {

    }, [selected]);

    const handleHomeClick = () => {
        setSelected("home");
    };

    const handleMealClick = () => {
        setSelected("meal");
    };

    const handleWorkoutClick = () => {
        setSelected("workOut");
    };

    const handleSelfCareClick = () => {
        setSelected("selfCare");
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
