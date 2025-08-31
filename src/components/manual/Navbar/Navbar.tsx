import React from "react"
import { Link } from "react-router-dom"
import { Home, UtensilsCrossed, Dumbbell, Heart } from "lucide-react";
import { motion } from "motion/react"

const NavBar = (): JSX.Element => {
    return (
        <nav>
            <ul className="flex flex-row justify-evenly font-mono bg-red-500 p-4">
                <motion.li>
                    <Link to='/'>Home
                        <Home size={40} />
                    </Link>
                </motion.li>
                <motion.li>
                    <Link to='/meal'>Meal
                        <UtensilsCrossed size={40} />
                    </Link>
                </motion.li>
                <motion.li>
                    <Link to='/WorkOut'>Workout
                        <Dumbbell size={40} />
                    </Link>
                </motion.li>
                <motion.li>
                    <Link to='/selfCare'>Self Care
                        <Heart size={40} />
                    </Link>
                </motion.li>
            </ul>
        </nav>
    )
};

export default NavBar