import React from "react"
import { Link } from "react-router-dom"

const NavBar = (): JSX.Element => {
    return (
        <nav>
            <ul className="flex flex-row justify-evenly font-mono bg-red-500 p-4">
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/meal'>Meal</Link>
                </li>
                <li>
                    <Link to='/WorkOut'>Workout</Link>
                </li>
                <li>
                    <Link to='/selfCare'>Self Care</Link>
                </li>
            </ul>
        </nav>
    )
};

export default NavBar