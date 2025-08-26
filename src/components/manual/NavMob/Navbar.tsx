import NavElement from "./NavElement";
import { motion } from "motion/react"; 
import { useState, useEffect } from "react";
// MAYBE WORK ON MAKING THE DROPDOWN ANIMATE INDIVIDUALLY?

interface NavbarProps {
    selectedPage: string;
    setSelectedPage: (page: string) => void;
};

// array holding all the pages
const NavbarIds: string[] = ['home', 'meal', 'workOut', 'selfCare'];

const Navbar = ({setSelectedPage}: NavbarProps): JSX.Element => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);  // hamburger menu state

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);  // Toggle menu state

    // function to select which page i'm clicking from the array
    // sends the selected page prop back up the tree
    const handleClick = (page: number): void => {
        if(page >= 0 && page <= NavbarIds.length) {
            setSelectedPage(NavbarIds[page]);
            setIsMenuOpen(!isMenuOpen);
            console.log("IS MENU OPEN: ", isMenuOpen);
        };        
    };

    return (
        <nav className="navbar-mobile relative flex flex-row justify-between items-center font-mono bg-red-500">
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
            {isMenuOpen && <motion.ul
                className="absolute top-16 left-0 w-full bg-red-500 text-white flex flex-col gap-4 p-6 md:hidden"
                initial={{ opacity: 0, y: -20 }}  // Initial position
                animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}  // Toggle visibility
                exit={{ opacity: 0, y: -20 }}  // On exit (close)
                transition={{ duration: 0.3 }}
            >
                {NavbarIds.map((page, index) => (
                    <NavElement
                        key={page}
                        text={page.charAt(0).toUpperCase() + page.slice(1)}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </motion.ul>}
        </nav>
    );
};

export default Navbar;
