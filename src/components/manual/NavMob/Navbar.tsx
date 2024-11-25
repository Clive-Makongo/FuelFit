import NavElement from "./NavElement";
import { useState } from "react";
import { motion } from "motion/react"; 
// MAYBE WORK ON MAKING THE DROPDOWN ANIMATE INDIVIDUALLY?

interface NavbarProps {
    selectedPage: string;
    setSelectedPage: (page: string) => void;
};

const Navbar = ({selectedPage, setSelectedPage}: NavbarProps): JSX.Element => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);  // hamburger menu state

    // funtions for changing pages
    const handleHomeClick = () => {
        setSelectedPage("home");
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMealClick = () => {
        setSelectedPage("meal");
        setIsMenuOpen(!isMenuOpen);
    };

    const handleWorkoutClick = () => {
        setSelectedPage("workOut");
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSelfCareClick = () => {
        setSelectedPage("selfCare");
        setIsMenuOpen(!isMenuOpen);
    };
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);  // Toggle menu state

    return (
        <nav className="relative flex flex-row justify-between items-center font-mono bg-red-500">
            {/* Hamburger Menu */}
            <h1
                className="px-4"
            >
                Fuel Fit
            </h1>
            <button
                className="w-1/4 border-2 rounded-lg border-black p-4 text-black"
                onClick={toggleMenu}  // Toggle menu on click
            >
                ☰
            </button>

            {/* Menu Items (Animated) */}
            <motion.ul
                className="absolute top-16 left-0 w-full bg-red-500 text-white flex flex-col gap-4 p-6 md:hidden"
                initial={{ opacity: 0, y: -20 }}  // Initial position
                animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}  // Toggle visibility
                exit={{ opacity: 0, y: -20 }}  // On exit (close)
                transition={{ duration: 0.3 }}
            >
                <NavElement text="Home" onClick={handleHomeClick} />
                <NavElement text="Meal Ideas" onClick={handleMealClick} />
                <NavElement text="Workout Plans" onClick={handleWorkoutClick} />
                <NavElement text="Self Care" onClick={handleSelfCareClick} />
            </motion.ul>
        </nav>
    );
};

export default Navbar;
