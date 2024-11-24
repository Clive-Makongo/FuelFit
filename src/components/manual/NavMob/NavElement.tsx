import { motion } from 'motion/react'
import { useState } from 'react';

interface NavElementProps {
    text: string;
    onClick: () => void;
}

const NavElement = ({ text, onClick }: NavElementProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);  // State to track dropdown visibility

    const toggleDropdown = () => setIsOpen(!isOpen);  // Function to toggle the dropdown

    return (
        <li className="relative">
            <button
                onClick={toggleDropdown}
                className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700 focus:outline-none"
            >
                {text}
            </button>

            {/* Dropdown menu with motion */}
            <motion.div
                className="absolute left-0 mt-2 bg-gray-600 text-white p-4 rounded"
                initial={{ opacity: 0, y: -10 }}  // Initial state for animation
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}  // Animation trigger
                exit={{ opacity: 0, y: -10 }}  // When the dropdown closes
                transition={{ duration: 0.3 }}
                style={{ display: isOpen ? "block" : "none" }}
            >
                <p>Dropdown content for {text}</p>
            </motion.div>
        </li>
    );
};

export default NavElement;
